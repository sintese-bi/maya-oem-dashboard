import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import MUIDataTable from "mui-datatables";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import { listBrand } from "src/utils/list-brand";
import { SendEmail } from "../dashboard/total-month/total-month-components/total-month-devices-components/total-month-send-email";
import { CheckBox, Info, ReportProblem } from "@mui/icons-material";
import { ReportButton } from "../dashboard/period-data-usins/reportButton";
import { DashboardContext } from "src/contexts/dashboard-context";
import { DeleteDevice } from "../dashboard/total-month/total-month-components/total-month-devices-components/total-month-delete-devices";
import { ModalPlantsGraph } from "../dashboard/total-month/total-month-components/total-month-devices-components/total-month-generation-graph";

export const Reports = ({ setTitle, setDescription }) => {
  const {
    handleMassEmail,
    handleAdminReportGeneration,
    isLoadingReportGeneration,
    userData,
    usersAPIData,
  } = useContext(DashboardContext);

  const { allDevices, massEmailFinished } = useSelector((state) => state.users);

  const [data, setData] = useState([]);
  const [massEmailFinishedState, setMassEmailFinishedState] =
    useState(massEmailFinished);

  useEffect(() => {
    setData(allDevices);
  }, [allDevices]);

  useEffect(() => {
    setMassEmailFinishedState(massEmailFinished);
  }, [massEmailFinished]);

  useEffect(() => {
    setTitle("Relatórios");
    setDescription(
      `Caso queira o relatório relacionado aos valores totais das usinas, 
      siga o procedicmento do botão "Preparar relatório". No caso de necessitar enviar relatórios por email
       com valores referentes á uma única planta, siga o procedimento em "Relatório Mensal"`
    );
  }, []);

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
        display: false,
        viewColumns: false,
        filter: true,
      },
    },
    {
      name: "generationEstimatedDay",
      label: "Produção Estimada dia (KWh)",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
      },
    },
    {
      name: "generationRealWeek",
      label: "Produção real semana (KWh)",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
      },
    },
    {
      name: "generationEstimatedlWeek",
      label: "Produção Estimada semana (KWh)",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
      },
    },
    {
      name: "generationRealMonth",
      label: "Produção real mês (KWh)",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
      },
    },
    {
      name: "generationEstimatedMonth",
      label: "Produção Estimada mês (KWh)",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
      },
    },
    {
      name: "alert",
      label: "Quantidade de alertas",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
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
        display: false,
        viewColumns: false,
        filter: true,
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
        display: false,
        viewColumns: false,
        filter: true,
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
      label: "Gerar relatório",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 2 }}>Gerar relatório</Typography>
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
        display: false,
        viewColumns: false,
        filter: true,
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

  if (data.length == 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress color="success" size={80} />
        <Typography>Carregando dados</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "90vw", overflow: "scroll" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body" sx={{ fontWeight: "bold" }}>
          Contagem de relatórios:{" "}
          {`${usersAPIData.reportsCounting}/${usersAPIData.allDevices.length}`}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title="Essa funcionalidade envia relatório para todos os clientes com e-mail cadastrado em 'relatório mensal'.">
              <Info fontSize="small" />
            </Tooltip>
            <Button
              disabled={!massEmailFinishedState ? true : false}
              variant="outlined"
              color="success"
              onClick={() => {
                handleMassEmail();
              }}
              sx={{ height: "100%" }}
            >
              {"Disparo de relatório para clientes"}
            </Button>
          </Box>
          <ReportButton
            handleAdminReportGeneration={handleAdminReportGeneration}
            isLoadingReportGeneration={isLoadingReportGeneration}
            useTypeMember={userData.useTypeMember}
          />
        </Box>
      </Box>
      <Box sx={{ height: 300 }}>
        <MUIDataTable
          title="Listagem de plantas"
          data={data}
          columns={columns}
          options={options}
        />
      </Box>
    </Box>
  );
};
