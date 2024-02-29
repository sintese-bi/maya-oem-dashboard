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

const MobileLayout = ({ sideState, setSideState }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        bgcolor: "background.paper",
      }}
    >
      <DashboardNavbar sideState={sideState} setSideState={setSideState} />

      <Side sideState={sideState} setSideState={setSideState} />
    </Box>
  );
};

const Layout = ({ sideState, setSideState }) => {
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

const LayoutDashboard = () => {
  const [sideState, setSideState] = useState(false);

  return <Layout sideState={sideState} setSideState={setSideState} />;
};
export default LayoutDashboard;
