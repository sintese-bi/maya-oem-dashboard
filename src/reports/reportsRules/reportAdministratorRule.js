import { getUserCookie } from "src/services/session";
import { numbers } from 'src/helpers/utils';


export const reportAdministrator = {
	date: new Date(),
	capacityTotalValue: "",
	generationRealTotalValue: "",
	generationEstimatedTotalValue: "",
	percent: "",
    useName: "",
    devicesLength: 0
}

export function reportAdministratorRule(
	capacity, 
	dataDevices, 
	setIsLoadingReport,
){
	let generationRealMonth = dataDevices.map((data) => {
      let generationRealValue = Number(data.generationRealMonth.replace(/\Kwh/g, ''))
      return generationRealValue;
    })
    let generationRealMonthTotal = generationRealMonth.reduce((total, element) => total + element, 0).toFixed('2')
    reportAdministrator.generationRealTotalValue = numbers(generationRealMonthTotal)

    let generationEstimatedMonth = dataDevices.map((data) => {
      let generationEstimatedValue = Number(data.generationEstimatedMonth.replace(/\Kwh/g, ''))
      return generationEstimatedValue;
    })
    let generationEstimatedMonthTotal = generationEstimatedMonth.reduce((total, element) => total + element, 0).toFixed('2')
    reportAdministrator.generationEstimatedTotalValue = numbers(generationEstimatedMonthTotal)
    
    let percentResult = (generationRealMonthTotal/generationEstimatedMonthTotal)*100
    reportAdministrator.percent = percentResult.toFixed()
  
  	const { useName } = getUserCookie()
    reportAdministrator.useName = useName

    reportAdministrator.capacityTotalValue = numbers(capacity.reduce((total, element) => element + total, 0).toFixed('2'))

    reportAdministrator.devicesLength = dataDevices.length

    setIsLoadingReport(false)
}