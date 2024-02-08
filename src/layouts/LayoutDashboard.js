// IMPORTS
import { Outlet, useNavigate } from "react-router-dom";

// LIBS DE ESTILOS
import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";

// COMPONENTS
import { DashboardNavbar } from "../components/navbar/Navbar";
import { Side } from "../components/sidebar/Side";
import { useEffect, useState } from "react";

// STYLE

const LayoutDashboard = () => {
  const [sideState, setSideState] = useState(false);

  return (
    <>
      <DashboardNavbar sideState={sideState} setSideState={setSideState} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "160px",
          alignItems: "center",
        }}
      >
        <Side sideState={sideState} setSideState={setSideState} />
        <Box
          sx={{
            width: "94%",
            marginTop: 10,
            paddingLeft: 2,
            paddingRight: 2,
          }}
          id={"root"}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default LayoutDashboard;
