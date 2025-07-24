import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Computer as ComputerIcon,
  Storage as StorageIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: 'primary' | 'secondary' | 'error' | 'warning';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ color: `${color}.main`, mr: 2 }}>
          {icon}
        </Box>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Chip
        label={trend}
        size="small"
        color={color}
        variant="outlined"
      />
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Assets',
      value: '1,247',
      icon: <ComputerIcon />,
      trend: '+12% this month',
      color: 'primary' as const,
    },
    {
      title: 'Software Licenses',
      value: '356',
      icon: <StorageIcon />,
      trend: '+8% this month',
      color: 'secondary' as const,
    },
    {
      title: 'Active Users',
      value: '89',
      icon: <PeopleIcon />,
      trend: '+5% this month',
      color: 'warning' as const,
    },
    {
      title: 'Assignments',
      value: '432',
      icon: <AssignmentIcon />,
      trend: '+15% this month',
      color: 'error' as const,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Asset Utilization
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Hardware Assets</Typography>
                  <Typography variant="body2">85%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Software Licenses</Typography>
                  <Typography variant="body2">92%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={92} color="secondary" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Storage Capacity</Typography>
                  <Typography variant="body2">67%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={67} color="warning" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Recent Activities
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    New laptop assigned to John Doe
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    2 hours ago
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    Software license renewed
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    5 hours ago
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    Asset maintenance completed
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    1 day ago
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    New user registered
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    2 days ago
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;