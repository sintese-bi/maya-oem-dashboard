import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
} from "@mui/material";

export default function Form0({ onNextStep }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cidadeEstado, setCidadeEstado] = useState("");

  const handleNext = () => {
   
    console.log("Dados do formulário:", {
      nome,
      telefone,
      email,
      cidadeEstado,
    });

    // Chamando a função onNextStep para avançar para o próximo passo
    onNextStep();
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Formulário de Cadastro
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Telefone"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Cidade/Estado"
            value={cidadeEstado}
            onChange={(event) => setCidadeEstado(event.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            fullWidth
          >
            Próximo
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
