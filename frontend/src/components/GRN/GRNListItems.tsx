import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  FileDownload as DownloadIcon,
} from "@mui/icons-material";
import type { LineItem, LineItemErrors } from "../../types/grn.types";
import { useMasterData } from "../../contexts/master-data.context";
import type { SubCategory } from "../../types/sub-category.types";
import { useState } from "react";

type GRNListPropsType = {
  addLineItem: () => void;
  lineItems: LineItem[];
  updateLineItem: any;
  deleteLineItem: (id: string) => void;
  lineItemsErr: Record<string, string>[];
};
function GRNListItems({
  addLineItem,
  lineItems,
  updateLineItem,
  deleteLineItem,
  lineItemsErr,
}: GRNListPropsType) {
  const { categories } = useMasterData();
  const [subCategories, setSubCategories] = useState<SubCategory[]>(() => {
    return categories[0]?.sub_categories || [];
  });

  return (
    <Paper sx={{ mb: 3 }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "semibold" }}>
          Line Items
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button variant="outlined" startIcon={<UploadIcon />} size="small">
            Excel Upload
          </Button>
          <Button variant="outlined" startIcon={<DownloadIcon />} size="small">
            Download Template
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addLineItem}
            size="small"
          >
            Add Item
          </Button>
        </Box>
      </Box>
      <Divider />
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub Category</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Tax %</TableCell>
              <TableCell align="right">Taxable Amount</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lineItems.map((item: LineItem, idx) => {
              const error = lineItemsErr?.[idx] || {};
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <TextField
                      size="small"
                      value={item.name}
                      onChange={(e) =>
                        updateLineItem(item.id, "name", e.target.value)
                      }
                      sx={{ minWidth: 150 }}
                      error={!!error.name}
                      helperText={error.name}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl
                      size="small"
                      sx={{ minWidth: 120 }}
                      error={!!error.category_id}
                    >
                      <Select
                        value={item.category_id}
                        onChange={(e) => {
                          updateLineItem(
                            item.id,
                            "category_id",
                            Number(e.target.value)
                          );
                          setSubCategories(() => {
                            return (
                              categories.find((c) => c.id == e.target.value)
                                ?.sub_categories || []
                            );
                          });
                        }}
                      >
                        <MenuItem value="" >
                          <em>Select Category</em>
                        </MenuItem>
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {error.category_id && (
                        <Typography variant="caption" color="error">
                          {error.category_id}
                        </Typography>
                      )}
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl
                      size="small"
                      sx={{ minWidth: 120 }}
                      error={!!error.sub_category_id}
                    >
                      <Select
                        value={item.sub_category_id}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            "sub_category_id",
                            Number(e.target.value)
                          )
                        }
                      >
                        {subCategories.map((category: SubCategory) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {error.sub_category_id && (
                        <Typography variant="caption" color="error">
                          {error.sub_category_id}
                        </Typography>
                      )}
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      size="small"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateLineItem(
                          item.id,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      sx={{ width: 100 }}
                      error={!!error.quantity}
                      helperText={error.quantity}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      size="small"
                      type="number"
                      value={item.unit_price}
                      onChange={(e) =>
                        updateLineItem(
                          item.id,
                          "unit_price",
                          Number(e.target.value)
                        )
                      }
                      sx={{ width: 100 }}
                      error={!!error.unit_price}
                      helperText={error.unit_price}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      size="small"
                      type="number"
                      value={item.tax_percentage}
                      onChange={(e) =>
                        updateLineItem(
                          item.id,
                          "tax_percentage",
                          Number(e.target.value)
                        )
                      }
                      sx={{ width: 80 }}
                      error={!!error.tax_percentage}
                      helperText={error.tax_percentage}
                    />
                  </TableCell>
                  <TableCell align="right">
                    ₹{item.taxable_amount.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    ₹{item.total_amount.toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => deleteLineItem(item.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
export default GRNListItems;
