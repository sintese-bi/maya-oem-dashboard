import React, { useState, useEffect } from "react";
import { Button, Grid, TextField, Typography, Container } from "@mui/material";
import * as yup from "yup";
import axios from "axios";

const Form0 = ({ onNextStep }) => {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [errors, setErrors] = useState({});
  const [radiacao, setRadiacao] = useState(null);
  const [valorEstimado, setValorEstimado] = useState(null);

  const validationSchema = yup.object().shape({
    nome: yup.string().required("Campo obrigatório"),
    cidade: yup.string().required("Campo obrigatório"),
  });

  useEffect(() => {
    const storedData = localStorage.getItem("form0Data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setNome(parsedData.nome || ""); // Define um valor padrão vazio se for undefined
      setCidade(parsedData.cidade || ""); // Define um valor padrão vazio se for undefined
    }
  }, []);

  const fetchRadiacao = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/v1/irrcoef/${encodeURIComponent(cidade)}`
      );
      const data = response.data;
      if (data && data.ic_yearly) {
        setRadiacao(data.ic_yearly);
      } else {
        setRadiacao(0); // Define um valor padrão caso a propriedade não exista
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calcularValorEstimado = () => {
    if (radiacao) {
      const potenciaModulos = 5; 
      const numeroModulos = 10; 
      const eficienciaModulos = 0.8; 
      const dias = 30; 

      const estimada =
        radiacao * potenciaModulos * numeroModulos * dias * eficienciaModulos;
      setValorEstimado(estimada);
    }
  };

  const handleNext = () => {
    validationSchema
      .validate(
        {
          nome,
          cidade,
        },
        { abortEarly: false }
      )
      .then(() => {
        console.log("Dados do formulário:", {
          nome,
          cidade,
        });
        localStorage.setItem(
          "form0Data",
          JSON.stringify({ nome, cidade })
        );
        fetchRadiacao(); // Chamada da API após a validação
        onNextStep();
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  useEffect(() => {
    calcularValorEstimado(); // Recalcular o valor estimado sempre que a radiação for atualizada
  }, [radiacao]);

  return (
    <Container maxWidth="sm">
      <Grid item sx={{ marginRight: "10px" }}>
        <img src="Maya.png" alt="Descrição da imagem" />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography fontWeight="bold" variant="h5" align="center">
            Formulário Cadastral
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nome do cliente para a proposta"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.nome}
            helperText={errors.nome}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Cidade"
            value={cidade}
            onChange={(event) => setCidade(event.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.cidade}
            helperText={errors.cidade}
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
        {valorEstimado && (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Valor estimado: R$ {valorEstimado}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Form0;
