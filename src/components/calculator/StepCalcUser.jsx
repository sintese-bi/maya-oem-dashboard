import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import estadosBrasileiros from "src/services/estados";
import { Autocomplete } from "@mui/material";

import citiesData from "src/services/municipios";
import { CircularProgress } from "@mui/material";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";

import InputMask from "react-input-mask";

// function MaskedTextField(props) {
//   const { mask, placeholder, ...rest } = props;

//   return (
//     <InputMask mask={mask} placeholder={placeholder} {...rest}>
//       {(inputProps) => <TextField {...inputProps} />}
//     </InputMask>
//   );
// }

export default function StepTypeOfEntitie2({ onPreviousStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });
  const [responseData, setResponseData] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const user_check = watch("user_check");
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handlePrevious = () => {
    onPreviousStep();
  };
  const [showSecondButton, setShowSecondButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (input.length === 8) {
        // Verifica se o CEP está completo (8 dígitos)
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${input}/json`
          );
          setUserAddress(response.data);
          if (response.data && response.data.cep) {
            setMessage(`CEP: ${response.data.cep}, DDD: ${response.data.ddd}`);
          } else {
            setMessage("CEP não encontrado");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [input]); // Mantém "input" como dependência

  // const handleButtonClick = () => {
  //   if (input === "") {
  //     alert("Preencha o campo de CEP");
  //     return;
  //   }

  //   // Não é mais necessário realizar a chamada aqui, pois será tratada pelo useEffect
  // };

  //Com esse event consigo impedir a inserção de letras para quantas entradas quiser
  const handleInputChange = (event) => {
    // Remove letras e vírgulas do valor do campo
    event.target.value = event.target.value.replace(/[^0-9.]/g, "");
  };

  //Use state  do CEP
  const [cepInput, setCepInput] = useState("");

  //Construindo o "usestate" do tipo de plano
  const [selectedPlan, setSelectedPlan] = useState("");
  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };
  //Construindo o "usestate" da altura da usina
  const [selectedHeight, setselectedHeight] = useState("");
  const heightCHange = (event) => {
    setselectedHeight(event.target.value);
  };
  //Construindo o "usestate" da quantidade de módulos e potência
  const [modQuant, setmodQuant] = useState("");
  const modChange = (event) => {
    setmodQuant(event.target.value);
  };
  //Inserção
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  // const [errors, setErrors] = useState({});
  const [radiacao, setRadiacao] = useState(null);
  const [valorEstimado, setValorEstimado] = useState(null);
  const [potenciaModulos, setPotenciaModulos] = useState("");
  const [numeroModulos, setNumeroModulos] = useState("");
  const [estimada, setEstimada] = useState(null);
  const [documentoLink, setDocumentoLink] = useState("");
  const [valorDoKwh, setValorDoKwh] = useState("");
  const validationSchema = yup.object().shape({
    nome: yup.string().required("Campo obrigatório"),
    cidade: yup.string().required("Campo obrigatório"),
    estado: yup.string().required("Campo obrigatório"),
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
      setEstado(parsedData.estado || "");
      setValorEstimado(parsedData.valorEstimado || null);
      setPotenciaModulos(parsedData.potenciaModulos || "");
      setNumeroModulos(parsedData.numeroModulos || "");
    }
  }, []);

  const fetchRadiacao = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/irrcoef_2/${encodeURIComponent(
          estado
        )}/${encodeURIComponent(cidade)}`
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
    if (radiacao !== null && potenciaModulos !== "" && valorDoKwh !== "") {
      const eficienciaModulos = 0.8;
      const dias = 30;

      const estimada = radiacao * potenciaModulos * dias * eficienciaModulos;
      const valorEstimadoFormatado = estimada.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      });
      setValorEstimado(valorEstimadoFormatado);
      setEstimada(estimada * valorDoKwh);
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
        valorDoKwh,
        numeroModulos,
        clientGenWMaya: estimada,
        EffValue: estimada * 0.3,
      })
    );
  };

  const enviarDadosParaAPI = async (apiResponse, segPlanGigaValue) => {
    setIsLoading(true);
    try {
      const apiKey = "597c4ce7e2bce349973d60f3a1c440c38975d956";
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      let clientKilo = "NA";
      let clientMega = "NA";
      let clientGiga = "NA";
      let clientPercentage = 30;
      if (segPlanGigaValue === "KILOWATT") {
        clientKilo = apiResponse.month;
      } else if (segPlanGigaValue === "MEGAWATT") {
        clientMega = apiResponse.month;
      } else if (segPlanGigaValue === "GIGAWATT") {
        clientGiga = apiResponse.month;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/pandadoc`,
        {
          clientPot: potenciaModulos,
          clientEstimated: valorEstimado,
          clientFirstName: nome,
          clientCity: cidade,
          clientModNum: numeroModulos,
          clientGenWMaya: estimada.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          }),
          clientGenWOMaya: (estimada - estimada * 0.3).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          }),
          EffValue: (estimada * 0.3).toFixed(0),
          clientData: formattedDate,
          clientKilo: clientKilo.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          }),
          clientMega: clientMega.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          }),
          clientGiga: clientGiga.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          }),
          clientPercentage: clientPercentage,
        },
        {
          headers: {
            Authorization: `API-Key ${apiKey}`,
            accept: "application/json",
            "content-type": "application/json",
          },
        }
      );

      setDocumentoLink(response.data.recipients[0].shared_link);
      // console.log("Dados enviados para a API:", response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Set isLoading back to false after the API call completes
    }
  };

  const handleNext = () => {
    validationSchema
      .validate(
        {
          nome,
          cidade,
          potenciaModulos,
          valorDoKwh,
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
          valorDoKwh,
          numeroModulos,
        });
        armazenarValorEstimado();
        // fetchRadiacao();
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        // setErrors(validationErrors);
      });
  };
  const uniqueCities = [...new Set(citiesData.map((city) => city.ic_city))];
  useEffect(() => {
    setNome("");
    setCidade("");
    setEstado("");
    setPotenciaModulos(""); // Limpa o estado da potência dos módulos
    setNumeroModulos("");
    setValorDoKwh(""); // Limpa o estado do número de módulos
  }, []);
  const handleCityChange = (event, newCidade) => {
    setCidade(newCidade);
  };
  useEffect(() => {
    // Verificar se cidade e estado não estão vazios antes de fazer a requisição
    if (cidade && estado) {
      fetchRadiacao();
    }
  }, [cidade, estado]);
  useEffect(() => {
    calcularValorEstimado();
  }, [radiacao, potenciaModulos, numeroModulos, valorDoKwh]);

  const onSubmit = (data) => {
    const formData = {
      tbl_ref: {
        kwp: [
          parseFloat(data.kwp[0]),
          parseFloat(data.kwp[1]),
          parseFloat(data.kwp[2]),
          parseFloat(data.kwp[3]),
        ],
        "o&m": [
          parseFloat(data.oEm[0] / 100),
          parseFloat(data.oEm[1] / 100),
          parseFloat(data.oEm[2] / 100),
          parseFloat(data.oEm[3] / 100),
        ],
        pricekwp: [
          parseFloat(data.pricekwp[0]),
          parseFloat(data.pricekwp[1]),
          parseFloat(data.pricekwp[2]),
          parseFloat(data.pricekwp[3]),
        ],
        height: [
          parseFloat(data.height[0]),
          parseFloat(data.height[1]),
          parseFloat(data.height[2]),
          parseFloat(data.height[3]),
        ],
        spreadHeight: [
          parseFloat(data.spreadHeight[0] / 100),
          parseFloat(data.spreadHeight[1] / 100),
          parseFloat(data.spreadHeight[2] / 100),
          parseFloat(data.spreadHeight[3] / 100),
        ],
        user_plan: [
          String(data.user_plan[0]),
          String(data.user_plan[1]),
          String(data.user_plan[2]),
        ],
        ass_desc_kilowatt: [
          parseFloat(data.ass_desc_kilowatt[0] / 100),
          parseFloat(data.ass_desc_kilowatt[1] / 100),
          parseFloat(data.ass_desc_kilowatt[2] / 100),
        ],
        seg_plan_giga: [String(data.seg_plan_giga[0])],
        capex_seg_giga: [parseFloat(data.capex_seg_giga[0]) / 100],
      },

      user_pot: parseFloat(data.potenciaModulos),
      user_check: "n",
      user_nModulos: parseFloat(data.numeroModulos),
      user_potModulo: 0,
      user_height: parseFloat(selectedHeight),
      user_gasPrice: parseFloat(data.user_gasPrice),
      user_assina: String(selectedPlan),
      user_valorDoKwh: parseFloat(valorDoKwh),
      user_cons: parseFloat(data.user_cons),
      comis: parseFloat(data.comis / 100),
      user_address: {
        cep: userAddress.cep,
        logradouro: userAddress.logradouro,
        complemento: userAddress.complemento,
        bairro: userAddress.bairro,
        localidade: userAddress.localidade,
        uf: userAddress.uf,
        ibge: userAddress.ibge,
        gia: userAddress.gia,
        ddd: userAddress.ddd,
        siafi: userAddress.siafi,
      },
    };
    console.log(radiacao);
    const json = JSON.stringify(formData);
    console.log(json);
    const segPlanGigaValue = String(selectedPlan);
    axios
      .post("https://calc.mayaoem.com.br/api/v2/cal-mrkp/", formData)
      .then((response) => {
        // Manipule a resposta da API conforme necessário
        console.log(response.data);
        let apiResponse = response.data;
        setResponseData(response.data);
        enviarDadosParaAPI(apiResponse, segPlanGigaValue);
      })
      .catch((error) => {
        // Manipule erros na solicitação
        console.error(error);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundSize: "50% auto",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <Grid item sx={{ marginRight: "10px" }}>
        <img src="Maya.png" alt="Descrição da imagem" />
      </Grid> */}
      <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        style={{ fontSize: "35px", fontWeight: "bold" }} // Ajuste o tamanho da fonte conforme necessário
      >
        Proposta e Calculadora de Orçamento
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ overflowX: "auto" }}
      >
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            align="center"
            color="#1A1A2E"
            fontWeight="bold"
            sx={{ fontSize: "30px", marginBottom: "20px" }}
          >
            {/* Premissas e Memória de Cálculo */}
          </Typography>

          <Grid container justifyContent="center">
            <Grid
              container
              direction="column"
              sx={{ width: "120px", flexShrink: 0 }}
            >
              <Typography
                fontWeight="bold"
                color="#1A1A2E"
                variant="subtitle2"
                align="center"
                sx={{ fontSize: "15px" }}
              >
                KWP
              </Typography>
              <TextField
                {...register("kwp[0]")}
                defaultValue="20"
                onInput={handleInputChange}
              />
              <TextField
                {...register("kwp[1]")}
                defaultValue="50"
                onInput={handleInputChange}
              />
              <TextField
                {...register("kwp[2]")}
                defaultValue="112.5"
                onInput={handleInputChange}
              />
              <TextField
                {...register("kwp[3]")}
                defaultValue="5000"
                onInput={handleInputChange}
              />
            </Grid>

            <Grid
              container
              direction="column"
              sx={{ width: "120px", flexShrink: 0 }}
            >
              <Typography
                fontWeight="bold"
                color="#1A1A2E"
                variant="subtitle2"
                align="center"
                sx={{ fontSize: "15px" }}
              >
                O&M (%)
              </Typography>
              <TextField
                {...register("oEm[0]")}
                defaultValue="2.5"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("oEm[1]")}
                defaultValue="2"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("oEm[2]")}
                defaultValue="2"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("oEm[3]")}
                defaultValue="2"
                required
                onInput={handleInputChange}
              />
            </Grid>

            <Grid
              container
              direction="column"
              sx={{ width: "120px", flexShrink: 0 }}
            >
              <Typography
                fontWeight="bold"
                color="#1A1A2E"
                variant="subtitle2"
                align="center"
                sx={{ fontSize: "15px" }}
              >
                Preço p/ kWp
              </Typography>
              <TextField
                {...register("pricekwp[0]")}
                defaultValue="4600"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("pricekwp[1]")}
                defaultValue="4400"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("pricekwp[2]")}
                defaultValue="4000"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("pricekwp[3]")}
                defaultValue="3500"
                required
                onInput={handleInputChange}
              />
            </Grid>

            <Grid
              container
              direction="column"
              sx={{ width: "120px", flexShrink: 0 }}
            >
              <Typography
                fontWeight="bold"
                color="#1A1A2E"
                variant="subtitle2"
                align="center"
                sx={{ fontSize: "15px" }}
              >
                Altura(m)
              </Typography>
              <TextField
                {...register("height[0]")}
                defaultValue="0"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("height[1]")}
                defaultValue="1"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("height[2]")}
                defaultValue="2"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("height[3]")}
                defaultValue="3"
                required
                onInput={handleInputChange}
              />
            </Grid>

            <Grid
              container
              direction="column"
              sx={{ width: "120px", flexShrink: 0 }}
            >
              <Typography
                fontWeight="bold"
                color="#1A1A2E"
                variant="subtitle2"
                align="center"
                sx={{ fontSize: "15px" }}
              >
                Spread(%)
              </Typography>
              <TextField
                {...register("spreadHeight[0]")}
                defaultValue="0"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("spreadHeight[1]")}
                defaultValue="10"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("spreadHeight[2]")}
                defaultValue="15"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("spreadHeight[3]")}
                defaultValue="0"
                required
                onInput={handleInputChange}
              />
            </Grid>

            <Grid
              container
              direction="column"
              sx={{ width: "120px", flexShrink: 0 }}
            >
              <Typography
                fontWeight="bold"
                color="#1A1A2E"
                variant="subtitle2"
                align="center"
                sx={{ fontSize: "15px" }}
              >
                Assinatura(Plan)
              </Typography>
              <TextField
                {...register("user_plan[0]")}
                defaultValue="KILOWATT"
                required
              />
              <TextField
                {...register("user_plan[1]")}
                defaultValue="MEGAWATT"
                required
              />
              <TextField
                {...register("user_plan[2]")}
                defaultValue="GIGAWATT"
                required
              />
            </Grid>

            <Grid
              container
              direction="column"
              sx={{ width: "130px", flexShrink: 0 }}
            >
              <Typography
                fontWeight="bold"
                color="#1A1A2E"
                variant="subtitle2"
                align="center"
                sx={{ fontSize: "15px" }}
              >
                Desconto(%)
              </Typography>
              <TextField
                {...register("ass_desc_kilowatt[0]")}
                defaultValue="20"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("ass_desc_kilowatt[1]")}
                defaultValue="0"
                required
                onInput={handleInputChange}
              />
              <TextField
                {...register("ass_desc_kilowatt[2]")}
                defaultValue="0"
                required
                onInput={handleInputChange}
              />
            </Grid>

            <Grid
              container
              direction="column"
              sx={{ width: "150px", flexShrink: 0 }}
            >
              <Typography
                fontWeight="bold"
                color="#1A1A2E"
                variant="subtitle2"
                align="center"
                sx={{ fontSize: "15px" }}
              >
                Assinatura(Seguro)
              </Typography>
              <TextField
                {...register("seg_plan_giga[0]")}
                defaultValue="GIGAWATT"
                required
              />
            </Grid>

            <Grid
              container
              direction="column"
              sx={{ width: "130px", flexShrink: 0 }}
            >
              <Typography
                fontWeight="bold"
                color="#1A1A2E"
                variant="subtitle2"
                align="center"
                sx={{ fontSize: "15px" }}
              >
                Seguro/CAPEX(%)
              </Typography>
              <TextField
                {...register("capex_seg_giga[0]")}
                defaultValue="1"
                required
                onInput={handleInputChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "200px" }}
          >
            <TextField
              label="Nome do cliente"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              fullWidth={false}
              margin="normal"
              error={!!errors.nome}
              helperText={errors.nome}
            />
            <Autocomplete
              freeSolo
              options={uniqueCities}
              value={cidade}
              onChange={handleCityChange}
              renderInput={(params) => (
                <TextField {...params} label="Cidade" margin="normal" />
              )}
            />
            <Autocomplete
              freeSolo
              options={estadosBrasileiros}
              value={estado}
              onChange={(event, newEstado) => setEstado(newEstado)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estado"
                  margin="normal"
                />
              )}
            />
            {/* <TextField
              label="Cidade"
              value={cidade}
              onChange={(event) => setCidade(event.target.value)}
              fullWidth={false}
              margin="normal"
              error={!!errors.cidade}
              helperText={errors.cidade}
              required
            />
            <TextField
              label="Estado"
              value={estado}
              onChange={(event) => setEstado(event.target.value)}
              fullWidth={false}
              margin="normal"
              error={!!errors.estado}
              helperText={errors.estado}
              required
            /> */}
            <>
              <TextField
                label="Potência da Usina(em kWp)"
                type="number"
                value={potenciaModulos}
                {...register("potenciaModulos", { pattern: /^[0-9,.]*$/i })}
                onChange={(event) => setPotenciaModulos(event.target.value)}
                fullWidth
                margin="normal"
                error={!!errors.potenciaModulos}
                helperText={errors.potenciaModulos}
              />
            </>
            <TextField
              label="Número de módulos"
              type="number"
              value={numeroModulos}
              {...register("numeroModulos", { pattern: /^[0-9,.]*$/i })}
              onChange={(event) => setNumeroModulos(event.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.numeroModulos}
              helperText={errors.numeroModulos}
            />
          </div>
          <Typography
            fontWeight="bold"
            color="#1A1A2E"
            variant="subtitle2"
            sx={{ fontSize: "20px" }}
          >
            Escolha do Plano
          </Typography>
          <RadioGroup value={selectedPlan} onChange={handlePlanChange}>
            <FormControlLabel
              value="KILOWATT"
              control={<Radio />}
              label="KILOWATT"
            />
            <FormControlLabel
              value="MEGAWATT"
              control={<Radio />}
              label="MEGAWATT"
            />
            <FormControlLabel
              value="GIGAWATT"
              control={<Radio />}
              label="GIGAWATT"
            />
          </RadioGroup>
          {selectedPlan === "" && (
            <Typography variant="subtitle2" color="error">
              Por favor, selecione um plano.
            </Typography>
          )}
          <Typography
            fontWeight="bold"
            color="#1A1A2E"
            variant="subtitle2"
            sx={{ fontSize: "20px" }}
          >
            <strong>CEP da Usina do Cliente</strong>
          </Typography>
          <TextField
            variant="outlined"
            label="Digite seu CEP"
            {...register("cep")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <Typography
            fontWeight="bold"
            color="#1A1A2E"
            variant="subtitle2"
            sx={{ fontSize: "20px" }}
          >
            Altura da Usina
          </Typography>
          <RadioGroup value={selectedHeight} onChange={heightCHange}>
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="4 a 6 metros"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Acima de 6 metros"
            />
            <FormControlLabel value="3" control={<Radio />} label="Solo" />
          </RadioGroup>
          {selectedHeight === "" && (
            <Typography variant="subtitle2" color="error">
              Por favor, selecione uma altura.
            </Typography>
          )}

          <Typography
            sx={{ fontSize: "20px" }}
            fontWeight="bold"
            variant="subtitle2"
          >
            Valor médio da gasolina
          </Typography>
          <TextField
            size="small"
            defaultValue="5.5"
            sx={{ width: "150px" }}
            {...register("user_gasPrice")}
            fullWidth
            label="Preço (R$)"
            type="number"
            required
          />

          <Typography
            fontWeight="bold"
            color="#1A1A2E"
            variant="subtitle2"
            sx={{ fontSize: "20px" }}
          >
            Precificação variável
          </Typography>
          <TextField
            size="small"
            sx={{ width: "150px" }}
            {...register("user_cons")}
            fullWidth
            defaultValue="12"
            label="Consumo Médio Veículo (km/l)"
            type="number"
            required
          />

          <Typography
            sx={{ fontSize: "20px" }}
            fontWeight="bold"
            variant="subtitle2"
          >
            Comissão
          </Typography>
          <TextField
            size="small"
            defaultValue="8"
            sx={{ width: "150px" }}
            {...register("comis")}
            fullWidth
            label="Valor(%)"
            type="number"
            required
          />
          <Typography
            sx={{ fontSize: "20px" }}
            fontWeight="bold"
            variant="subtitle2"
          >
            Valor do kWh
          </Typography>
          <TextField
            sx={{ width: "150px" }}
            size="small"
            label="Valor do kWh(R$)"
            variant="outlined"
            // fullWidth
            {...register("valorDoKwh")}
            onChange={(e) => setValorDoKwh(e.target.value)}
            value={valorDoKwh}
            // defaultValue="0.8"
            error={!!errors.valorDoKwh}
            helperText={errors.valorDoKwh?.message}
          />
        </Grid>

        {/* <Grid item xs={12}>
          <Button
            className="buttonSearch"
            onClick={handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
            color="primary"
          >
            Confirmar
          </Button>
        </Grid> */}
        <Grid item xs={8}>
          {responseData && (
            <div>
              <Typography variant="h3" sx={{ fontSize: 24, color: "#1A1A2E" }}>
                Valores:
              </Typography>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: 22,
                    color: "#1A1A2E",
                    marginRight: 20,
                    backgroundColor: "#F4F6F8", // Cor de fundo
                    padding: 10, // Espaçamento interno
                    borderRadius: 4, // Borda arredondada
                    fontWeight: "bold", // Negrito
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Sombra
                  }}
                >
                  Valor Mensal: R$ {responseData.month.toLocaleString()}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: 22,
                    color: "#1A1A2E",
                    backgroundColor: "#F4F6F8",
                    padding: 10,
                    borderRadius: 4,
                    fontWeight: "bold",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Valor Anual: R$ {responseData.year.toLocaleString()}
                </Typography>
              </div>
            </div>
          )}
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              maxWidth: "300px",
            }}
          >
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={handleNext}
                fullWidth
              >
                Gerar
              </Button>
            </Grid>

            <Grid item xs={12}>
              {isLoading ? ( // Show loading indicator if isLoading is true
                <CircularProgress />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "blue" }}
                >
                  Link do Documento:{" "}
                  <a
                    href={documentoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {documentoLink}
                  </a>
                </Typography>
              )}
            </Grid>
            {/* ... */}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
