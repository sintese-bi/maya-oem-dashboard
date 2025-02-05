import moment from "moment";
import { openWebSocketConnection } from "src/services/web-socket";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { brazilStates } from "src/constants/states";
import {
  reportAdministrator,
  reportAdministratorRule,
} from "src/reports/reportsRules/reportAdministratorRule";
import { getUserCookie } from "src/services/session";
import {
  bigNumberSum,
  createDevice,
  genrealdayDevicelasthour,
  genrealdaylasthour,
  gettingReportData,
} from "src/store/actions/devices";
import {
  alertFrequency,
  brandInfo,
  getAllDeletedDevices,
  getAllDevices,
  getAllDevicesFromUser,
  getCapacities,
  getDashboard,
  invoiceValues,
  massEmail,
  massiveReportsStatus,
  patchAlertFrequency,
  portalemailLogins,
  postUseDateReport,
  reportCounting,
  testSSE,
  updateBrands,
  updateLogo,
  uselogo,
} from "src/store/actions/users";

export const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
  const [isLoadingReportGeneration, setIsLoadingReportGeneration] =
    useState(true);

  // devices deletados do usuário

  const [deletedDevices, setDeletedDevices] = useState([]);

  // data serve para guardar os dados principais do dashboard, como todos os devices, e o type é o responsável pela filtragem desses dados

  const [data, setData] = useState([]);
  const [type, setType] = useState(null);

  // datas para requisições com período de tempo

  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [optionFilter, setOptionFilter] = useState("days");

  // valores de geração de allDevices, ou seja, valores totais de geração

  const [realGenerationTotal, setRealGenerationTotal] = useState(0);
  const [estimatedGenerationTotal, setEstimatedGenerationTotal] = useState(0);
  const [percentageTotal, setPercentageTotal] = useState(0);
  const [monthEconomyTotal, setMonthEconomyTotal] = useState(0);
  const [treesSavedTotal, setTreesSavedTotal] = useState(0);
  const [capacityTotal, setCapacityTotal] = useState(0);

  // dados de geração do último dia

  const [percentLastDay, setPercentLastDay] = useState(0);
  const [realGenerationLastDay, setRealGenerationLastDay] = useState(0);
  const [estimatedGenerationLastDay, setEstimatedGenerationLastDay] =
    useState(0);

  // dados de geração da data filtrada na produção mensal

  const [realGenerationFiltered, setRealGenerationFiltered] = useState(0);
  const [estimatedGenerationFiltered, SetEstimatedGenerationFiltered] =
    useState(0);
  const [percentGenerationFiltered, SetPercentGenerationFiltered] = useState(0);

  // dados do usuário vindo to cookies do site
  const userData = getUserCookie();

  // dados de geração com alertas vindo da api externa (saulo/felipe)

  const [devicesGenerationWithAlerts, setDevicesGenerationWithAlerts] =
    useState([]);

  // dados da API
  const dispatch = useDispatch();
  const usersAPIData = useSelector((state) => state.users);
  const devicesAPIData = useSelector((state) => state.devices);

  // dados para gráfico de quantidade de usinas por estado
  const [usinsByState, setUsinsByState] = useState([]);

  // guardar use_uuid atual
  const [use_uuid, set_use_uuid] = useState(userData?.useUuid);

  // funções de chamada de requisição

  function handleBigNumberSumRequest() {
    dispatch(bigNumberSum(use_uuid));
  }

  function handleGetDashboardRequest() {
    dispatch(getDashboard(use_uuid));
  }

  function handleGetAllDevicesRequest() {
    dispatch(getAllDevices(use_uuid));
  }

  function handleMassiveReportsStatusRequest() {
    dispatch(massiveReportsStatus({ use_uuid }));
  }

  function handleGettingReportDataRequest(props) {
    dispatch(gettingReportData(props));
  }

  function handleGetAllDeletedDevicesRequest() {
    dispatch(getAllDeletedDevices(use_uuid));
  }

  function handleGetAllDevicesFromUserRequest() {
    dispatch(getAllDevicesFromUser({ use_uuid }));
  }

  function handleBrandInfoRequest() {
    dispatch(brandInfo({ use_uuid }));
  }

  function handleInvoiceValuesRequest() {
    dispatch(invoiceValues({ use_uuid }));
  }

  function handleGenRealLastHours() {
    dispatch(genrealdaylasthour(use_uuid));
  }

  function handleMassEmail() {
    //dispatch(massEmail({ use_uuid }, handleMassiveReportsStatusRequest));
    dispatch(massEmail({ use_uuid }, handleMassiveReportsStatusRequest));
    handleReportCountingRequest();
  }

  function handleReportCountingRequest() {
    dispatch(reportCounting({ use_uuid }));
  }

  // funções para guardar os estados dos valores de gerações e cálculos

  function handleGenerationTotalValues(props) {
    setRealGenerationTotal(props.realGenerationTotal);
    setEstimatedGenerationTotal(props.estimatedGenerationTotal);
    setPercentageTotal(props.percentage);
    setMonthEconomyTotal(props.monthEconomyTotal);
    setTreesSavedTotal(props.treesSavedTotal);
  }

  function handleGenerationLastDayValues(props) {
    setRealGenerationLastDay(props.realGenerationLastDay);
    setEstimatedGenerationLastDay(props.estimatedGenerationLastDay);
    setPercentLastDay(props.percentLastDay);
  }

  function handleGenerationFilteredValues(props) {
    setRealGenerationFiltered(props.realGenerationFiltered);
    SetEstimatedGenerationFiltered(props.estimatedGenerationFiltered);
    SetPercentGenerationFiltered(props.percentGenerationFiltered);
  }

  function handlePortalEmailLogin(use_alert_email) {
    dispatch(
      portalemailLogins({ use_uuid, use_alert_email }, handleAlertsFrequency)
    );
  }

  function handlePatchAlertFrequency(params) {
    dispatch(
      patchAlertFrequency(
        Object.assign(params, { use_uuid }),
        handleAlertsFrequency
      )
    );
  }

  function handleUseLogo() {
    dispatch(uselogo({ use_uuid }));
  }

  function handleUpdateLogo(file) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("use_uuid", use_uuid);
    dispatch(updateLogo(formData, handleUseLogo));
  }

  function handleAdminReportGeneration(props) {
    let startDateReport = moment(startDate).format("YYYY-MM-DD");
    let endDateReport = moment(endDate).format("YYYY-MM-DD");
    reportAdministratorRule(
      devicesAPIData.bignumbersumValues,
      usersAPIData.capacity,
      realGenerationTotal,
      estimatedGenerationTotal,
      usersAPIData.devices,
      usersAPIData.allDevices,
      percentLastDay,
      startDateReport,
      endDateReport,
      optionFilter,
      setIsLoadingReportGeneration
    );
  }

  function handleTotalCapacity() {
    const capacity = usersAPIData.devices.reduce(
      (total, element) => total + element.capacity,
      0
    );
    setCapacityTotal(capacity.toFixed(2));
  }

  function handleAlertsFrequency() {
    dispatch(alertFrequency(use_uuid));
  }

  function handleCreateDevice(params) {
    dispatch(
      createDevice(Object.assign(params, { use_uuid }), handleBrandInfoRequest)
    );
  }

  function handleUpdateDevice(params) {
    dispatch(
      updateBrands(Object.assign(params, { use_uuid }), handleBrandInfoRequest)
    );
  }

  function handlePostUseDateReport(use_report_date) {
    dispatch(postUseDateReport({ use_uuid, use_report_date }));
    handleMassiveReportsStatusRequest();
  }

  function handleUsinsByStateData() {
    let devicesWithAddress = usersAPIData.devices.filter(
      (data) => data.address !== null && data.address.includes("-")
    );
    let devicesAddressState = brazilStates.map((state) => {
      let amountOfUsins = devicesWithAddress.filter(
        (data) => data.address.split("-")[1] == state.nome
      );
      let stateWithAmountOfUsins = {
        state: state.sigla,
        amountOfUsins,
      };
      return stateWithAmountOfUsins;
    });
    setUsinsByState(devicesAddressState);
  }

  function handleDeletedDevices() {
    setDeletedDevices(usersAPIData.deletedDevices);
  }

  useEffect(() => {
    set_use_uuid(
      usersAPIData.selectedUser.length != 0
        ? usersAPIData.selectedUser[0]?.useUuidState
        : userData?.useUuid
    );
  }, [userData?.useUuid, usersAPIData.selectedUser]);

  useEffect(() => {
    if (usersAPIData?.deletedDevices?.length != 0) {
      handleDeletedDevices();
    }
  }, [usersAPIData?.deletedDevices]);

  useEffect(() => {
    handleMassiveReportsStatusRequest();
    handleGenRealLastHours();
    handleBigNumberSumRequest();
    handleGetDashboardRequest();
    handleGetAllDeletedDevicesRequest();
    handleGetAllDevicesFromUserRequest();
    handleBrandInfoRequest();
    handleReportCountingRequest();
    handleInvoiceValuesRequest();
    handleDeletedDevices();
    handleAlertsFrequency();
    handleUseLogo();
  }, [use_uuid]);

  useEffect(() => {
    dispatch(getCapacities(usersAPIData.blUuids));
  }, [usersAPIData.blUuids]);

  useEffect(() => {
    if (usersAPIData.devices !== undefined) {
      handleTotalCapacity();
    }
  }, [usersAPIData.devices]);

  useEffect(() => {
    if (usersAPIData.devices !== undefined) {
      const generationReal = usersAPIData.devices.reduce(
        (total, element) => total + element.generationRealMonth,
        0
      );
      const generationEstimated = usersAPIData.devices.reduce(
        (total, element) => total + element.generationEstimatedMonth,
        0
      );

      handleGenerationTotalValues({
        realGenerationTotal: generationReal?.toFixed(2),
        estimatedGenerationTotal: generationEstimated?.toFixed(2),
        percentage: ((generationReal / generationEstimated) * 100).toFixed(0),
        monthEconomyTotal: (generationReal * 0.96).toFixed(2),
        treesSavedTotal: (generationReal * 0.000504).toFixed(2),
      });

      setData(usersAPIData.devices);
      handleUsinsByStateData();
    }
  }, [usersAPIData.devices]);

  useEffect(() => {
    if (usersAPIData.graphData?.data !== undefined) {
      const devices = usersAPIData.graphData.data.totalByDate;
      const sortedDates = Object.keys(devices);
      // Mapear as datas para os valores correspondentes

      const sumPerDayRealGeneration = sortedDates.map(
        (data) => devices[data].gen_real
      );

      const sumPerDayEstimatedGeneration = sortedDates.map(
        (data) => devices[data].gen_estimated
      );

      //usando reduce para somar todos os valores

      let generationRealMonthTemp = sumPerDayRealGeneration.reduce(
        (total, element) => total + element,
        0
      );

      let generationEstimatedMonthTemp = sumPerDayEstimatedGeneration.reduce(
        (total, element) => total + element,
        0
      );

      // preparando os valores para obedecerem as condições de formatação da nossa função numbers, precisa ter 2 casas á direita da vírgula

      let realGenerationFiltered = generationRealMonthTemp.toFixed(2);
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
    }
  }, [usersAPIData.graphData]);

  useEffect(() => {
    const { realGeneration, estimatedGeneration } =
    devicesAPIData.bignumbersumValues || {};

    if (realGeneration && estimatedGeneration) {
      const todayKey = moment().format("YYYY-MM-DD");

      const lastRealGenerationDay = realGeneration[todayKey];
      const lastEstimatedGenerationDay = estimatedGeneration[todayKey];

      if (lastRealGenerationDay !== undefined && lastEstimatedGenerationDay !== undefined) {
        const lastPercentGenerationDay = (
          (lastRealGenerationDay / lastEstimatedGenerationDay) *
          100
        ).toFixed();

        handleGenerationLastDayValues({
          realGenerationLastDay: lastRealGenerationDay.toFixed(2),
          estimatedGenerationLastDay: lastEstimatedGenerationDay.toFixed(2),
          percentLastDay: lastPercentGenerationDay,
        });
      }
    }
  }, [devicesAPIData.bignumbersumValues]);

  useEffect(() => {
    if (devicesAPIData.genrealdaylasthourData?.data != undefined) {
      let generationWithAlerts =
        devicesAPIData.genrealdaylasthourData.data.filter(
          (data) => data.alert == 0
        );

      setDevicesGenerationWithAlerts(generationWithAlerts);
    }
  }, [devicesAPIData.genrealdaylasthourData]);

  useEffect(() => {
    setInterval(() => {
      handleBrandInfoRequest();
    }, 6e5);
  }, []);

  useEffect(() => {
    if (usersAPIData.massive_reports_status == "executing") {
      setInterval(() => {
        handleMassiveReportsStatusRequest();
      }, 1e5);
    }
  }, [usersAPIData.massive_reports_status]);

  return (
    <DashboardContext.Provider
      value={{
        isLoadingReportGeneration,
        data,
        type,
        userData,
        usersAPIData,
        devicesAPIData,
        startDate,
        endDate,
        optionFilter,
        realGenerationTotal,
        estimatedGenerationTotal,
        percentageTotal,
        monthEconomyTotal,
        treesSavedTotal,
        realGenerationFiltered,
        estimatedGenerationFiltered,
        percentGenerationFiltered,
        realGenerationLastDay,
        estimatedGenerationLastDay,
        percentLastDay,
        usinsByState,
        devicesGenerationWithAlerts,
        deletedDevices,
        capacityTotal,
        setIsLoadingReportGeneration,
        setData,
        setType,
        setStartDate,
        setEndDate,
        setOptionFilter,
        handleGenerationTotalValues,
        handleGenerationLastDayValues,
        handleGenerationFilteredValues,
        handleAdminReportGeneration,
        handleBrandInfoRequest,
        handleMassEmail,
        handleAlertsFrequency,
        handleGetAllDevicesRequest,
        handleGetAllDeletedDevicesRequest,
        handlePostUseDateReport,
        handleCreateDevice,
        handleUpdateDevice,
        handlePortalEmailLogin,
        handlePatchAlertFrequency,
        handleUpdateLogo,
        handleGetDashboardRequest,
        handleMassiveReportsStatusRequest,
        handleGettingReportDataRequest,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
