import { useEffect, useState } from "react"

import {
  Box,
  Typography
} from "@mui/material";
import { ChartsGenerationBIProductive } from "src/components/Charts"
import {ChartsGenerationBITopAndLowValue} from "src/components/Charts"

export const GenerationBI = ({startDate, endDate, optionFilter, generation, isLoading}) => {
	const [deviceIsProductive, setDeviceIsProductive] = useState(false)
	const [productivePercent, setProductivePercent] = useState(0)
	const [topAndLowValue, setTopAndLowValue] = useState({
		topValue: 0,
		lowValue: 0
	})
	const [topValueDate, lowValueDate] = useState()

	useEffect(() => {
		let totalRealGeneration = generation?.realGeneration?.reduce((total, element) => total + Number(element), 0)
		let totalEstimatedGeneration = generation?.estimatedGeneration?.reduce((total, element) => total + element, 0)
		setProductivePercent(((totalRealGeneration/totalEstimatedGeneration)*100).toFixed())
		if(totalRealGeneration > totalEstimatedGeneration){
			setDeviceIsProductive(true)
		}

		let realGenerationTempArray = generation?.realGeneration?.filter((data) => data != 0)
		realGenerationTempArray?.sort((a, b) => Number(a) - Number(b))

		setTopAndLowValue({
			topValue: realGenerationTempArray?.pop(),
			lowValue: realGenerationTempArray?.shift()
		})

	}, [generation])

	useEffect(() => {console.log(topAndLowValue)}, [topAndLowValue])

	return (
		<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
			<Box sx={{my: 10, bgcolor: 'background.paper', p:4, boxShadow: 3}}>
				<ChartsGenerationBIProductive
					startDate={startDate}
            		endDate={endDate}
            		optionFilter={optionFilter}
            		generation={generation}
            		isLoading={isLoading}
				/>
				<Typography sx={{fontSize: '12px'}}>
					{
						deviceIsProductive ? `
							De acordo com o cálculo total de geração, a porcentagem da geração real, em relação a estimada
							é de ${productivePercent}%.
						` : `
							De acordo com o cálculo total de geração, a porcentagem da geração real, em relação a estimada
							é apenas ${productivePercent}%.
						`
					}
				</Typography>
			</Box>
			<ChartsGenerationBITopAndLowValue topAndLowValue={topAndLowValue} />
		</Box>
	)
} 