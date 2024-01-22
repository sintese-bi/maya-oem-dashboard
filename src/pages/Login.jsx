// IMPORTS
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { RecoveryPassword } from "src/components/recovery-password/recoveryPassword";

// LIBS DE ESTILOS
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Modal,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// ACTIONS
import { auth } from "../store/actions/users";

// ASSETS
import BackgroundLogin from "../assets/img/illustrations/background-login.svg";
import Logo from "../assets/img/logo/maya-watch-logo.png";

//COOKIES
import { getUserCookie, removeUserCookie } from "src/services/session";
import toast from "react-hot-toast";

// SCHEMA DE VALIDAÇÃO DE CAMPOS
const validateSchema = Yup.object().shape({
  email: Yup.string()
    .email("Informe um email valido.")
    .required("E-mail é obrigatório."),
  password: Yup.string().required("Senha completo é obrigatório."),
});

// COMPONENTE DA PÁGINA
export default function Login() {
  const [open, setOpen] = useState(false);
  const theme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validateSchema),
  });

  async function onSubmit(values) {
    const { email, password } = values;

    try {
      const { profileLevel, status } = await dispatch(
        auth({ use_email: email, use_password: password })
      );

      if (status === 200) {
        if (profileLevel == "admin") {
          navigate("/dashboard");
        } else if (profileLevel == "client") {
          navigate("/dashboard/devices");
        }
      } else {
      }
    } catch (error) {
      // Verificando erros
      if (error.status === 404) {
        toast.error("Credenciais inválidas. Por favor, tente novamente.", {
          duration: 5000,
        });
      } else {
        toast.error("Ocorreu um erro. Por favor, tente novamente mais tarde.", {
          duration: 5000,
        });
      }
    }
  }
  function Copyright(props) {
    return (
      <Typography
        style={{
          width: "100%",
          marginTop: "18rem",
          display: "block",
        }}
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://tagdatascience.com.br/">
          Sintese BI
        </Link>
        {" & "}
        <Link color="inherit" href="https://mayaenergy.com.br/">
          May Energy
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  function handleModalState() {
    setOpen(!open);
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
            backgroundImage: `url(${BackgroundLogin})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 10,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              alt="Maya Energy"
              src={Logo}
              style={{
                maxWidth: "50%",
                marginBottom: "8rem",
                marginTop: "4rem",
              }}
            />
            <FormProvider {...methods}>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <TextField
                  fullWidth
                  margin="normal"
                  label="E-mail"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Senha"
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    height: "56px",
                    backgroundColor: "#33B297",
                    fontSize: "16px",
                    ":hover": { backgroundColor: "#129D95" },
                  }}
                >
                  Entrar
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      sx={{ cursor: "pointer" }}
                      onClick={handleModalState}
                      variant="body2"
                    >
                      Esqueceu a senha?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Não tem uma conta? Contrate agora!"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </FormProvider>
          </Box>
          <Copyright />
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleModalState}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <>
          <RecoveryPassword />
        </>
      </Modal>
    </ThemeProvider>
  );
}
