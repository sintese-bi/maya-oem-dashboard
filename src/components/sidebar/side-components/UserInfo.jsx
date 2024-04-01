import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { Edit, Cancel } from "@mui/icons-material";

import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { cancelUserPlan, updateUser } from "src/store/actions/users";
import { useDispatch } from "react-redux";

const validateSchema = Yup.object().shape({
  useName: Yup.string()
    .required("Campo é obrigatório.")
    .min(5, "O valor mínimo é 5")
    .max(20, "O valor máximo é 20"),
  useEmail: Yup.string()
    .required("Campo é obrigatório.")
    .min(10, "O valor mínimo é 10"),
  useAddress: Yup.string().required("Campo é obrigatório."),
  usePhone: Yup.string().required("Campo é obrigatório."),
});

export const UserInfo = ({
  setTitle,
  setDescription,
  useName,
  useEmail,
  useUuid,
  useCityState,
  useTelephone,
  setOpen,
}) => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validateSchema),
  });

  const [editUserData, setEditUserData] = useState(false);
  const methods = useForm();

  async function onSubmit(values) {
    const { useName, useEmail, useAddress, usePhone } = values;
    try {
      dispatch(
        updateUser({
          use_name: useName,
          use_email: useEmail,
          use_city_state: useAddress,
          use_telephone: usePhone,
          use_uuid: useUuid,
        })
      );
      setOpen(false);
      setEditUserData(false);
      setValue("useName", "");
      setValue("useEmail", "");
      setValue("useAddress", "");
      setValue("usePhone", "");
    } catch (error) {
      alert(error);
    }
  }

  function handleCancelUserPlan() {
    dispatch(cancelUserPlan(useUuid));
  }

  useEffect(() => {
    setUserData({ useName, useEmail, useUuid, useCityState, useTelephone });
  }, [useName, useEmail, useUuid, useCityState, useTelephone]);

  useEffect(() => {
    setTitle("Dados do usuário");
    setDescription("");
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 4, flexDirection: "column" }}>
      {editUserData ? (
        <FormProvider {...methods}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <TextField
                  defaultValue={userData.useName}
                  margin="normal"
                  label="Novo nome"
                  {...register("useName")}
                  error={!!errors.useName}
                  helperText={errors.useName?.message}
                  sx={{ width: "100%" }}
                />
                <TextField
                  defaultValue={userData.useEmail}
                  margin="normal"
                  label="Novo email"
                  {...register("useEmail")}
                  error={!!errors.useEmail}
                  helperText={errors.useEmail?.message}
                  type="email"
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <TextField
                  defaultValue={userData.useCityState}
                  margin="normal"
                  label="Novo endereço"
                  {...register("useAddress")}
                  error={!!errors.useAddress}
                  helperText={errors.useAddress?.message}
                  sx={{ width: "100%" }}
                />
                <TextField
                  defaultValue={userData.useTelephone}
                  margin="normal"
                  label="Novo telefone"
                  {...register("usePhone")}
                  error={!!errors.usePhone}
                  helperText={errors.usePhone?.message}
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained">
              Atualizar dados
            </Button>
          </Box>
        </FormProvider>
      ) : (
        <Grid container rowSpacing={4} columnSpacing={6}>
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={12}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box>
              <Typography variant="h6" fontWeight={"bold"}>
                Usuário
              </Typography>
              <Typography variant="body">{userData.useName}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={"bold"}>
                Email
              </Typography>
              <Typography variant="body">{userData.useEmail}</Typography>
            </Box>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={12}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box>
              <Typography variant="h6" fontWeight={"bold"}>
                Endereço
              </Typography>
              <Typography variant="body">{userData.useCityState}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={"bold"}>
                Telefone
              </Typography>
              <Typography variant="body">{userData.useTelephone}</Typography>
            </Box>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleCancelUserPlan()}
          >
            Cancelar MAYA WATCH PRO
          </Button>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          {editUserData ? (
            <Button
              variant="contained"
              sx={{ cursor: "pointer" }}
              onClick={() => setEditUserData(false)}
            >
              Cancelar
              <Cancel sx={{ ml: 2 }} />
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ cursor: "pointer" }}
              onClick={() => setEditUserData(true)}
            >
              Editar dados
              <Edit sx={{ ml: 2 }} />
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
