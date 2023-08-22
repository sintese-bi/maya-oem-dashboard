import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
//Home page da Calculadora.
function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        paddingTop: "80px",
        paddingLeft: "20px",
        paddingRight: "20px"
      }}
    >
      <img
        src="../../assets/img/Maya.png"
        alt="Descrição da imagem"
        sx={{ maxWidth: "100%" }}
      />
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: "20px" }}>
        Calculadora de Orçamento e Gerador de Proposta
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "20px" }}>
        <Button
          component={Link}
          to="/dashboard/calculator/admin"
          variant="contained"
          color="primary"
          sx={{ fontSize: "18px" }}
        >
          Administrador
        </Button>
        <Button
          component={Link}
          to="/dashboard/calculator/client"
          variant="contained"
          color="primary"
          sx={{ fontSize: "18px" }}
        >
          Cliente
        </Button>
      </Box>
    </Box>
  );
}

export { HomePage };
