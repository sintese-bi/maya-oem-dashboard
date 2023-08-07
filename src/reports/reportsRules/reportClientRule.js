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
}

export function reportClientRule(generation, useNameState, capacity, setIsLoadingReport){
	reportClient.estimatedGenerationTotal = numbers(generation.estimatedGenerationTotal.toFixed('2'))
	reportClient.realGenerationTotal = numbers(Number(generation.realGenerationTotal).toFixed('2'))

    let percentValue = (Number(generation.realGenerationTotal)/reportClient.estimatedGenerationTotal)*100
    reportClient.percent = percentValue.toFixed()
    generation.realGenerationTotal < reportClient.estimatedGenerationTotal ? reportClient.lowLevel = true : reportClient.lowLevel = false

    const { useName } = getUserCookie()
    reportClient.useName = useName

    reportClient.brand = useNameState

    reportClient.capacity = capacity.dev_capacity

    setIsLoadingReport(false)
}