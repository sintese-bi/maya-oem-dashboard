import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  reportClient,
  reportClientRule,
} from "src/reports/reportsRules/reportClientRule";
import { Chart } from "chart.js";
import {
  Avatar,
  Modal,
  Backdrop,
  CircularProgress,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import {
  PDFDownloadLink,
  BlobProvider,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { Cancel, Email } from "@mui/icons-material";
import {
  reportgenerationEmai,
  updateEmail,
} from "src/store/actions/generation";
import moment from "moment";
import {
  getAllDevicesGeneration,
  getCapacities,
  getDevices,
} from "src/store/actions/devices";
import { getUserCookie } from "src/services/session";

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

const validateSchema = Yup.object().shape({
  email: Yup.string().required("Campo é obrigatório."),
});

export const SendEmail = ({
  devUuidState,
  blUuidState,
  data,
  useNameState,
  capacity,
  address,
  email,
}) => {
  const dispatch = useDispatch();

  const [deviceInfo, setDeviceInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [emailIsUpdated, setEmailIsUpdated] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [optionFilter, setOptionFilter] = useState("days");
  const [generationRealTotal, setGenerationRealTotal] = useState("");
  const [generationEstimatedTotal, setGenerationEstimatedTotalt] = useState("");

  const { devicesGeneration, isLoadingDevicesGeneration } = useSelector(
    (state) => state.devices
  );
  const { isLoadingDevices, devices } = useSelector((state) => state.devices);
  const { emailDontExist } = useSelector((state) => state.generation);

  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

  function handleChartLinearData(props) {
    dispatch(getAllDevicesGeneration(props));
  }

  function handleModalState() {
    setStartDate(moment().startOf("month").format("YYYY-MM-DD"));
    setEndDate(moment().format("YYYY-MM-DD"));
    setOpen(!open);
  }

  function handleDeleteDeviceModal() {
    setOpen(!open);
  }

  function handleDeleteDevice(reportData) {
    dispatch(
      reportgenerationEmai({
        dev_uuid: devUuidState,
        base64: reportData.split(",")[1],
      })
    );
  }

  function handleReportGeneration() {
    let startDateTemp = moment(startDate).format("DD/MM/YYYY");
    let endDateTemp = moment(endDate).format("DD/MM/YYYY");

    reportClientRule(
      devicesGeneration,
      useNameState,
      capacity,
      setIsLoadingReport,
      opa,
      startDateTemp,
      endDateTemp,
      address
    );
  }

  useEffect(() => {
    if (selectedDevice) {
      dispatch(
        getAllDevicesGeneration(
          Object.assign(selectedDevice, {
            startDate: startDate,
            endDate: endDate,
          })
        )
      );
    }
  }, [startDate, endDate, optionFilter]);

  useEffect(() => {
    setGenerationEstimatedTotalt(
      devicesGeneration.estimatedGeneration
        ?.reduce((total, element) => total + element, 0)
        .toFixed(2)
    );
    setGenerationRealTotal(
      devicesGeneration.realGeneration
        ?.reduce((total, element) => total + Number(element.value), 0)
        .toFixed(2)
    );
  }, [devicesGeneration]);

  useEffect(() => {
    if (devices.length !== 0) {
      setDeviceInfo(devices[0]);
    }
  }, [devices, devUuidState]);

  useEffect(() => {
    dispatch(getDevices(blUuidState));
  }, [blUuidState]);

  useEffect(() => {
    dispatch(getCapacities(devUuidState));
  }, [devUuidState]);

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
                  <Text style={styles.generationDateText}>Data de geração</Text>
                  <Text style={styles.generationDateValue}>
                    {reportClient.date.getDate() < 10 ? "0" : ""}
                    {reportClient.date.getDate()}/
                    {reportClient.date.getMonth() + 1 < 10 ? "0" : ""}
                    {reportClient.date.getMonth() + 1}/
                    {reportClient.date.getFullYear()}
                  </Text>
                </View>
                <View style={styles.generationDate}>
                  <Text style={styles.generationDateText}>
                    Data de aquisição dos dados
                  </Text>
                  <Text style={styles.generationDateValue}>
                    {reportClient.requistionStartDate} -
                    {reportClient.requisitionEndDate}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: "12px", marginBottom: "10px" }}>
                  End. de instalação: {reportClient.address}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: "18px", marginRight: "20px" }}>
                  Cliente: {reportClient.useName}
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
                reportClient.graph
                  ? reportClient.graph
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
                  {reportClient.brand}
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
                <Text style={styles.cardNumber}>{reportClient.capacity}</Text>
              </View>
              <Image
                style={styles.icon}
                src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
              ></Image>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.cardLabel}>NÍVEL DE GERAÇÃO</Text>
                <Text style={styles.cardText}>{reportClient.lowLevel}</Text>
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
                  {reportClient.realGenerationTotal} Kwh
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
                  {reportClient.estimatedGenerationTotal} Kwh
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
                <Text style={styles.cardNumber}>{reportClient.percent} %</Text>
              </View>
              <Image
                style={styles.icon}
                src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"
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
            <Text style={{ fontSize: "12px" }}>{reportClient.situation}</Text>
          </View>
          <View style={styles.madeBy}>
            <Text style={styles.madeByText}>POWERED BY: MAYA TECH S.A </Text>
            <Image
              style={{ width: "60px", height: "24px" }}
              src="https://ucarecdn.com/8961b481-f63f-4b00-96ee-a79fa1ba3470/-/brightness/-50/-/filter/briaril/100/-/preview/3000x3000/"
            ></Image>
          </View>
        </View>
      </Page>
    </Document>
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validateSchema),
  });
  const methods = useForm();
  const [opa, setOpa] = useState(false);
  const [isLoadingGraph, setIsLoadingGraph] = useState(true);
  const [isLoadingReport, setIsLoadingReport] = useState(true);

  function createChart() {
    // Crie um elemento canvas para o gráfico
    const canvas = document.createElement("canvas");

    // Configure o ID do container para o elemento canvas
    canvas.id = "acquisitions";

    // Adicione o elemento canvas ao container desejado na sua página HTML
    document.getElementById("acquisitions").appendChild(canvas);

    // Crie o gráfico usando Chart.js
    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: devicesGeneration?.realGeneration?.map((data) =>
          moment(data.date, "MM/DD/YYYY").format("DD/MM")
        ),
        datasets: [
          {
            label: "Geração Real",
            data: devicesGeneration.realGeneration?.map((data) =>
              Number(data.value)
            ),
            backgroundColor: "#6CE5E8",
            borderWidth: 1,
          },
          {
            label: "Geração Estimada",
            data: devicesGeneration.estimatedGeneration?.map((data) => data),
            backgroundColor: "#2D8BBA",
            borderWidth: 1,
            type: "line",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setIsLoadingGraph(false);
    setOpa(chart);
    document.getElementById("acquisitions").style.display = "none";
  }

  async function onSubmit(values) {
    const { email } = values;
    try {
      dispatch(updateEmail({ dev_uuid: devUuidState, email }));
      setEmailIsUpdated(true);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Avatar
        onClick={() => {
          handleChartLinearData({
            blUuid: blUuidState,
            startDate,
            endDate,
            devUuid: devUuidState,
            type: optionFilter,
            name: "undefined",
          });
          setSelectedDevice({
            blUuid: blUuidState,
            devUuid: devUuidState,
            type: optionFilter,
            name: "undefined",
          });
          setOpen(!open);
        }}
      >
        <Email />
      </Avatar>
      <Modal
        open={open}
        onClose={handleDeleteDeviceModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{ bgcolor: "background.paper", px: 4, pb: 4, borderRadius: 1 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              py: 4,
            }}
          >
            <Cancel
              fontSize="large"
              onClick={() => setOpen(!open)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          <Typography sx={{ width: "100%", mb: 4 }}>
            Caro usuário, siga os passos seguintes para finalizar o envio do
            email !
          </Typography>
          <div>
            <div id="acquisitions"></div>
          </div>
          <BlobProvider document={MyDoc}>
            {({ blob, url, loading, error }) => {
              return (
                <>
                  {emailIsUpdated ? (
                    isLoadingGraph ? (
                      <Button variant="contained" onClick={() => createChart()}>
                        Gerar gráfico
                      </Button>
                    ) : isLoadingReport ? (
                      <Button
                        variant="contained"
                        onClick={() => handleReportGeneration()}
                      >
                        Preparar para envio
                      </Button>
                    ) : (
                      <Button
                        disabled={loading}
                        variant="contained"
                        onClick={() => {
                          var reader = new FileReader();
                          reader.addEventListener("loadend", () => {
                            handleDeleteDevice(reader.result);
                          });
                          reader.readAsDataURL(blob);
                        }}
                      >
                        {loading ? "Finalizando" : "Enviar email"}
                      </Button>
                    )
                  ) : (
                    <FormProvider {...methods}>
                      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                          {email
                            ? `Por favor, digite o email que deseja enviar o relatório.`
                            : `Não encontramos nenhum email registrado, por favor, registre uma novo email.`}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <TextField
                            defaultValue={email}
                            margin="normal"
                            label="Novo email"
                            {...register("email")}
                            error={!!errors.deviceLogin}
                            helperText={errors.deviceLogin?.message}
                          />
                          <Button type="submit" variant="contained">
                            {email ? `Atualizar email` : "Registrar email"}
                          </Button>
                        </Box>
                      </Box>
                    </FormProvider>
                  )}
                </>
              );
            }}
          </BlobProvider>
        </Box>
      </Modal>
    </>
  );
};
