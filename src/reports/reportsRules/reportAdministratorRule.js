import { getUserCookie } from "src/services/session";
import { numbers } from "src/helpers/utils";

export const reportAdministrator = {
  date: new Date(),
  capacityTotalValue: "",
  generationRealTotalValue: "",
  generationEstimatedTotalValue: "",
  graphData: {},
  requistionStartDate: "",
  requisitionEndDate: "",
  optionFilter: "",
  percent: "",
  useName: "",
  devicesLength: 0,
  adminGraphRef: "",
  savedtree: "",
  logo: "",
  carbon: "",
  color: "",
};

export function reportAdministratorRule(
  graphData,
  capacity,
  realGeneration,
  estimatedGeneration,
  dataDevices,
  allDevices,
  percent,
  startDateReport,
  endDateReport,
  optionFilter,
  setIsLoadingReport,
  adminGraphRef
) {
  let realGenerationDay = dataDevices.map((data) => {
    let generationRealValue = data.generationRealDay;
    return generationRealValue;
  });

  console.log(graphData);

  reportAdministrator.graphData["realGeneration"] =
    graphData.data.somaPorDiaReal;

  reportAdministrator.generationRealTotalValue = numbers(realGeneration, "KWh");

  let estimatedGenerationDay = dataDevices.map((data) => {
    let generationEstimatedValue = data.generationEstimatedDay;
    return generationEstimatedValue;
  });

  reportAdministrator.graphData["estimatedGeneration"] =
    graphData.data.somaPorDiaEstimada;

  reportAdministrator.generationEstimatedTotalValue = numbers(
    estimatedGeneration,
    "KWh"
  );

  let percentResult = (realGeneration / estimatedGeneration) * 100;
  reportAdministrator.percent = percentResult.toFixed();

  const { useName } = getUserCookie();
  reportAdministrator.useName = useName;

  reportAdministrator.capacityTotalValue = numbers(
    capacity.reduce((total, element) => element + total, 0).toFixed(2),
    "KWp"
  );

  reportAdministrator.devicesLength = allDevices.length;
  reportAdministrator.adminGraphRef = adminGraphRef?.current?.toBase64Image(
    "image/jpeg",
    1
  );

  reportAdministrator.requistionStartDate = startDateReport;
  reportAdministrator.requisitionEndDate = endDateReport;
  reportAdministrator.savedtree = numbers(
    (realGeneration * 1000 * 5.04 * 0.0001 * 1000).toFixed(2),
    ""
  );
  reportAdministrator.logo =
    "https://ucarecdn.com/258f82dc-bf80-4b30-a4be-bcea7118f14a/";
  reportAdministrator.carbon = numbers(
    (Number("0.4190") * realGeneration).toFixed(2),
    "CO2"
  );
  reportAdministrator.color = "#0097B2";
  reportAdministrator.optionFilter = optionFilter;

  setIsLoadingReport(false);
}
