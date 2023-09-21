import { Avatar, Link, Stack, Typography } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import { listBrand } from "src/utils/list-brand";
import { ModalPlantsGraph } from "src/components/ModalPlantsGraph";
import { DeleteDevice } from "src/components/deleteDevice";

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
      filter: true,
      sort: true,
    },
  },
  {
    name: "capacity",
    label: "Capacidade da usina",
  },
  {
    name: "generationEstimatedDay",
    label: "Geração Estimada dia",
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
    name: "generationEstimatedlWeek",
    label: "Geração Estimada semana",
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
    name: "generationEstimatedMonth",
    label: "Geração Estimada mês",
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
      sort: true,
    },
  },
  {
    name: "individualGraph",
    label: "Histórico de geração",
    options: {
      filter: true,
      sort: true,
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
      sort: true,
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
