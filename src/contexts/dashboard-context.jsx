import moment from "moment";
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
  genrealdayDevicelasthour,
  genrealdaylasthour,
} from "src/store/actions/devices";
import {
  brandInfo,
  getAllDevices,
  getAllDevicesFromUser,
  getCapacities,
  getDashboard,
  invoiceValues,
  massEmail,
  reportCounting,
} from "src/store/actions/users";

export const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
  const [isLoadingReportGeneration, setIsLoadingReportGeneration] =
    useState(true);

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
  const [monthEconomyTotal, setMonthEconomyTotal] = useState(0);
  const [treesSavedTotal, setTreesSavedTotal] = useState(0);

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

  function handleGetAllDevicesFromUserRequest() {
    dispatch(getAllDevicesFromUser({ use_uuid }));
  }

  function handleBrandInfoRequest() {
    dispatch(brandInfo({ use_uuid }));
  }

  function handleInvoiceValuesRequest() {
    dispatch(invoiceValues({ use_uuid }));
  }

  function handleMassEmail() {
    dispatch(massEmail());
    handleReportCountingRequest();
  }

  function handleReportCountingRequest() {
    dispatch(reportCounting({ use_uuid }));
  }

  // funções para guardar os estados dos valores de gerações e cálculos

  function handleGenerationTotalValues(props) {
    setRealGenerationTotal(props.realGenerationTotal);
    setEstimatedGenerationTotal(props.estimatedGenerationTotal);
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

  function handleAdminReportGeneration(props) {
    let startDateReport = moment(startDate).format("YYYY-MM-DD");
    let endDateReport = moment(endDate).format("YYYY-MM-DD");
    reportAdministratorRule(
      devicesAPIData.bignumbersumValues,
      usersAPIData.capacity,
      realGenerationTotal,
      estimatedGenerationTotal,
      usersAPIData.dataDevices,
      usersAPIData.allDevices,
      percentLastDay,
      startDateReport,
      endDateReport,
      optionFilter,
      setIsLoadingReportGeneration
    );
  }

  function handleUsinsByStateData() {
    let devicesWithAddress = usersAPIData.allDevices.filter(
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

  useEffect(() => {
    set_use_uuid(
      usersAPIData.selectedUser.length != 0
        ? usersAPIData.selectedUser[0]?.useUuidState
        : userData?.useUuid
    );
  }, [userData?.useUuid, usersAPIData.selectedUser]);

  useEffect(() => {
    dispatch(genrealdaylasthour({ use_uuid }));
    handleBigNumberSumRequest();
    handleGetDashboardRequest();
    handleGetAllDevicesRequest();
    handleGetAllDevicesFromUserRequest();
    handleBrandInfoRequest();
    handleReportCountingRequest();
    handleInvoiceValuesRequest();
  }, [use_uuid]);

  useEffect(() => {
    dispatch(getCapacities(usersAPIData.blUuids));
  }, [usersAPIData.blUuids]);

  useEffect(() => {
    if (usersAPIData.allDevices.length !== 0) {
      const generationReal = usersAPIData.allDevices.reduce(
        (total, element) => total + element.generationRealMonth,
        0
      );
      const generationEstimated = usersAPIData.allDevices.reduce(
        (total, element) => total + element.generationEstimatedMonth,
        0
      );

      handleGenerationTotalValues({
        realGenerationTotal: generationReal,
        estimatedGenerationTotal: generationEstimated,
        monthEconomyTotal: (generationReal * 0.96).toFixed(2),
        treesSavedTotal: (generationReal * 0.000504).toFixed(2),
      });

      setData(usersAPIData.allDevices);
    }

    handleUsinsByStateData();
  }, [usersAPIData.allDevices]);

  useEffect(() => {
    if (usersAPIData.graphData.totalByDate !== undefined) {
      //formato = {"data":"valor"}

      let sumPerDayRealGeneration =
        usersAPIData.graphData.totalByDate.somaPorDiaReal;
      let sumPerDayEstimatedGeneration =
        usersAPIData.graphData.totalByDate.somaPorDiaEstimada;

      //pegando apenas os valores

      let sumPerDayRealGenerationValues = Object.values(
        sumPerDayRealGeneration
      );
      let sumPerDayEstimatedGenerationValues = Object.values(
        sumPerDayEstimatedGeneration
      );

      //usando reduce para somar todos os valores

      let generationRealMonthTemp = sumPerDayRealGenerationValues.reduce(
        (total, element) => total + element,
        0
      );

      let generationEstimatedMonthTemp =
        sumPerDayEstimatedGenerationValues.reduce(
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

  useEffect(() => {}, [usersAPIData.selectedUser]);

  useEffect(() => {
    if (devicesAPIData.bignumbersumValues.realGeneration !== undefined) {
      let lastRealGenerationDay =
        devicesAPIData.bignumbersumValues.realGeneration[
          `${moment().format("YYYY-MM-DD")}`
        ];
      let lastEstimatedGenerationDay =
        devicesAPIData.bignumbersumValues.estimatedGeneration[
          `${moment().format("YYYY-MM-DD")}`
        ];

      let lastPercentGenerationDay = (
        (lastRealGenerationDay / lastEstimatedGenerationDay) *
        100
      ).toFixed();

      handleGenerationLastDayValues({
        realGenerationLastDay: lastRealGenerationDay.toFixed(2),
        estimatedGenerationLastDay: lastEstimatedGenerationDay.toFixed(2),
        percentLastDay: lastPercentGenerationDay,
      });
    }
  }, [devicesAPIData.bignumbersumValues]);

  useEffect(() => {
    setInterval(() => {
      handleBrandInfoRequest();
    }, 18e5);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        isLoadingReportGeneration,
        data,
        type,
        userData,
        usersAPIData,
        startDate,
        endDate,
        optionFilter,
        realGenerationTotal,
        estimatedGenerationTotal,
        monthEconomyTotal,
        treesSavedTotal,
        realGenerationFiltered,
        estimatedGenerationFiltered,
        percentGenerationFiltered,
        realGenerationLastDay,
        estimatedGenerationLastDay,
        percentLastDay,
        usinsByState,
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
