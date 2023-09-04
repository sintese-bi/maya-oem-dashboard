// IMPORTS
import { yupResolver } from "@hookform/resolvers/yup";
import { ChartsDashboard } from '../components/Charts';
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {PDFDownloadLink} from '@react-pdf/renderer';
import * as Yup from "yup";

import { AdministratorReport } from "src/reports/AdministratorReport";
import { ToolTipNoAccess } from 'src/components/ToolTipNoAccess'

import { getUserCookie } from "src/services/session";

// LIBS DE ESTILOS
import { Info, SaveAs, DownloadForOffline, Lock } from "@mui/icons-material";
import {
  Box,
  Card,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { alertFrequency, patchAlertFrequency } from "src/store/actions/users";

// SCHEMA DE VALIDAÇÃO DE CAMPOS
const validateSchema = Yup.object().shape({
  percentage: Yup.number()
    .when("frequencyName", {
      is: "day",
      then: Yup.number()
        .typeError("Insira um número")
        .min(0, "O valor mínimo é 0")
        .max(20, "O valor máximo é 20")
        .nullable()
        .transform((value, originalValue) =>
          originalValue === "" ? null : value
        ),
      otherwise: Yup.number()
        .min(20, "O valor mínimo é 20")
        .max(80, "O valor máximo é 80")
        .nullable()
        .transform((value, originalValue) =>
          originalValue === "" ? null : value
        ),
    })
    .nullable(),
  frequencyName: Yup.string().required("Campo é obrigatório."),
});

export default function AlertPercentageForm({ welcome }) {
  const [freePlan, setFreePlan] = useState(true)
  const dispatch = useDispatch();

  const { useUuid, useName } = getUserCookie();
  const useCodePagarMe = (useName == "Maya Energy" || useName == "darcio") ? true : false

  const { 
    isLoadingAlertFrequency, 
    percentage, 
    frequencyName, 
    dataDevices, 
    //useCodePagarMe 
  } = useSelector(
    (state) => state.users
  );

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

  async function onSubmit(values) {
    dispatch(patchAlertFrequency({ values, useUuid }));
  }

  useEffect(() => {
    dispatch(alertFrequency(useUuid));
  }, [useUuid]);

  useEffect(() => {
    if (percentage && frequencyName) {
      if(useCodePagarMe){
        setValue("percentage", percentage);
        setValue("frequencyName", frequencyName);
      } else {
        setValue("percentage", 80);
        setValue("frequencyName", 'month')
      }
    }
  }, [percentage, frequencyName]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card sx={{
        display:'flex', 
        flexDirection: 'column', 
        bgcolor: 'background.paper',
      }} >
        {
          welcome ? <Typography variant="h2" sx={{py: 2}}>Bem vindo</Typography> : null
        }
        <Box sx={{display: 'flex', flexDirection: 'column', pb: 6}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between', py: 2}}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px'}}>
              Definição de frequência dos alertas
            </Typography>
            <Tooltip
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
              title="O Software envia automaticamente alertas de produção para seu email. Selecione aqui a frequência de alertas."
            >
              <Info />
            </Tooltip>
          </Box>
            <Typography sx={{width: 460, fontSize: '14px'}}>
              {
                `Prezado usuário, definir a frequência e o limite mínimo de produtividade
                das suas plantas. Essa definição controla o envio de alerta das plantas
                para seu email todas as vezes que suas plantas produzirem ${watch("percentage")}%
                abaixo do definido enviaremos um alerta para você.`
              }
            </Typography>
        </Box>
        <Grid container sx={{ display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <List 
            sx={{
              width: "72%",
              bgcolor: "background.paper",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Tooltip
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
                title={`Percentual mínimo de geração da usina. Caso sua usina produza menos que (${watch(
                  "percentage"
                )} %) na semana, enviaremos um alerta para avisar sobre a saúde do seu sistema fotovoltaico.`}
                >
                  <Avatar>
                    <Info  />
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>
              <ToolTipNoAccess
                useCodePagarMe={useCodePagarMe}
              >
                <TextField
                  sx={{ width: 200 }}
                  label="Limite percentual mínimo (%)"
                  type="number"
                  {...register("percentage")}
                  error={!!errors.percentage}
                  helperText={errors.percentage?.message}
                  variant="standard"
                  disabled={!useCodePagarMe}
                  inputProps={{ min: 0, max: 80 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </ToolTipNoAccess>         
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Tooltip
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
                title="Define a frequência de alertas diário, semanal ou mensal."
                >
                  <Avatar>
                    <Info />
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>
              <Controller
                sx={{ width: 200 }}
                control={control}
                name="frequencyName"
                render={({ field }) => (
                  <ToolTipNoAccess
                    useCodePagarMe={useCodePagarMe}
                  >
                    <TextField
                      {...field}
                      sx={{ width: 200 }}
                      label="Frequência de alertas"
                      error={!!errors.frequencyName}
                      helperText={errors.frequencyName?.message}
                      value={watch("frequencyName") || ""}
                      select
                      defaultValue="month"
                      variant="standard"
                      disabled={isLoadingAlertFrequency == false && useCodePagarMe != false ? false : true }
                    >
                      <MenuItem value="day"  sx={{display: 'flex', justifyContent:'space-between'}}>Dia</MenuItem>
                      <MenuItem value="week"  sx={{display: 'flex', justifyContent:'space-between'}}>Semanal</MenuItem>
                      <MenuItem value="month" sx={{display: 'flex', justifyContent:'space-between'}}>Mês</MenuItem>
                    </TextField>
                  </ToolTipNoAccess>
                  
                )}
              />
            </ListItem>
          </List>
          {!isLoadingAlertFrequency ? (
            <Button
              startIcon={<SaveAs fontSize="small" />}
              type="submit"
              variant="contained"
              sx={{ color: "primary", variant: "contained" }}
            >
              Salvar
            </Button>
            ) : (
            <CircularProgress color="success" />
          )}
        </Grid>
      </Card>
    </Box>
  );
}
