import { Home } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export const MobileTestDados = () => {
  
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        gap: 4,
      }}
    >
      <Box sx={{ width: "100%", mb: 6 }}>
        <Button
          component={Link}
          to={"/mobile-test"}
          variant="outlined"
          startIcon={<Home />}
        >
          Voltar
        </Button>
      </Box>
      
    </Box>
  );
};
