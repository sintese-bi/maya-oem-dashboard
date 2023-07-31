// IMPORTS
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {PDFDownloadLink} from '@react-pdf/renderer'
import * as Yup from "yup";

import { AdministratorReport } from "src/reports/AdministratorReport";

import { getUserCookie } from "src/services/session";

// LIBS DE ESTILOS
import { Info, SaveAs, DownloadForOffline, Lock } from "@mui/icons-material";
import {
  Box,
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

export default function AlertPercentageForm() {
  const [freePlan, setFreePlan] = useState(true)
  const dispatch = useDispatch();

  const { useUuid } = getUserCookie();
  const { isLoadingAlertFrequency, percentage, frequencyName, dataDevices } = useSelector(
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
    console.log(percentage, frequencyName)
    if (percentage && frequencyName) {
      if(!freePlan){
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
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "space-between",
        gap: 4,
        my: 5,
        mx: 2,
      }}
    >
      <Typography sx={{ mt: 3, fontWeight: 'bold', fontSize: '20px'}}>
        Definição de frequência dos alertas
      </Typography>
      <Grid container sx={{ display:'flex', alignItems:'center', justifyContent:'center', gap: 2, my: 1, mx: 2}}>
        <List 
          sx={{
            width: "24%",
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
            <TextField
            sx={{ width: 200 }}
            label="Limite Mínimo (%)"
            type="number"
            {...register("percentage")}
            error={!!errors.percentage}
            helperText={errors.percentage?.message}
            variant="standard"
            disabled={freePlan}
            inputProps={{ min: 0, max: 80 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
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
                disabled={isLoadingAlertFrequency}
              >
                <MenuItem value="day" disabled={freePlan} sx={{display: 'flex', justifyContent:'space-between'}}>Dia {freePlan ? (<Lock />) : ''}</MenuItem>
                <MenuItem value="week" disabled={freePlan} sx={{display: 'flex', justifyContent:'space-between'}}>Semanal {freePlan ? (<Lock />) : ''}</MenuItem>
                <MenuItem value="month" sx={{display: 'flex', justifyContent:'space-between'}}>Mês</MenuItem>
              </TextField>
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
    </Box>
  );
}
