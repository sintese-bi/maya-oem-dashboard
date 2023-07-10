// IMPORTS
import { useState } from "react";
import moment from "moment-timezone";

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

// GRAFICO DE GERAÇÃO EM (Kwh) vs PERCENTAGEM
export const ChartsGeneration = (props) => {
  const { date, generation, isLoading, optionFilter } = props;

  const theme = useTheme();

  // ESTADOS DE CONTROLE DO FILTRO
  const [valueTabs, setValueTabs] = useState(0);

  if (isLoading || !generation) return <LoadingSkeletonCharts />;

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
    labels: generation.label,
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
    labels: generation.label,
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
                  Produção do {optionFilter === "month" ? "mês" : "ano"} de{" "}
                  {moment(date).format(
                    optionFilter === "month" ? "MMMM" : "YYYY"
                  )}
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
