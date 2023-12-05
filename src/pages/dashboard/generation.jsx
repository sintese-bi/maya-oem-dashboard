import moment from "moment-timezone";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ClientReport } from "src/reports/ClientReport";
import { Report } from "src/reports/Report";
import { reportClientRule } from "src/reports/reportsRules/reportClientRule";
import { useLocation } from "react-router-dom";
import { ToolTipNoAccess } from "src/components/shared/ToolTipNoAccess";
import { getUserCookie } from "src/services/session";
import { PaymentWarn } from "src/components/shared/PaymentWarn";
import { MayaWatchPro } from "src/components/shared/MayaWatchPro";
import { chartsToGenerationReports } from "../../components/shared/Charts";
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
import { DeviceDetail } from "../../components/generation/DeviceDetail";
import { GenerationBI } from "src/components/generation/GenerationBI";
import Tabs from "../../components/shared/Tabs";
import { GenerationHeader } from "src/components/generation/generation-header";

const Generation = () => {
  const location = useLocation();
  const { blUuidState, devUuidState, useNameState, capacity } =
    location.state || {};
  const graphRef = useRef(null);
  const [selectedDevUuid, setSelectedDevUuid] = useState(devUuidState);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const dispatch = useDispatch();
  const { isLoadingGeneration, generation, temperature } = useSelector(
    (state) => state.generation
  );
  const { isLoadingDevices, devices } = useSelector((state) => state.devices);

  const { useTypeMember } = getUserCookie();

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
    if (useTypeMember) {
      reportClientRule(
        generation,
        useNameState,
        capacity,
        setIsLoadingReport,
        graphRef.current,
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
      if (selectedDevUuid) {
        handleSelectDevices(selectedDevUuid);
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
    setIsLoadingReport(true);
  }, [startDate, endDate, blUuidState, devUuidState, deviceInfo, optionFilter]);

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
      sx={{
        py: 2,
        width: "89vw",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <GenerationHeader
          deviceInfo={deviceInfo}
          handleSelectDevices={handleSelectDevices}
          handleReportGeneration={handleReportGeneration}
          devices={devices}
          startDate={startDate}
          endDate={endDate}
          useTypeMember={useTypeMember}
          isLoadingReport={isLoadingReport}
          generation={generation}
          useNameState={useNameState}
          setAction={setAction}
          setOpen={setOpen}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
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
        <Box sx={{ my: 10, width: "100%" }}>
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
      </Box>
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
