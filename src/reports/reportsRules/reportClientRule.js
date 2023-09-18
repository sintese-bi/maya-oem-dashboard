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
    graph: ""
}

export function reportClientRule(generation, useNameState, capacity, setIsLoadingReport, graphRef, startDateReport, endDateReport) {
    reportClient.estimatedGenerationTotal = numbers(generation.estimatedGeneration.reduce((total, element) => total + element, 0).toFixed(2))
    reportClient.realGenerationTotal = numbers(generation.realGeneration.reduce((total, element) => total + Number(element.value), 0).toFixed(2))

    console.log(generation);

    let percentValue = (generation.realGeneration.reduce((total, element) => total + Number(element.value), 0) / generation.estimatedGeneration.reduce((total, element) => total + element, 0)) * 100
    reportClient.percent = percentValue.toFixed()
    generation.estimatedGeneration.reduce((total, element) => total + element, 0).toFixed(2) < generation.realGeneration.reduce((total, element) => total + Number(element.value), 0).toFixed(2) ? reportClient.lowLevel = false : reportClient.lowLevel = true

    const { useName } = getUserCookie()
    reportClient.useName = useName

    reportClient.brand = useNameState;
    reportClient.graph = graphRef.current.toBase64Image();
    reportClient.requistionStartDate = startDateReport;
    reportClient.requisitionEndDate = endDateReport;
    reportClient.capacity = numbers(String(capacity.dev_capacity));

    setIsLoadingReport(false);
}