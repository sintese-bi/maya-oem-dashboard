import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

export const PortalValidationState = ({ setValidationWarningState }) => {
  const [validated, setValidated] = useState("notValidated");

  const content = () => {
    switch (validated) {
      case "notValidated":
        return `
            O portal recém adicionado falhou no processo de validação! Por favor verifique o login e senha ou o portal informado e tente novamente.
            `;
        break;
      case "validating":
        return `
            O portal recém adicionado está em validação. Por favor aguarde, mas fique tranquilo você pode fechar este campo e navegar pelo software, enviaremos um email quando os dados estiverem prontos..
            `;
        break;
      case "validated":
        return `
            O portal recém adicionado passou no processo de validação, você pode fechar esta tela e continuar a navegar pelo software.
            `;
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          mb: 2,
          py: 2,
          px: 1,
          bgcolor: "whitesmoke",
          borderRadius: "10px",
        }}
      >
        <Typography variant="body" fontSize={"12px"}>
          {content()}
        </Typography>
      </Box>
    </Box>
  );
};
