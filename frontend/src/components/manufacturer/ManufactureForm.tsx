import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Controller } from "react-hook-form"

function ManufactureForm({control , errors} : any) {
  return (
    <>
     <Grid container spacing={3} mt={1}>
          <Grid item xs={12} >
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Manufacturer name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Manufacturer Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status">
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
    </>
  )
}

export default ManufactureForm