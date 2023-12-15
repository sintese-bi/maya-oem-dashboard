import { WhatsApp } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ModuleOM = ({ setOpen, open }) => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        component={Link}
        to={"/dashboard/calculator"}
        variant="contained"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Proposta
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
        Entrar em contato
      </Button>
    </Box>
  );
};
