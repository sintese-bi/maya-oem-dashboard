import { listBrand } from "src/utils/list-brand.js";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getUserCookie } from "src/services/session";

import { createDevice } from "src/store/actions/devices";
import { getDashboard, invoice, updateBrands } from "src/store/actions/users";
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
  voice_login: Yup.string().required("Campo é obrigatório."),
  voice_password: Yup.string().required("Campo é obrigatório."),
  voice_client: Yup.string().required("Campo é obrigatório."),
  voice_install: Yup.string().required("Campo é obrigatório."),
});

export const FaturaModulo = ({ setTitle, setDescription }) => {
  const [acceptState, setAcceptState] = useState(true);
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
    const {
      voice_login,
      voice_password,
      voice_install,
      voice_client,
      voice_company,
    } = values;
    try {
      dispatch(
        invoice({
          use_uuid: useUuid,
          voice_login,
          voice_password,
          voice_install,
          voice_client,
          voice_company,
        })
      );
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
              {...register("voice_company")}
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
              {...register("voice_install")}
              error={!!errors.voice_install}
              helperText={errors.voice_install?.message}
            />
            <TextField
              margin="normal"
              label="Número do cliente"
              {...register("voice_client")}
              error={!!errors.voice_client}
              helperText={errors.voice_client?.message}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: 320 }}>
            <TextField
              margin="normal"
              label="Login"
              {...register("voice_login")}
              error={!!errors.voice_login}
              helperText={errors.voice_login?.message}
            />
            <TextField
              margin="normal"
              label="Senha"
              type="password"
              {...register("voice_password")}
              error={!!errors.voice_password}
              helperText={errors.voice_password?.message}
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  onChange={(event) => setAcceptState(event.target.checked)}
                />
              }
              label="Termo de aceite"
            />
          </Box>
        </Box>

        <Box>
          <Button
            disabled={!acceptState}
            sx={{
              width: "162px",
            }}
            type="submit"
            variant="contained"
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};
