import React from "react";
import { Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
//Home page da Calculadora.
function HomePage() {
  return (
    <Box
      style={{
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
        src="./Maya.png"
        alt="Descrição da imagem"
        style={{ maxWidth: "100%" }}
      />
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Calculadora de Orçamento e Gerador de Proposta
      </h1>
      <Box style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "20px" }}>
        <Button
          component={Link}
          to="/dashboard/calculator/admin"
          variant="contained"
          color="primary"
          style={{ fontSize: "18px" }}
        >
          Administrador
        </Button>
        <Button
          component={Link}
          to="/dashboard/calculator/client"
          variant="contained"
          color="primary"
          style={{ fontSize: "18px" }}
        >
          Cliente
        </Button>
      </Box>
    </Box>
  );
}

export { HomePage };
