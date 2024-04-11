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
import { useContext, useEffect, useState } from "react";
import { alertFrequency, patchAlertFrequency } from "src/store/actions/users";
import toast from "react-hot-toast";
import { width } from "@mui/system";
import { DashboardContext } from "src/contexts/dashboard-context";

const validateSchema = Yup.object().shape({
  percentage: Yup.number()
    .when("frequencyName", {
      is: "1",
      then: Yup.number()
        .typeError("Insira um número")
        .min(20, "O valor mínimo é 20")
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
  const { handlePatchAlertFrequency } = useContext(DashboardContext);

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
    const { percentage, frequencyName } = values;
    handlePatchAlertFrequency({
      use_percentage: percentage,
      use_date: frequencyName,
    });

    setSecondaryAction("DefineAlertEmail");
  }

  useEffect(() => {
    if (percentage && frequencyName) {
      if (useTypeMember) {
        setValue("percentage", percentage);
        setValue("frequencyName", frequencyName);
      } else {
        setValue("percentage", 80);
        setValue("frequencyName", "3");
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
      <Box
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
              width: "100%",
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
                  sx={{ width: "100%" }}
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
                control={control}
                name="frequencyName"
                render={({ field }) => (
                  <ToolTipNoAccess useTypeMember={useTypeMember}>
                    <TextField
                      sx={{ width: "100%" }}
                      {...field}
                      label="Frequência de alertas"
                      error={!!errors.frequencyName}
                      helperText={errors.frequencyName?.message}
                      select
                      value={
                        watch("frequencyName") !== undefined
                          ? watch("frequencyName")
                          : frequencyName
                      }
                      variant="standard"
                      disabled={
                        isLoadingAlertFrequency == false &&
                        useTypeMember != false
                          ? false
                          : true
                      }
                    >
                      <MenuItem
                        value="1"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        Dia
                      </MenuItem>
                      <MenuItem
                        value="2"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        Semanal
                      </MenuItem>
                      <MenuItem
                        value="3"
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
              sx={{
                color: "primary",
                variant: "contained",
                width: { lg: 200, md: 200, sm: "100%", xs: "100%" },
              }}
            >
              Salvar
            </Button>
          ) : (
            <CircularProgress color="success" />
          )}
        </Grid>
      </Box>
    </Box>
  );
}
