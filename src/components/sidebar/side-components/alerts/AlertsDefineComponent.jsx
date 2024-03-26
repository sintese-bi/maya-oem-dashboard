import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { AdministratorReport } from "src/reports/AdministratorReport";
import { ToolTipNoAccess } from "src/components/shared/ToolTipNoAccess";

import { getUserCookie, setUserCookie } from "src/services/session";

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
  Avatar,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { alertFrequency, patchAlertFrequency } from "src/store/actions/users";
import toast from "react-hot-toast";

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
        .min(80, "O valor mínimo é 80")
        .nullable()
        .transform((value, originalValue) =>
          originalValue === "" ? null : value
        ),
    })
    .nullable(),
  frequencyName: Yup.string().required("Campo é obrigatório."),
});

export function AlertsDefineComponent({
  setTitle,
  setDescription,
  welcome,
  setOpen,
  setSecondaryAction,
}) {
  const [freePlan, setFreePlan] = useState(true);
  const dispatch = useDispatch();

  const { useUuid, useName, profileLevel, useTypeMember } = getUserCookie();

  const {
    isLoadingAlertFrequency,
    percentage,
    frequencyName,
    devices,
    //useCodePagarMe
  } = useSelector((state) => state.users);

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
    //dispatch(patchAlertFrequency({ values, useUuid }));
    toast.success("Função temporariamente desativada!");
    setSecondaryAction("DefineAlertEmail");
  }

  useEffect(() => {
    if (percentage && frequencyName) {
      if (useTypeMember) {
        setValue("percentage", percentage);
        setValue("frequencyName", frequencyName);
      } else {
        setValue("percentage", 80);
        setValue("frequencyName", "month");
      }
    }
  }, [percentage, frequencyName]);

  useEffect(() => {
    setTitle("Definição de frequência dos alertas");
    setDescription(`Prezado usuário, definir a frequência e o limite mínimo de produtividade
    das suas plantas. Essa definição controla o envio de alerta das plantas
    para seu email todas as vezes que suas plantas produzirem ${watch(
      "percentage"
    )}%
    abaixo do definido enviaremos um alerta para você.`);
  }, []);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
                    <Info />
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>
              <ToolTipNoAccess useTypeMember={useTypeMember}>
                <TextField
                  sx={{ width: 200 }}
                  label="Limite percentual mínimo (%)"
                  type="number"
                  {...register("percentage")}
                  error={!!errors.percentage}
                  helperText={errors.percentage?.message}
                  variant="standard"
                  disabled={!useTypeMember}
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
                  <ToolTipNoAccess useTypeMember={useTypeMember}>
                    <TextField
                      {...field}
                      sx={{ width: 200 }}
                      label="Frequência de alertas"
                      error={!!errors.frequencyName}
                      helperText={errors.frequencyName?.message}
                      value={
                        watch("frequencyName") !== undefined
                          ? watch("frequencyName")
                          : "month"
                      }
                      select
                      defaultValue="month"
                      variant="standard"
                      disabled={
                        isLoadingAlertFrequency == false &&
                        useTypeMember != false
                          ? false
                          : true
                      }
                    >
                      <MenuItem
                        value="day"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        Dia
                      </MenuItem>
                      <MenuItem
                        value="week"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        Semanal
                      </MenuItem>
                      <MenuItem
                        value="month"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        Mês
                      </MenuItem>
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
