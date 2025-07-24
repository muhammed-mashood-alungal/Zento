import { FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { FormProps } from "../../types/form.types";
import type { BranchFormData } from "../../types/branch.types";

function BranchForm({control , errors} : FormProps<BranchFormData>) {
  return (
    <>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }: any) => (
              <TextField
                {...field}
                label="Branch Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="code"
            control={control}
            render={({ field }: any) => (
              <TextField
                {...field}
                label="Branch Code"
                fullWidth
                error={!!errors.code}
                helperText={errors.code?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="location"
            control={control}
            render={({ field }: any) => (
              <TextField
                {...field}
                label="Location"
                fullWidth
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="pincode"
            control={control}
            render={({ field }: any) => (
              <TextField
                {...field}
                label="Pincode"
                fullWidth
                error={!!errors.pincode}
                helperText={errors.pincode?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="is_open"
            control={control}
            render={({ field }: { field: any }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={field.onChange}
                    color="primary"
                  />
                }
                label="Branch is Open"
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default BranchForm;
