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
  PDFViewer,
  BlobProvider,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
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
import { ClientReport } from "src/reports/ClientReport";
import { storeReport } from "src/store/actions/users";
import {
  reportDevice,
  reportDeviceRule,
} from "src/reports/reportsRules/reportDeviceRule";
import { DeviceReport } from "src/reports/DeviceReport";

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
  deviceName,
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
    console.log(devicesGeneration);
    if (
      devicesGeneration.realGeneration.length != 0 &&
      devicesGeneration.estimatedGeneration.length != 0
    ) {
      reportDeviceRule(
        devicesGeneration,
        useNameState,
        capacity,
        setIsLoadingReport,
        startDateTemp,
        endDateTemp,
        address,
        deviceName
      );
    }
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
  const [fileIsReadyToPreview, setFileIsReadyToPreview] = useState(false);

  async function onSubmit(values) {
    const { email } = values;
    try {
      dispatch(updateEmail({ dev_uuid: devUuidState, email }));
      dispatch(storeReport({ dev_uuid: devUuidState }));
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
        {devicesGeneration?.realGeneration?.length != 0 &&
        devicesGeneration?.estimatedGeneration?.length != 0 ? (
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

            {devicesGeneration?.realGeneration?.length != 0 &&
            devicesGeneration?.estimatedGeneration?.length != 0 ? (
              !fileIsReadyToPreview ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    setFileIsReadyToPreview(true);
                    handleReportGeneration();
                  }}
                >
                  Preparar relatório
                </Button>
              ) : (
                <BlobProvider document={DeviceReport()}>
                  {({ blob, url, loading, error }) => {
                    // Do whatever you need with blob here
                    return (
                      <Button
                        variant="outlined"
                        disabled={blob !== null ? false : true}
                        onClick={() => {
                          var reader = new FileReader();
                          reader.addEventListener("loadend", () => {
                            handleDeleteDevice(reader.result);
                          });
                          reader.readAsDataURL(blob);
                        }}
                      >
                        {blob !== null
                          ? "Enviar relatório"
                          : "Finalizando relatório...."}
                      </Button>
                    );
                  }}
                </BlobProvider>
              )
            ) : (
              "não há dados de geração"
            )}
          </Box>
        ) : (
          <Box
            sx={{ bgcolor: "background.paper", px: 4, py: 6, borderRadius: 1 }}
          >
            <Typography variant="h5">
              Não há dados de geração disponível
            </Typography>
          </Box>
        )}
      </Modal>
    </>
  );
};
