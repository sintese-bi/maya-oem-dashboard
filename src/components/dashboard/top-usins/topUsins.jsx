import { Card } from "@mui/material";
import Plants from "../total-month/total-month-components/total-month-devices";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

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

export const TopUsins = ({ dataDevices, ref, type, title }) => {
  const [data, setData] = useState([]);

  const options = {
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
  };

  const columns = [
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
          const brandImg = listBrand.filter(
            (brand) => brand.params === name
          )[0];
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
      },
    },
    {
      name: "capacity",
      label: "Capacidade da usina (KWp)",
      options: {
        filter: true,
        sort: true,
        display: false,
        viewColumns: false,
      },
    },
    {
      name: "deviceSituation",
      label: "Alerta de geração",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
        sort: true,
        customHeadLabelRender: () => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 2 }}>Alerta de geração </Typography>
              <Tooltip title="usinas que não produziram o esperado no dia anterior">
                <Info sx={{ fontSize: "16px" }} />
              </Tooltip>
            </Box>
          );
        },
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
      name: "generationRealDay",
      label: "Produção real dia (KWh)",
      options: {
        filter: true,
        sort: true,
        display: false,
        viewColumns: false,
      },
    },
    {
      name: "generationEstimatedDay",
      label: "Produção Estimada dia (KWh)",
      options: {
        filter: true,
        sort: true,
        display: false,
        viewColumns: false,
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
      },
    },
    {
      name: "generationRealMonth",
      label: "Produção real mês (KWh)",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "generationEstimatedMonth",
      label: "Produção Estimada mês (KWh)",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "alert",
      label: "Quantidade de alertas",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
        sort: true,
        customHeadLabelRender: () => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 2 }}>Quantidade de alertas</Typography>
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
              <Typography sx={{ mr: 2 }}>Situação</Typography>
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
      label: "Relatório mensal",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 2 }}>Relatório mensal</Typography>
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
                useNameState={dataTable.rowData[2]}
                capacity={dataTable.rowData[4]}
                address={dataTable.rowData[17]}
                email={dataTable.rowData[18]}
                deviceName={dataTable.rowData[3]}
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
        customHeadLabelRender: () => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 2 }}>Deletar planta</Typography>
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
      },
    },
  ];

  useEffect(() => {
    console.log(dataDevices);
    setData(
      dataDevices
        .sort((a, b) => b.generationRealMonth - a.generationRealMonth)
        .slice(0, 4)
    );
  }, [dataDevices]);

  return (
    <Card sx={{ width: "100%", p: 1, height: 364, overflow: "scroll" }}>
      <MUIDataTable
        title={"Principais usinas"}
        data={data}
        columns={columns}
        options={options}
      />
    </Card>
  );
};
