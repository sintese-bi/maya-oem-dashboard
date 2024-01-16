import { CheckRounded, EditAttributes, Info } from "@mui/icons-material";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

export const ConfigPortals = ({ setTitle, setDescription }) => {
  const columns = [
    {
      name: "bl_name",
      label: "Nome do portal",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "bl_state",
      label: "Estado de validação",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 2 }}>Estado de validação</Typography>
              <Tooltip title="Estado de validação do portal">
                <Info sx={{ fontSize: "16px" }} />
              </Tooltip>
            </Box>
          );
        },
        customBodyRender: (name, dataTable) => {
          return (
            <Stack direction="row" alignItems="center" gap={1}>
              <CheckRounded />
            </Stack>
          );
        },
      },
    },
    {
      name: "bl_login",
      label: "Login",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "bl_senha",
      label: "Senha",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "bl_url",
      label: "Website do portal",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "brand_config",
      label: "Configurar portal",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (name, dataTable) => {
          return (
            <Stack direction="row" alignItems="center" gap={1}>
              <EditAttributes />
            </Stack>
          );
        },
      },
    },
  ];
  const [data, setData] = useState([]);
  const options = {
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
  };

  useEffect(() => {
    setTitle("Função em estado de desenvolvimento");
    setDescription(
      "Caro usuário, essa funcionalidade se encontra em estado de desenvolvimento, por favor aguarde!"
    );
  }, []);

  return (
    <Box>
      <MUIDataTable columns={columns} data={data} options={options} />
    </Box>
  );
};
