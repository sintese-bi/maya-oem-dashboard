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

export default function Form1({ onNextStep, onPreviousStep }) {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [additionalInputs, setAdditionalInputs] = useState([]);

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
    if (event.target.value === "MEGAWATT") {
      setAdditionalInputs([
        { label: "Nome Completo", key: "fullName" },
        { label: "CPF", key: "cpf" },
        { label: "RG", key: "rg" },
        { label: "Endereço da Instalação", key: "installationAddress" },
        { label: "CEP do Endereço Residencial", key: "residentialAddressZipCode" },
      ]);
    } else if (event.target.value === "GIGAWATT") {
      setAdditionalInputs([
        { label: "Razão Social", key: "companyName" },
        { label: "CNPJ", key: "cnpj" },
        { label: "Nome Completo do Responsável Legal", key: "legalResponsibleFullName" },
        { label: "CPF do Responsável Legal", key: "legalResponsibleCpf" },
        { label: "RG do Responsável Legal", key: "legalResponsibleRg" },
        { label: "Endereço da Instalação", key: "installationAddress" },
        { label: "CEP do Endereço Residencial", key: "residentialAddressZipCode" },
      ]);
    }
  };

  const handlePrevious = () => {
    onPreviousStep();
  };

  const handleNext = () => {
    if (selectedPlan === "") {
      return;
    }
    onNextStep();
  };

  const renderAdditionalInputs = () => {
    return additionalInputs.map((input) => (
      <Grid item xs={12} key={input.key}>
        <TextField label={input.label} fullWidth />
      </Grid>
    ));
  };

  return (
    <Container maxWidth="sm">
      <Grid item sx={{ marginRight: "10px" }}>
        <img src="Maya.png" alt="Descrição da imagem" />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            fontWeight="bold"
            color="#1A1A2E"
            variant="subtitle2"
            sx={{ fontSize: "20px", textAlign: "center" }}
          >
            Tipo de Contrato
          </Typography>
          <RadioGroup value={selectedPlan} onChange={handlePlanChange}>
            <FormControlLabel
              value="MEGAWATT"
              control={<Radio />}
              label="Contrato para Pessoa Física"
            />
            <FormControlLabel
              value="GIGAWATT"
              control={<Radio />}
              label="Contrato para Pessoa Jurídica"
            />
          </RadioGroup>
          {selectedPlan === "" && (
            <Typography variant="subtitle2" color="error">
              Por favor, selecione uma opção.
            </Typography>
          )}
        </Grid>
        {renderAdditionalInputs()}
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
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevious}
            fullWidth
          >
            Anterior
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
