// IMPORTS
import { useState, useEffect, useRef } from "react";
import moment from "moment-timezone";
import { numbers } from '../helpers/utils'

// LIBS DE ESTILOS
import { Bar, Chart } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController,
  BarController,
} from "chart.js";
import { LoadingSkeletonCharts } from "./Loading";

//ASSETS
import { TabPanel } from "./TabPanel";
import { Container } from "@mui/system";
import NoData from "../assets/img/illustrations/no-data.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController,
  BarController
);

const TABS = {
  GENERATION_KWH: 0,
  GENERATION_PERCENTAGE: 1,
};

export const ChartsDashboardHorizontal = (props) => {
  const { dataDevices } = props
  const [topDevices, setTopDevices] = useState([])

  useEffect(() => {
    let realAndEstimatedDivision = dataDevices.map((data) => {
       let real = Number(data.generationRealMonth.replace(/\Kwh/g, '')).toFixed();
       let estimated = Number(data.generationEstimatedMonth.replace(/\Kwh/g, '')).toFixed();
       let divisionPercentage = ((real/estimated)*100).toFixed();
       let finalResult = {divisionPercentage: divisionPercentage, name: data.name}
       return finalResult;
    })
    realAndEstimatedDivision.sort((a, b) => b.divisionPercentage - a.divisionPercentage);
    setTopDevices(realAndEstimatedDivision.slice(0, 5))
  }, [dataDevices])
  
  useEffect(() => {
    console.log(topDevices)
  }, [topDevices])

  const data = {
    labels: topDevices.map((data) => data.name),
    datasets: [
      {
        barThickness: 22,
        borderRadius: 2,
        categoryPercentage: 0.5,
        label: "Geral Estimada",
        maxBarThickness: 16,
        label: 'Geração Real',
        data: topDevices.map((data) => data.divisionPercentage),
        backgroundColor: "#5048E5",
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    indexAxis: 'y' ,
    responsive: true,
    plugins: {
      legend: {
        position: 'right' ,
    },
    title: {
      display: true,
      text: '%',
      size: "26px"
    },
  },
  };

  return (
     <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: 'center',
        mt: 8,
        width: '100%'
      }}
    >
        <Card sx={{display: 'flex', justifyContent: "space-between", height: 420, flexDirection:'column', bgcolor: "background.paper", width: '80%', px: 3, pb: 6, pt: 4}}>
          <Typography color="textPrimary" sx={{fontWeight: 'bold', fontSize: '20px', textAlign: 'center', mb: '4'}}>
            Melhor Desempenho Percentual 
          </Typography>
          <Box sx={{height: 300}} >
            <Chart type="bar" options={options} data={data}/>
          </Box>
        </Card>
    </Box>
  )
}

export const ChartsDashboard = (props) => {
  const canvas = useRef(null);
  const { dataDevices } = props
  const theme = useTheme();

  const labels = ['Geração Real x Geração Estimada'];

  const [generationRealTotalValue, setGenerationRealTotalValue] = useState(0)
  const [generationEstimatedTotalValue, setGenerationEstimatedTotalValue] = useState(0)
  const [valueTabs, setValueTabs] = useState(0);

  useEffect(() => {
    let generationRealMonth = dataDevices.map((data) => {
      let generationRealValue = Number(data.generationRealMonth.replace(/\Kwh/g, ''))
      return generationRealValue;
    })
    let generationRealMonthTotal = generationRealMonth.reduce((total, element) => total + element, 0).toFixed()
    setGenerationRealTotalValue(generationRealMonthTotal)

    let generationEstimatedMonth = dataDevices.map((data) => {
      let generationEstimatedValue = Number(data.generationEstimatedMonth.replace(/\Kwh/g, ''))
      return generationEstimatedValue;
    })
    let generationEstimatedMonthTotal = generationEstimatedMonth.reduce((total, element) => total + element, 0).toFixed()
    setGenerationEstimatedTotalValue(generationEstimatedMonthTotal)
    
  }, [dataDevices])

  const data = {
    labels: [''],
    datasets: [
      {
        barThickness: 82,
        borderRadius: 2,
        categoryPercentage: 0.5,
        label: "Geral Estimada",
        maxBarThickness: 76,
        label: 'Geração Real',
        data: [generationRealTotalValue, 0],
        backgroundColor: "#5048E5",
      },
      {
        barThickness: 82,
        borderRadius: 2,
        categoryPercentage: 0.5,
        maxBarThickness: 76,
        label: 'Geração Estimada',
        data: [generationEstimatedTotalValue, 0],
        backgroundColor: '#14B8A6',
      },
    ],
  };

const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    plugins:{
      legend: {
        position: 'top'
      }
    },
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: 'center',
        bgcolor: "background.paper",
        px: 6,
        pb: 2,
        pt: 4,
        height: 420,
      }}
    >
        <Typography color="textPrimary" sx={{fontWeight: 'bold', fontSize: '20px'}}>
            Desempenho Consolidado 
        </Typography>
        <Box sx={{height: 300, width: 500}} >
          <Chart type="bar" options={options} data={data}/>
        </Box>
    </Card>
  )
  
}

// GRAFICO DE GERAÇÃO EM (Kwh) vs PERCENTAGEM
export const ChartsGeneration = (props) => {
  const { startDate, endDate, generation, isLoading, optionFilter } = props;

  const theme = useTheme();

  // ESTADOS DE CONTROLE DO FILTRO
  const [valueTabs, setValueTabs] = useState(0);

  if (isLoading || !generation) return <LoadingSkeletonCharts />;

  // Obter número total de dias entre as datas de início e fim
  const totalDays = moment(endDate).diff(startDate, 'days') + 1;

  // Gerar rótulos de dia para o gráfico
  const labels = Array.from({ length: totalDays }, (_, index) =>
    moment(startDate).add(index, 'days').format('D')
  );
  
  // PROPS PARA O GRAFICO
  const dataKwh = {
    datasets: [
      {
        backgroundColor: theme.palette.primary.main,
        barPercentage: 0.5,
        barThickness: 15,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: generation.realGeneration,
        label: "Geração Real",
        maxBarThickness: 10,
      },
      {
        backgroundColor: theme.palette.secondary.main,
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: generation.estimatedGeneration,
        label: "Geral Estimada",
        maxBarThickness: 10,
        borderWidth: 2,
        fill: false,
        type: "line",
      },
      {
        backgroundColor: theme.palette.neutral[300],
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: generation.percentMax,
        label: "Porcentagem Máxima",
        maxBarThickness: 10,
        borderWidth: 2,
        fill: false,
        type: "line",
      },
      {
        backgroundColor: theme.palette.neutral[300],
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: generation.percentMin,
        label: "Porcentagem Mínima",
        maxBarThickness: 10,
        borderWidth: 2,
        fill: false,
        type: "line",
      },
    ],
    labels: labels,
  };

  const dataPercentage = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 15,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: generation?.generationPercentage?.map((value) => value * 100),
        label: "Geração Percentual",
        maxBarThickness: 10,
      },
    ],
    labels: labels,
  };

  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Dias",
          font: { size: 18, weight: "bold" },
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: valueTabs === TABS.GENERATION_PERCENTAGE ? "%" : "KW/h",
          font: { size: 18, weight: "bold" },
        },
      },
    },
  };

  const startMonth = moment(startDate)
    .format("MMMM")
    .replace(/^\w/, (c) => c.toUpperCase());
  const endMonth = moment(endDate)
    .format("MMMM")
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Tabs
            value={valueTabs}
            onChange={(_, newValue) => setValueTabs(newValue)}
            aria-label="Tabs de geração"
          >
            <Tab
              label="Geração Estimada X Geração Real (Kwh)"
              wrapped
              id="generation-tab-0"
              aria-controls="generation-tabpanel-0"
            />
            <Tab
              label="Geração Estimada X Geração Real %"
              wrapped
              id="generation-tab-1"
              aria-controls="generation-tabpanel-1"
            />
          </Tabs>
        </Box>

        <Card>
          <CardHeader
            title={
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography color="textPrimary" variant="h5">
                  {startMonth === endMonth
                    ? `Produção do mês de ${startMonth}`
                    : `Produção entre os meses de ${startMonth} e ${endMonth}`}
                </Typography>
              </Box>
            }
          />
          <Divider />
          <CardContent>
            {!generation?.realGeneration ? (
              <Box
                component="main"
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexGrow: 1,
                  minHeight: "100%",
                }}
              >
                <Container maxWidth="md">
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <img
                        alt="No data"
                        src={NoData}
                        style={{
                          marginTop: 10,
                          display: "inline-block",
                          maxWidth: "100%",
                          width: 760,
                        }}
                      />
                    </Box>
                  </Box>
                </Container>
              </Box>
            ) : (
              <>
                {/* GERAÇÃO REAL VS ESTIMADA  */}
                <TabPanel value={valueTabs} index={0}>
                  <Box
                    sx={{
                      height: 400,
                      position: "relative",
                    }}
                  >
                    <Chart type="bar" data={dataKwh} options={options} />
                  </Box>
                </TabPanel>
              </>
            )}

            {!generation?.estimatedGeneration ? (
              <Box
                component="main"
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexGrow: 1,
                  minHeight: "100%",
                }}
              >
                <Container maxWidth="md">
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <img
                        alt="No data"
                        src={NoData}
                        style={{
                          marginTop: 10,
                          display: "inline-block",
                          maxWidth: "100%",
                          width: 760,
                        }}
                      />
                    </Box>
                  </Box>
                </Container>
              </Box>
            ) : (
              <>
                {/* GERAÇÃO PERCENTUAL  */}
                <TabPanel value={valueTabs} index={1}>
                  <Box
                    sx={{
                      height: 400,
                      position: "relative",
                    }}
                  >
                    <Bar data={dataPercentage} options={options} />
                  </Box>
                </TabPanel>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
