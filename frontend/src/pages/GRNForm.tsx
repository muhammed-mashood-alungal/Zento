import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  Breadcrumbs,
  Link,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import {
  Save as SaveIcon,
  Send as SendIcon,
  Refresh as RefreshIcon,
  Cancel as CancelIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SnackbarUtils } from "../utils/snackbar.util";
import { grnServices } from "../services/grn.service";
import GRNHeaderForm from "../components/GRN/GRNHeaderForm";
import type { GRNFormData, LineItem } from "../types/grn.types";
import GRNListItems from "../components/GRN/GRNListItems";
import { draftSchema, submitSchema } from "../schemas/grn.schema";

const GRNForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [lineItemsErr, setLineItemsErr] = useState<Record<string, string>[]>(
    []
  );

  const fetchGRNNumber = async () => {
    try {
      const grnNumber = await grnServices.generateGRNNumber();
      setValue("grn_number", grnNumber);
    } catch (error) {
      SnackbarUtils.error("Something Went Wrong while Generating GRN Number");
    }
  };

  useEffect(() => {
    fetchGRNNumber();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<GRNFormData>({
    resolver: yupResolver(draftSchema),
    defaultValues: {
      grn_number: "",
      grn_date: "",
      vendor_id: 0,
      branch_id: 0,
      invoice_number: "",
      total_amount: 0,
    },
  });

  const validateForSubmit = async (data: GRNFormData) => {
    try {
      await submitSchema.validate(data, { abortEarly: false });
      clearErrors();
      return true;
    } catch (err: any) {
      clearErrors();
      err.inner.forEach((validationError: any) => {
        setError(validationError.path, {
          message: validationError.message,
        });
      });
      return false;
    }
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      name: "",
      quantity: 0,
      unit_price: 0,
      tax_percentage: 0,
      taxable_amount: 0,
      total_amount: 0,
      sub_category_id: 0,
      category_id: 0,
    };
    setLineItems([...lineItems, newItem]);
  };

  const deleteLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          if (
            field === "quantity" ||
            field === "unit_price" ||
            field === "tax_percentage"
          ) {
            const taxableAmount = updatedItem.quantity * updatedItem.unit_price;
            const taxAmount =
              (taxableAmount * updatedItem.tax_percentage) / 100;
            updatedItem.taxable_amount = taxableAmount;
            updatedItem.total_amount = taxableAmount + taxAmount;
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const calculateTotals = () => {
    const subtotal = lineItems.reduce(
      (sum, item) => sum + item.taxable_amount,
      0
    );
    const tax = lineItems.reduce(
      (sum, item) => sum + (item.taxable_amount * item.tax_percentage) / 100,
      0
    );
    const total = lineItems.reduce((sum, item) => sum + item.total_amount, 0);
    return { subtotal, tax, total };
  };

  const handleDraftManually = async () => {
    clearErrors();
    const values = getValues();
    await onSaveDraft(values);
  };

  const onSaveDraft = async (data: GRNFormData) => {
    try {
      const isValidLines = validateLineItems(lineItems);
      if (!isValidLines) return;

      clearErrors();
      setLineItems([]);

      const payload = {
        mode: "draft" as const,
        header: {
          grn_number: data.grn_number || undefined,
          grn_date: data.grn_date ? new Date(data.grn_date) : undefined,
          vendor_id: data.vendor_id || undefined,
          branch_id: data.branch_id || undefined,
          invoice_number: data.invoice_number || undefined,
          total_amount: calculateTotals().total || undefined,
        },
        line_items: lineItems.map(({ id, ...item }) => ({
          ...item,
          grn_header_id: undefined,
        })),
      };
      await grnServices.createGRN(payload);
      SnackbarUtils.success("GRN saved as draft!");
      navigate("/grn");
    } catch (error) {
      SnackbarUtils.error("Failed to save draft");
    }
  };

  const validateLineItems = (items: LineItem[]) => {
    const errors: Record<string, string>[] = [];

    let isValid = true;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemErrors: Record<string, string> = {};
      console.log(item.category_id, item.sub_category_id);
      if (!item.category_id || item.category_id == 0) {
        itemErrors.category_id = "Category is required";
      }
      if (!item.sub_category_id || item.sub_category_id == 0) {
        itemErrors.sub_category_id = "Sub-category is required";
      }
      if (!item.name.trim()) {
        itemErrors.name = "Name is required";
      }
      if (!item.quantity || item.quantity <= 0) {
        itemErrors.quantity = "Quantity must be greater than 0";
      }
      if (!item.unit_price || item.unit_price < 0) {
        itemErrors.unit_price = "Unit price cannot be negative";
      }
      if (!item.tax_percentage && item.tax_percentage !== 0) {
        itemErrors.tax_percentage = "Tax percentage is required";
      }
      if (!item.taxable_amount && item.taxable_amount !== 0) {
        itemErrors.taxable_amount = "Taxable amount is required";
      }
      if (!item.total_amount && item.total_amount !== 0) {
        itemErrors.total_amount = "Total amount is required";
      }

      if (Object.keys(itemErrors).length > 0) {
        isValid = false;
      }

      errors.push(itemErrors);
    }

    setLineItemsErr(errors);
    return isValid;
  };

  const onSubmit = async (data: GRNFormData) => {
    try {
      setLineItems([]);
      const isValid = await validateForSubmit(data);
      const isValidLines = validateLineItems(lineItems);
      if (!(isValid && isValidLines)) return;

      const payload = {
        mode: "submit" as const,
        header: {
          grn_number: data.grn_number,
          grn_date: data.grn_date ? new Date(data.grn_date) : undefined,
          vendor_id: Number(data.vendor_id),
          branch_id: Number(data.branch_id),
          invoice_number: data.invoice_number,
          total_amount: calculateTotals().total,
        },
        line_items: lineItems.map(({ id, ...item }) => ({
          ...item,
          grn_header_id: undefined,
        })),
      };
      await grnServices.createGRN(payload);
      SnackbarUtils.success("GRN submitted successfully!");
      navigate("/grn");
    } catch (error) {
      SnackbarUtils.error("Failed to submit GRN");
    }
  };

  const handleReset = () => {
    reset();
    setLineItems([
      {
        id: "1",
        name: "",
        quantity: 0,
        unit_price: 0,
        tax_percentage: 18,
        taxable_amount: 0,
        total_amount: 0,
        sub_category_id: 0,
        category_id: 0,
      },
    ]);
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <Box>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate("/grn")}
          sx={{ cursor: "pointer" }}
        >
          GRN Management
        </Link>
        <Typography color="text.primary">
          {isEdit ? "Edit GRN" : "Create New GRN"}
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {isEdit ? "Edit GRN" : "Create New GRN"}
        </Typography>
        <Chip
          label="Draft"
          color="warning"
          variant="outlined"
          sx={{ fontSize: "0.875rem" }}
        />
      </Box>

      {/* GRN Header Form */}
      <GRNHeaderForm control={control} errors={errors} />

      {/* Line Items Table */}
      <GRNListItems
        addLineItem={addLineItem}
        deleteLineItem={deleteLineItem}
        lineItems={lineItems}
        updateLineItem={updateLineItem}
        lineItemsErr={lineItemsErr}
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={8}></Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "semibold" }}>
                Summary
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Subtotal:</Typography>
                <Typography>₹{subtotal.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Tax:</Typography>
                <Typography>₹{tax.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Total:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ₹{total.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => navigate("/grn")}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
            sx={{ borderRadius: 2 }}
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={handleSubmit(handleDraftManually)}
            sx={{ borderRadius: 2 }}
          >
            Save Draft
          </Button>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleSubmit(onSubmit)}
            sx={{ borderRadius: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default GRNForm;
