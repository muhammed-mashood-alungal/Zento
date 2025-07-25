import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useLayout } from "../../contexts/LayoutContext";

const Header: React.FC = () => {
  const theme = useTheme();
  const { toggleSidebar } = useLayout();

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

       
      </Toolbar>
    </AppBar>
  );
};

export default Header;
