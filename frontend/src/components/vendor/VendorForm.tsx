import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Controller } from "react-hook-form"
import type { Manufacturer } from "../../types/manufacturer.types"

function VendorForm({errors , control , manufacturers} : any) {
  return (
    <>
      <Grid container spacing={3} mt={1} >
          <Grid item xs={12} sm={6}>
            <Controller
              name="contact_person"
              control={control}
              rules={{ required: 'Contact person is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contact Person"
                  fullWidth
                  error={!!errors.contact_person}
                  helperText={errors.contact_person?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'Phone number is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              rules={{ 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="gst_number"
              control={control}
              rules={{ required: 'GST number is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="GST Number"
                  fullWidth
                  error={!!errors.gst_number}
                  helperText={errors.gst_number?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="manufacturer_id"
              control={control}
              rules={{ required: 'Manufacturer is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.manufacturer_id}>
                  <InputLabel>Manufacturer</InputLabel>
                  <Select {...field} label="Manufacturer">
                    <MenuItem value={0} disabled>
                      Select a manufacturer
                    </MenuItem>
                    {manufacturers.map((manufacturer : Manufacturer) => (
                      <MenuItem key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.manufacturer_id && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                      {errors.manufacturer_id.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
    </>
  )
}

export default VendorForm