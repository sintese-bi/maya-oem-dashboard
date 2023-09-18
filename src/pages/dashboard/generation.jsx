import moment from "moment-timezone";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ClientReport } from "src/reports/ClientReport";
import { Report } from "src/reports/Report";
import { reportClientRule } from "src/reports/reportsRules/reportClientRule";
import { useLocation } from "react-router-dom";
import { ToolTipNoAccess } from "src/components/ToolTipNoAccess";
import { getUserCookie } from "src/services/session";
import { PaymentWarn } from "src/components/PaymentWarn";
import { MayaWatchPro } from "src/components/MayaWatchPro";
import { chartsToGenerationReports } from "../../components/Charts";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Bolt,
  ElectricBolt,
  OfflineBolt,
  Thermostat,
  DownloadForOffline,
  Cancel,
} from "@mui/icons-material";
import { getDevices, getCapacities } from "src/store/actions/devices";
import { getGeneration } from "src/store/actions/generation";
import { DeviceDetail } from "../../components/DeviceDetail";
import { GenerationBI } from "src/components/GenerationBI";
import Tabs from "../../components/shared/Tabs";

const Generation = () => {
  const location = useLocation();
  const { blUuidState, devUuidState, useNameState } = location.state || {};
  const graphRef = useRef(null);
  const [selectedDevUuid, setSelectedDevUuid] = useState(null);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const dispatch = useDispatch();
  const { isLoadingGeneration, generation, temperature } = useSelector(
    (state) => state.generation
  );
  const { isLoadingDevices, devices, capacity } = useSelector(
    (state) => state.devices
  );

  chartsToGenerationReports();

  //const { useCodePagarMe } = useSelector((state) => state.users);

  const { useName } = getUserCookie();
  const useCodePagarMe =
    useName == "Maya Energy" || useName == "darcio" ? true : false;

  const [deviceInfo, setDeviceInfo] = useState({});
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [optionFilter, setOptionFilter] = useState("days");

  const [isLoadingReport, setIsLoadingReport] = useState(true);

  function handleSelectDevices(useUuid) {
    const datInfo = devices.filter((evt) => evt.dev_uuid === useUuid);
    setDeviceInfo(datInfo[0]);

    dispatch(
      getGeneration({
        startDate,
        endDate,
        blUuid: blUuidState,
        devUuid: useUuid,
        type: optionFilter,
      })
    );
    setSelectedDevUuid(useUuid);
  }

  function handleReportGeneration(action) {
    let address = deviceInfo?.dev_address;
    let startDateReport = moment(startDate).format("DD/MM/YYYY");
    let endDateReport = moment(endDate).format("DD/MM/YYYY");
    if (useCodePagarMe) {
      reportClientRule(
        generation,
        useNameState,
        capacity,
        setIsLoadingReport,
        graphRef,
        startDateReport,
        endDateReport,
        address
      );
    } else if (action) {
      setAction(action);
    } else {
      setOpen(!open);
      setAction("");
    }
  }

  useEffect(() => {
    if (devices.length !== 0) {
      if (devUuidState) {
        handleSelectDevices(devUuidState);
      } else {
        setDeviceInfo(devices[0]);
      }
    }
  }, [devices, devUuidState]);

  useEffect(() => {
    if (devices.length !== 0) {
      dispatch(
        getGeneration({
          startDate,
          endDate,
          blUuid: blUuidState,
          devUuid: deviceInfo?.dev_uuid,
        })
      );
    } else if (devUuidState) {
      dispatch(getCapacities(devUuidState));
      dispatch(
        getGeneration({
          startDate,
          endDate,
          blUuid: blUuidState,
          devUuid: devUuidState,
        })
      );
    }
  }, [startDate, endDate, blUuidState, devUuidState, deviceInfo, optionFilter]);

  useEffect(() => {
    console.log(
      startDate,
      endDate,
      optionFilter,
      generation,
      isLoadingGeneration,
      temperature,
      deviceInfo
    );
  }, [generation]);

  useEffect(() => {
    dispatch(getDevices(blUuidState));
  }, [blUuidState]);

  if (isLoadingGeneration == true && isLoadingDevices == true) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadingGeneration == true && isLoadingDevices == true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container maxWidth={false}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mt: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ mr: 1, width: 200 }}>
              <InputLabel>Lista de Usuários</InputLabel>
              <NativeSelect
                label="Lista de Usuários"
                id="dev_name"
                value={deviceInfo?.dev_uuid || ""}
                onChange={(evt) => handleSelectDevices(evt.target.value)}
                input={<Select />}
              >
                {devices &&
                  devices.map((dev, index) => (
                    <option key={index} value={dev.dev_uuid}>
                      {dev.dev_name}
                    </option>
                  ))}
              </NativeSelect>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Data Inicial"
                value={startDate}
                onChange={(startDate) =>
                  setStartDate(
                    startDate ? moment(startDate).format("YYYY-MM-DD") : ""
                  )
                }
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
          </Box>
          <ToolTipNoAccess useCodePagarMe={useCodePagarMe}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "200px",
              }}
            >
              <Button
                startIcon={<DownloadForOffline fontSize="small" />}
                variant={useCodePagarMe ? "outlined" : ""}
                sx={{ width: "100%" }}
                onClick={() => handleReportGeneration()}
              >
                {useCodePagarMe ? (
                  isLoadingReport ? (
                    "Preparar relatório"
                  ) : (
                    <PDFDownloadLink
                      document={<ClientReport />}
                      fileName="relatório-cliente.pdf"
                      style={{ textDecoration: "none", height: "100%" }}
                    >
                      {({ blob, url, loading, error }) =>
                        loading
                          ? "Carregando relatório..."
                          : "Relatório Cliente"
                      }
                    </PDFDownloadLink>
                  )
                ) : (
                  "Relatório indisponível"
                )}
              </Button>
            </Box>
          </ToolTipNoAccess>
          <Tabs />
        </Box>
        <Box sx={{ my: 10 }}>
          <DeviceDetail
            loadingDevices={isLoadingDevices}
            name={deviceInfo?.dev_name || ""}
            address={deviceInfo?.dev_address || ""}
            contactNumber={deviceInfo?.dev_contract_name || ""}
            kwp={deviceInfo?.dev_capacity || ""}
            devUuid={selectedDevUuid}
            blUuidState={blUuidState}
          />
        </Box>
        <Box sx={{ mx: 4, my: 10 }}>
          <GenerationBI
            setOptionFilter={setOptionFilter}
            graphRef={graphRef}
            startDate={startDate}
            endDate={endDate}
            optionFilter={optionFilter}
            generation={generation}
            isLoading={isLoadingGeneration}
            isLoadingDevices={isLoadingDevices}
            temperature={temperature}
            deviceInfo={deviceInfo}
          />
        </Box>
      </Container>
      <Modal
        open={open}
        onClose={handleReportGeneration}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            pb: 6,
            px: 4,
            bgcolor: "background.paper",
            borderRadius: 1,
            border: 0,
          }}
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
          {action == "assignPlan" ? (
            <MayaWatchPro />
          ) : (
            <PaymentWarn handleReportGeneration={handleReportGeneration} />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Generation;
