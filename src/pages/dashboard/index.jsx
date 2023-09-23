// IMPORTS
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AdministratorReport } from "src/reports/AdministratorReport";
import { reportAdministratorRule } from "src/reports/reportsRules/reportAdministratorRule";
import { ToolTipNoAccess } from "src/components/ToolTipNoAccess";

import { GlobalUsinProductive } from "src/components/GlobalUsinProductive";

// QUERYS
import { columnsDevices } from "src/constants/columns";
import { getUserCookie } from "src/services/session";
import { getDashboard, getCapacities } from "src/store/actions/users";
import { numbers } from "src/helpers/utils";

// COMPONENTS / LIBS DE ESTILOS
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Button,
  Typography,
  Modal,
  Card,
} from "@mui/material";
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
import moment from "moment";
import { LoadingSkeletonBigNumbers } from "src/components/Loading";
import { UserDivcesLastDayInfo } from "src/components/dashboard-components/user-devices-last-day-info";
import { UserDevicesTotalInfo } from "src/components/dashboard-components/user-devices-total-info";
import { UserDevicesResume } from "src/components/dashboard-components/user-devices-resume";
import { DashboardHeader } from "src/components/dashboard-components/dashboard-header";

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
    isLoadingGraph,
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

  const devicesTableRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [type, setType] = useState(1);
  const [emittedCarbon, setEmittedCarbon] = useState(0);
  const [capacityTotal, setCapacityTotal] = useState(0);
  const [action, setAction] = useState("");
  const [isLoadingReport, setIsLoadingReport] = useState(true);

  // valores de geração real, estimada e porcentagem, referentes ao - MÊS -

  const [realGenerationTotal, setRealGenerationTotal] = useState(0);
  const [estimatedGenerationTotal, setEstimatedGenerationTotal] = useState(0);
  const [percentTotal, setPercentTotal] = useState(0);

  // valores de geração real, estimada e porcentagem, referentes ao - ÚLTIMO DIA -

  const [realGeneration, setRealGeneration] = useState(0);
  const [estimatedGeneration, setEstimatedGeneration] = useState(0);
  const [percent, setPercent] = useState(0);

  // datas para requisições com período de tempo

  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

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
    devicesTableRef.current.scrollIntoView();
  }

  function handleRealGenerationTotal(devices) {
    let generationRealMonth = devices.map((data) => {
      let generationRealValue = Number(
        data.generationRealMonth?.replace(/\Kwh/g, "")
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
        data.generationEstimatedMonth?.replace(/\Kwh/g, "")
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
      ? dispatch(
          getDashboard(
            selectedUser[0]?.useUuidState,
            "index.jsx - selectedUser"
          )
        )
      : dispatch(getDashboard(useUuid, "index.jsx - normal"));
  }, []);

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
    handleRealGenerationTotal(dataDevices);
    handleEstimatedGenerationTotal(dataDevices);

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
  }, [dataDevices]);

  useEffect(() => {
    let percentValue = (
      (realGenerationTotal / estimatedGenerationTotal) *
      100
    ).toFixed();
    setPercentTotal(percentValue);
  }, [realGenerationTotal, estimatedGenerationTotal]);

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
      <DashboardHeader
        label={"Apresentção do usuário / botão para download de relatório"}
        isLoadingReport={isLoadingReport}
        useTypeMember={useTypeMember}
        useName={useName}
        handleReportGeneration={handleReportGeneration}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <UserDivcesLastDayInfo
          label={"Minhas Usinas"}
          isLoading={isLoadingGraph}
          realGeneration={realGeneration}
          estimatedGeneration={estimatedGeneration}
          percent={percent}
        />
        <UserDevicesTotalInfo
          label={"Total produzido este mês"}
          useName={useName}
          realGenerationTotal={realGenerationTotal}
          estimatedGenerationTotal={estimatedGenerationTotal}
          percentTotal={percentTotal}
        />
        <UserDevicesResume
          label={"Resumo de usinas"}
          type={type}
          handleChangeColumns={handleChangeColumns}
          dataDevices={dataDevices}
          brands={brands}
          capacityTotal={capacityTotal}
          online={online}
          offline={offline}
          alerts={alerts}
        />
      </Box>
      <GlobalUsinProductive
        realGenerationTotal={realGenerationTotal}
        estimatedGenerationTotal={estimatedGenerationTotal}
        percentTotal={percentTotal}
        dataDevices={dataDevices}
        data={data}
        isLoading={isLoading}
        setEstimatedGeneration={setEstimatedGeneration}
        setRealGeneration={setRealGeneration}
        setPercent={setPercent}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        devicesTableRef={devicesTableRef}
      />
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
