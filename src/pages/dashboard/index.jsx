// IMPORTS
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reportAdministratorRule } from "src/reports/reportsRules/reportAdministratorRule";
import { TotalMonth } from "src/components/dashboard/total-month/total-month";

// QUERYS
import { getUserCookie } from "src/services/session";
import {
  getDashboard,
  getCapacities,
  getAllDevices,
} from "src/store/actions/users";
import { numbers } from "src/helpers/utils";

// COMPONENTS / LIBS DE ESTILOS
import { Backdrop, Box, CircularProgress, Modal } from "@mui/material";
import { PaymentWarn } from "src/components/shared/PaymentWarn";
import { MayaWatchPro } from "src/components/shared/MayaWatchPro";

// ASSETS
import { Cancel } from "@mui/icons-material";
import moment from "moment";
import { MyDevices } from "src/components/dashboard/my-devices/my-devices";
import { DashboardHeader } from "src/components/dashboard/dashboard-header/dashboard-header";
import { bigNumberSum } from "src/store/actions/devices";

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
    isAllDevicesDataLoading,
    isLoadingGraph,
    brands,
    blUuids,
    dataDevices,
    allDevices,
    alerts,
    offline,
    online,
    notDefined,
    unactived,
    capacity,
    selectedUser,
    graphData,
  } = useSelector((state) => state.users);

  const { bignumbersumValues } = useSelector((state) => state.devices);

  const devicesTableRef = useRef(null);

  const [type, setType] = useState(null);

  const adminGraphRef = useRef(null);

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [capacityTotal, setCapacityTotal] = useState(0);
  const [isLoadingReportGeneration, setIsLoadingReportGeneration] =
    useState(true);

  // valores de geração de dataDevices

  const [realGenerationValueDataDevices, setRealGenerationValueDataDevices] =
    useState(0);
  const [
    estimatedGenerationValueDataDevices,
    setEstimatedGenerationValueDataDevices,
  ] = useState(0);

  // valores de geração real, estimada e porcentagem, referentes ao - MÊS -

  const [percentTotal, setPercentTotal] = useState(0);
  const [realGenerationTotal, setRealGenerationTotal] = useState(0);
  const [estimatedGenerationTotal, setEstimatedGenerationTotal] = useState(0);

  // valores de geração real, estimada e porcentagem, referentes ao - ÚLTIMO DIA -

  const [percent, setPercent] = useState(0);
  const [realGeneration, setRealGeneration] = useState(0);
  const [estimatedGeneration, setEstimatedGeneration] = useState(0);

  // datas para requisições com período de tempo

  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [optionFilter, setOptionFilter] = useState("days");

  // funções

  function handleRealGenerationTotal() {
    let generationRealMonthTemp = Object.values(
      graphData.data.somaPorDiaReal
    ).reduce((total, element) => total + element, 0);
    let generationRealMonthTotalTemp = generationRealMonthTemp.toFixed(2);

    setRealGenerationTotal(generationRealMonthTotalTemp);
  }

  function handleEstimatedGenerationTotal() {
    let generationEstimatedMonthTemp = Object.values(
      graphData.data.somaPorDiaEstimada
    ).reduce((total, element) => total + element, 0);
    let generationEstimatedMonthTotalTemp =
      generationEstimatedMonthTemp.toFixed(2);

    setEstimatedGenerationTotal(generationEstimatedMonthTotalTemp);
  }

  // função para capturar os valores do relatório administrador

  function handleReportGeneration(action) {
    let startDateReport = moment(startDate).format("YYYY-MM-DD");
    let endDateReport = moment(endDate).format("YYYY-MM-DD");
    if (useTypeMember) {
      reportAdministratorRule(
        graphData,
        capacity,
        realGenerationTotal,
        estimatedGenerationTotal,
        dataDevices,
        allDevices,
        percent,
        startDateReport,
        endDateReport,
        optionFilter,
        setIsLoadingReportGeneration,
        adminGraphRef
      );
    } else if (action) {
      setAction(action);
    } else {
      setOpen(!open);
      setAction("");
    }
  }

  // useEffects
  useEffect(() => {
    if (selectedUser.length != 0) {
      dispatch(bigNumberSum(selectedUser[0]?.useUuidState));
      dispatch(
        getDashboard(selectedUser[0]?.useUuidState, "index.jsx - selectedUser")
      );
      dispatch(
        getAllDevices(selectedUser[0]?.useUuidState, "index.jsx - normal")
      );
    } else {
      dispatch(bigNumberSum(useUuid));
      dispatch(getDashboard(useUuid, "index.jsx - normal"));
      dispatch(getAllDevices(useUuid, "index.jsx - normal"));
    }
  }, [useUuid]);

  useEffect(() => {
    dispatch(getCapacities(blUuids));
  }, [blUuids]);

  useEffect(() => {
    if (allDevices.length !== 0) {
      setData(allDevices);
    }
  }, [allDevices]);

  useEffect(() => {
    if (bignumbersumValues.somaPorDiaReal !== undefined) {
      setRealGeneration(
        bignumbersumValues.somaPorDiaReal[
          `${moment().format("YYYY-MM-DD")}`
        ].toFixed(2)
      );
      setEstimatedGeneration(
        bignumbersumValues.somaPorDiaEstimada[
          `${moment().format("YYYY-MM-DD")}`
        ].toFixed(2)
      );
      let realGeneration = Object.values(bignumbersumValues.somaPorDiaReal)
        .reduce((total, element) => total + element, 0)
        .toFixed(2);
      let estimatedGeneration = Object.values(
        bignumbersumValues.somaPorDiaEstimada
      )
        .reduce((total, element) => total + element, 0)
        .toFixed(2);

      setRealGenerationValueDataDevices(realGeneration);
      setEstimatedGenerationValueDataDevices(estimatedGeneration);
    }

    let realGenerationTempArray = dataDevices.map((data) => {
      let generationRealValue = data.generationRealMonth;
      return generationRealValue;
    });
    setCapacityTotal(
      numbers(
        realGenerationTempArray
          .reduce((total, element) => total + element, 0)
          .toFixed("2"),
        "KWh"
      )
    );
  }, [dataDevices, bignumbersumValues]);

  useEffect(() => {
    setPercent(((realGeneration / estimatedGeneration) * 100).toFixed());
  }, [realGeneration, estimatedGeneration]);

  useEffect(() => {
    if (graphData.data !== undefined) {
      handleRealGenerationTotal();
      handleEstimatedGenerationTotal();
    }
  }, [graphData]);

  useEffect(() => {
    let percentValue = (
      (realGenerationTotal / estimatedGenerationTotal) *
      100
    ).toFixed();
    setPercentTotal(percentValue);
  }, [realGenerationTotal, estimatedGenerationTotal]);

  // condição de carregamento, caso os dados da dashboard n estejam pronto, uma tela de carregamento é acionada

  if (isAllDevicesDataLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isAllDevicesDataLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <DashboardHeader
        label={"Apresentção do usuário / botão para download de relatório"}
        isLoadingReportGeneration={isLoadingReportGeneration}
        useTypeMember={useTypeMember}
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
        <MyDevices
          label={"Minhas Usinas"}
          isLoadingGraph={isLoadingGraph}
          realGeneration={realGeneration}
          estimatedGeneration={estimatedGeneration}
          realGenerationValueDataDevices={realGenerationValueDataDevices}
          estimatedGenerationValueDataDevices={
            estimatedGenerationValueDataDevices
          }
          percent={percent}
          type={type}
          handleChangeColumns={setType}
          dataDevices={dataDevices}
          allDevices={allDevices}
          brands={brands}
          capacityTotal={capacityTotal}
          notDefined={notDefined}
          unactived={unactived}
          online={online}
          offline={offline}
          alerts={alerts}
        />
      </Box>
      <TotalMonth
        optionFilter={optionFilter}
        setOptionFilter={setOptionFilter}
        useName={useName}
        type={type}
        realGenerationTotal={realGenerationTotal}
        estimatedGenerationTotal={estimatedGenerationTotal}
        percentTotal={percentTotal}
        dataDevices={dataDevices}
        allDevices={allDevices}
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
        adminGraphRef={adminGraphRef}
        setIsLoadingReportGeneration={setIsLoadingReportGeneration}
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
