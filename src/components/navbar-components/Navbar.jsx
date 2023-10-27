// IMPORTS
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { getUserCookie, removeUserCookie } from "src/services/session";

// COMPONENTS
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
// import { DashboardSidebar } from "./Sidebar";
import { NavItem } from "./NavItem";

// ASSETS
import { theme } from "src/theme";
import {
  AccountCircle,
  BrandingWatermark,
  Dashboard,
  ExitToApp,
  House,
  ContentPaste,
  Warning,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import moment from "moment";

export const DashboardNavbar = () => {
  // PROPS DE CONTROLLER
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedUser } = useSelector((state) => state.users);
  const { profileLevel, useName } = getUserCookie();

  const name =
    selectedUser.length != 0 ? selectedUser[0]?.useNameState : useName;

  const { brand } = useParams();

  const navbarPages = [
    {
      label: "Home",
      to: "/dashboard",
      icon: <AccountCircle fontSize="small" />,
      disabled: profileLevel === "admin" ? true : false,
      active: location.pathname === "/dashboard" ? true : false,
    },
    {
      label: "Clientes",
      to: "/dashboard/users",
      icon: <AccountCircle fontSize="small" />,
      disabled: profileLevel === "admin" && useName == "Maya Energy" ? true : false,
      active: location.pathname === "/dashboard/users" ? true : false,
    },
    {
      label: "Alertas",
      to: "/dashboard/alertDevices",
      icon: <Warning fontSize="small" />,
      disabled: profileLevel === "admin" ? true : false,
      active: location.pathname === "/dashboard/alertDevices" ? true : false,
    },
    //{
    //  label: "Plantas",
    //  to: "/dashboard/devices",
    //  icon: <AccountCircle fontSize="small" />,
    //  disabled: true,
    //  active: location.pathname === "/dashboard/devices" ? true : false,
    //},
    {
      label: "Proposta",
      to: "/dashboard/calculator",
      icon: <BrandingWatermark fontSize="small" />,
      disabled: profileLevel === "admin" && useName == "Maya Energy" ? true : false,
      active: location.pathname === "/dashboard/calculator" ? true : false,
    },
  ];

  function handleLogOut() {
    removeUserCookie();
    navigate("/login");
  }

  const renderNavItems = () =>
    navbarPages.map(
      (page) =>
        page.disabled && (
          <NavItem
            key={page.to}
            href={page.to}
            title={page.label}
            icon={page.icon}
            active={page.active}
          />
        )
    );

  const renderStageItems = () => {
    if (location.pathname === "/dashboard") {
      return (
        <>
          <AccountCircle fontSize="small" /> {name}
        </>
      );
    } else if (brand) {
      return (
        <Button
          component={Link}
          startIcon={<Dashboard fontSize="small" />}
          disableRipple
          sx={{
            backgroundColor: {
              xs: "rgba(255,255,255, 0.08)",
              lg: "none",
            },
            borderRadius: 1,
            color: "secondary.main",
            fontWeight: "fontWeightBold",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: "secondary.main",
            },
            "&:hover": {
              backgroundColor: {
                xs: "rgba(255,255,255, 0.08)",
                lg: "neutral.100",
              },
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {brand.charAt(0).toUpperCase() + brand.slice(1)}
          </Box>
        </Button>
      );
    } else {
      return (
        <>
          <House fontSize="small" /> Dashboard
        </>
      );
    }
  };

  return (
    <>
      {/* <DashboardSidebar onClose={toggleSidebar} open={isSidebarOpen}>
        {lgUp ? renderNavItems() : null}
      </DashboardSidebar> */}

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[3],
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              ml: 3,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                m: 1,
                color: theme.palette.text.secondary,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
              variant="subtitle1"
            >
              {renderStageItems()}
            </Typography>

            <Box
              sx={{
                borderLeft: `1px solid ${theme.palette.divider}`,
                display: "flex",
                ml: 3,
              }}
            >
              {renderNavItems()}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "30%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                width: 236,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                color: "black",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              <AccountCircle />
              {`${useName} - ${moment().format("DD/MM/YYYY")}`}
            </Typography>
            <Button
              onClick={() => handleLogOut()}
              variant="outlined"
              startIcon={<ExitToApp />}
            >
              Sair
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
