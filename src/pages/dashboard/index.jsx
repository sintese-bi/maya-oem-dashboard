// IMPORTS
import { useEffect, useState, useRef, useContext } from "react";
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
import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Grid,
  Modal,
} from "@mui/material";
import { TopUsins } from "src/components/dashboard/top-usins/topUsins";
import { PaymentWarn } from "src/components/shared/PaymentWarn";
import { MayaWatchPro } from "src/components/shared/MayaWatchPro";

// ASSETS
import { Cancel } from "@mui/icons-material";
import moment from "moment";
import { MyDevices } from "src/components/dashboard/my-devices/my-devices";
import { DashboardHeader } from "src/components/dashboard/dashboard-header/dashboard-header";
import { bigNumberSum } from "src/store/actions/devices";
import { LocationUsins } from "src/components/dashboard/location-usins/locationUsins";
import { MyUsins } from "src/components/dashboard/my-usins/myUsins";
import { ListUsins } from "src/components/dashboard/list-usins/listUsins";
import { PeriodDataUsins } from "src/components/dashboard/period-data-usins/periodDataUsins";
import AlertDevices from "src/components/alerts/AlertDevices";
import { BigNumbers } from "src/components/dashboard/big-numbers/bigNumbers";
import { DashboardContext } from "src/contexts/dashboard-context";

export default function Dashboard() {
  const {
    monthEconomyTotal,
    treesSavedTotal,
    handleGenerationTotalValues,
    handleGenerationFilteredValues,
  } = useContext(DashboardContext);
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

  // valores de geração de allDevices

  const [realGenerationValueDataDevices, setRealGenerationValueDataDevices] =
    useState(0);
  const [
    estimatedGenerationValueDataDevices,
    setEstimatedGenerationValueDataDevices,
  ] = useState(0);
  const [monthEconomy, setMonthEconomy] = useState("");
  const [treesSaved, setTreesSaved] = useState("");

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
        optionFilter
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
      const generationReal = allDevices.reduce(
        (total, element) => total + element.generationRealMonth,
        0
      );
      const generationEstimated = allDevices.reduce(
        (total, element) => total + element.generationEstimatedMonth,
        0
      );

      handleGenerationTotalValues({
        realGenerationTotal: generationReal,
        estimatedGenerationTotal: generationEstimated,
        monthEconomyTotal: (generationReal * 0.58).toFixed(2),
        treesSavedTotal: (generationReal * 0.000504).toFixed(2),
      });

      setData(allDevices);
      setRealGenerationValueDataDevices(generationReal);
      setMonthEconomy((generationReal * 0.58).toFixed(2));
      setTreesSaved((generationReal * 0.000504).toFixed(2));
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
    }

    let capacityTotal = allDevices.map((data) => {
      let capacityRealValue = data.capacity;
      return capacityRealValue;
    });
    setCapacityTotal(
      numbers(
        capacityTotal
          .reduce((total, element) => total + element, 0)
          .toFixed("2"),
        "KWp"
      )
    );
  }, [dataDevices, bignumbersumValues]);

  useEffect(() => {
    setPercent(((realGeneration / estimatedGeneration) * 100).toFixed());
  }, [realGeneration, estimatedGeneration]);

  useEffect(() => {
    if (graphData.data !== undefined) {
      let generationRealMonthTemp = Object.values(
        graphData.data.somaPorDiaReal
      ).reduce((total, element) => total + element, 0);
      let realGenerationFiltered = generationRealMonthTemp.toFixed(2);

      let generationEstimatedMonthTemp = Object.values(
        graphData.data.somaPorDiaEstimada
      ).reduce((total, element) => total + element, 0);
      let estimatedGenerationFiltered = generationEstimatedMonthTemp.toFixed(2);

      let percentGenerationFiltered = (
        (realGenerationFiltered / estimatedGenerationFiltered) *
        100
      ).toFixed();

      handleGenerationFilteredValues({
        realGenerationFiltered,
        estimatedGenerationFiltered,
        percentGenerationFiltered,
      });
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
      <Grid
        container
        spacing={4}
        sx={{
          width: "89vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 6,
        }}
      >
        <Grid
          item
          xs={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 2,
            height: "100%",
          }}
        >
          <MyUsins
            realGeneration={realGeneration}
            estimatedGeneration={estimatedGeneration}
            percent={percent}
            allDevices={allDevices}
            brands={brands}
            notDefined={notDefined}
            unactived={unactived}
            online={online}
            offline={offline}
            alerts={alerts}
            type={type}
            handleChangeColumns={setType}
          />
          <BigNumbers
            allDevices={allDevices}
            notDefined={notDefined}
            unactived={unactived}
            offline={offline}
            capacityTotal={capacity}
            realGenerationValueDataDevices={realGenerationValueDataDevices}
            handleChangeColumns={setType}
            monthEconomy={monthEconomy}
            treesSaved={treesSaved}
          />
        </Grid>
        <Grid item xs={7} sx={{ height: 620 }}>
          <LocationUsins />
        </Grid>

        {/*<MyDevices
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
        />*/}
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          width: "89vw",
          display: "flex",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Grid item xs={12}></Grid>
      </Grid>
      <Box
        sx={{
          width: "89vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          mb: 6,
        }}
      >
        <ListUsins data={data} devicesTableRef={devicesTableRef} type={type} />
        <PeriodDataUsins
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          optionFilter={optionFilter}
          setOptionFilter={setOptionFilter}
          adminGraphRef={adminGraphRef}
          realGenerationTotal={realGenerationTotal}
          estimatedGenerationTotal={estimatedGenerationTotal}
          percentTotal={percentTotal}
          isLoadingReportGeneration={isLoadingReportGeneration}
          useTypeMember={useTypeMember}
          handleReportGeneration={handleReportGeneration}
        />
        <AlertDevices />
      </Box>
      {/*<TotalMonth
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
      />*/}
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
