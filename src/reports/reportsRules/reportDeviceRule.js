import { getUserCookie } from "src/services/session";
import { numbers } from "src/helpers/utils";

export const reportDevice = {
  date: new Date(),
  requistionStartDate: "",
  requisitionEndDate: "",
  estimatedGenerationTotal: "",
  realGenerationTotal: "",
  percent: "",
  optionFilter: "",
  capacity: "",
  lowLevel: false,
  useName: "",
  brand: "",
  contractNumber: "",
  contracterName: "",
  address: "",
  email: "",
  phone: "",
  portal: "",
  state: "",
  graph: "",
  situation: "",
  savedtree: "",
  logo: "",
  carbon: "",
  deviceName: "",
  color: "",
  graphData: {},
  devicesGenerationData: {},
};

export function reportDeviceRule(
  generation,
  useNameState,
  capacity,
  setIsLoadingReport,
  startDateReport,
  endDateReport,
  address,
  deviceName
) {
  const { useName } = getUserCookie();
  let estimatedGenerationNumber = generation.estimatedGeneration
    .reduce((total, element) => total + element, 0)
    ?.toFixed(2);
  let realGenerationNumber = generation.realGeneration
    .reduce((total, element) => total + Number(element.value), 0)
    ?.toFixed(2);

  reportDevice.graphData["realGeneration"] = generation.realGeneration;
  reportDevice.graphData["estimatedGeneration"] =
    generation.estimatedGeneration;

  function handleSituation(percent) {
    let unity = "KWh";

    if (realGenerationNumber >= 1000) {
      unity = "MWh";
    }

    if (percent < 100) {
      if (percent >= 80) {
        return `A produção da sua usina esta dentro do esperado. Sua produtividade no período escolhido é de ${
          unity == "MWh"
            ? numbers((realGenerationNumber / 1000).toFixed(2))
            : numbers(realGenerationNumber)
        }${unity}.`;
      } else {
        return `Sua usina não está produzindo conforme esperado, fique atento aos próximos dias de monitoramento e observe a produção da sua usina. Sua produtividade no período escolhido é de ${
          unity == "MWh"
            ? numbers((realGenerationNumber / 1000).toFixed(2))
            : numbers(realGenerationNumber)
        }${unity}.`;
      }
    } else {
      return `Parabéns! A produção da sua usina esta dentro do esperado. Sua produtividade no período escolhido é de ${
        unity == "MWh"
          ? numbers((realGenerationNumber / 1000).toFixed(2))
          : numbers(realGenerationNumber.toFixed(2))
      }${unity}.`;
    }
  }

  function handleSituationGeneration(percent) {
    if (percent < 100) {
      if (percent >= 80) {
        return `Dentro`;
      } else {
        return `Abaixo`;
      }
    } else {
      return `Acima`;
    }
  }

  reportDevice.useName = useName;
  reportDevice.estimatedGenerationTotal = numbers(
    estimatedGenerationNumber,
    "KWh"
  );
  reportDevice.realGenerationTotal = numbers(realGenerationNumber, "KWh");
  reportDevice.percent = (
    (realGenerationNumber / estimatedGenerationNumber) *
    100
  ).toFixed();
  reportDevice.brand = useNameState;
  reportDevice.situation = handleSituation(reportDevice.percent);
  reportDevice.requistionStartDate = startDateReport;
  reportDevice.requisitionEndDate = endDateReport;
  reportDevice.capacity = numbers(capacity.toFixed(2), "KWp");
  reportDevice.lowLevel = handleSituationGeneration(reportDevice.percent);
  reportDevice.address = address;
  reportDevice.savedtree = numbers(
    (realGenerationNumber * 5.04 * 0.0001).toFixed(2),
    ""
  );
  reportDevice.logo =
    "https://ucarecdn.com/258f82dc-bf80-4b30-a4be-bcea7118f14a/";
  reportDevice.carbon = numbers(
    (Number("0.4190") * realGenerationNumber).toFixed(2),
    "CO2"
  );
  reportDevice.deviceName = deviceName;
  reportDevice.color = "#0097B2";

  reportDevice.optionFilter = "days";
  reportDevice.devicesGenerationData = generation;
  setIsLoadingReport(false);
}
