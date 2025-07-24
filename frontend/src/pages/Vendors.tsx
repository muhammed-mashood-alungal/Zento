import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import BaseModal from '../components/common/BaseModal';
import CardGrid, { type CardItem } from '../components/common/CardGrid';

interface Vendor {
  id: number;
  contact_person: string;
  phone: string;
  email: string;
  gst_number: string;
  manufacturer_id: number;
}

interface Manufacturer {
  id: number;
  name: string;
}

interface VendorFormData {
  contact_person: string;
  phone: string;
  email: string;
  gst_number: string;
  manufacturer_id: number;
}

const Vendors: React.FC = () => {
  const [manufacturers] = useState<Manufacturer[]>([
    { id: 1, name: 'Apple Inc.' },
    { id: 2, name: 'Dell Technologies' },
    { id: 3, name: 'HP Inc.' },
    { id: 4, name: 'Lenovo Group' },
  ]);

  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: 1,
      contact_person: 'John Smith',
      phone: '+1-555-0123',
      email: 'john.smith@techsupply.com',
      gst_number: 'GST123456789',
      manufacturer_id: 1,
    },
    {
      id: 2,
      contact_person: 'Sarah Johnson',
      phone: '+1-555-0456',
      email: 'sarah.j@dellpartner.com',
      gst_number: 'GST987654321',
      manufacturer_id: 2,
    },
    {
      id: 3,
      contact_person: 'Mike Wilson',
      phone: '+1-555-0789',
      email: 'mike.wilson@hpreseller.com',
      gst_number: 'GST456789123',
      manufacturer_id: 3,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<VendorFormData>({
    defaultValues: {
      contact_person: '',
      phone: '',
      email: '',
      gst_number: '',
      manufacturer_id: 0,
    },
  });

  const handleCreate = () => {
    setEditingVendor(null);
    reset({
      contact_person: '',
      phone: '',
      email: '',
      gst_number: '',
      manufacturer_id: 0,
    });
    setModalOpen(true);
  };

  const handleEdit = (item: CardItem) => {
    const vendor = vendors.find(v => v.id.toString() === item.id.toString());
    if (vendor) {
      setEditingVendor(vendor);
      reset({
        contact_person: vendor.contact_person,
        phone: vendor.phone,
        email: vendor.email,
        gst_number: vendor.gst_number,
        manufacturer_id: vendor.manufacturer_id,
      });
      setModalOpen(true);
    }
  };

  const handleDelete = (item: CardItem) => {
    setVendors(vendors.filter(v => v.id.toString() !== item.id.toString()));
  };

  const onSubmit = (data: VendorFormData) => {
    if (editingVendor) {
      setVendors(vendors.map(v => 
        v.id === editingVendor.id 
          ? { ...v, ...data }
          : v
      ));
    } else {
      const newVendor: Vendor = {
        id: Math.max(...vendors.map(v => v.id), 0) + 1,
        ...data,
      };
      setVendors([...vendors, newVendor]);
    }
    setModalOpen(false);
    reset();
  };

  const getManufacturerName = (manufacturerId: number) => {
    const manufacturer = manufacturers.find(m => m.id === manufacturerId);
    return manufacturer ? manufacturer.name : 'Unknown';
  };

  const cardItems: CardItem[] = vendors.map(vendor => ({
    id: vendor.id,
    title: vendor.contact_person,
    subtitle: vendor.email,
    description: `Phone: ${vendor.phone}`,
    metadata: [
      { label: 'Email', value: vendor.email },
      { label: 'Phone', value: vendor.phone },
      { label: 'GST Number', value: vendor.gst_number },
      { label: 'Manufacturer', value: getManufacturerName(vendor.manufacturer_id) },
    ],
    badges: [
      { label: getManufacturerName(vendor.manufacturer_id), color: 'primary' },
    ],
  }));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Vendor Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{ borderRadius: 2 }}
        >
          Add Vendor
        </Button>
      </Box>

      <CardGrid
        items={cardItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No vendors found. Add your first vendor!"
      />

      <BaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={() => setModalOpen(false)}
        submitText={editingVendor ? 'Update' : 'Add'}
      >
        <Grid container spacing={3}>
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
                    {manufacturers.map((manufacturer) => (
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
      </BaseModal>
    </Box>
  );
};

export default Vendors;