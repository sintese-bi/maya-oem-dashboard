import { listBrand } from "src/utils/list-brand.js";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getUserCookie } from "src/services/session";

import { createDevice } from "src/store/actions/devices";
import { getDashboard, updateBrands } from "src/store/actions/users";
import { Button, TextField, Box, Typography, MenuItem } from "@mui/material";
import { useState } from "react";

const validateSchema = Yup.object().shape({
  bl_login: Yup.string().required("Campo é obrigatório."),
  bl_password: Yup.string().required("Campo é obrigatório."),
});

export const CreateDevice = () => {
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

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          width: 364,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            {action == "createDevice" ? "Adicionar portal" : "Atualizar portal"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", py: 4 }}>
          <TextField
            sx={{ width: 200, backgroundColor: "transparent", px: 1 }}
            label="Brands"
            {...register("bl_name")}
            select
            defaultValue="Aurora"
            variant="standard"
          >
            {listBrand.map((data) =>
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
            label="Login"
            {...register("bl_login")}
            error={!!errors.bl_login}
            helperText={errors.bl_login?.message}
          />
          <TextField
            margin="normal"
            label="Senha"
            type="password"
            {...register("bl_password")}
            error={!!errors.bl_password}
            helperText={errors.bl_password?.message}
          />
          <TextField
            margin="normal"
            label="URL"
            {...register("bl_url")}
            error={!!errors.bl_url}
            helperText={errors.bl_url?.message}
          />
          <TextField
            margin="normal"
            label="Quantas usinas possui neste portal?"
            type="number"
            {...register("bl_usins_qntd")}
          />
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
            {action == "createDevice" ? "Atualizar marca?" : "Criar portal?"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};
