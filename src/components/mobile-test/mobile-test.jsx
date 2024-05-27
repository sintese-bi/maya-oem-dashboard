import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import MayaXBlueLogo from "src/assets/img/logo/maya-x-blue.png";
import { MobileDados } from "./mobile-test-dados/mobile-test-dados";

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
        <Button
          component={Link}
          to={"alerts"}
          variant="contained"
          color="success"
          sx={{ width: 150 }}
        >
          Alertas
        </Button>
        <Button
          component={Link}
          to={"reports"}
          variant="outlined"
          color="success"
          sx={{ width: 150 }}
        >
          Relatórios
        </Button>
        <Button
          component={Link}
          to={"data"}
          variant="outlined"
          color="success"
          sx={{ width: 150 }}
        >
          Dados
        </Button>
      </Box>
    </Box>
  );
};
