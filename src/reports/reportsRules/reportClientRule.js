import { getUserCookie } from "src/services/session";
import { numbers } from "src/helpers/utils";

export const reportClient = {
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
};

export function reportClientRule(
  generation,
  useNameState,
  capacity,
  setIsLoadingReport,
  graphRef,
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

  reportClient.graphData["realGeneration"] = generation.realGeneration;
  reportClient.graphData["estimatedGeneration"] =
    generation.estimatedGeneration;

  function handleSituation(percent) {
    if (percent < 100) {
      if (percent >= 80) {
        return `A produção da sua usina esta dentro do esperado. Sua produtividade no período escolhido é de ${numbers(
          (realGenerationNumber / 1000).toFixed(2)
        )}Mwh.`;
      } else {
        return `Sua usina não está produzindo conforme esperado, fique atento aos próximos dias de monitoramento e observe a produção da sua usina. Sua produtividade no período escolhido é de ${numbers(
          (realGenerationNumber / 1000).toFixed(2)
        )}Mwh.`;
      }
    } else {
      return `Parabéns! A produção da sua usina esta dentro do esperado. Sua produtividade no período escolhido é de ${numbers(
        (realGenerationNumber / 1000).toFixed(2)
      )}Mwh.`;
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

  reportClient.useName = useName;
  reportClient.estimatedGenerationTotal = numbers(
    estimatedGenerationNumber,
    "KWh"
  );
  reportClient.realGenerationTotal = numbers(realGenerationNumber, "KWh");
  reportClient.percent = (
    (realGenerationNumber / estimatedGenerationNumber) *
    100
  ).toFixed();
  reportClient.brand = useNameState;
  reportClient.situation = handleSituation(reportClient.percent);
  reportClient.graph = graphRef?.toBase64Image();
  reportClient.requistionStartDate = startDateReport;
  reportClient.requisitionEndDate = endDateReport;
  reportClient.capacity = numbers(capacity.toFixed(2), "KWp");
  reportClient.lowLevel = handleSituationGeneration(reportClient.percent);
  reportClient.address = address;
  reportClient.savedtree = numbers(
    (realGenerationNumber * 5.04 * 0.0001).toFixed(2),
    ""
  );
  reportClient.logo =
    "https://ucarecdn.com/258f82dc-bf80-4b30-a4be-bcea7118f14a/";
  reportClient.carbon = numbers(
    (Number("0.4190") * realGenerationNumber).toFixed(2),
    "CO2"
  );
  reportClient.deviceName = deviceName;
  reportClient.color = "#0097B2";

  reportClient.optionFilter = "days";

  setIsLoadingReport(false);
}
