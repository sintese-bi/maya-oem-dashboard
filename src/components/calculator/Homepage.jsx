import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
//Home page da Calculadora.
function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        paddingTop: "80px",
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
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "20px" }}>
        <Button
          component={Link}
          to="/calculator/admin"
          variant="contained"
          color="primary"
          style={{ fontSize: "18px" }}
        >
          Administrador
        </Button>
        <Button
          component={Link}
          to="/calculator/client"
          variant="contained"
          color="primary"
          style={{ fontSize: "18px" }}
        >
          Cliente
        </Button>
      </div>
    </div>
  );
}

export { HomePage };
