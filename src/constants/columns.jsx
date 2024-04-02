import {
  Avatar,
  Button,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import { listBrand } from "src/utils/list-brand";
import { CheckBox, ReportProblem, Info } from "@mui/icons-material";
import { ModalPlantsGraph } from "src/components/dashboard/total-month/total-month-components/total-month-devices-components/total-month-generation-graph";
import { DeleteDevice } from "src/components/dashboard/total-month/total-month-components/total-month-devices-components/total-month-delete-devices";
import { SendEmail } from "src/components/dashboard/total-month/total-month-components/total-month-devices-components/total-month-send-email";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { getDashboard } from "src/store/actions/users";
import { useEffect } from "react";

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
    name: "index",
    label: "Numeração",
    options: {
      filter: true,
      sort: true,
      align: "center",
      customHeadLabelRender: (data) => {
        return <p style={{ fontWeight: "bolder" }}>Numeração</p>;
      },
    },
  },
  {
    name: "brand",
    label: "Nome da marca",
    options: {
      filter: true,
      sort: true,
      customHeadLabelRender: (data) => {
        return <p style={{ fontWeight: "bolder" }}>Nome da marca</p>;
      },
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
                useNameState: dataTable.rowData[3],
                capacity: dataTable.rowData[5],
              }}
              underline="hover"
            >
              <Typography sx={{ mr: 2 }} variant="body1">
                {name}
              </Typography>
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
      customHeadLabelRender: (data) => {
        return <p style={{ fontWeight: "bolder" }}>Planta</p>;
      },
    },
  },
  {
    name: "capacity",
    label: "Capacidade da usina (KWp)",
    options: {
      filter: true,
      sort: true,
      customHeadLabelRender: (data) => {
        return (
          <p style={{ fontWeight: "bolder" }}>Capacidade da usina (KWp)</p>
        );
      },
    },
  },
  {
    name: "deviceSituation",
    label: "Alerta de geração",
    options: {
      filter: true,
      sort: true,
      viewColumns: false,
      customHeadLabelRender: () => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 2, fontWeight: "bolder" }}>
              Alerta de geração{" "}
            </Typography>
            <Tooltip title="usinas que não produziram o esperado no dia anterior">
              <Info sx={{ fontSize: "16px" }} />
            </Tooltip>
          </Box>
        );
      },
      customBodyRender: (name, dataTable) => {
        console.log(dataTable.rowData);
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
    name: "generationRealDay",
    label: "Produção real dia (KWh)",
    options: {
      filter: true,
      sort: true,
      customHeadLabelRender: (data) => {
        return <p style={{ fontWeight: "bolder" }}>Produção real dia (KWh)</p>;
      },
    },
  },
  {
    name: "generationEstimatedDay",
    label: "Produção Estimada dia (KWh)",
    options: {
      filter: true,
      sort: true,
      customHeadLabelRender: (data) => {
        return (
          <p style={{ fontWeight: "bolder" }}>Produção Estimada dia (KWh)</p>
        );
      },
    },
  },
  {
    name: "perfomance",
    label: "Desempenho",
    options: {
      filter: true,
      sort: true,
      customHeadLabelRender: (data) => {
        return <p style={{ fontWeight: "bolder" }}>Desempenho (%)</p>;
      },
    },
  },
  {
    name: "generationRealWeek",
    label: "Produção real semana (KWh)",
    options: {
      filter: true,
      sort: true,
      display: false,
      viewColumns: false,
      customHeadLabelRender: (data) => {
        return (
          <p style={{ fontWeight: "bolder" }}>Produção real semana (KWh)</p>
        );
      },
    },
  },
  {
    name: "generationEstimatedlWeek",
    label: "Produção Estimada semana (KWh)",
    options: {
      filter: true,
      sort: true,
      display: false,
      viewColumns: false,
      customHeadLabelRender: (data) => {
        return (
          <p style={{ fontWeight: "bolder" }}>Produção Estimada semana (KWh)</p>
        );
      },
    },
  },
  {
    name: "generationRealMonth",
    label: "Produção real mês (KWh)",
    viewColumns: false,
    options: {
      filter: true,
      display: false,
      sort: true,
      customHeadLabelRender: (data) => {
        return <p style={{ fontWeight: "bolder" }}>Produção real mês (KWh)</p>;
      },
    },
  },
  {
    name: "generationEstimatedMonth",
    label: "Produção Estimada mês (KWh)",
    viewColumns: false,
    options: {
      filter: true,
      display: false,
      sort: true,
      customHeadLabelRender: (data) => {
        return (
          <p style={{ fontWeight: "bolder" }}>Produção Estimada mês (KWh)</p>
        );
      },
    },
  },
  {
    name: "alert",
    label: "Quantidade de alertas",
    options: {
      filter: true,
      sort: true,
      customHeadLabelRender: () => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 2, fontWeight: "bolder" }}>
              Quantidade de alertas
            </Typography>
            <Tooltip title="alertas advindos do portal do inversor">
              <Info sx={{ fontSize: "16px" }} />
            </Tooltip>
          </Box>
        );
      },
      customBodyRender: (name, dataTable) => {
        return (
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography sx={{ mr: 2 }} variant="body1">
              {name}
            </Typography>

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

      customHeadLabelRender: () => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 2, fontWeight: "bolder" }}>
              Situação
            </Typography>
            <Tooltip title="inapta são usinas com produção 0 kwh advindo do portal do inversor">
              <Info sx={{ fontSize: "16px" }} />
            </Tooltip>
          </Box>
        );
      },
    },
  },
  {
    name: "individualGraph",
    label: "Histórico de geração",
    options: {
      filter: true,
      sort: true,
      customHeadLabelRender: (data) => {
        return <p style={{ fontWeight: "bolder" }}>Histórico de geração</p>;
      },
      customBodyRender: (name, dataTable) => {
        return (
          <Stack direction="row" alignItems="center" gap={1}>
            <ModalPlantsGraph
              devUuidState={dataTable.rowData[0]}
              blUuidState={dataTable.rowData[1]}
              useNameState={dataTable.rowData[3]}
            />
          </Stack>
        );
      },
    },
  },
  {
    name: "sendEmail",
    label: "Relatório mensal",
    options: {
      filter: true,
      sort: true,
      customHeadLabelRender: () => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 2, fontWeight: "bolder" }}>
              Relatório mensal
            </Typography>
            <Tooltip title="enviar relatório do mês para cliente da planta">
              <Info sx={{ fontSize: "16px" }} />
            </Tooltip>
          </Box>
        );
      },
      customBodyRender: (name, dataTable) => {
        return (
          <Stack direction="row" alignItems="center" gap={1}>
            <SendEmail
              devUuidState={dataTable.rowData[0]}
              blUuidState={dataTable.rowData[1]}
              data={dataTable.rowData}
              useNameState={dataTable.rowData[3]}
              capacity={dataTable.rowData[5]}
              address={dataTable.rowData[19]}
              email={dataTable.rowData[20]}
              deviceName={dataTable.rowData[4]}
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
      customHeadLabelRender: (data) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 2, fontWeight: "bolder" }}>
              Deletar planta
            </Typography>

            <Tooltip title="ao deletar planta ela apenas deixa de ser monitorada e não excluída do portal do inversor">
              <Info sx={{ fontSize: "16px" }} />
            </Tooltip>
          </Box>
        );
      },
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
      customHeadLabelRender: (data) => {
        return <p style={{ fontWeight: "bolder" }}>Boleto Quitado ?</p>;
      },
    },
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: true,
      display: false,
      viewColumns: false,
      sort: true,
      customHeadLabelRender: (data) => {
        return <p style={{ fontWeight: "bolder" }}>Boleto Quitado ?</p>;
      },
    },
  },
];
