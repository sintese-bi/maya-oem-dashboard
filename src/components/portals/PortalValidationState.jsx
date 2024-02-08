import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const PortalValidationState = ({
  setValidationWarningState,
  recentPortals,
}) => {
  const [validated, setValidated] = useState("notValidated");

  useEffect(() => {
    console.log(recentPortals);
  }, [recentPortals]);

  const content = (login, validationState, bl_name) => {
    switch (validationState) {
      case "notValidated":
        return `
            O portal recém adicionado de login ${login}, e de brand "${bl_name.toLowerCase()}",falhou no processo de validação! Por favor verifique o login e senha ou o portal informado e tente novamente.
            `;
        break;
      case "validating":
        return `
            O portal recém adicionado de login ${login}, e de brand "${bl_name.toLowerCase()}", está em validação. Por favor aguarde, mas fique tranquilo você pode fechar este campo e navegar pelo software, enviaremos um email quando os dados estiverem prontos.
            `;
        break;
      case "validated":
        return `
            O portal recém adicionado de login ${login}, e de brand "${bl_name.toLowerCase()}", passou no processo de validação, você pode fechar esta tela e continuar a navegar pelo software.
            `;
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
              mb: 2,
              py: 2,
              px: 1,
              bgcolor: "whitesmoke",
              borderRadius: "10px",
            }}
          >
            <Typography variant="body" fontSize={"12px"}>
              {content(
                portal.bl_login,
                portal.bl_check,
                portal.bl_name.toLowerCase()
              )}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
