import { listBrand } from "src/utils/list-brand";
import { Link as LinkRouter } from "react-router-dom";
import { Avatar, Link, Stack, Typography } from "@mui/material";

export const columnsDevices = [
  {
    name: "uuid",
    label: "ID do Dispositivos/usuário",
    options: {
      display: false,
      viewColumns: false,
      filter: false,
    },
  },
  {
    name: "blUuid",
    label: "ID do marca",
    options: {
      display: false,
      viewColumns: false,
      filter: false,
    },
  },
  {
    name: "brand",
    label: "Nome da marca",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (name, dataTable) => {
        const brandImg = listBrand.filter((brand) => brand.params === name)[0];
        return (
          <Stack direction="row" alignItems="center" gap={1}>
            <Avatar src={brandImg?.media} />
            <Link
              component={LinkRouter}
              to={{
                pathname: `/dashboard/generation/${name}`,
              }}
              state={{
                devUuidState: dataTable.rowData[0],
                blUuidState: dataTable.rowData[1],
              }}
              underline="hover"
            >
              <Typography variant="body1">{name}</Typography>
            </Link>
          </Stack>
        );
      },
    },
  },
  {
    name: "name",
    label: "Planta",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "generationEstimated",
    label: "Geração Estimada",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "generationRealDay",
    label: "Geração real dia",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "generationRealWeek",
    label: "Geração real semana",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "generationRealMonth",
    label: "Geração real mês",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "alert",
    label: "Quantidade de alertas",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "staName",
    label: "Situação",
    options: {
      filter: true,
      sort: true,
    },
  },
];
