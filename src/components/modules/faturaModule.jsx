import { listBrand } from "src/utils/list-brand.js";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getUserCookie } from "src/services/session";

import { createDevice } from "src/store/actions/devices";
import { getDashboard, updateBrands } from "src/store/actions/users";
import {
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { concessionaries } from "src/utils/concessionaries";

const validateSchema = Yup.object().shape({
  bl_login: Yup.string().required("Campo é obrigatório."),
  bl_password: Yup.string().required("Campo é obrigatório."),
});

export const FaturaModulo = ({ setTitle, setDescription }) => {
  const [action, setAction] = useState("createDevice");
  const methods = useForm();
  const { useUuid } = getUserCookie();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validateSchema),
  });

  async function onSubmit(values) {
    const { bl_login, bl_password, bl_name, bl_url } = values;
    console.log(values);
    try {
      if (action == "createDevice") {
        dispatch(
          createDevice({
            bl_login,
            bl_password,
            bl_name,
            use_uuid: useUuid,
            bl_url,
          })
        );
      } else {
        dispatch(
          updateBrands({
            bl_login,
            bl_password,
            bl_name,
            use_uuid: useUuid,
            bl_url,
          })
        );
      }

      dispatch(getDashboard(useUuid, "create-devices.jsx"));
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    setTitle("Módulo de fatura");
    setDescription("");
  }, []);

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 10,
          width: 664,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: 320 }}>
            <TextField
              sx={{ width: 200, backgroundColor: "transparent", px: 1 }}
              label="Concessionária"
              {...register("concessionary_name")}
              select
              defaultValue="Cemig"
              variant="standard"
            >
              {concessionaries.map((data) =>
                data.title != "SolarView" && data.title != "Solarz" ? (
                  <MenuItem
                    key={data.title}
                    value={data.title}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {data.title}
                  </MenuItem>
                ) : null
              )}
            </TextField>
            <TextField
              margin="normal"
              label="Número de instalação"
              {...register("number_instalation")}
              error={!!errors.number_instalation}
              helperText={errors.number_instalation?.message}
            />
            <TextField
              margin="normal"
              label="Número do cliente"
              {...register("client_phone")}
              error={!!errors.client_phone}
              helperText={errors.client_phone?.message}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: 320 }}>
            <TextField
              margin="normal"
              label="Login"
              {...register("login")}
              error={!!errors.login}
              helperText={errors.login?.message}
            />
            <TextField
              margin="normal"
              label="Senha"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Termo de aceite"
            />
          </Box>
        </Box>

        <Box>
          <Button
            sx={{
              width: "162px",
            }}
            type="submit"
            variant="contained"
          >
            Confirmar
          </Button>
          <Button
            sx={{
              width: "162px",
            }}
            onClick={() => {
              action == "createDevice"
                ? setAction("updateDevice")
                : setAction("createDevice");
            }}
          >
            {action == "createDevice" ? "Atualizar portal?" : "Criar portal?"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};
