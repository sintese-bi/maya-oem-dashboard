import { useState, useEffect } from "react";
import api, { configRequest } from "src/services/api";
import ReactDOMServer from "react-dom/server";
import worker_script from "src/services/work";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Chart } from "chart.js";
import {
  Box,
  Typography,
  Card,
  TextField,
  MenuItem,
  Button,
  Tooltip,
  Modal,
  LinearProgress,
} from "@mui/material";

import {
  AdmnistratorGraph,
  ChartsDashboard,
} from "src/components/shared/Charts";
import moment from "moment";
import Plants from "./total-month-components/total-month-devices";
import { useDispatch, useSelector } from "react-redux";
import { getGraphData } from "src/store/actions/users";
import { TotalMonthInfo } from "./total-month-components/total-month-info";
import { getUserCookie } from "src/services/session";
import { generalReport } from "src/store/actions/generation";
import {
  PDFViewer,
  BlobProvider,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  usePDF,
  pdf,
} from "@react-pdf/renderer";
import toast from "react-hot-toast";
import { numbers } from "src/helpers/utils";
const styles = StyleSheet.create({
  pdfViewer: {
    height: "85vh",
    width: "500px",
  },
  page: {
    backgroundColor: "white",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "20px",
    paddingLeft: "20px",
    backgroundColor: "#0097B2",
    color: "white",
  },
  generationDateText: {
    fontSize: "6px",
    opacity: 0.8,
    marginBottom: "4px",
  },
  generationDateValue: {
    fontSize: "8px",
    fontWeight: "ultrabold",
    marginBottom: "14px",
  },
  logo: {
    padding: "22px",
    backgroundColor: "white",
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
  },
  cardsRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginVertical: "8px",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "180px",
    backgroundColor: "#0097B2",
    borderRadius: "10px",
    padding: "20px",
    color: "white",
  },
  cardLabel: {
    fontSize: "6px",
    fontWeight: "ultrabold",
    opacity: 0.8,
    marginBottom: "8px",
  },
  cardNumber: {
    fontSize: "16px",
    fontWeight: "ultrabold",
  },
  cardText: {
    fontSize: "10px",
    fontWeight: "ultrabold",
    width: "86px",
  },
  icon: {
    width: "36px",
    height: "36px",
    borderRadius: "50px",
  },
  madeBy: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  light: {
    height: "10px",
    width: "10px",
  },
  pdfEndImg: {
    height: "14px",
    width: "80px",
  },
  madeByText: {
    fontSize: "8px",
    marginBottom: "8px",
  },
});

export const TotalMonth = ({
  useName,
  realGenerationTotal,
  estimatedGenerationTotal,
  percentTotal,
  dataDevices,
  allDevices,
  isLoading,
  setEstimatedGeneration,
  setRealGeneration,
  setPercent,
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
  const { useUuid, token } = getUserCookie();
  const { graphData, isLoadingGraph, selectedUser } = useSelector(
    (state) => state.users
  );
  const [generatedReports, setGeneratedReports] = useState([]);
  const [opa, setOpa] = useState();
  const [progress, setProgress] = useState(0);
  const [cancelGeneration, setCancelGeneration] = useState(true);
  const [open, setOpen] = useState(false);
  const { generalReportData } = useSelector((state) => state.generation);
  const dispatch = useDispatch();
  const [optionFilter, setOptionFilter] = useState("days");
  const [generationPercentState, setGenerationPercentState] = useState(0);
  const [topDevicesKWp, setTopDevicesKWp] = useState([]);
  const [realGenerationFiltered, setRealGenerationFiltered] = useState(0);
  const [estimatedGenerationFiltered, setEstimatedGenerationFiltered] =
    useState(0);

  function handleTopDevicesKWp(devices) {
    setTopDevicesKWp(devices.sort((a, b) => b.capacity - a.capacity));
  }

  function handleSendAllReportByEmail() {
    setOpen(true);
  }

  async function generateBlob(doc) {
    const blob = await pdf(doc).toBlob();
    return blob;
  }

  function reportGenerationCompleted() {
    setOpen(false);
    toast.success("Processo de envio massivo de email completo!", {
      duration: 1000,
    });
  }

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

    const chart = new Chart(ctx, {
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
              console.log(animation.chart.toBase64Image());
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

  async function reportItem(props, graphURL) {
    const files = [];
    for (const data of props) {
      const MyDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.main}>
              <View style={styles.header}>
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ marginRight: "22px" }}>
                      <Text style={styles.generationDateText}>
                        Data de geração
                      </Text>
                      <Text style={styles.generationDateValue}></Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{ fontSize: "12px", marginBottom: "10px" }}>
                      Planta: {data.dev_name}
                    </Text>
                  </View>
                </View>
                <View style={styles.logo}>
                  <Image
                    style={{ width: "160px", height: "62px" }}
                    src="https://ucarecdn.com/258f82dc-bf80-4b30-a4be-bcea7118f14a/"
                  ></Image>
                </View>
              </View>
              <View
                style={{
                  width: "100vw",
                  backgroundColor: "white",
                  padding: "20px",
                  marginBottom: "20px",
                  marginTop: "10px",
                  borderRadius: "10px",
                  opacity: 0.9,
                }}
              >
                <Text
                  style={{
                    marginBottom: "16px",
                    marginLeft: "16px",
                    fontWeight: "heavy",
                    fontSize: "12px",
                  }}
                >
                  Comparação da geração real e estimada
                </Text>
                <Image
                  style={{
                    width: "100%",
                    height: "220px",
                  }}
                  src={`${
                    graphURL
                      ? graphURL
                      : `https://ucarecdn.com/
                258f82dc-bf80-4b30-a4be-bcea7118f14a/
                -/preview/500x500/
                -/quality/smart_retina/
                -/format/auto/`
                  }`}
                ></Image>
              </View>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                  width: "600px",
                  position: "absolute",
                  top: "192px",
                  zIndex: 2,
                }}
              >
                <Image
                  style={{ height: "100%", width: "80%" }}
                  src="https://ucarecdn.com/4e2bca57-c558-47ca-b01e-c0a62ca8d23a/-/preview/500x500/-/quality/smart_retina/-/format/auto/"
                ></Image>
              </View>
              <View style={styles.cardsRow}>
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardLabel}>MARCA</Text>
                    <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {data.dev_brand}
                    </Text>
                  </View>
                  <Image
                    style={styles.icon}
                    src="https://ucarecdn.com/efd49320-e555-4813-af4b-bfffce905f67/-/gamma/0/-/contrast/-100/-/saturation/382/-/filter/gavin/100/-/preview/3000x3000/"
                  ></Image>
                </View>
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardLabel}>POTÊNCIA</Text>
                    <Text style={styles.cardNumber}>{data.dev_capacity}</Text>
                  </View>
                  <Image
                    style={styles.icon}
                    src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
                  ></Image>
                </View>
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardLabel}>NÍVEL DE GERAÇÃO</Text>
                    <Text style={styles.cardText}>
                      {(data.sumData.gen_real / data.sumData.gen_estimated) *
                        100 >
                      100
                        ? "Acima"
                        : (data.sumData.gen_real / data.sumData.gen_estimated) *
                            100 >=
                          80
                        ? "Dentro"
                        : "Abaixo"}
                    </Text>
                  </View>
                  <Image
                    style={styles.icon}
                    src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"
                  ></Image>
                </View>
              </View>
              <View style={styles.cardsRow}>
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardLabel}>GERAÇÃO TOTAL REAL</Text>
                    <Text style={styles.cardNumber}>
                      {data.sumData.gen_real}
                    </Text>
                  </View>
                  <Image
                    style={styles.icon}
                    src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
                  ></Image>
                </View>
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardLabel}>GERAÇÃO TOTAL ESTIMADA</Text>
                    <Text style={styles.cardNumber}>
                      {data.sumData.gen_estimated}
                    </Text>
                  </View>
                  <Image
                    style={styles.icon}
                    src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
                  ></Image>
                </View>
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardLabel}>PERCENTUAL</Text>
                    <Text style={styles.cardNumber}>
                      {(data.sumData.gen_real / data.sumData.gen_estimated) *
                        100}
                    </Text>
                  </View>
                  <Image
                    style={styles.icon}
                    src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"
                  ></Image>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "69%",
                  justifyContent: "space-around",
                  marginVertical: "8px",
                }}
              >
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardLabel}>
                      ÁRVORES SALVAS PELA ECONOMIA DE CARBONO
                    </Text>
                    <Text style={styles.cardNumber}>
                      {numbers(
                        data.sumData.gen_real * 1000 * 5.04 * 0.0001 * 1000,
                        ""
                      )}
                    </Text>
                  </View>
                  <Image
                    style={styles.icon}
                    src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
                  ></Image>
                </View>
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardLabel}>
                      EMISSÃO DE CARBONO ECONOMIZADA NA ATMOSFERA
                    </Text>
                    <Text style={styles.cardNumber}>
                      {numbers(Number("0.4190") * data.sumData.gen_real, "CO2")}
                    </Text>
                  </View>
                  <Image
                    style={styles.icon}
                    src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
                  ></Image>
                </View>
              </View>
              <View
                style={{
                  width: "80%",
                  backgroundColor: "#D9D9D9",
                  paddingVertical: "24px",
                  paddingHorizontal: "12px",
                  marginBottom: "10px",
                  marginTop: "10px",
                  borderRadius: "10px",
                }}
              >
                <Text style={{ fontSize: "12px" }}>
                  {(data.sumData.gen_real / data.sumData.gen_estimated) * 100 >
                  100
                    ? `Parabéns! A produção da sua usina esta dentro do esperado. Sua produtividade no período escolhido é de ${numbers(
                        data.sumData.gen_real
                      )}KWh.`
                    : (data.sumData.gen_real / data.sumData.gen_estimated) *
                        100 >=
                      80
                    ? `A produção da sua usina esta dentro do esperado. Sua produtividade no período escolhido é de ${numbers(
                        data.sumData.gen_real
                      )}kWh.`
                    : `Sua usina não está produzindo conforme esperado, fique atento aos próximos dias de monitoramento e observe a produção da sua usina. Sua produtividade no período escolhido é de ${numbers(
                        data.sumData.gen_real
                      )}KWh.`}
                </Text>
              </View>
              <View style={styles.madeBy}>
                <Text style={styles.madeByText}>
                  POWERED BY: MAYA TECH S.A{" "}
                </Text>
                <Image
                  style={{ width: "60px", height: "24px" }}
                  src="https://ucarecdn.com/8961b481-f63f-4b00-96ee-a79fa1ba3470/-/brightness/-50/-/filter/briaril/100/-/preview/3000x3000/"
                ></Image>
              </View>
            </View>
          </Page>
        </Document>
      );

      const blob = await generateBlob(MyDoc);

      const reader = new FileReader();
      reader.addEventListener("loadend", () => {
        console.log(reader.result);
        files.push({ dev_uuid: data.dev_uuid, base64: reader.result });
        setProgress((prevProgress) =>
          prevProgress >= 100
            ? reportGenerationCompleted()
            : prevProgress + 100 / props.length
        );
      });
      reader.readAsDataURL(blob);
    }

    return files;
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

    const normalise = (value) =>
      ((value - 0) * 100) / (generalReportData?.reportData.length - 0);

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
          {...{ value: progress }}
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
    const somaPorDiaReal = graphData.somaPorDiaReal
      ? graphData?.somaPorDiaReal
      : { key: 0 };
    const somaPorDiaEstimada = graphData.somaPorDiaEstimada
      ? graphData.somaPorDiaEstimada
      : { key: 0 };
    setRealGenerationFiltered(
      (
        Object.values(somaPorDiaReal).reduce(
          (total, element) => total + element,
          0
        ) / 1000
      ).toFixed(2)
    );
    setEstimatedGenerationFiltered(
      (
        Object.values(somaPorDiaEstimada).reduce(
          (total, element) => total + element,
          0
        ) / 1000
      ).toFixed(2)
    );
  }, [graphData]);

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

  useEffect(() => {
    handleTopDevicesKWp(dataDevices);
    let generationRealMonthTotal = (
      graphData?.data?.somaPorDiaReal?.[moment().format("YYYY-MM-DD")] / 1000
    ).toFixed(2);
    setRealGeneration(generationRealMonthTotal);

    let generationEstimatedMonthTotal = (
      graphData?.data?.somaPorDiaEstimada?.[moment().format("YYYY-MM-DD")] /
      1000
    ).toFixed(2);
    setEstimatedGeneration(generationEstimatedMonthTotal);
  }, [graphData]);

  useEffect(() => {
    setGenerationPercentState(100);
  }, [realGenerationFiltered, estimatedGenerationFiltered]);

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
