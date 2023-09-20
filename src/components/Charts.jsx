// IMPORTS
import { useState, useEffect, useRef } from "react";
import moment from "moment-timezone";
import {
  handleMonthFilter,
  handleQuinzenaFilter,
  handleWeekFilter,
  numbers,
} from "../helpers/utils";

// LIBS DE ESTILOS
import { Bar, Chart, Line } from "react-chartjs-2";
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

export const ChartsGenerationBITopAndLowValue = (props) => {
  const canvas = useRef(null);
  const { topAndLowValue } = props;
  const theme = useTheme();

  const labels = ["22/08" + "    " + "08/08"];

  const data = {
    labels,
    datasets: [
      {
        barThickness: 62,
        maxBarThickness: 56,
        borderRadius: 2,
        label: "Melhor dia",
        data: [topAndLowValue.topValue, 0],
        backgroundColor: "#5048E5",
      },
      {
        barThickness: 62,
        maxBarThickness: 56,
        borderRadius: 2,
        label: "Pior dia",
        data: [topAndLowValue.lowValue, 0],
        backgroundColor: "#14B8A6",
      },
    ],
  };

  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
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
    scales: {
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "kWh",
          font: { size: 18, weight: "bold" },
        },
      },
    },
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "background.paper",
        px: 2,
        pb: 2,
        pt: 4,
        height: 420,
      }}
    >
      <Typography
        color="textPrimary"
        sx={{ fontWeight: "bold", fontSize: "20px" }}
      >
        Dias com melhor e pior geração.
      </Typography>
      <Box sx={{ height: 300, width: 400 }}>
        <Chart type="bar" options={options} data={data} />
      </Box>
    </Card>
  );
};

export const ChartsGenerationBIProductive = (props) => {
  const { startDate, endDate, optionFilter, generation, isLoading } = props;

  const canvas = useRef(null);
  const theme = useTheme();

  if (isLoading || !generation) return <LoadingSkeletonCharts />;

  // Obter número total de dias entre as datas de início e fim
  const totalDays = moment(endDate).diff(startDate, "days") + 1;
  const months = moment(endDate).diff(startDate, "months");
  console.log(months);
  // Gerar rótulos de dia para o gráfico
  const labels =
    optionFilter == "month"
      ? Array.from({ length: totalDays }, (_, index) =>
          moment(startDate).add(index, "days").format("D")
        )
      : Array.from({ length: 12 }, (_, index) =>
          moment(startDate).add(index, "months").format("MM/YYYY")
        );

  const data = {
    labels,
    datasets: [
      {
        borderRadius: 2,
        categoryPercentage: 0.5,
        label: "Geração Real",
        data: generation.realGeneration?.map((data) => data.value),
        backgroundColor: "#5048E5",
      },
      {
        borderRadius: 2,
        categoryPercentage: 0.5,
        label: "Geração Estimada",
        data: generation.estimatedGeneration,
        backgroundColor: "#14B8A6",
      },
    ],
  };

  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
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
    scales: {
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "kWh",
          font: { size: 18, weight: "bold" },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "background.paper",
        px: 2,
        pb: 2,
        pt: 4,
        height: 420,
      }}
    >
      <Typography
        color="textPrimary"
        sx={{ fontWeight: "bold", fontSize: "20px" }}
      >
        Produtividade da planta
      </Typography>
      <Box sx={{ height: 300, width: "100%" }}>
        <Line type="bar" options={options} data={data} />
      </Box>
    </Box>
  );
};

export const ChartsLinear = (props) => {
  const { startDate, endDate, generation, isLoading, optionFilter, graphRef } =
    props;
  const theme = useTheme();

  // ESTADOS DE CONTROLE DO FILTRO
  const [valueTabs, setValueTabs] = useState(0);

  if (isLoading || !generation) return <LoadingSkeletonCharts />;

  let filteredWeekValues = handleWeekFilter(
    startDate,
    endDate,
    generation?.realGeneration,
    generation?.estimatedGeneration
  );

  let filteredMonthValues = handleMonthFilter(
    startDate,
    endDate,
    generation?.realGeneration,
    generation?.estimatedGeneration
  );

  let filteredQuinzenasValues = handleQuinzenaFilter(
    startDate,
    endDate,
    generation?.realGeneration,
    generation?.estimatedGeneration
  );

  // Obter número total de dias entre as datas de início e fim
  const totalDays = moment(endDate).diff(startDate, "days") + 1;
  const months = moment(endDate).diff(startDate, "months");
  // Gerar rótulos de dia para o gráfico

  const filterPeriodData = () => {
    switch (optionFilter) {
      case "days":
        return {
          data: {
            realGeneration: generation.realGeneration?.map(
              (data) => data.value
            ),
            estimatedGeneration: generation.estimatedGeneration?.map(
              (data) => data
            ),
          },
          period: "Dias",
        };
        break;
      case "weeks":
        return {
          data: {
            realGeneration: filteredWeekValues.data.realGeneration,
            estimatedGeneration: filteredWeekValues.data.estimatedGeneration,
          },
          period: "Semanas",
        };
        break;
      case "months":
        return {
          data: {
            realGeneration: filteredMonthValues.data.realGeneration,
            estimatedGeneration: filteredMonthValues.data.estimatedGeneration,
          },
          period: "Meses",
        };
        break;
      case "biweek":
        return {
          data: {
            realGeneration: filteredQuinzenasValues.data.realGeneration,
            estimatedGeneration:
              filteredQuinzenasValues.data.estimatedGeneration,
          },
          period: "Quinzenas",
        };
        break;
      default:
        break;
    }
  };

  const filterPeriod = () => {
    switch (optionFilter) {
      case "days":
        return generation?.realGeneration?.map((data) =>
          moment(data.date, "DD/MM/YYYY").format("DD/MM")
        );
        break;
      case "weeks":
        return filteredWeekValues.weeks.map((data) => {
          let date = `${moment(data.startWeek).format("DD/MM")} - ${moment(
            data.endWeek
          ).format("DD/MM")}`;
          return date;
        });
        break;
      case "months":
        return filteredMonthValues.months.map((data) => {
          let date = `${moment(data.startMonth).format("DD/MM")} - ${moment(
            data.endMonth
          ).format("DD/MM")}`;
          return date;
        });
        break;
      case "biweek":
        return filteredQuinzenasValues.quinzenas.map((data) => {
          let date = `${moment(data.startQuinzena).format("DD/MM")} - ${moment(
            data.endQuinzena
          ).format("DD/MM")}`;
          return date;
        });
        break;
      default:
        break;
    }
  };

  const labels = filterPeriod();
  const periodData = filterPeriodData();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "",
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "kWh",
          font: { size: 18, weight: "bold" },
        },
      },
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: periodData.period,
          font: { size: 18, weight: "bold" },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Geração real",
        data: periodData.data?.realGeneration,
        borderColor: "#5048E5",
        backgroundColor: "#5048E5",
      },
      {
        label: "Geração estimada",
        data: periodData.data?.estimatedGeneration,
        backgroundColor: "#14B8A6",
      },
    ],
  };

  if (isLoading || !generation)
    return (
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: 460,
          flexDirection: "column",
          bgcolor: "background.paper",
          px: 3,
          pb: 6,
          pt: 4,
        }}
      >
        <Typography
          color="textPrimary"
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            mb: "4",
          }}
        >
          Gerando gráfico
        </Typography>
        <Box sx={{ height: 300 }}>
          <LoadingSkeletonCharts />
        </Box>
      </Card>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 560,
          width: "100%",
          flexDirection: "column",
          px: 1,
          pb: 4,
          pt: 2,
        }}
      >
        <Typography
          color="textPrimary"
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            mb: "4",
          }}
        >
          Relação da geração real e geração estimada
        </Typography>
        <Box sx={{ height: 400, width: "90%" }}>
          <Line type="bar" options={options} data={data} ref={graphRef} />
        </Box>
      </Box>
    </Box>
  );
};

export const chartsToGenerationReports = async (props) => {
  const canvas = document.createElement("canvas");
  canvas.width = 400; // Defina a largura e altura conforme necessário
  canvas.height = 300;

  const ctx = canvas.getContext("2d");

  function done() {
    alert("function done executed");
    const graphURL = graph.toBase64Image();
    console.log(graphURL);
  }

  const graph = new ChartJS(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      bezierCurve: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  console.log(canvas.toDataURL(), graph);
};

export const ChartsDashboardHorizontal = (props) => {
  const { dataDevices } = props;
  const [topDevices, setTopDevices] = useState([]);

  useEffect(() => {
    let realAndEstimatedDivision = dataDevices.map((data) => {
      let real = Number(
        data.generationRealMonth.replace(/\Kwh/g, "")
      ).toFixed();
      let estimated = Number(
        data.generationEstimatedMonth.replace(/\Kwh/g, "")
      ).toFixed();
      let divisionPercentage = ((real / estimated) * 100).toFixed();
      let finalResult = {
        divisionPercentage: divisionPercentage,
        name: data.name,
      };
      return finalResult;
    });
    realAndEstimatedDivision.sort(
      (a, b) => b.divisionPercentage - a.divisionPercentage
    );
    setTopDevices(realAndEstimatedDivision.slice(0, 5));
  }, [dataDevices]);

  useEffect(() => {
    console.log(topDevices);
  }, [topDevices]);

  const data = {
    labels: topDevices.map((data) => data.name),
    datasets: [
      {
        barThickness: 22,
        borderRadius: 2,
        categoryPercentage: 0.5,
        maxBarThickness: 16,
        label: "Porcentagem",
        data: topDevices.map((data) => data.divisionPercentage),
        backgroundColor: "#5048E5",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "",
        size: "26px",
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: 460,
          flexDirection: "column",
          bgcolor: "background.paper",
          px: 3,
          pb: 6,
          pt: 4,
        }}
      >
        <Typography
          color="textPrimary"
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            mb: "4",
          }}
        >
          Plantas com melhores performance no último mês.
        </Typography>
        <Box sx={{ height: 300, width: 862 }}>
          <Chart type="bar" options={options} data={data} />
        </Box>
      </Card>
    </Box>
  );
};

export const ChartsDashboard = (props) => {
  const { dataDevices } = props;
  const theme = useTheme();

  const labels = Object.keys(dataDevices).map((data) =>
    moment(data).format("DD/MM")
  );
  const values = Object.values(dataDevices);

  const data = {
    labels,
    datasets: [
      {
        barThickness: 20,
        borderRadius: 2,
        categoryPercentage: 0.5,
        label: "Geral Estimada",
        maxBarThickness: 22,
        barPercentage: 0.8,
        label: "Geração Real",
        data: values,
        backgroundColor: "#5048E5",
      },
    ],
  };

  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
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
    scales: {
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "kWh",
          font: { size: 18, weight: "bold" },
        },
      },
    },
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        pb: 2,
        pt: 4,
        height: 520,
      }}
    >
      <Typography
        color="textPrimary"
        sx={{ fontWeight: "bold", fontSize: "20px" }}
      >
        Resumo da geração real vs estimada
      </Typography>
      <Box sx={{ height: 360, width: "100%" }}>
        <Chart type="bar" options={options} data={data} />
      </Box>
    </Card>
  );
};

// GRAFICO DE GERAÇÃO EM (Kwh) vs PERCENTAGEM
export const ChartsGeneration = (props) => {
  const { startDate, endDate, generation, isLoading, optionFilter } = props;

  const theme = useTheme();

  // ESTADOS DE CONTROLE DO FILTRO
  const [valueTabs, setValueTabs] = useState(0);

  if (isLoading || !generation) return <LoadingSkeletonCharts />;

  // Obter número total de dias entre as datas de início e fim
  const totalDays = moment(endDate).diff(startDate, "days") + 1;
  const months = moment(endDate).diff(startDate, "months");
  // Gerar rótulos de dia para o gráfico
  const labels =
    optionFilter == "month"
      ? Array.from({ length: totalDays }, (_, index) =>
          moment(startDate).add(index, "days").format("D")
        )
      : Array.from({ length: 12 }, (_, index) =>
          moment(startDate).add(index, "months").format("MM/YYYY")
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
        data: generation.realGeneration?.map((data) => data.value),
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
          text: optionFilter == "month" ? "Dias" : "Meses",
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
