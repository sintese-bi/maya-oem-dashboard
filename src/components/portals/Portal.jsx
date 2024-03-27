import { listBrand } from "src/utils/list-brand.js";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getUserCookie } from "src/services/session";

import xlsx from "src/assets/xslxPortais.xlsx";

import { createDevice } from "src/store/actions/devices";
import {
  getDashboard,
  updateBrands,
  xlsxPortal,
} from "src/store/actions/users";
import {
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Input,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PortalValidationState } from "./PortalValidationState";

import XLSXFile from "src/assets/xslxPortais.xlsx";
import { DashboardContext } from "src/contexts/dashboard-context";

const validateSchema = Yup.object().shape({
  bl_login: Yup.string().required("Campo é obrigatório."),
  bl_password: Yup.string().required("Campo é obrigatório."),
});

export const Portal = ({
  setTitle,
  setDescription,
  setSecondaryAction,
  welcome,
}) => {
  const { brandInfoData } = useSelector((state) => state.users);
  const { handleBrandInfoRequest, handleMassEmail } =
    useContext(DashboardContext);
  const [validationWarningState, setValidationWarningState] = useState(false);

  const [brandData, setBrandData] = useState([]);

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
    const { bl_login, bl_password, bl_name, bl_quant } = values;

    try {
      if (action == "createDevice") {
        dispatch(
          createDevice(
            {
              bl_login,
              bl_password,
              bl_name,
              use_uuid: useUuid,

              bl_quant:
                portalHasMoreThanOneUsin == "true"
                  ? parseFloat("1")
                  : parseFloat("2"),
            },
            handleBrandInfoRequest
          )
        );
      } else {
        dispatch(
          updateBrands(
            {
              bl_login,
              bl_password,
              bl_name,
              use_uuid: useUuid,

              bl_quant: portalHasMoreThanOneUsin == "true" ? 1 : 2,
            },
            handleBrandInfoRequest
          )
        );
      }

      if (welcome) setSecondaryAction("DefineCapacityAndDevicesEmails");
      dispatch(getDashboard(useUuid, "create-devices.jsx"));

      setValue("bl_login", "");
      setValue("bl_password", "");
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    setTitle("Portal");
    setDescription(
      "Insira suas usinas! Basta informar marca do portal do inversor, login, senha e, caso saiba, o website do portal, e se há mais de uma usina no portal."
    );
  }, []);

  const [brand, setBrand] = useState(brandInfoData[0][0]);

  useEffect(() => {
    if (brandInfoData[1].length != 0) {
      setValidationWarningState(true);
    } else {
      setValidationWarningState(false);
    }
  }, [brandInfoData]);

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
          width: 680,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                sx={{ width: 200, backgroundColor: "transparent", px: 1 }}
                label="Brands"
                {...register("bl_name")}
                select
                defaultValue={brand?.bl_name}
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
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
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
          </Box>

          {!validationWarningState ? null : (
            <Box sx={{ width: "50%", height: 300, overflow: "scroll" }}>
              <PortalValidationState
                recentPortals={brandInfoData[1]}
                setValidationWarningState={setValidationWarningState}
              />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
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
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 0,
              }}
            >
              <a
                href={xlsx}
                download="portais.xlsx"
                style={{
                  textDecoration: "none",
                  color: "white",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "6px 10px 6px 10px",
                }}
              >
                Baixar modelo xlsx
              </a>
            </Button>
            <Button variant="outlined" color="success" component="label">
              Upload do arquivo
              <Input
                type="file"
                onChange={(e) => {
                  if (e.target.files.length != 0) {
                    const formData = new FormData();
                    formData.append("arquivo", e.target.files[0]);
                    formData.append("use_uuid", useUuid);
                    dispatch(xlsxPortal(formData, handleBrandInfoRequest));
                  }
                }}
                sx={{ visibility: "hidden", overflow: "hidden", width: 0 }}
              />
            </Button>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};
