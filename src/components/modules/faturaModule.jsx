import { listBrand } from "src/utils/list-brand.js";
import { useDispatch, useSelector } from "react-redux";
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
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { concessionaries } from "src/utils/concessionaries";
import MUIDataTable from "mui-datatables";

const validateSchema = Yup.object().shape({
  voice_login: Yup.string().required("Campo é obrigatório."),
  voice_password: Yup.string().required("Campo é obrigatório."),
  voice_client: Yup.string().required("Campo é obrigatório."),
  voice_install: Yup.string().required("Campo é obrigatório."),
});

export const FaturaModulo = () => {
  const { invoiceValuesData } = useSelector((state) => state.users);
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

  const columns = [
    {
      name: "numero_instalacao",
      label: "Número da UC",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (data) => {
          return <p style={{ fontWeight: "bolder" }}>Número da UC</p>;
        },
      },
    },
    {
      name: "usina",
      label: "Usina",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (data) => {
          return <p style={{ fontWeight: "bolder" }}>Usina</p>;
        },
      },
    },
    {
      name: "cliente",
      label: "Cliente",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (data) => {
          return <p style={{ fontWeight: "bolder" }}>Cliente</p>;
        },
      },
    },
    {
      name: "vendedor",
      label: "Vendedor",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (data) => {
          return <p style={{ fontWeight: "bolder" }}>Vendedor</p>;
        },
      },
    },
    {
      name: "valor",
      label: "Recebíveis (R$)",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (data) => {
          return <p style={{ fontWeight: "bolder" }}>Recebíveis (R$)</p>;
        },
      },
    },
    {
      name: "pago",
      label: " Consultor Pago ?",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (data) => {
          return <p style={{ fontWeight: "bolder" }}>Consultor Pago ?</p>;
        },
      },
    },
    {
      name: "boleto_quitado",
      label: "Boleto Quitado ?",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (data) => {
          return <p style={{ fontWeight: "bolder" }}>Boleto Quitado ?</p>;
        },
      },
    },
    {
      name: "valor",
      label: "Recebíveis (R$)",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (data) => {
          return <p style={{ fontWeight: "bolder" }}>Recebíveis (R$)</p>;
        },
      },
    },
    {
      name: "compensacao",
      label: "Energia Compensada (kWh)",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (data) => {
          return (
            <p style={{ fontWeight: "bolder" }}>Energia Compensada (KWh)</p>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
    setRowProps: (row) => {
      if (row[6] === "Sim") {
        return {
          style: { background: "rgba(152, 251, 152, 0.2)" },
        };
      } else if (row[6] === "Não") {
        return {
          style: { background: "rgba(255, 105, 97, 0.2)" },
        };
      }
    },
  };

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

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",

          gap: 10,
          width: "90vw",
          overflow: "scroll",
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: 6, flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
                width: 520,
              }}
            >
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

        <Box sx={{ width: "100%" }}>
          <MUIDataTable
            data={invoiceValuesData}
            columns={columns}
            options={options}
            title={<Typography variant="h3">Faturas</Typography>}
          />
        </Box>
      </Box>
    </FormProvider>
  );
};
