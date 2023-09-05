import { getUserCookie } from "src/services/session";
import { numbers } from 'src/helpers/utils';

export const reportClient = {
    date: new Date(),
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
    state: ""
}

export function reportClientRule(generation, useNameState, capacity, setIsLoadingReport){
	reportClient.estimatedGenerationTotal = generation.estimatedGenerationTotal.toFixed()
	reportClient.realGenerationTotal = generation.realGeneration.reduce((total, element) => total + Number(element.value), 0)

    let percentValue = (generation.realGeneration.reduce((total, element) => total + Number(element.value), 0)/generation.estimatedGenerationTotal)*100
    reportClient.percent = percentValue.toFixed()
    generation.realGenerationTotal < reportClient.estimatedGenerationTotal ? reportClient.lowLevel = true : reportClient.lowLevel = false

    const { useName } = getUserCookie()
    reportClient.useName = useName

    reportClient.brand = useNameState

    reportClient.capacity = capacity.dev_capacity

    setIsLoadingReport(false)
}