import { WhatsApp } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Help = ({ setTitle, setDescription, setOpen, open }) => {
  useEffect(() => {
    setTitle("Ajuda");
    setDescription("");
  }, []);
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Escreva sua duvida
      </Button>
      <Button
        startIcon={<WhatsApp />}
        variant="outlined"
        color="success"
        onClick={() => {
          window.open(`https://wa.me/+553182341415`, "_blank");
          setOpen(!open);
        }}
      >
        Contato whatsapp
      </Button>
    </Box>
  );
};
