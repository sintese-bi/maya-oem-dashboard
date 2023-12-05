import { Box, Button, TextField, Typography } from "@mui/material";
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

  return (
    <Box sx={{}}>
      <Typography variant="h3">Dados do usuário</Typography>
      {editUserData ? (
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: 500, mt: 6, mb: 8 }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  defaultValue={userData.useName}
                  margin="normal"
                  label="Novo nome"
                  {...register("useName")}
                  error={!!errors.useName}
                  helperText={errors.useName?.message}
                />
                <TextField
                  defaultValue={userData.useEmail}
                  margin="normal"
                  label="Novo email"
                  {...register("useEmail")}
                  error={!!errors.useEmail}
                  helperText={errors.useEmail?.message}
                  type="email"
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  defaultValue={userData.useCityState}
                  margin="normal"
                  label="Novo endereço"
                  {...register("useAddress")}
                  error={!!errors.useAddress}
                  helperText={errors.useAddress?.message}
                />
                <TextField
                  defaultValue={userData.useTelephone}
                  margin="normal"
                  label="Novo telefone"
                  {...register("usePhone")}
                  error={!!errors.usePhone}
                  helperText={errors.usePhone?.message}
                />
              </Box>
            </Box>
            <Button type="submit" variant="contained" sx={{ mt: 2, mb: 4 }}>
              Atualizar dados
            </Button>
          </Box>
        </FormProvider>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mb: 4,
            justifyContent: "space-between",
            alignItems: "center",
            width: 512,
            mt: 6,
            mb: 8,
          }}
        >
          <Box
            sx={{
              height: 92,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">{userData.useName}</Typography>
            <Typography variant="body">{userData.useEmail}</Typography>
          </Box>
          <Box
            sx={{
              height: 92,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body" sx={{ mt: 2 }}>
              {userData.useCityState}
            </Typography>
            <Typography variant="body">{userData.useTelephone}</Typography>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleCancelUserPlan()}
        >
          Cancelar MAYA WATCH PRO
        </Button>
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
      </Box>
    </Box>
  );
};
