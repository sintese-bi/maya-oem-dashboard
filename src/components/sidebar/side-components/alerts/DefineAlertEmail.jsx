import { Button, TextField, Typography, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { SaveAs } from "@mui/icons-material";
import { getUserCookie } from "src/services/session";
import { useDispatch } from "react-redux";
import { portalemailLogins } from "src/store/actions/users";
import { useEffect } from "react";

const validateSchema = Yup.object().shape({
  email: Yup.string()
    .min(10, "Por favor, insira o email corretamente")
    .required("Campo é obrigatório."),
});

export function DefineAlertEmail({
  welcome,
  setCurrentPage,
  currentPage,
  setTitle,
  setDescription,
  setSecondaryAction,
}) {
  const { useUuid } = getUserCookie();
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

  async function onSubmit(values) {
    const { email } = values;

    if (welcome) {
      setSecondaryAction("Portal");
    } else {
      setSecondaryAction("AlertsDefineComponent");
    }
    dispatch(portalemailLogins({ use_uuid: useUuid, use_alert_email: email }));
  }

  useEffect(() => {
    setTitle("Definição do email para alertas");
    setDescription("");
  }, [currentPage]);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Por favor, define o email em que deseja receber os alertas!
      </Typography>
      <TextField
        {...register("email")}
        sx={{ width: "100%" }}
        margin="normal"
        label="Email"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Button
        startIcon={<SaveAs fontSize="small" />}
        type="submit"
        variant="contained"
        sx={{ color: "primary", variant: "contained" }}
      >
        Salvar
      </Button>
    </Box>
  );
}
