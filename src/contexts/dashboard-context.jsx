import { createContext, useState } from "react";
import { reportAdministratorRule } from "src/reports/reportsRules/reportAdministratorRule";

export const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
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

  function handleGenerationTotalValues(props) {
    setRealGenerationTotal(props.realGenerationTotal);
    setEstimatedGenerationTotal(props.estimatedGenerationTotal);
    setMonthEconomyTotal(props.monthEconomyTotal);
    setTreesSavedTotal(props.treesSavedTotal);

    console.log(props);
  }

  function handleGenerationLastDayValues(props) {
    setRealGenerationLastDay(props.realGenerationLastDay);
    setEstimatedGenerationLastDay(props.estimatedGenerationLastDay);
    setPercentLastDay(props.percentLastDay);

    console.log(props);
  }

  function handleGenerationFilteredValues(props) {
    setRealGenerationFiltered(props.realGenerationFiltered);
    SetEstimatedGenerationFiltered(props.estimatedGenerationFiltered);
    SetPercentGenerationFiltered(props.percentGenerationFiltered);

    console.log(props);
  }

  function handleAdminReportGeneration(props) {
    reportAdministratorRule(
      props.graphData,
      props.capacity,
      realGenerationTotal,
      estimatedGenerationTotal,
      props.dataDevices,
      props.allDevices,
      percentLastDay,
      props.startDateReport,
      props.endDateReport,
      props.optionFilter
    );
  }

  return (
    <DashboardContext.Provider
      value={{
        realGenerationTotal,
        estimatedGenerationTotal,
        monthEconomyTotal,
        treesSavedTotal,
        handleGenerationTotalValues,
        handleGenerationLastDayValues,
        handleGenerationFilteredValues,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
