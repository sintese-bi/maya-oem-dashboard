import { Box, Button } from "@mui/material";
import MayaXBlueLogo from "src/assets/img/logo/maya-x-blue.png";

export const MobileTest = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100vw",
        height: "100vh",
        gap: 6,
      }}
    >
      <Box sx={{ width: 242, height: 146 }}>
        <img src={MayaXBlueLogo} style={{ height: "100%", width: "100%" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button variant="contained" sx={{ width: 150 }}>
          Alertas
        </Button>
        <Button variant="outlined" sx={{ width: 150 }}>
          Relatórios
        </Button>
        <Button variant="outlined" sx={{ width: 150 }}>
          Dados
        </Button>
      </Box>
    </Box>
  );
};
