import React, { useState, useEffect } from "react";

import axios from "axios";

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

function MaskedTextField(props) {
  const { mask, placeholder, ...rest } = props;

  return (
    <InputMask mask={mask} placeholder={placeholder} {...rest}>
      {(inputProps) => <TextField {...inputProps} />}
    </InputMask>
  );
}

export default function StepTypeOfEntitie({ onPreviousStep }) {
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
  const handlePrevious = () => {
    onPreviousStep();
  };
  useEffect(() => {
    const fetchData = async () => {
      if (input === "") {
        return;
      }

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
    };

    fetchData();
  }, [input]);

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

  const handleCepInputChange = (event) => {
    setCepInput(event.target.value);
  };
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

      user_pot: parseFloat(data.user_pot),
      user_check: data.user_check,
      user_nModulos: parseFloat(data.user_nModulos),
      user_potModulo: parseFloat(data.user_potModulo),
      user_height: parseFloat(selectedHeight),
      user_gasPrice: parseFloat(data.user_gasPrice),
      user_assina: String(selectedPlan),
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

    const json = JSON.stringify(formData);
    console.log(json);

    axios
      .post("https://calc.mayaoem.com.br/api/v2/cal-mrkp/", formData)
      .then((response) => {
        // Manipule a resposta da API conforme necessário
        console.log(response.data);
        setResponseData(response.data);
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
      <Grid item sx={{ marginRight: "10px" }}>
        <img src="Maya.png" alt="Descrição da imagem" />
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ overflowX: "auto", display: "none" }}
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
        </Grid>

        <Grid item xs={6}>
          <Typography
            fontWeight="bold"
            color="#1A1A2E"
            variant="subtitle2"
            sx={{ fontSize: "20px" }}
          >
            O cliente sabe a quantidade de módulos e a respectiva potência
            desses módulos?
          </Typography>
          <RadioGroup
            value={modQuant}
            onChange={modChange}
            sx={{ flexDirection: "row" }}
          >
            <FormControlLabel
              value="y"
              control={
                <Radio {...register("user_check", { required: true })} />
              }
              label="Sim"
            />
            <FormControlLabel
              value="n"
              control={<Radio {...register("user_check")} />}
              label="Não"
            />
          </RadioGroup>
          {modQuant === "" && (
            <Typography variant="subtitle2" color="error">
              Por favor, selecione "Sim" ou "Não".
            </Typography>
          )}
          <>
            <TextField
              defaultValue="0"
              size="small"
              sx={{ width: "170px", marginBottom: "10px" }}
              {...register("user_nModulos", { pattern: /^[0-9,.]*$/i })}
              fullWidth
              label="Número de Módulos"
              required
              disabled={watch("user_check") === "n"}
            />
            <TextField
              defaultValue="0"
              size="small"
              sx={{ width: "170px", marginBottom: "10px" }}
              {...register("user_potModulo", { pattern: /^[0-9,.]*$/i })}
              fullWidth
              label="Potência dos módulos (em kWp)"
              required
              disabled={watch("user_check") === "n"}
            />
          </>

          <>
            <TextField
              defaultValue="0"
              size="small"
              sx={{ width: "170px" }}
              {...register("user_pot", { pattern: /^[0-9,.]*$/i })}
              fullWidth
              label="Potência da Usina (em kWp)"
              required
              disabled={watch("user_check") === "y"}
            />
          </>
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
        </Grid>
        <div
          style={{ display: "flex", flexWrap: "nowrap", visibility: "hidden" }}
        >
          <Grid item xs={6}>
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
              sx={{ width: "50%" }}
              {...register("user_gasPrice")}
              fullWidth
              label="Preço (R$)"
              type="number"
              required
            />
          </Grid>
        </div>
        <Grid item xs={6}>
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

        <div
          style={{ display: "flex", flexWrap: "nowrap", visibility: "hidden" }}
        >
          <Grid item xs={6}>
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
              // inputProps={{
              //   step: "0.01",
              //   inputMode: "numeric",
              // }}
              required
            />
          </Grid>
        </div>
        <div
          style={{ display: "flex", flexWrap: "nowrap", visibility: "hidden" }}
        >
          <Grid item xs={6} justifyContent="flex-end">
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
              sx={{ width: "120px" }}
              {...register("comis")}
              fullWidth
              label="Valor(%)"
              type="number"
              required
            />
          </Grid>
        </div>
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
            <Button
              className="buttonSearch"
              onClick={handleSubmit(onSubmit)}
              type="submit"
              variant="contained"
              color="primary"
              style={{ flexGrow: 1 }}
            >
              Confirmar
            </Button>
            <Button
              className="buttonSearch"
              onClick={() => {
                handlePrevious();
              }}
              variant="contained"
              color="primary"
              style={{ flexGrow: 1 }}
            >
              Voltar
            </Button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
