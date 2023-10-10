import { Avatar, Link, Stack, Typography } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import { listBrand } from "src/utils/list-brand";
import { CheckBox, ReportProblem } from "@mui/icons-material";
import { ModalPlantsGraph } from "src/components/dashboard-components/total-month/total-month-components/total-month-devices-components/total-month-generation-graph";
import { DeleteDevice } from "src/components/dashboard-components/total-month/total-month-components/total-month-devices-components/total-month-delete-devices";
import { SendEmail } from "src/components/dashboard-components/total-month/total-month-components/total-month-devices-components/total-month-send-email";

export const columnsDevices = [
  {
    name: "uuid",
    label: "ID do Dispositivos/usuário",
    options: {
      display: false,
      viewColumns: false,
      filter: true,
    },
  },
  {
    name: "blUuid",
    label: "ID do marca",
    options: {
      display: false,
      viewColumns: false,
      filter: true,
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
                capacity: dataTable.rowData[4],
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
    options: {
      filter: true,
      sort: true,
      sortDirection: "desc",
    },
  },
  {
    name: "deviceSituation",
    label: "Alerta de geração",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (name, dataTable) => {
        return (
          <Stack direction="row" alignItems="center" gap={1}>
            {Number(dataTable.rowData[12]) == 0 ? (
              <CheckBox sx={{ color: "success.light" }} />
            ) : (
              <ReportProblem sx={{ color: "warning.light" }} />
            )}
          </Stack>
        );
      },
    },
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
              useNameState={dataTable.rowData[2]}
            />
          </Stack>
        );
      },
    },
  },
  {
    name: "sendEmail",
    label: "Relatório do mês",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (name, dataTable) => {
        return (
          <Stack direction="row" alignItems="center" gap={1}>
            <SendEmail
              devUuidState={dataTable.rowData[0]}
              blUuidState={dataTable.rowData[1]}
              data={dataTable.rowData}
              useNameState={dataTable.rowData[2]}
              capacity={dataTable.rowData[4]}
              address={dataTable.rowData[17]}
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
  {
    name: "address",
    label: "Endereço",
    options: {
      filter: true,
      display: false,
      viewColumns: false,
      sort: true,
    },
  },
];
