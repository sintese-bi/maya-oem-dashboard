import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export const WhatsAppNumber = ({ value, setValuesWhatsAppNumber }) => {
  const [whatsappNumber, setWhatsappNumber] = useState(value);

  useEffect(() => {
    setWhatsappNumber(value);
  }, [value]);

  return (
    <Box sx={{ width: 180, height: 40 }}>
      <TextField
        type="text"
        value={whatsappNumber}
        label="Telefone WhatsApp"
        sx={{ width: "100%" }}
        onChange={(e) => {
          setWhatsappNumber(e.target.value);
          setValuesWhatsAppNumber(e.target.value);
        }}
      />
    </Box>
  );
};
