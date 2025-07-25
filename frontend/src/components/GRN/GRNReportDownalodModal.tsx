import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Download,
  CalendarToday,
  Business,
  Person,
  GetApp,
  Refresh,
} from '@mui/icons-material';
import { useMasterData } from '../../contexts/master-data.context';

interface Vendor {
  id: number;
  name: string;
}

interface Branch {
  id: number;
  name: string;
}

interface ImportFiltersProps {
  onDownload?: (filters: FilterValues) => void;
  vendors?: Vendor[];
  branches?: Branch[];
}

interface FilterValues {
  dateFrom: string;
  dateTo: string;
  vendorId: string;
  branchId: string;
  format: string;
}

const ImportFilters: React.FC<ImportFiltersProps> = ({ 
  onDownload
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    dateFrom: '',
    dateTo: '',
    vendorId: '',
    branchId: '',
    format: 'excel'
  });
  const {branches , vendors} = useMasterData()

  const handleFilterChange = (field: keyof FilterValues, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(filters);
    }
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      vendorId: '',
      branchId: '',
      format: 'excel'
    });
  };

  return (
    <Box sx={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column', marginTop:"10px" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", display: 'flex', alignItems: 'center', gap: 1 }}>
            <GetApp sx={{ color: 'primary.main' }} />
            Export GRN Data
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Select filters to download GRN data in your preferred format
        </Typography>
      </Box>

      {/* Filters Section */}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Grid container spacing={3}>
          {/* Date Range Card */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <CalendarToday sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Date Range
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="From Date"
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="To Date"
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Vendor and Branch Filters */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Person sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Vendor
                  </Typography>
                </Box>
                <FormControl fullWidth>
                  <InputLabel>Select Vendor</InputLabel>
                  <Select
                    value={filters.vendorId}
                    label="Select Vendor"
                    onChange={(e) => handleFilterChange('vendorId', e.target.value)}
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="">
                      <em>All Vendors</em>
                    </MenuItem>
                    {vendors.map((vendor) => (
                      <MenuItem key={vendor.id} value={vendor.id.toString()}>
                        {vendor.contact_person}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Business sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Branch
                  </Typography>
                </Box>
                <FormControl fullWidth>
                  <InputLabel>Select Branch</InputLabel>
                  <Select
                    value={filters.branchId}
                    label="Select Branch"
                    onChange={(e) => handleFilterChange('branchId', e.target.value)}
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="">
                      <em>All Branches</em>
                    </MenuItem>
                    {branches.map((branch) => (
                      <MenuItem key={branch.id} value={branch.id.toString()}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>

         
        </Grid>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mt: 4, pt: 3 }}>
        <Divider sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={resetFilters}
            sx={{ 
              borderRadius: 2,
              px: 3,
              order: { xs: 2, sm: 1 }
            }}
          >
            Reset Filters
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleDownload}
            sx={{ 
              borderRadius: 2,
              px: 4,
              order: { xs: 1, sm: 2 }
            }}
          >
            Download Data
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ImportFilters;