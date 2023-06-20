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
  const [potenciaModulos, setPotenciaModulos] = useState("");
  const [numeroModulos, setNumeroModulos] = useState("");

  const validationSchema = yup.object().shape({
    nome: yup.string().required("Campo obrigatório"),
    cidade: yup.string().required("Campo obrigatório"),
    potenciaModulos: yup
      .number()
      .required("Campo obrigatório")
      .positive("O valor deve ser positivo"),
    numeroModulos: yup
      .number()
      .required("Campo obrigatório")
      .positive("O valor deve ser positivo"),
  });

  useEffect(() => {
    const storedData = localStorage.getItem("form0Data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setNome(parsedData.nome || "");
      setCidade(parsedData.cidade || "");
      setValorEstimado(parsedData.valorEstimado || null);
      setPotenciaModulos(parsedData.potenciaModulos || "");
      setNumeroModulos(parsedData.numeroModulos || "");
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
        setRadiacao(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calcularValorEstimado = () => {
    if (radiacao !== null && potenciaModulos !== "" && numeroModulos !== "") {
      const eficienciaModulos = 0.8;
      const dias = 30;

      const estimada =
        radiacao * potenciaModulos * numeroModulos * dias * eficienciaModulos;
      const valorEstimadoFormatado = estimada.toFixed(2);
      setValorEstimado(valorEstimadoFormatado);
    }
  };

  const armazenarValorEstimado = () => {
    localStorage.setItem(
      "form0Data",
      JSON.stringify({
        nome,
        cidade,
        valorEstimado,
        potenciaModulos,
        numeroModulos,
      })
    );
  };

  const enviarDadosParaAPI = async () => {
    try {
      const response = await axios.post("http://localhost:8080/v1/pandadoc", {
        clientPot: potenciaModulos,
        clientEstimated: valorEstimado,
        clientFirstName: nome,
        clientCity: cidade,
        clientModNum: numeroModulos,
      });
      console.log("Dados enviados para a API:", response.data);
      // Realize qualquer ação adicional após o envio dos dados para a API
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    validationSchema
      .validate(
        {
          nome,
          cidade,
          potenciaModulos,
          numeroModulos,
        },
        { abortEarly: false }
      )
      .then(() => {
        console.log("Dados do formulário:", {
          nome,
          cidade,
          valorEstimado,
          potenciaModulos,
          numeroModulos,
        });
        armazenarValorEstimado();
        fetchRadiacao(); // Buscar radiação apenas quando o botão "Próximo" for clicado
        enviarDadosParaAPI(); // Enviar dados para a API
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
    calcularValorEstimado();
  }, [radiacao, potenciaModulos, numeroModulos]);

  useEffect(() => {
    fetchRadiacao();
  }, [cidade]); // Atualizar a radiação quando a cidade for alterada

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={2}>
      <img src="Maya.png" alt="Descrição da imagem" />
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
          <TextField
            label="Potência dos módulos(KWP)"
            type="number"
            value={potenciaModulos}
            onChange={(event) => setPotenciaModulos(event.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.potenciaModulos}
            helperText={errors.potenciaModulos}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Número de módulos"
            type="number"
            value={numeroModulos}
            onChange={(event) => setNumeroModulos(event.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.numeroModulos}
            helperText={errors.numeroModulos}
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
        //teste
      </Grid>
    </Container>
  );
};

export default Form0;
