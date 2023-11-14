import { Box, Button, Card, Typography } from "@mui/material";
import {
  getUserCookie,
  removeUserCookie,
  setUserCookie,
} from "src/services/session";
import BackgroundLogin from "src/assets/img/illustrations/background-login.svg";
import { useNavigate } from "react-router-dom";

export const UpdateNote = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${BackgroundLogin})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
      }}
    >
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          p: 4,
          width: "50%",
        }}
      >
        <Typography variant="h2">MAYA ENERGY</Typography>
        <Typography variant="body2" sx={{ width: "90%", mb: 2 }}>
          Caro usuário, estamos em fase de desenvolvimento. Por conta das
          atualizações em nosso fluxo de informações, necessitamos que todos as
          informações de cookies e localStorage sejam resetadas. Por favor,
          pedimos sua compreensão.
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{ width: 150 }}
          onClick={() => {
            setUserCookie({ ...getUserCookie, firstTime: true });
            localStorage.clear();
            navigate("/login");
          }}
        >
          Continuar
        </Button>
      </Card>
    </Box>
  );
};
