import {useState, useEffect} from 'react'
import {Box, Typography, Card, List, ListItem, ListItemAvatar, ListItemText, Grid} from "@mui/material"
import {
  Info,
  ElectricBolt
} from "@mui/icons-material";
import { ChartsDashboardHorizontal } from "src/components/Charts"
import { numbers } from 'src/helpers/utils';
import { BigNumber } from "./BigNumber";

export const GlobalUsinProductive = ({dataDevices, isLoading}) => {
	const [realGenerationTotal, setRealGenerationTotal] = useState('0')
	const [estimatedGenerationTotal, setEstimatedGenerationTotal] = useState('0')
	const [generationPercentState, setGenerationPercentState] = useState({
		'biggerThanEsimated': false,
		'percentValue': "0%"
	})

	useEffect(() => {
		console.log(dataDevices)
			let generationRealMonth = dataDevices.map((data) => {
      		let generationRealValue = Number(data.generationRealMonth.replace(/\Kwh/g, ''))
      		return generationRealValue;
    	})
    	let generationRealMonthTotal = generationRealMonth.reduce((total, element) => total + element, 0).toFixed('2')
    	setRealGenerationTotal(generationRealMonthTotal)

    	let generationEstimatedMonth = dataDevices.map((data) => {
      	let generationEstimatedValue = Number(data.generationEstimatedMonth.replace(/\Kwh/g, ''))
      		return generationEstimatedValue;
    	})
    	let generationEstimatedMonthTotal = generationEstimatedMonth.reduce((total, element) => total + element, 0).toFixed('2')
    	setEstimatedGenerationTotal(generationEstimatedMonthTotal)
	}, [dataDevices])

	useEffect(() => {
		console.log(realGenerationTotal, estimatedGenerationTotal)
		let generationPercentStateTemp = {
			'biggerThanEsimated': false,
			'percentValue': "0%"
		}
		let percent = ((realGenerationTotal/estimatedGenerationTotal)*100).toFixed()
		if(percent < 100){
			generationPercentStateTemp.percentValue = (100 - percent)
			generationPercentStateTemp.biggerThanEsimated = false
		} else {
			generationPercentStateTemp.percentValue = (percent - 100)
			generationPercentStateTemp.biggerThanEsimated = true
		}
		setGenerationPercentState(generationPercentStateTemp)
	}, [realGenerationTotal, estimatedGenerationTotal])

	return (
		<>
			{isLoading ? null : (
			<Box sx={{display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column', py: 4, mt: 8}}>
        		<Box sx={{width: '84%', my: 4}}>
          			<Typography variant="h4">Produtividade global de usinas</Typography>
        		</Box>
        		<Card sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' ,flexDirection: 'column' ,width: '86%', py: 4, px: 3}}>
        			<Box sx={{display: 'flex', justifyContent: 'space-between', mb: 10, width: '84%'}}>
          				<Grid item sm={12} lg={3}>
                			<BigNumber
                  				title="Produção total de usinas"
                  				value={`${numbers((realGenerationTotal/1000).toFixed(2))}MWh`}
                  				icon={<ElectricBolt />}
                			/>
            			</Grid>
            			<Grid item sm={12} lg={3}>
                			<BigNumber
                  				title="Produtividade total estimada"
                  				value={`${numbers((estimatedGenerationTotal/1000).toFixed(2))}MWh`}
                  				icon={<ElectricBolt />}
                			/>
            			</Grid>
          			</Box>
        			<List sx={{width: '100%', mb: 4}}>
	 					<ListItem>
	 						<ListItemAvatar >
								<Info />
							</ListItemAvatar>
							<ListItemText>{`Sua produtividade atual é de ${numbers((realGenerationTotal/1000).toFixed(2))}MWh`}</ListItemText>
	 					</ListItem>
	 					<ListItem>
	 						<ListItemAvatar>
								<Info />
							</ListItemAvatar>
							<ListItemText>
							{
								generationPercentState.biggerThanEsimated ? 
            						`A produtividade global atual está ${generationPercentState.percentValue}% acima da esperada` :
            						`Tenha atenção as suas plantas, sua produtividade atual está ${generationPercentState.percentValue}%
            						abaixo da esperada`
            				}
            				</ListItemText>
	 					</ListItem>
	 				</List>
          			<ChartsDashboardHorizontal dataDevices={dataDevices}/>
        		</Card>
      		</Box>
		)}
		</>
	)
}