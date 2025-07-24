import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
} from "@mui/icons-material";
import { useLayout } from "../../contexts/LayoutContext";

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleSidebar, sidebarOpen } = useLayout();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Asset Management System
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            label="Online"
            size="small"
            color="success"
            variant="outlined"
            sx={{ display: { xs: "none", sm: "flex" } }}
          />

          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>

          <IconButton color="inherit">
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
              <AccountIcon />
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
