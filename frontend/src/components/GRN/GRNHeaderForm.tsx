import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import type { FormProps } from "../../types/form.types";
import type { GRNFormData, GRNHeaderCreationAttributes } from "../../types/grn.types";
import { useMasterData } from "../../contexts/master-data.context";

function GRNHeaderForm({
  control,
  errors,
}: FormProps<GRNFormData>) {
  const { vendors, branches } = useMasterData();
  return (
    <>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "semibold" }}>
          GRN Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="grn_number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="GRN Number"
                  error={!!errors.grn_number}
                  helperText={errors.grn_number?.message}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="grn_date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="date"
                  label="GRN Date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.grn_date}
                  helperText={errors.grn_date?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="vendor_id"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.vendor_id}>
                  <InputLabel>Vendor</InputLabel>
                  <Select {...field} label="Vendor">
                    <MenuItem value="">
                      <em>Select Vendor</em>
                    </MenuItem>
                    {vendors.map((vendor) => (
                      <MenuItem key={vendor.id} value={vendor.id}>
                        {`${vendor.contact_person}  (${vendor.phone})`}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.vendor_id && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, ml: 1.75 }}
                    >
                      {errors.vendor_id.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="branch_id"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.branch_id}>
                  <InputLabel>Branch</InputLabel>
                  <Select {...field} label="Branch">
                    <MenuItem value="">
                      <em>Select Branch</em>
                    </MenuItem>
                    {branches.map((branch) => (
                      <MenuItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.branch_id && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, ml: 1.75 }}
                    >
                      {errors.branch_id.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="invoice_number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Invoice Number"
                  error={!!errors.invoice_number}
                  helperText={errors.invoice_number?.message}
                  inputProps={{ maxLength: 30 }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default GRNHeaderForm;
