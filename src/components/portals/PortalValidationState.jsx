import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

export const PortalValidationState = ({ setValidationWarningState }) => {
  const [validated, setValidated] = useState("notValidated");

  const content = () => {
    switch (validated) {
      case "notValidated":
        return `
            Portal recente adicionado, falhou no processo de
            validação! Por favor, verifique o login e senha do portal e tente
            novamente.
            `;
        break;
      case "validating":
        return `
            O portal recente adicionado,
            está em validação. Enviaremos um email quando os dados estiverem prontos, por favor,
            aguarde.
            `;
        break;
      case "validated":
        return `
            Portal recente adicionado, passou no processo de
            validação.
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
          width: "100%",
        }}
      >
        <Typography variant="body">{content()}</Typography>
      </Box>
      <Button
        variant="contained"
        color="success"
        onClick={() => setValidationWarningState(false)}
      >
        Prosseguir
      </Button>
    </Box>
  );
};
