// IMPORTS
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { getUserCookie, removeUserCookie } from "src/services/session";

// COMPONENTS
import { AppBar, Box, Button, Toolbar, Typography, Input } from "@mui/material";
// import { DashboardSidebar } from "./Sidebar";
import { NavItem } from "./NavItem";

import Maya from "src/assets/img/logo/maya-watch-logo.png";

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
  Menu,
  Close,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import moment from "moment";

import "./nav.css";
import {
  handleRoutes,
  routes,
} from "src/redirection-actions/redirection-actions";

export const DashboardNavbar = ({ sideState, setSideState }) => {
  const { use_logo } = useSelector((state) => state.users);

  const user_logo = use_logo ? use_logo : Maya;

  // PROPS DE CONTROLLER
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedUser } = useSelector((state) => state.users);
  const { profileLevel, useName } = getUserCookie();

  const name =
    selectedUser.length != 0 ? selectedUser[0]?.useNameState : useName;

  const { brand } = useParams();

  function handleLogOut() {
    removeUserCookie();
    navigate("/login");
  }

  const renderNavItems = () =>
    handleRoutes().map(
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
          <Button component="label" sx={{ width: 110, height: 40 }}>
            <img
              src={user_logo}
              alt=""
              srcset=""
              id="user_logo"
              style={{ width: 110, height: 40 }}
            />
            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files.length != 0) {
                  var reader = new FileReader();
                  reader.addEventListener("loadend", () => {
                    document.getElementById("user_logo").src = reader.result;
                    //localStorage.setItem(
                    //  "user_logo",
                    //  JSON.stringify(reader.result)
                    //);
                  });
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
              sx={{ visibility: "hidden", overflow: "hidden", width: 0 }}
            />
          </Button>

          {/**<AccountCircle fontSize="small" /> {name} */}
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
    <Box sx={{ width: "100%" }}>
      {/* <DashboardSidebar onClose={toggleSidebar} open={isSidebarOpen}>
        {lgUp ? renderNavItems() : null}
      </DashboardSidebar> */}

      <AppBar
        position="relative"
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
                color: theme.palette.text.secondary,
                display: "flex",
                alignItems: "center",
              }}
            >
              {renderStageItems()}
              {sideState ? (
                <Close
                  sx={{
                    ml: 4,
                    mr: 12,
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSideState(!sideState);
                  }}
                />
              ) : (
                <Menu
                  sx={{
                    ml: 4,
                    mr: 12,
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSideState(!sideState);
                  }}
                />
              )}
            </Typography>

            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                display: "flex",
              }}
            >
              <Close />
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
              className="account-info"
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
    </Box>
  );
};
