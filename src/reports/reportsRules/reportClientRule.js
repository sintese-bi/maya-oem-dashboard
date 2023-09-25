import { getUserCookie } from "src/services/session";
import { numbers } from 'src/helpers/utils';

export const reportClient = {
    date: new Date(),
    requistionStartDate: "",
    requisitionEndDate: "",
    estimatedGenerationTotal: "",
    realGenerationTotal: "",
    percent: "",
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
    situation: ""
}

export function reportClientRule(generation, useNameState, capacity, setIsLoadingReport, graphRef, startDateReport, endDateReport, address) {
    const { useName } = getUserCookie()
    let estimatedGenerationNumber = generation.estimatedGeneration.reduce((total, element) => total + element, 0).toFixed(2)
    let realGenerationNumber = generation.realGeneration.reduce((total, element) => total + Number(element.value), 0).toFixed(2)

    function handleSituation(percent) {
        if (percent < 100) {
            if (percent >= 80) {
                return `A produção da sua usina esta dentro do esperado. Sua produtividade no período escolhido é de ${numbers(
                    (realGenerationNumber / 1000).toFixed(2))}Mwh.`
            } else {
                return `Sua usina não está produzindo conforme esperado, fique atento aos próximos dias de monitoramento e observe a produção da sua usina. Sua produtividade no período escolhido é de ${numbers(
                    (realGenerationNumber / 1000).toFixed(2))}Mwh.`
            }
        } else {
            return `Parabéns! A produção da sua usina esta dentro do esperado. Sua produtividade no período escolhido é de ${numbers((reportClient.realGenerationTotal / 1000).toFixed(2))}Mwh.`
        }
    }

    reportClient.useName = useName
    reportClient.estimatedGenerationTotal = numbers(estimatedGenerationNumber)
    reportClient.realGenerationTotal = numbers(realGenerationNumber)
    reportClient.percent = ((realGenerationNumber / estimatedGenerationNumber) * 100).toFixed()
    reportClient.brand = useNameState;
    reportClient.situation = handleSituation(reportClient.percent)
    reportClient.graph = graphRef.current.toBase64Image();
    reportClient.requistionStartDate = startDateReport;
    reportClient.requisitionEndDate = endDateReport;
    reportClient.capacity = numbers(String(capacity.dev_capacity));
    reportClient.lowLevel = estimatedGenerationNumber < realGenerationNumber ? false : true
    reportClient.address = address

    setIsLoadingReport(false);
}