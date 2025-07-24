import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@mui/material';
import { Add as AddIcon, Computer as ComputerIcon } from '@mui/icons-material';

const Assets: React.FC = () => {
  const assets = [
    {
      id: 'AST-001',
      name: 'MacBook Pro 16"',
      type: 'Hardware',
      status: 'Active',
      assignedTo: 'John Doe',
      location: 'Office A',
      lastUpdated: '2024-01-15',
    },
    {
      id: 'AST-002',
      name: 'Dell XPS 13',
      type: 'Hardware',
      status: 'Available',
      assignedTo: '-',
      location: 'Storage',
      lastUpdated: '2024-01-14',
    },
    {
      id: 'AST-003',
      name: 'Adobe Creative Suite',
      type: 'Software',
      status: 'Active',
      assignedTo: 'Jane Smith',
      location: 'License Server',
      lastUpdated: '2024-01-13',
    },
    {
      id: 'AST-004',
      name: 'iPhone 14 Pro',
      type: 'Hardware',
      status: 'Maintenance',
      assignedTo: 'Mike Johnson',
      location: 'IT Department',
      lastUpdated: '2024-01-12',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Available':
        return 'primary';
      case 'Maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Asset Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
        >
          Add Asset
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <ComputerIcon />
                </Avatar>
                <Typography variant="h6">Total Assets</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                1,247
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <ComputerIcon />
                </Avatar>
                <Typography variant="h6">Active</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                892
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid  component={'div'}  item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <ComputerIcon />
                </Avatar>
                <Typography variant="h6">Available</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                234
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <ComputerIcon />
                </Avatar>
                <Typography variant="h6">Maintenance</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                121
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Asset Inventory
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Asset ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Last Updated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id} hover>
                    <TableCell sx={{ fontWeight: 'medium' }}>{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={asset.status}
                        color={getStatusColor(asset.status) as any}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{asset.assignedTo}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>{asset.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Assets;