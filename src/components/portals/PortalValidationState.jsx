import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const PortalValidationState = ({
  setValidationWarningState,
  recentPortals,
}) => {
  const [validated, setValidated] = useState("notValidated");

  const content = (login, validationState, bl_name) => {
    switch (validationState) {
      case "notValidated":
        return (
          <Typography variant="body" fontSize={"12px"}>
            O portal recém adicionado de login {login}, e de brand{" "}
            {bl_name.toLowerCase()},falhou no processo de validação! Por favor
            verifique o login e senha ou o portal informado e tente novamente.
          </Typography>
        );
        break;
      case "validating":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body" fontSize={"12px"}>
              O portal recém adicionado de login {login}, e de brand{" "}
              {bl_name.toLowerCase()}, está em validação. Por favor aguarde, mas
              fique tranquilo você pode fechar este campo e navegar pelo
              software, enviaremos um email quando os dados estiverem prontos.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={20} color="inherit" />
            </Box>
          </Box>
        );
        break;
      case "validated":
        return (
          <Typography variant="body" fontSize={"12px"}>
            O portal recém adicionado de login {login}, e de brand{" "}
            {bl_name.toLowerCase()}, passou no processo de validação, você pode
            fechar esta tela e continuar a navegar pelo software.
          </Typography>
        );
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {recentPortals.map((portal, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mb: 2,
              py: 2,
              px: 1,
              bgcolor: "whitesmoke",
              borderRadius: "10px",
            }}
          >
            {content(
              portal.bl_login,
              portal.bl_check,
              portal.bl_name.toLowerCase()
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            ></Box>
          </Box>
        );
      })}
    </Box>
  );
};
