import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getUserCookie } from "src/services/session";
import * as Yup from "yup";
import citiesData from "src/services/municipios";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDevices } from "src/store/actions/devices";
import api, { configRequest } from "../services/api";
import Autocomplete from "@mui/material/Autocomplete";
// COMPONETS

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingAccordion } from "./Loading";

// ASSETS
import { Edit, SaveAs } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BoltIcon from "@mui/icons-material/Bolt";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NumbersIcon from "@mui/icons-material/Numbers";

// SCHEMA DE VALIDAÇÃO DE CAMPOS
const validateSchema = Yup.object().shape({
  name: Yup.string().required("Campo é obrigatório."),
  inverterPower: Yup.number().required("Campo é obrigatório."),
});

export const DeviceDetail = (props) => {
  const {
    name,
    address,
    contactNumber,
    kwp,
    loadingDevices,
    devUuid,
    blUuidState,
  } = props;
  const [selectedCity, setSelectedCity] = useState(null);
  const { profileLevel } = getUserCookie() || null;
  const [isSaved, setIsSaved] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validateSchema),
  });
  const [editInputs, setEditInputs] = useState(false);
  async function onSubmit(values) {
    setSelectedCity((prevValue) => (prevValue ? prevValue : values.address));
    setIsSaved(true);

    try {
      const response = await api.get(
        `/irrcoef/${devUuid}/${selectedCity.ic_states}/${selectedCity.ic_city}`,
        {
          params: {
            potSistema: values.inverterPower,
            devUuid: devUuid,
            name: values.name,
          },
        }
      );

      // O valor estimado da geração será retornado na resposta do servidor.
      const gen_estimated1 = response.data;

      // Faça o que for necessário com o valor estimado retornado.
      dispatch(getDevices(blUuidState));
      setEditInputs(!editInputs);
    } catch (error) {
      // Lida com erros, se necessário.
      console.error("Erro ao fazer a requisição:", error);
    }

    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  }
  function InputsDevices() {
    return (
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid container>
            <Grid item xs>
              <List
                sx={{
                  width: "90%",
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <NumbersIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    secondary="Nº de Contrato"
                    primary={name ? name : "Não informado!"}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BusinessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {/* Adicione o componente Autocomplete aqui */}
                  <Autocomplete
                    name="address"
                    options={citiesData}
                    getOptionLabel={(city) =>
                      `${city.ic_city} - ${city.ic_states}`
                    } // Exibir nome do município e estado
                    value={selectedCity}
                    onChange={(event, newValue) => setSelectedCity(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Endereço de Instalação"
                        error={!selectedCity}
                        helperText={
                          selectedCity ? null : "Campo é obrigatório."
                        }
                        variant="outlined"
                        sx={{ width: 300 }}
                      />
                    )}
                  />
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs sx={{ m: 1 }}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <TextField
                    sx={{ width: 200 }}
                    label="Nome"
                    type="text"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    variant="outlined"
                    defaultValue={contactNumber}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BoltIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <TextField
                    sx={{ width: 200 }}
                    label="Potência do Sistema (kWp)"
                    type="number"
                    {...register("inverterPower")}
                    error={!!errors.inverterPower}
                    // helperText={errors.inverterPower?.message}
                    variant="outlined"
                    defaultValue={kwp}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>

        <Box
          component="div"
          sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            startIcon={<SaveAs fontSize="small" />}
            type="submit"
            variant="contained"
            sx={{ color: "primary", variant: "contained" }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    );
  }

  if (loadingDevices) return <LoadingAccordion />;

  return (
    <React.Fragment>
      <Typography sx={{ m: 1 }} variant="h4">
        Informações do usuário
      </Typography>

      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setEditInputs(!editInputs)}
          variant="outlined"
          startIcon={<Edit />}
        >
          Editar
        </Button>
      </Box>

      {!editInputs ? (
        <Grid container>
          <Grid item xs>
            <List
              sx={{
                width: "90%",
                bgcolor: "background.paper",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <NumbersIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  secondary="Nº de Contrato"
                  primary={name ? name : "Não informado!"}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BusinessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  secondary="Endereço de Instalação"
                  primary={address ? address : "Não informado!"}
                />
              </ListItem>
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs sx={{ m: 1 }}>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  secondary="Nome"
                  primary={contactNumber ? contactNumber : "Não informado!"}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BoltIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  secondary="Potência do Sistema (kWp)"
                  primary={kwp ? kwp : "Não informado!"}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      ) : (
        <InputsDevices />
      )}

      {/* Caixa de mensagem "Salvo!" */}
      {isSaved && (
        <Box
          sx={{
            p: 1,
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#4caf50",
            color: "#fff",
            borderRadius: 4,
            boxShadow: 4,
            zIndex: 9999,
          }}
        >
          Salvo!
        </Box>
      )}
    </React.Fragment>
  );
};
export default DeviceDetail;
