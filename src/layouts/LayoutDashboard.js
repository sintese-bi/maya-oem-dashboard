// IMPORTS
import { Outlet, useNavigate } from "react-router-dom";

// LIBS DE ESTILOS
import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";

// COMPONENTS
import { DashboardNavbar } from "../components/navbar/Navbar";
import { Side } from "../components/sidebar/Side";
import { useEffect, useState } from "react";
import { MobileNavigation } from "src/components/mobile-navigation/mobileNavigation";

import "./layout.css";

// STYLE

const Layout = ({ sideState, setSideState }) => {
  return (
    <Box
      id="layout"
      sx={{
        height: "100%",
      }}
    >
      <DashboardNavbar sideState={sideState} setSideState={setSideState} />
      <Side sideState={sideState} setSideState={setSideState} />
      <Box id="outlet">
        <Outlet />
      </Box>
    </Box>
  );
};

const LayoutDashboard = () => {
  const [sideState, setSideState] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      <MobileNavigation sideState={sideState} setSideState={setSideState} />
      <Layout sideState={sideState} setSideState={setSideState} />
    </Box>
  );
};
export default LayoutDashboard;
