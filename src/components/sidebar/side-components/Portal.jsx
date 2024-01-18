import { listBrand } from "src/utils/list-brand.js";
import { useDispatch, useSelector } from "react-redux";
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
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";

const validateSchema = Yup.object().shape({
  bl_login: Yup.string().required("Campo é obrigatório."),
  bl_password: Yup.string().required("Campo é obrigatório."),
});

export const Portal = ({ setTitle, setDescription }) => {
  const { brandInfoData } = useSelector((state) => state.users);
  const [portalHasMoreThanOneUsin, setPortalHasMoreThanOneUsin] =
    useState("false");
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
    const { bl_login, bl_password, bl_name, bl_url, bl_quant } = values;
    try {
      if (action == "createDevice") {
        dispatch(
          createDevice({
            bl_login,
            bl_password,
            bl_name,
            use_uuid: useUuid,
            bl_url,
            bl_quant,
            portalHasMoreThanOneUsin,
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
            portalHasMoreThanOneUsin,
          })
        );
      }

      dispatch(getDashboard(useUuid, "create-devices.jsx"));
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    setTitle("Portal");
    setDescription("");
  }, []);

  const [brand, setBrand] = useState(
    brandInfoData[0].filter((data) => data.bl_name == "AURORA")[0]
  );

  if (brandInfoData[1][0].bl_check == "validating") {
    return (
      <Box sx={{ p: 2 }}>
        <Typography width={100} sx={{ width: 200 }} variant="body">
          O portal recente adicionado, de email {brandInfoData[1][0].bl_login},
          está em validação.
          <br />
          Enviaremos um email quando os dados estiverem prontos, por favor,
          aguarde.
        </Typography>
      </Box>
    );
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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ width: 200, backgroundColor: "transparent", px: 1 }}
            label="Brands"
            {...register("bl_name")}
            select
            defaultValue={brand.bl_name}
            variant="standard"
            onChange={(event) =>
              setBrand(
                brandInfoData[0].filter(
                  (data) => data.bl_name == event.target.value
                )[0]
              )
            }
          >
            {brandInfoData[0].map((data, index) =>
              data.bl_name != "SolarView" && data.bl_name != "Solarz" ? (
                <MenuItem
                  key={index}
                  value={data.bl_name}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  {data.bl_name}
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
            label="Website do portal"
            value={brand.bl_url}
            {...register("bl_url")}
            error={!!errors.bl_url}
            helperText={errors.bl_url?.message}
          />

          <Box
            sx={{
              display: "flex",

              flexDirection: "column",
              my: 4,
            }}
          >
            <Typography variant="body2">
              O portal possui mais de uma usina?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>Sim</p>
                <Radio
                  checked={portalHasMoreThanOneUsin == "true"}
                  value="true"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                  onChange={(e) => {
                    setPortalHasMoreThanOneUsin(e.target.value);
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>Não</p>
                <Radio
                  checked={portalHasMoreThanOneUsin == "false"}
                  value="false"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                  onChange={(e) => {
                    setPortalHasMoreThanOneUsin(e.target.value);
                  }}
                />
              </Box>
            </Box>
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
              if (action == "createDevice") {
                setAction("updateDevice");
              } else {
                setAction("createDevice");
              }
            }}
          >
            {action == "createDevice" ? "Atualizar portal?" : "Criar portal?"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};
