// IMPORTS
import { Outlet } from "react-router-dom";

// LIBS DE ESTILOS
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// COMPONENTS
import { DashboardNavbar } from "../components/Navbar";

// STYLE
const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
}));

const LayoutDashboard = () => {
  return (
    <>
      <DashboardNavbar />

      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
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
