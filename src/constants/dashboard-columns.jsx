import { Avatar, Link, Stack, Typography } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import { listBrand } from "src/utils/list-brand";
import { ModalPlantsGraph } from "src/components/ModalPlantsGraph";
import { DeleteDevice } from "src/components/deleteDevice";

export const columnsDevicesDashboard = [
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
      sort: false,
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
                useNameState: dataTable.rowData[2],
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
      filter: false,
      sort: false,
    },
  },
  {
    name: "capacity",
    label: "Capacidade da usina",
    options: {
      filter: true,
      sort: true,
      sortOrder: "desc",
    },
  },
  {
    name: "generationEstimatedDay",
    label: "Geração Estimada dia",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "generationRealDay",
    label: "Geração real dia",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "generationEstimatedlWeek",
    label: "Geração Estimada semana",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "generationRealWeek",
    label: "Geração real semana",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "generationEstimatedMonth",
    label: "Geração Estimada mês",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "generationRealMonth",
    label: "Geração real mês",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "alert",
    label: "Quantidade de alertas",
    options: {
      filter: true,
      sort: false,
      customBodyRender: (name, dataTable) => {
        return (
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="body1">{name}</Typography>

            {/* {name !== 0 ? (
              <Button
                component={LinkRouter}
                to={{
                  pathname: `/dashboard/alerts/${dataTable.rowData[2]}`,
                }}
                state={{
                  devUuidState: dataTable.rowData[0],
                  blUuidState: dataTable.rowData[1],
                  useNameState: dataTable.rowData[2]
                }}
                variant="outlined"
                startIcon={<ExitToApp />}
              >
                Visualizar
              </Button>
            ) : null} */}
          </Stack>
        );
      },
    },
  },
  {
    name: "staName",
    label: "Situação",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "individualGraph",
    label: "Histórico de geração",
    options: {
      filter: true,
      sort: false,
      customBodyRender: (name, dataTable) => {
        return (
          <Stack direction="row" alignItems="center" gap={1}>
            <ModalPlantsGraph
              devUuidState={dataTable.rowData[0]}
              blUuidState={dataTable.rowData[1]}
            />
          </Stack>
        );
      },
    },
  },
  {
    name: "deleteDevice",
    label: "Deletar planta",
    options: {
      filter: true,
      sort: false,
      customBodyRender: (name, dataTable) => {
        return (
          <Stack direction="row" alignItems="center" gap={1}>
            <DeleteDevice devUuid={dataTable.rowData[0]} />
          </Stack>
        );
      },
    },
  },
];
