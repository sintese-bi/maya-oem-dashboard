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

  const [action, setAction] = useState("generateReport");
  const [open, setOpen] = useState(false);
  const [emailIsUpdated, setEmailIsUpdated] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState([]);
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
    setOpen(false);
  }

  function handleReportGeneration() {
    let startDateTemp = moment(startDate).format("DD/MM/YYYY");
    let endDateTemp = moment(endDate).format("DD/MM/YYYY");
    setAction("confirmEmail");
    reportDeviceRule(
      devicesGeneration,
      selectedDevice[0].useNameState,
      selectedDevice[0].capacity,
      setIsLoadingReport,
      startDateTemp,
      endDateTemp,
      selectedDevice[0].address,
      selectedDevice[0].deviceName
    );
  }

  useEffect(() => {
    if (selectedDevice.length != 0) {
      dispatch(
        getAllDevicesGeneration(
          Object.assign(selectedDevice[0], {
            startDate: startDate,
            endDate: endDate,
          })
        )
      );
    }
  }, [selectedDevice]);

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

  //useEffect(() => {
  //  dispatch(getDevices(blUuidState));
  //}, [blUuidState]);
  //
  //useEffect(() => {
  //  dispatch(getCapacities(devUuidState));
  //}, [devUuidState]);

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
      dispatch(
        storeReport({
          dev_uuid: devUuidState,
          use_uuid: getUserCookie().useUuid,
        })
      );
      setAction("reportPreview");
    } catch (error) {
      alert(error);
    }
  }

  const TotalMonthSendEmailContent = () => {
    if (devicesGeneration.realGeneration == undefined) {
      return (
        <Box sx={{ width: "100%", height: "100px" }}>
          <CircularProgress color="inherit" />
        </Box>
      );
    }

    switch (action) {
      case "generateReport":
        return (
          <Button
            variant="contained"
            onClick={() => {
              setFileIsReadyToPreview(true);
              handleReportGeneration();
            }}
          >
            Preparar relatório
          </Button>
        );
        break;
      case "confirmEmail":
        return (
          <FormProvider {...methods}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                gap: 2,
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                sx={{ width: "100%" }}
                label="Email"
                defaultValue={email}
                {...register("email")}
              />
              <Button type="submit" variant="contained">
                Confirmar email
              </Button>
            </Box>
          </FormProvider>
        );
        break;
      case "reportPreview":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <BlobProvider document={DeviceReport()}>
              {({ blob, url, loading, error }) => {
                return (
                  <>
                    <iframe src={url}></iframe>
                    <Button
                      disabled={loading ? true : false}
                      onClick={() => {
                        const reader = new FileReader();
                        reader.addEventListener("loadend", () => {
                          handleDeleteDevice(reader.result);
                        });
                        reader.readAsDataURL(blob);
                      }}
                    >
                      {loading ? "Liberando relatório" : "Enviar relatório"}
                    </Button>
                  </>
                );
              }}
            </BlobProvider>
          </Box>
        );
        break;
    }
  };

  return (
    <>
      <Avatar
        onClick={() => {
          setSelectedDevice([
            {
              devUuidState,
              blUuidState,
              data,
              useNameState,
              capacity,
              address,
              email,
              deviceName,
            },
          ]);
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

          <TotalMonthSendEmailContent />
        </Box>
      </Modal>
    </>
  );
};
