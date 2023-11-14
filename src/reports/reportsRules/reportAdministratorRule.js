import { getUserCookie } from "src/services/session";
import { numbers } from "src/helpers/utils";

export const reportAdministrator = {
  date: new Date(),
  capacityTotalValue: "",
  generationRealTotalValue: "",
  generationEstimatedTotalValue: "",
  requistionStartDate: "",
  requisitionEndDate: "",
  percent: "",
  useName: "",
  devicesLength: 0,
  adminGraphRef: "",
  savedtree: "",
  logo: "",
  carbon: "",
  color: "#0097B2",
};

export function reportAdministratorRule(
  capacity,
  realGeneration,
  estimatedGeneration,
  dataDevices,
  allDevices,
  percent,
  startDateReport,
  endDateReport,
  setIsLoadingReport,
  adminGraphRef
) {
  let generationRealMonth = dataDevices.map((data) => {
    let generationRealValue = data.generationRealMonth;
    return generationRealValue;
  });
  let generationRealMonthTotal = generationRealMonth
    .reduce((total, element) => total + element, 0)
    .toFixed(2);
  reportAdministrator.generationRealTotalValue = numbers(realGeneration, "KWh");

  let generationEstimatedMonth = dataDevices.map((data) => {
    let generationEstimatedValue = data.generationEstimatedMonth;
    return generationEstimatedValue;
  });
  let generationEstimatedMonthTotal = generationEstimatedMonth
    .reduce((total, element) => total + element, 0)
    .toFixed(2);
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
  reportAdministrator.adminGraphRef = adminGraphRef.current.toBase64Image(
    "image/png",
    2
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
  reportAdministrator.color = "#005C53";

  setIsLoadingReport(false);
}
