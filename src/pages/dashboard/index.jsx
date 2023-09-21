// IMPORTS
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AdministratorReport } from "src/reports/AdministratorReport";
import { reportAdministratorRule } from "src/reports/reportsRules/reportAdministratorRule";
import { ToolTipNoAccess } from "src/components/ToolTipNoAccess";

import { GlobalUsinProductive } from "src/components/GlobalUsinProductive";

import { ChartsDashboardHorizontal } from "src/components/Charts";
import { ChartsDashboard } from "src/components/Charts";

// QUERYS
import { columnsDevices } from "src/constants/columns";
import { getUserCookie } from "src/services/session";
import { getDashboard, getCapacities } from "src/store/actions/users";
import { getDeletedDevices } from "src/store/actions/devices";
import { numbers } from "src/helpers/utils";

// COMPONENTS / LIBS DE ESTILOS
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Button,
  Typography,
  Modal,
  Card,
} from "@mui/material";
import AlertPercentageForm from "src/components/AlertPercentageForm";
import { PaymentWarn } from "src/components/PaymentWarn";
import { MayaWatchPro } from "src/components/MayaWatchPro";
import { BigNumber, BigNumberDashboard } from "src/components/BigNumber";

// ASSETS
import {
  AccountCircle,
  AlignVerticalTop,
  BrandingWatermark,
  ThumbDownOffAlt,
  ThumbUpOffAlt,
  Warning,
  DownloadForOffline,
  Cancel,
  ElectricBolt,
} from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { LoadingSkeletonBigNumbers } from "src/components/Loading";

export default function Dashboard() {
  const navigate = useNavigate();

  // PROPS DE CONTROLLER
  const { useUuid, useName, profileLevel, useTypeMember } = getUserCookie();

  if (profileLevel !== "admin") {
    navigate("/dashboard/devices");
  }

  // ESTADOS DE QUERIES
  const dispatch = useDispatch();
  const {
    isLoading,
    brands,
    blUuids,
    dataDevices,
    generationBelowEstimated,
    alerts,
    offline,
    online,
    capacity,
    selectedUser,
    //useCodePagarMe
  } = useSelector((state) => state.users);
  const { devicesDeleted } = useSelector((state) => state.devices);

  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [type, setType] = useState(1);
  const [emittedCarbon, setEmittedCarbon] = useState(0);
  const [capacityTotal, setCapacityTotal] = useState(0);
  const [action, setAction] = useState("");
  const [isLoadingReport, setIsLoadingReport] = useState(true);
  const [realGenerationTotal, setRealGenerationTotal] = useState("");
  const [estimatedGenerationTotal, setEstimatedGenerationTotal] = useState("");
  const [realGeneration, setRealGeneration] = useState(0);
  const [estimatedGeneration, setEstimatedGeneration] = useState(0);

  function handleChangeColumns(type) {
    setType(type);
    switch (type) {
      case 1:
        setData(dataDevices);
        break;
      case 2:
        setData(
          brands.map((data) => {
            let brandItem = { brand: data };
            return brandItem;
          })
        );
        break;
      case 3:
        setData(generationBelowEstimated);
        break;
      case 4:
        setData(alerts);
        break;
      case 5:
        setData(offline);
        break;
      case 6:
        setData(online);
        break;
      default:
        break;
    }
  }

  function handleRealGenerationTotal(devices) {
    let generationRealMonth = devices.map((data) => {
      let generationRealValue = Number(
        data.generationRealMonth.replace(/\Kwh/g, "")
      );
      return generationRealValue;
    });
    let generationRealMonthTotal = (
      generationRealMonth.reduce((total, element) => total + element, 0) / 1000
    ).toFixed(2);
    setRealGenerationTotal(generationRealMonthTotal);
  }

  function handleEstimatedGenerationTotal(devices) {
    let generationEstimatedMonth = devices.map((data) => {
      let generationEstimatedValue = Number(
        data.generationEstimatedMonth.replace(/\Kwh/g, "")
      );
      return generationEstimatedValue;
    });
    let generationEstimatedMonthTotal = (
      generationEstimatedMonth.reduce((total, element) => total + element, 0) /
      1000
    ).toFixed(2);

    setEstimatedGenerationTotal(generationEstimatedMonthTotal);
  }

  function handleReportGeneration(action) {
    if (useTypeMember) {
      reportAdministratorRule(capacity, dataDevices, setIsLoadingReport);
    } else if (action) {
      setAction(action);
    } else {
      setOpen(!open);
      setAction("");
    }
  }

  useEffect(() => {
    selectedUser.length != 0
      ? dispatch(getDashboard(selectedUser[0]?.useUuidState))
      : dispatch(getDashboard(useUuid));
  }, [useUuid]);

  useEffect(() => {
    dispatch(getCapacities(blUuids));
  }, [blUuids]);

  useEffect(() => {
    if (dataDevices.length !== 0) {
      setData(dataDevices);
      setColumns(columnsDevices);
    }
  }, [dataDevices]);

  useEffect(() => {
    handleRealGenerationTotal(data);
    handleEstimatedGenerationTotal(data);

    let realGenerationTempArray = dataDevices.map((data) => {
      let generationRealValue = Number(data.capacity.replace(/\MWp/g, ""));
      return generationRealValue;
    });
    setCapacityTotal(
      numbers(
        realGenerationTempArray
          .reduce((total, element) => total + element, 0)
          .toFixed("2")
      )
    );
    setEmittedCarbon(
      numbers(
        realGenerationTempArray
          .reduce((total, element) => total + element, 0)
          .toFixed("2")
      )
    );
  }, [data]);

  useEffect(() => {
    type == 2 ? setColumns([columnsDevices[2]]) : setColumns(columnsDevices);
  }, [type]);

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          my: 3,
          ml: 3,
        }}
      >
        <ToolTipNoAccess useTypeMember={useTypeMember}>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "220px" }}
          >
            <Button
              startIcon={<DownloadForOffline fontSize="small" />}
              variant={useTypeMember ? "outlined" : ""}
              onClick={() => handleReportGeneration()}
            >
              {isLoadingReport ? (
                "Preparar relatório"
              ) : (
                <PDFDownloadLink
                  document={<AdministratorReport />}
                  fileName="relatório-integrador.pdf"
                  style={{ textDecoration: "none" }}
                >
                  {({ blob, url, loading, error }) =>
                    useTypeMember
                      ? loading
                        ? "Carregando relatório..."
                        : "Relatório Integrador"
                      : "Relatório indisponível"
                  }
                </PDFDownloadLink>
              )}
            </Button>
          </Box>
        </ToolTipNoAccess>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "80%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              my: 2,
            }}
          >
            <Typography variant="h4">Minhas usinas</Typography>
            <Typography
              sx={{
                lineHeight: "100%",
                py: 2,
                fontWeight: "bold",
                ml: 2,
                fontSize: "20px",
              }}
            >
              Hoje, {moment().format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              p: 4,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Grid item sm={12} lg={3}>
              {isLoading ? (
                <LoadingSkeletonBigNumbers />
              ) : (
                <BigNumber
                  title="Produzido (MWh)"
                  value={`${numbers(realGenerationTotal)}MWh`}
                  icon={<ElectricBolt />}
                />
              )}
            </Grid>
            <Grid item sm={12} lg={3}>
              {isLoading ? (
                <LoadingSkeletonBigNumbers />
              ) : (
                <BigNumber
                  title="Esperado (MWh)"
                  value={`${numbers(estimatedGenerationTotal)}MWh`}
                  icon={<ElectricBolt />}
                />
              )}
            </Grid>
            <Grid item sm={12} lg={3}>
              {isLoading ? (
                <LoadingSkeletonBigNumbers />
              ) : (
                <BigNumber
                  title="Desempenho"
                  value={
                    (
                      (realGenerationTotal / estimatedGenerationTotal) *
                      100
                    ).toFixed() + "%"
                  }
                  icon={<ElectricBolt />}
                />
              )}
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "80%",
            my: 8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              my: 2,
            }}
          >
            <Typography variant="h4">Total produzido</Typography>
            <Typography
              sx={{
                lineHeight: "100%",
                py: 2,
                fontWeight: "bold",
                ml: 2,
                fontSize: "20px",
              }}
            >
              Hoje, {moment().format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Typography sx={{ my: 4 }}>
            {`Prezado ${useName} sua produtivade hoje é ${numbers(
              realGenerationTotal
            )}MWh`}
          </Typography>
          <Card sx={{ p: 4 }}>
            <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
              {`Para este mês suas usinas devem produzir ${numbers(
                estimatedGenerationTotal
              )}MWh, 
            no momento você está ${numbers(realGenerationTotal)}MWh.
            Isto corresponde a um desempenho de ${(
              (realGenerationTotal / estimatedGenerationTotal) *
              100
            ).toFixed()}% `}
            </Typography>
          </Card>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "84%",
            my: 4,
          }}
        >
          <Typography variant="h4">Resumo de usinas</Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: "100%", py: 2, fontWeight: "bold", ml: 2 }}
          >
            {moment().format("DD/MM/YYYY")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <BigNumberDashboard
            title="Dispositivos/usuário"
            value={dataDevices.length !== 0 ? dataDevices.length : 0}
            icon={<AccountCircle />}
            type={1}
            activeBtn={type === 1 ? true : false}
            handleChangeColumns={(type) => handleChangeColumns(type)}
          />

          <BigNumberDashboard
            title="Marcas"
            value={brands.length !== 0 ? brands.length : 0}
            icon={<BrandingWatermark />}
            type={2}
            activeBtn={type === 2 ? true : false}
            handleChangeColumns={(type) => handleChangeColumns(type)}
          />
          <BigNumberDashboard
            title="Capacidade total Usinas"
            value={`${capacityTotal}MWp`}
            icon={<AlignVerticalTop />}
            type={3}
            activeBtn={type === 3 ? true : false}
            handleChangeColumns={(type) => handleChangeColumns(type)}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          mt: 3,
        }}
      >
        <BigNumberDashboard
          title="Online"
          value={online.length !== 0 ? online.length : 0}
          icon={<ThumbUpOffAlt />}
          type={6}
          activeBtn={type === 6 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
        <BigNumberDashboard
          title="Offline"
          value={offline.length !== 0 ? offline.length : 0}
          icon={<ThumbDownOffAlt />}
          type={5}
          activeBtn={type === 5 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />

        <BigNumberDashboard
          title="Plantas em Alerta"
          value={alerts.length !== 0 ? alerts.length : 0}
          icon={<Warning />}
          type={4}
          activeBtn={type === 4 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />

        {/* <BigNumberDashboard
          title="Economia de carbono emitido"
          value={`${emittedCarbon} CO₂`}
          icon={<AlignVerticalTop />}
          type={3}
          activeBtn={type === 3 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
      */}
      </Box>
      <GlobalUsinProductive
        dataDevices={dataDevices}
        isLoading={isLoading}
        setEstimatedGeneration={setEstimatedGeneration}
        setRealGeneration={setRealGeneration}
      />
      {/* 
        Gráfico horizontal/Gráfico vertical

        <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mt: 10}}>
          <ChartsDashboardHorizontal dataDevices={dataDevices} />
          <ChartsDashboard dataDevices={dataDevices} />
        </Box>
        
      */}
      <Modal
        open={open}
        onClose={handleReportGeneration}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            pb: 6,
            px: 4,
            bgcolor: "background.paper",
            borderRadius: 1,
            border: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              py: 4,
            }}
          >
            <Cancel
              fontSize="large"
              onClick={() => setOpen(!open)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          {action == "assignPlan" ? (
            <MayaWatchPro />
          ) : (
            <PaymentWarn handleReportGeneration={handleReportGeneration} />
          )}
        </Box>
      </Modal>
    </>
  );
}
