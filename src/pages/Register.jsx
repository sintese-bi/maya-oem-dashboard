// IMPORTS ----------------------------------------
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// LIBS DE ESTILOS ----------------------------------------
import {
  Button,
  CssBaseline,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Divider,
  CircularProgress,
  MobileStepper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";

// COMPONENTS
import { FormField } from "src/components/form/FormField";

// ACTIONS ----------------------------------------
import { checkBrnad, show } from "../store/actions/users";

// ASSETS ----------------------------------------
import BackgroundRegister from "../assets/img/illustrations/register.svg";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// HELP's, UTILS & VARIAVEIS ---------------------
import { listBrand } from "src/utils/list-brand";

export default function Register() {
  const theme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { useEmail, useName, loadingShow, loadingRegister, register } =
    useSelector((state) => state.users);

  const useUuid = "a7ed2d10-4340-43df-824d-63ca16979114";
  const [brand, setBrand] = useState([]);

  // LISTAGEM DAS BRAND PARA O MULTI SELECT
  const brands = listBrand.map((item) => {
    return { params: item.params, title: item.title, url: item.url };
  });

  const [requestForm, setRequestForm] = useState({
    use_password: "",
    confirmPassword: "",
    use_wifi: false,
    use_inverter_numbers: null,
    brand_login: [],
    cnh_rg: "",
    proof: "",
  });

  // ESTADOS DE VALIDAÇÃO DO FORMULARIO
  const [validatePassword, setValidatePassword] = useState("");
  const [validateConfirmPassword, setValidateConfirmPassword] = useState("");
  const [validateInverterNumbers, setValidateInverterNumbers] = useState("");
  const [validateBrand, setValidateBrand] = useState("");
  const [validateBrandLogin, setValidateBrandLogin] = useState([]);
  const [validateBrandPassword, setValidateBrandPassword] = useState([]);

  // SUBEMETER DADOS PARA A ACTION
  const handleSubmit = async (event) => {
    event.preventDefault();

    // LIBERANDO ACESSO PARA SUBMETER OS DADOS
    if (
      !validatePassword &&
      !validateConfirmPassword &&
      !validateInverterNumbers &&
      validateBrandLogin.length === 0 &&
      validateBrandPassword.length === 0
    ) {
      dispatch(checkBrnad({ ...requestForm, use_uuid: useUuid })); // ACTION DE CHECK LOGIN DAS BRAND
    }
  };

  // VALIDAÇÃO FORMULARIO
  const handleValidate = () => {
    //  VALIDAÇÃO DO CAMPO DE SENHA -------------------------
    if (!requestForm.use_password) {
      setValidatePassword("⚠ O campos de SENHA é obrigatório!");
    } else if (
      requestForm.use_password.length < 4 ||
      requestForm.use_password.length > 8
    ) {
      setValidatePassword("⚠ O campos de SENHA deve ser entre 4 a 8 digitos!");
    } else {
      setValidatePassword("");
    }
    // VALIDAÇÃO DO CAMPO DE CONFIRMAÇÃO DE SENHA ------------
    if (!requestForm.confirmPassword) {
      setValidateConfirmPassword(
        "⚠ O campos de CONFRIMAÇÃO DE SENHA é obrigatório!"
      );
    } else if (requestForm.use_password !== requestForm.confirmPassword) {
      setValidateConfirmPassword(
        "⚠ A senha e a confirmação precisam ser iguais!"
      );
    } else {
      setValidateConfirmPassword("");
    }
    // VALIDAÇÃO DO MUTI SELECT ------------------------------
    if (requestForm.brand_login.length === 0) {
      setValidateBrand("⚠ O campos de MARCA DO INVERSOR é obrigatório!");
    } else {
      setValidateInverterNumbers("");
    }

    // NÃO É UM CAMPO OBRIGATORIO
    // // VALIDAÇÃO DO CAMPO DE Nº DE MODULOS -------------------
    // if (!requestForm.use_inverter_numbers) {
    //   setValidateInverterNumbers(
    //     "⚠ O campos de NÚMERO DE MODULOS é obrigatório!"
    //   );
    // } else {
    //   setValidateInverterNumbers("");
    // }
    // // VALIDAÇÃO DO CAMPO DE WIFI RADIO BTN ------------------
    // if (!requestForm.use_wifi) {
    //   setValidateWifi("⚠ O campos de WIFI é obrigatório!");
    // } else {
    //   setValidateWifi("");
    // }

    // VALIDAÇÃO DOS CAMPOS DE LOGIN & SENHA ---------------------
    requestForm.brand_login.forEach((bl, blIndex) => {
      if (!bl.bl_login) {
        validateBrandLogin[blIndex] = "⚠ O campos de LOGIN é obrigatório!";
        setValidateBrandLogin(validateBrandLogin);
      } else {
        setValidateBrandLogin([]);
      }
      if (!bl.bl_password) {
        validateBrandPassword[blIndex] = "⚠ O campos de SENHA é obrigatório!";
        setValidateBrandPassword(validateBrandPassword);
      } else {
        setValidateBrandPassword([]);
      }
    });
  };

  // SETAR VALORES DO OBJETO brand_login
  const handleSetBrandLogin = (e, index) => {
    const { name } = e.target;
    const { value } = e.target;

    requestForm.brand_login[index][name] = value;
    setRequestForm(requestForm);
  };

  // SETAR VALORES DOs INPUTS
  const handleSetForm = (e) => {
    const { name, value } = e.target;

    requestForm[name] = value;
    setRequestForm(requestForm);
  };

  const handleDocument = (evt) => {
    const { name, files } = evt.target;

    requestForm[name] = files[0];
    setRequestForm(requestForm);
  };

  // CONTROLE DO SELECT
  const handleSelect = (item, evt) => {
    setBrand(item);

    if (evt.action === "insert") {
      requestForm.brand_login[item.length - 1] = {
        bl_name: evt.dataItem.params,
        bl_login: "",
        bl_password: "",
        bl_url: evt.dataItem.url,
        use_uuid: useUuid,
      };
    } else {
      const position = requestForm.brand_login.findIndex(
        (bl) => bl.bl_name === evt.dataItem.params
      );
      delete requestForm.brand_login[position];
      delete validateBrandLogin[position];
      delete validateBrandPassword[position];
    }

    setValidateBrandLogin(validateBrandLogin);
    setValidateBrandPassword(validateBrandPassword);

    setRequestForm(requestForm);

    setActiveStep(0); // VOLTANDO PARA O PRIMEIRO SLIDE
  };

  // ----------------------------------------
  // useEffect's

  useEffect(() => {
    if (register) navigate("/");
  }, [register, navigate]);

  useEffect(() => {
    if (useUuid) dispatch(show(useUuid)); // BUSCAR email e nome do USUARIO
  }, [useUuid, dispatch]);

  // ----------------------------------------
  // CONTROLE DO SETP DOS INPUTS DE LOPGIN DAS BRANDS
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = brand.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  // HTML
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://tagdatascience.com.br/">
          Sintese BI
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BackgroundRegister})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
          {/* CARREGANDO REQUISIÇÃO DE REGISTRO */}
          {loadingRegister && (
            <div
              style={{
                position: "absolute",
                height: "100vh",
                width: "100vh",
                background: "rgb(206, 206, 206, 0.5)",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  top: "50%",
                  left: "45%",
                  zIndex: 5,
                }}
              >
                <CircularProgress color="inherit" />
              </Box>
            </div>
          )}

          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            style={{ maxHeight: "100vh", overflow: "auto" }}
          >
            
            <Typography component="h1" variant="h5">
              Finalizando o registro de acesso <p><center>ao Dashboard</center></p>
            </Typography>
            {/* CARREGANDO REQUISIÇÃO DE SHOW */}
            {loadingShow ? (
              <Grid item xs={12}>
                <CircularProgress color="success" />
              </Grid>
            ) : (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3, p: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Divider variant="middle">
                      <Typography component="p" variant="p">
                        Dados Pessoais
                      </Typography>
                    </Divider>
                  </Grid>
                  <FormField
                    name="name"
                    label="Nome completo"
                    fieldProps={{ defaultValue: useName, disabled: true }}
                  />
                  <FormField
                    name="email"
                    label="E-mail"
                    fieldProps={{
                      defaultValue: useEmail,
                      type: "email",
                      disabled: true,
                    }}
                  />

                  <FormField
                    name="use_password"
                    helpText="Crie sua senha de acesso ao Dashboard"
                    label="Senha"
                    error={validatePassword}
                    fieldProps={{
                      required: true,
                      type: "password",
                      onChange: (evt) => {
                        handleSetForm(evt);
                        setValidatePassword("");
                      },
                    }}
                  />
                  <FormField
                    name="confirmPassword"
                    label="Confirmação de senha"
                    error={validateConfirmPassword}
                    fieldProps={{
                      required: true,
                      type: "password",
                      onChange: (evt) => {
                        handleSetForm(evt);
                        setValidateConfirmPassword("");
                      },
                    }}
                  />

                  <FormField
                    name="cnh_rg"
                    label="CNH / RG"
                    helpText="Envie uma foto de sua CNH ou Carteira de Identidade para a validação do registro."
                    fieldProps={{
                      type: "file",
                      multiple: true,
                      required: true,
                      onChange: handleDocument,
                    }}
                  />
                  <FormField
                    name="proof"
                    helpText="Envie um comprovante de endereço atualizado para a validação do registro."
                    label="Comprovante Endereço"
                    fieldProps={{
                      type: "file",
                      multiple: true,
                      required: true,
                      onChange: handleDocument,
                    }}
                  />

                  <Grid item xs={12}>
                    <Divider variant="middle">
                      <Typography component="p" variant="p">
                        Informações Técnicas
                      </Typography>
                    </Divider>
                  </Grid>

                  <FormField
                    name="proof"
                    helpText="Insira no local abaixo as marcas de inversores que você possui."
                    label="Selecione a(s) marca(s) do(s) inversor(es)"
                    error={validateBrand}
                    fieldProps={{
                      type: "select",
                      dataKey: "params",
                      textField: "title",
                      labelid: "brand",
                      data: brands,
                      name: "brand",
                      onChange: (item, evt) => {
                        handleSelect(item, evt);
                        setValidateBrand("");
                      },
                    }}
                    fullWidth
                  />

                 
                  {brand.length !== 0 && (
                    <Box sx={{ p: 3 }}>
                      <Grid item xs={12}>
                        <Divider variant="middle">
                          <Typography component="p" variant="p">
                            Informe o login e senha das marcas
                          </Typography>
                        </Divider>
                      </Grid>

                      <SwipeableViews
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                      >
                        {brand.map((item, index) => (
                          <Grid container spacing={2} key={index}>
                            <Grid item xs={12} sx={{ mt: 3 }}>
                              <Typography component="b" variant="b">
                                {item.title}
                              </Typography>
                            </Grid>

                            <FormField
                              name={"bl_login"}
                              label="Login"
                              error={validateBrandLogin[index]}
                              fieldProps={{
                                onChange: (evt) => {
                                  handleSetBrandLogin(evt, index);
                                  setValidateBrandLogin([]);
                                },
                              }}
                            />
                            <FormField
                              name={"bl_password"}
                              label="Senha"
                              error={validateBrandPassword[index]}
                              fieldProps={{
                                type: "password",
                                onChange: (evt) => {
                                  handleSetBrandLogin(evt, index);
                                  setValidateBrandPassword([]);
                                },
                              }}
                            />
                          </Grid>
                        ))}
                      </SwipeableViews>

                      <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                          <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                          >
                            Próximo
                            <KeyboardArrowRight />
                          </Button>
                        }
                        backButton={
                          <Button
                            size="small"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                          >
                            <KeyboardArrowLeft />
                            Voltar
                          </Button>
                        }
                      />
                    </Box>
                  )}
                </Grid>

                <Box sx={{ m: 1, position: "relative" }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1 }}
                    disabled={loadingRegister}
                    onClick={handleValidate}
                  >
                    Confirmar
                  </Button>
                </Box>
              </Box>
            )}

            <Copyright />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
