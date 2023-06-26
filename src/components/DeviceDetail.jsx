import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getUserCookie } from "src/services/session";
import * as Yup from "yup";

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
  Typography
} from "@mui/material";
import { LoadingAccordion } from "./Loading";

// ASSETS
import { Edit, SaveAs } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BoltIcon from '@mui/icons-material/Bolt';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NumbersIcon from '@mui/icons-material/Numbers';


// SCHEMA DE VALIDAÇÃO DE CAMPOS
const validateSchema = Yup.object().shape({
  address: Yup.string().required("Campo é obrigatório."),
  name: Yup.string().required("Campo é obrigatório."),
  inverterPower: Yup.number().required("Campo é obrigatório."),
});

export const DeviceDetail = (props) => {

  const { name, address, contactNumber, kwp, loadingDevices } = props;

  const { profileLevel } = getUserCookie() || null;

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


  const [editInputs, setEditInputs] = useState(false)

  async function onSubmit(values) {
    console.log("values ", values)
  }

  function InputsDevices() {
    return (
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container>

          <Grid container>
            <Grid item xs>
              <List
                sx={{
                  width: '90%',
                  bgcolor: 'background.paper',
                }}
              >
                <ListItem >
                  <ListItemAvatar>
                    <Avatar>
                      <NumbersIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary="Nº de Contrato" primary={name ? name : 'Não informado!'} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem >
                  <ListItemAvatar>
                    <Avatar>
                      <BusinessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <TextField
                    sx={{ width: 200 }}
                    label="Endereço de Instalação"
                    type="text"
                    {...register("address")}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    variant="outlined"
                  />
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs sx={{ m: 1 }}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                <ListItem >
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
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem >
                  <ListItemAvatar>
                    <Avatar>
                      <BoltIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <TextField
                    sx={{ width: 200 }}
                    label="Potência de Inversor (kWp)"
                    type="number"
                    {...register("inverterPower")}
                    error={!!errors.inverterPower}
                    helperText={errors.inverterPower?.message}
                    variant="outlined"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>

        </Grid>

        <Box component="div" sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
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

    )
  }

  if (loadingDevices) return <LoadingAccordion />



  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >

          Informações do usuário
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        {profileLevel === "admin" ?
          <Box component="div" sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
            < Button
              onClick={() => setEditInputs(!editInputs)}
              variant="outlined"
              startIcon={<Edit />}
            >
              Editar
            </Button>
          </Box>
          : null}

        {!editInputs ?
          <Grid container>
            <Grid item xs>
              <List
                sx={{
                  width: '90%',
                  bgcolor: 'background.paper',
                }}
              >
                <ListItem >
                  <ListItemAvatar>
                    <Avatar>
                      <NumbersIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary="Nº de Contrato" primary={name ? name : 'Não informado!'} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem >
                  <ListItemAvatar>
                    <Avatar>
                      <BusinessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary="Endereço de Instalação" primary={address ? address : 'Não informado!'} />
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs sx={{ m: 1 }}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                <ListItem >
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary="Nome" primary={contactNumber ? contactNumber : 'Não informado!'} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem >
                  <ListItemAvatar>
                    <Avatar>
                      <BoltIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary="Potência de Inversor (kWp)" primary={kwp ? kwp : 'Não informado!'} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          :
          <InputsDevices />
        }
      </AccordionDetails>
    </Accordion >
  )
};

