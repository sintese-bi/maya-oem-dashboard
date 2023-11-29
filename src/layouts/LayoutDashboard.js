// IMPORTS
import { Outlet, useNavigate } from "react-router-dom";

// LIBS DE ESTILOS
import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";

// COMPONENTS
import { DashboardNavbar } from "../components/navbar-components/Navbar";
import { Side } from "../components/sidebar-components/Side";
import { useEffect, useState } from "react";

// STYLE

const LayoutDashboard = () => {
  const [sideState, setSideState] = useState(false);

  return (
    <>
      <DashboardNavbar sideState={sideState} setSideState={setSideState} />
      <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
        <Side sideState={sideState} setSideState={setSideState} />
        <Box sx={{ width: "84%", marginTop: 10 }} id={"root"}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default LayoutDashboard;
