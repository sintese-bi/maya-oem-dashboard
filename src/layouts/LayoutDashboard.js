// IMPORTS
import { Outlet } from "react-router-dom";

// LIBS DE ESTILOS
import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";

// COMPONENTS
import { DashboardNavbar } from "../components/Navbar";
import { Side } from "../components/Side";

// STYLE
const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  paddingLeft: '16%' 
}));

const LayoutDashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <Side />
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            justifyContent: 'space-between',
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </DashboardLayoutRoot>
    </>
  );
};
export default LayoutDashboard;
