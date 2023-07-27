// IMPORTS
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {PDFDownloadLink} from '@react-pdf/renderer'
import * as Yup from "yup";

import { AdministratorReport } from "src/reports/AdministratorReport";

import { getUserCookie } from "src/services/session";

// LIBS DE ESTILOS
import { Info, SaveAs, DownloadForOffline } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
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
  const [generationRealTotalValue, setGenerationRealTotalValue] = useState(0)
  const [generationEstimatedTotalValue, setGenerationEstimatedTotalValue] = useState(0)
  const [percent, setPercent] = useState(0)
  const [potence, setPotence] = useState(1000)

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
    if (percentage && frequencyName) {
      setValue("percentage", percentage);
      setValue("frequencyName", frequencyName);
    }
  }, [percentage, frequencyName]);

  useEffect(() => {
    let generationRealNumberValue = dataDevices.map((data) => {
      let generationRealValue = Number(data.generationRealMonth.replace(/\Kwh/g, ''))
      return generationRealValue;
    })
    setGenerationRealTotalValue(generationRealNumberValue.reduce((total, element) => total + element, 0).toFixed())

    let generationEstimatedNumberValue = dataDevices.map((data) => {
      let generationEstimatedValue = Number(data.generationEstimatedMonth.replace(/\Kwh/g, ''))
      return generationEstimatedValue;
    })
    setGenerationEstimatedTotalValue(generationEstimatedNumberValue.reduce((total, element) => total + element, 0).toFixed())

    let percentResult = (generationRealTotalValue/generationEstimatedTotalValue)*100
    setPercent(percentResult.toFixed())

    console.log(generationRealTotalValue, generationEstimatedTotalValue);
  }, [dataDevices])



  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        gap: 3,
        my: 3,
        mx: 2,
      }}
    >
      <Button
          startIcon={<DownloadForOffline fontSize="small" />}
          variant="contained"
          sx={{ color: "primary", variant: "contained" }}
        >
          <PDFDownloadLink document={<AdministratorReport dataDevices={dataDevices} />} fileName="relatório-administrador.pdf" style={{color: 'white', textDecoration: 'none'}}>
            {({ blob, url, loading, error }) => (loading ? "Carregando relatório" : "Relatório Administrador")}
          </PDFDownloadLink>
      </Button>
      <Box sx={{display: "flex", gap: 3, my: 3, mx: 2,}}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Tooltip
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            title={`Percentual mínimo de geração da usina. Caso sua usina produza menos que (${watch(
              "percentage"
            )} %) na semana, enviaremos um alerta para avisar sobre a saúde do seu sistema fotovoltaico.`}
          >
            <IconButton>
              <Info />
            </IconButton>
          </Tooltip>
          <TextField
            sx={{ width: 200 }}
            label="Limite Mínimo (%)"
            type="number"
            {...register("percentage")}
            error={!!errors.percentage}
            helperText={errors.percentage?.message}
            variant="standard"
            disabled={isLoadingAlertFrequency}
            inputProps={{ min: 0, max: 80 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Tooltip
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            title="Define a frequência de alertas diário, semanal ou mensal."
          >
            <IconButton>
              <Info />
            </IconButton>
          </Tooltip>
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
                variant="standard"
                disabled={isLoadingAlertFrequency}
              >
                <MenuItem value="day">Dia</MenuItem>
                <MenuItem value="week">Semanal</MenuItem>
                <MenuItem value="month">Mês</MenuItem>
              </TextField>
            )}
          />
        </Box>
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
      </Box>
    </Box>
  );
}
