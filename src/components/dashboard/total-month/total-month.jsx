import {
  Box,
  Button,
  Card,
  LinearProgress,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Chart } from "chart.js";
import { useEffect, useState } from "react";

import moment from "moment";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ChartsDashboard } from "src/components/shared/Charts";
import { getUserCookie } from "src/services/session";
import { generalReport } from "src/store/actions/generation";
import { getGraphData } from "src/store/actions/users";
import Plants from "./total-month-components/total-month-devices";
import { TotalMonthInfo } from "./total-month-components/total-month-info";

export const TotalMonth = ({
  optionFilter,
  setOptionFilter,
  useName,
  realGenerationTotal,
  estimatedGenerationTotal,
  percentTotal,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  type,
  data,
  devicesTableRef,
  adminGraphRef,
  setIsLoadingReportGeneration,
}) => {
  const { useUuid } = getUserCookie();
  const { graphData, isLoadingGraph, selectedUser } = useSelector(
    (state) => state.users
  );
  const [cancelGeneration, setCancelGeneration] = useState(true);
  const [open, setOpen] = useState(false);
  const { generalReportData } = useSelector((state) => state.generation);
  const dispatch = useDispatch();

  function createChart(props) {
    // Crie um elemento canvas para o gráfico
    const canvasContainer = document.getElementById("acquisitions");

    let canvas = canvasContainer.querySelector("canvas");

    if (canvas) {
      document.getElementById("canvas").remove();
    } else {
      canvas = document.createElement("canvas");
      canvas.setAttribute("id", "canvas");
      canvasContainer.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["a", "b", "c", "d", "e", "f"],
        datasets: [
          {
            label: "Geração Real",
            data: [10, 10, 10, 10, 10, 10],
            barThickness: 8,
            borderRadius: 2,
            categoryPercentage: 0.5,
            maxBarThickness: 8,
            backgroundColor: "#6CE5E8",
          },
          {
            label: "Geração Estimada",
            barThickness: 3,
            data: [20, 10, 20, 20, 10, 40],
            borderColor: "#14B8A6",
            backgroundColor: "#14B8A6",
            type: "line",
            borderWidth: 0.4,
          },
        ],
      },
      options: {
        animation: {
          onComplete: async (animation) => {
            props.map((data) => {
              const labels = Object.keys(data.currentDayData);

              animation.chart.data.labels = labels;
              animation.chart.update();
            });
          },
        },
        scales: {
          y: {
            grid: {
              display: false,
            },
            beginAtZero: true,
            ticks: {
              font: { size: 8 }, // Adicione esta linha para definir o tamanho da fonte dos rótulos do eixo Y
            },
          },
          x: {
            grid: {
              display: false,
            },
            beginAtZero: true,
            ticks: {
              font: { size: 6 }, // Adicione esta linha para definir o tamanho da fonte dos rótulos do eixo Y
            },
          },
        },
      },
    });
  }

  function MassiveEmailModal() {
    const dataToGeneratePDF = () => {
      let timesToSlice = generalReportData?.reportData.length / 10;
      let index = 0;
      let test = [];
      for (let i = 0; i <= timesToSlice; i++) {
        test.push(generalReportData.reportData.slice(index, index + 10));
        index += 10;
      }
      return test;
    };

    useEffect(() => {
      const generatedReports = async () => {
        const data = dataToGeneratePDF();
        createChart(data[data.length - 1]);
      };

      generatedReports();
    }, [cancelGeneration]);

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          bgcolor: "background.paper",
          width: 500,
          height: 400,
          py: 8,
        }}
      >
        <div>
          <div id="acquisitions"></div>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setCancelGeneration(false);
            }}
          >
            Iniciar envio
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              window.location.reload();
            }}
          >
            Encerrar envio
          </Button>
        </Box>
        <LinearProgress
          variant="determinate"
          {...{ value: 0 }}
          sx={{ width: "90%" }}
        />
      </Box>
    );
  }

  function handleMassiveEmailModal() {
    setOpen(false);
  }

  useEffect(() => {
    dispatch(generalReport({ use_uuid: useUuid }));
  }, [useUuid]);

  useEffect(() => {
    let graphStartDate = graphData?.dates?.startDate;
    let graphEndDate = graphData?.dates?.endDate;
    if (
      moment(startDate).isSame(graphStartDate) &&
      moment(endDate).isSame(graphEndDate)
    ) {
      return;
    }
    if (selectedUser.length != 0) {
      dispatch(
        getGraphData({
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
          uuid: selectedUser[0]?.useUuidState,
        })
      );
    } else {
      dispatch(
        getGraphData({
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
          uuid: useUuid,
        })
      );
    }
    setIsLoadingReportGeneration(true);
  }, [startDate, endDate, optionFilter, useUuid]);

  useEffect(() => {
    if (selectedUser.length != 0) {
      dispatch(
        getGraphData({
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
          uuid: selectedUser[0]?.useUuidState,
        })
      );
    } else {
      dispatch(
        getGraphData({
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
          uuid: useUuid,
        })
      );
    }
  }, [useUuid]);

  return (
    <>
      {isLoadingGraph ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            py: 4,
            mt: 8,
          }}
        >
          <Typography variant="h4">Carregando dados...</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "96%",
              py: 4,
              px: 3,
            }}
          >
            <TotalMonthInfo
              useName={useName}
              realGenerationTotal={realGenerationTotal}
              estimatedGenerationTotal={estimatedGenerationTotal}
              percentTotal={percentTotal}
              startDate={startDate}
              endDate={endDate}
            />
            <Box sx={{ width: "100%", mt: 10, mb: 4 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Data Inicial"
                  value={startDate}
                  onChange={(startDate) => {
                    setStartDate(
                      startDate ? moment(startDate).format("YYYY-MM-DD") : ""
                    );
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  label="Data Final"
                  value={endDate}
                  onChange={(endDate) =>
                    setEndDate(
                      endDate ? moment(endDate).format("YYYY-MM-DD") : ""
                    )
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                sx={{ width: 200, backgroundColor: "transparent", ml: 4 }}
                label="Filtrar por"
                select
                defaultValue="days"
                variant="standard"
                onChange={(e) => setOptionFilter(e.target.value)}
              >
                <MenuItem value="days">Dias</MenuItem>
                <MenuItem value="weeks">Semanas</MenuItem>
                <MenuItem value="biweek">Quinzena</MenuItem>
                <MenuItem value="months">Mês</MenuItem>
              </TextField>
              <Box
                sx={{
                  width: "100%",
                  mt: 6,
                }}
              >
                <ChartsDashboard
                  startDate={startDate}
                  endDate={endDate}
                  optionFilter={optionFilter}
                  dataDevices={graphData.data}
                  isLoading={isLoadingGraph}
                  adminGraphRef={adminGraphRef}
                />
              </Box>
              {/* O gráfico abaixo não está sendo rederenizado, serve apenas para a construção do relatório administrador */}
            </Box>
            <Box
              component="main"
              sx={{
                width: "100%",
                mt: 4,
              }}
            >
              <Tooltip title="Função disponível em breve">
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ opacity: 0.4 }}
                  onClick={() => {
                    toast.success(
                      "Em breve nosso sistema implementará o envio massivo de email para todas as plantas registradas do usuário!",
                      {
                        duration: 4000,
                      }
                    );
                  }}
                >
                  Enviar email para todas as plantas
                </Button>
              </Tooltip>
              <Plants
                title={"Listagem de usinas"}
                data={data}
                devicesTableRef={devicesTableRef}
                type={type}
              />
            </Box>
          </Card>
          <Modal
            open={open}
            onClose={handleMassiveEmailModal}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MassiveEmailModal />
          </Modal>
        </Box>
      )}
    </>
  );
};
