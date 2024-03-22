// IMPORTS
import moment from "moment-timezone";
import { useContext, useEffect, useState } from "react";
import {
  handleMonthFilter,
  handleQuinzenaFilter,
  handleWeekFilter,
} from "../../helpers/utils";

// LIBS DE ESTILOS
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
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
  Filler,
} from "chart.js";
import { Bar, Chart, Line, Pie } from "react-chartjs-2";
import { LoadingSkeletonCharts } from "../Loading";

//ASSETS
import { Container } from "@mui/system";
import NoData from "../../assets/img/illustrations/no-data.svg";
import { TabPanel } from "../TabPanel";
import { brazilStates } from "src/constants/states";
import { DashboardContext } from "src/contexts/dashboard-context";

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
  BarController,
  ArcElement,
  Filler
);

const TABS = {
  GENERATION_KWH: 0,
  GENERATION_PERCENTAGE: 1,
};

export const ChartsGenerationBITopAndLowValue = (props) => {
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

export const ChartGenrealdaylasthour = (props) => {
  const theme = useTheme();
  const { genrealdaylasthourData } = props;

  if (
    genrealdaylasthourData === undefined ||
    genrealdaylasthourData.length == 0
  ) {
    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          color="textPrimary"
          sx={{ fontWeight: "bold", fontSize: "20px", pb: 4 }}
        >
          Gerando gráfico
        </Typography>
        <Box width={"90%"} height={520}>
          <LoadingSkeletonCharts />
        </Box>
      </Card>
    );
  } else {
    const hours = genrealdaylasthourData.data.map((data) => data.hora);
    const realGeneration = genrealdaylasthourData.data.map(
      (data) => data.d2 / 1000
    );
    const alerts = genrealdaylasthourData.data?.map((data) => data.alert);
    //const estimatedGeneration = hours.map((hour) =>
    //  (genrealdaylasthourData.sumsPerHour[hour].gen_estimated / 1000).toFixed()
    //);

    const data = {
      labels: hours,
      datasets: [
        {
          label: "Geração real",
          maxBarThickness: 16,
          barPercentage: 0.4,
          label: "Geração real",
          data: realGeneration,
          borderColor: "#8FC1B5",
          backgroundColor: alerts.map((data) => {
            if (data == 0) {
              return "#dce6e3";
            } else {
              return "red";
            }
          }),
          type: "line",
          tension: 0.4,
          fill: "start",
        },
      ],
    };

    const plugin = {
      id: "customCanvasBackgroundColor",
      beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = options.color || "#99ffff";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
      legend: {
        position: "top",
      },
    };
    const options = {
      animation: true,
      cornerRadius: 20,
      layout: { padding: 0 },
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        customCanvasBackgroundColor: {
          color: "white",
        },
        tooltip: {
          displayColors: false,
          enabled: true,
          intersect: false,
          callbacks: {
            label: function (context) {
              var index = context.dataIndex;
              return `valor: ${data.datasets[0].data[index].toFixed(2)}  ${
                alerts[context.dataIndex] != 0 ? " - em alerta" : ""
              }`;
            },
          },
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
        callbacks: {
          label: function (tooltipItem, data) {
            var datasetLabel =
              data.datasets[tooltipItem.datasetIndex].label || "";
            var value =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return datasetLabel + ": " + value;
          },
        },
      },
      scales: {
        y: {
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: "KWh",
            font: { size: 18, weight: "bold" },
          },
          ticks: {
            font: {
              size: 15, // Tamanho da fonte para o eixo X
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: "Hrs",
            font: { size: 18, weight: "bold" },
          },
          ticks: {
            font: {
              size: 15, // Tamanho da fonte para o eixo X
            },
          },
        },
      },
    };

    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          color="textPrimary"
          sx={{ fontWeight: "bold", fontSize: "20px", pb: 4 }}
        >
          Relação horária de geração
        </Typography>
        <Box width={"90%"} height={520}>
          <Chart type="bar" options={options} data={data} plugins={[plugin]} />
        </Box>
      </Card>
    );
  }
};

export const ChartGenrealdayDevicelasthour = (props) => {
  const theme = useTheme();
  const { genrealdayDeviceLasthourData } = props;

  if (genrealdayDeviceLasthourData?.data === undefined) {
    return (
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: 460,
          flexDirection: "column",
          bgcolor: "background.paper",
          px: 3,
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
        <Box width={"90%"} height={430}>
          <LoadingSkeletonCharts />
        </Box>
      </Card>
    );
  } else {
    const hours = genrealdayDeviceLasthourData.data?.map(
      (data) => data.hora_min
    );
    const realGeneration = genrealdayDeviceLasthourData.data?.map(
      (data) => data.d2
    );

    const alerts =
      genrealdayDeviceLasthourData.data?.map((data) => data.alert) || [];
    //const estimatedGeneration = hours.map((hour) =>
    //  (genrealdaylasthourData.sumsPerHour[hour].gen_estimated / 1000).toFixed()
    //);

    const data = {
      labels: hours,
      datasets: [
        {
          label: "Geração real",
          maxBarThickness: 16,
          barPercentage: 0.4,
          label: "Geração real",
          data: realGeneration,
          borderColor: "#8FC1B5",
          backgroundColor: alerts?.map((data) => {
            if (data == 0) {
              return "#dce6e3";
            } else {
              return "red";
            }
          }),
          type: "line",
          tension: 0.4,
          fill: "start",
        },
      ],
    };

    const plugin = {
      id: "customCanvasBackgroundColor",
      beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = options.color || "#99ffff";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
      legend: {
        position: "top",
      },
    };

    const options = {
      animation: true,
      cornerRadius: 20,
      layout: { padding: 0 },
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        customCanvasBackgroundColor: {
          color: "white",
        },
        tooltip: {
          displayColors: false,
          enabled: true,
          intersect: false,
          callbacks: {
            label: function (context) {
              var index = context.dataIndex;
              return `valor: ${data.datasets[0].data[index].toFixed(2)}  ${
                alerts[context.dataIndex] != 0 ? " - em alerta" : ""
              }`;
            },
          },
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
        callbacks: {
          label: function (tooltipItem, data) {
            var datasetLabel =
              data.datasets[tooltipItem.datasetIndex].label || "";
            var value =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return datasetLabel + ": " + value;
          },
        },
      },
      scales: {
        y: {
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: "KWh",
            font: { size: 18, weight: "bold" },
          },
          ticks: {
            font: {
              size: 15, // Tamanho da fonte para o eixo X
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: "Hrs",
            font: { size: 18, weight: "bold" },
          },
          ticks: {
            font: {
              size: 15, // Tamanho da fonte para o eixo X
            },
          },
        },
      },
    };

    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          color="textPrimary"
          sx={{ fontWeight: "bold", fontSize: "20px", pb: 4 }}
        >
          Produção horária
        </Typography>
        <Box width={"90%"} height={430}>
          <Chart type="bar" options={options} data={data} plugins={[plugin]} />
        </Box>
      </Card>
    );
  }
};

export const ChartsGenerationBIProductive = (props) => {
  const { startDate, endDate, optionFilter, generation, isLoading } = props;

  const theme = useTheme();

  if (isLoading || !generation) return <LoadingSkeletonCharts />;

  // Obter número total de dias entre as datas de início e fim
  const totalDays = moment(endDate).diff(startDate, "days") + 1;
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

export const ChartUsinsByState = (props) => {
  const theme = useTheme();

  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      customCanvasBackgroundColor: {
        color: "white",
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
          text: "MWh",
          font: { size: 18, weight: "bold" },
        },
      },
    },
  };

  const data = {
    labels: brazilStates,
    datasets: [
      {
        label: "Geração real",
        maxBarThickness: 16,
        barPercentage: 0.4,
        data: brazilStates.map((data, index) => index * 10),
        borderColor: "#5048E5",
        backgroundColor: "#5048E5",
      },
    ],
  };

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
          height: "80%",
          width: "100%",
          flexDirection: "column",
          px: 1,
          pt: 2,
        }}
      >
        <Typography
          color="textPrimary"
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          Relação da geração real e geração estimada
        </Typography>
        <Box sx={{ height: "100%", width: "100%", mt: 4, mb: 4 }}>
          <Chart height={280} type="bar" options={options} data={data} />
        </Box>
      </Box>
    </Box>
  );
};

export const ChartsLinear = (props) => {
  const { startDate, endDate, generation, isLoading, optionFilter, graphRef } =
    props;
  const theme = useTheme();

  // ESTADOS DE CONTROLE DO FILTRO

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

  // Gerar rótulos de dia para o gráfico

  const filterPeriodData = () => {
    switch (optionFilter) {
      case "days":
        return {
          data: {
            realGeneration: generation.realGeneration?.map((data) =>
              Number(data.value)
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
          moment(data.date, "MM/DD/YYYY").format("DD/MM")
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
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      customCanvasBackgroundColor: {
        color: "white",
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
          text: "KWh",
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
        maxBarThickness: 16,
        barPercentage: 0.4,
        data: periodData.data?.realGeneration,
        borderColor: "#5048E5",
        backgroundColor: "#8FC1B5",
      },
      {
        label: "Geração estimada",
        barThickness: 16,
        borderRadius: 2,
        categoryPercentage: 0.5,
        maxBarThickness: 22,
        barPercentage: 0.4,
        data: periodData.data?.estimatedGeneration,
        backgroundColor: "#265C4B",
        type: "line",
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
          height: "80%",
          width: "100%",
          flexDirection: "column",
          px: 1,
          pt: 2,
        }}
      >
        <Typography
          color="textPrimary"
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
          }}
        ></Typography>
        <Box sx={{ height: "100%", width: "100%", mt: 4, mb: 4 }}>
          <Chart
            height={380}
            type="bar"
            options={options}
            data={data}
            ref={graphRef}
          />
        </Box>
      </Box>
    </Box>
  );
};

export const chartsToGenerationReports = async () => {
  const canvas = document.createElement("canvas");
  canvas.width = 400; // Defina a largura e altura conforme necessário
  canvas.height = 300;

  const ctx = canvas.getContext("2d");

  new ChartJS(ctx, {
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
};

export const ChartsDashboardHorizontal = (props) => {
  const { devices } = props;
  const [topDevices, setTopDevices] = useState([]);

  useEffect(() => {
    let realAndEstimatedDivision = devices.map((data) => {
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
  }, [devices]);

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
  const {
    startDate,
    endDate,
    devices,
    isLoading,
    optionFilter,
    adminGraphRef,
  } = props;
  const theme = useTheme();

  if (devices === undefined) {
    return (
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: 460,
          width: "100%",
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
  } else {
    // Obter as datas e ordená-las
    const sortedDates = Object.keys(devices).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    // Mapear as datas para os valores correspondentes

    const realValuesTemp = sortedDates.map((data) => {
      return {
        value: devices[data].gen_real,
        date: moment(data).format("MM/DD/YYYY"),
      };
    });

    const estimatedValuesTemp = sortedDates.map((data) => {
      return devices[data].gen_estimated;
    });

    let filteredWeekValues = handleWeekFilter(
      startDate,
      endDate,
      realValuesTemp,
      estimatedValuesTemp
    );

    let filteredMonthValues = handleMonthFilter(
      startDate,
      endDate,
      realValuesTemp,
      estimatedValuesTemp
    );

    let filteredQuinzenasValues = handleQuinzenaFilter(
      startDate,
      endDate,
      realValuesTemp,
      estimatedValuesTemp
    );

    const filterPeriodData = () => {
      switch (optionFilter) {
        case "days":
          return {
            data: {
              realGeneration: realValuesTemp.map((data) =>
                (Number(data.value) / 1000).toFixed(4)
              ),
              estimatedGeneration: estimatedValuesTemp.map((data) =>
                (data / 1000).toFixed(4)
              ),
            },
            period: "Dias",
          };
          break;
        case "weeks":
          return {
            data: {
              realGeneration: filteredWeekValues.data.realGeneration.map(
                (data) => data / 1000
              ),
              estimatedGeneration:
                filteredWeekValues.data.estimatedGeneration.map(
                  (data) => data / 1000
                ),
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
          return realValuesTemp?.map((data) =>
            moment(data.date, "MM/DD/YYYY").format("DD/MM")
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
            let date = `${moment(data.startQuinzena).format(
              "DD/MM"
            )} - ${moment(data.endQuinzena).format("DD/MM")}`;
            return date;
          });
          break;
        default:
          break;
      }
    };

    const labelsTemp = filterPeriod();
    const periodData = filterPeriodData();

    const data = {
      labels: labelsTemp,
      datasets: [
        {
          label: "Geração real",
          maxBarThickness: 16,
          barPercentage: 0.4,
          label: "Geração real",
          data: periodData.data?.realGeneration,
          backgroundColor: "#8FC1B5",
        },
        {
          barThickness: 16,
          borderRadius: 2,
          categoryPercentage: 0.5,
          label: "Geração estimada",
          maxBarThickness: 22,
          barPercentage: 0.4,
          label: "Geração estimada",
          data: periodData.data?.estimatedGeneration,
          backgroundColor: "#265C4B",
          type: "line",
        },
      ],
    };

    const plugin = {
      id: "customCanvasBackgroundColor",
      beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = options.color || "#99ffff";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
      legend: {
        position: "top",
      },
    };

    const options = {
      animation: true,
      cornerRadius: 20,
      layout: { padding: 0 },
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        customCanvasBackgroundColor: {
          color: "white",
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
            text: "MWh",
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
          alignItems: "center",
          width: "100%",
        }}
      >
        <Chart
          height={380}
          width={"100%"}
          type="bar"
          options={options}
          data={data}
          ref={adminGraphRef}
          plugins={[plugin]}
        />
      </Card>
    );
  }
};

export const ChartUsinsBystate = (props) => {
  const theme = useTheme();
  const { usinsByState, handleChangeColumns } = props;

  const statesWithAmount = usinsByState.filter(
    (data) => data.amountOfUsins.length != 0
  );

  let states = statesWithAmount.map((data) => data.state);
  let usinsByStateAmount = statesWithAmount.filter(
    (data) => data.amountOfUsins.length != 0
  );

  const data = {
    labels: states,
    datasets: [
      {
        maxBarThickness: 12,
        barPercentage: 0.4,
        label: "Quantidade de usinas por estado",
        data: usinsByStateAmount.map((data) => data.amountOfUsins.length),
        backgroundColor: "#6CE5E8",
      },
    ],
  };

  const options = {
    animation: true,

    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      customCanvasBackgroundColor: {
        color: "white",
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = states[index];
        handleChangeColumns(label);
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
    scales: {
      y: {
        grid: {
          display: false,
        },
        title: {
          display: false,
          text: "Quantidade de usinas",
          font: { size: 14, weight: "bold" },
        },
      },
    },
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Chart type="bar" options={options} data={data} />
    </Box>
  );
};

export const AdmnistratorGraph = (props) => {
  const { devices, adminGraphRef } = props;
  const theme = useTheme();

  const realData = devices?.somaPorDiaReal || {};
  const estimatedData = devices?.somaPorDiaEstimada || {};

  const sortedDates = Object.keys(realData).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const labels = sortedDates.slice(
    sortedDates.length - 1 - 9,
    sortedDates.length - 1 + 1
  );

  const realValues = labels.map((data) => (realData[data] / 1000).toFixed(2));

  const estimatedValues = labels.map((data) =>
    (estimatedData[data] / 1000).toFixed(2)
  );

  const data = {
    labels: labels.map((data) => moment(data).format("DD/MM")),
    datasets: [
      {
        barThickness: 8,
        label: "Geração real",
        maxBarThickness: 8,
        barPercentage: 0.8,
        label: "Geração real",
        data: realValues,
        backgroundColor: "#6CE5E8",
      },
      {
        barThickness: 8,
        borderRadius: 2,
        categoryPercentage: 0.5,
        label: "Geração estimada",
        maxBarThickness: 8,
        barPercentage: 0.8,
        label: "Geração estimada",
        data: estimatedValues,
        backgroundColor: "#2D8BBA",
      },
    ],
  };

  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    indexAxis: "y",
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
          text: "MWh",
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
        bgcolor: "white",
        px: 2,
        pb: 2,
        pt: 4,
      }}
    >
      <Typography
        color="textPrimary"
        sx={{ fontWeight: "bold", fontSize: "20px" }}
      >
        Relação da geração nos 10 últimos dias.
      </Typography>
      <Box sx={{ height: "300px", width: "342px", bgcolor: "white" }}>
        <Chart
          type="bar"
          height="434px"
          width="564px"
          options={options}
          data={data}
          ref={adminGraphRef}
        />
      </Box>
    </Box>
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
        stepSize: 60,
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
