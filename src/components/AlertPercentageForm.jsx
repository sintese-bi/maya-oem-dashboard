// IMPORTS
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { getUserCookie } from "src/services/session";

// LIBS DE ESTILOS
import { SaveAs } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { alertFrequency, patchAlertFrequency } from "src/store/actions/users";

// SCHEMA DE VALIDAÇÃO DE CAMPOS
const validateSchema = Yup.object().shape({
  percentage: Yup.string().required("Campo é obrigatório."),
  frequencyName: Yup.string().required("Campo é obrigatório."),
});

export default function AlertPercentageForm() {
  const dispatch = useDispatch();

  const { useUuid } = getUserCookie();
  const { isLoadingAlertFrequency, percentage, frequencyName } = useSelector(
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

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-end",
        gap: 3,
        my: 3,
        mx: 2,
      }}
    >
      <TextField
        sx={{ width: 200 }}
        label="Limite mínimo"
        type="number"
        {...register("percentage")}
        error={!!errors.percentage}
        helperText={errors.percentage?.message}
        variant="outlined"
        disabled={isLoadingAlertFrequency}
      />

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
            value={watch('frequencyName') || ''}
            select
            variant="outlined"
            disabled={isLoadingAlertFrequency}
          >
            <MenuItem value="day">Dia</MenuItem>
            <MenuItem value="week">Semanal</MenuItem>
            <MenuItem value="month">Mês</MenuItem>
          </TextField>
        )}
      />

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
  );
}
