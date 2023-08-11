import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ClientReport } from "src/reports/ClientReport";
import { reportClientRule } from "src/reports/reportsRules/reportClientRule";
import { useLocation } from "react-router-dom";
import { ToolTipNoAccess } from 'src/components/ToolTipNoAccess'
import { getUserCookie } from "src/services/session";
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
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Bolt,
  ElectricBolt,
  OfflineBolt,
  Thermostat,
  DownloadForOffline
} from "@mui/icons-material";
import { getDevices, getCapacities } from "src/store/actions/devices";
import { getGeneration } from "src/store/actions/generation";
import { BigNumber } from "../../components/BigNumber";
import { ChartsGeneration } from "../../components/Charts";
import { DeviceDetail } from "../../components/DeviceDetail";
import { LoadingSkeletonBigNumbers } from "../../components/Loading";
import Tabs from "../../components/shared/Tabs";

const Generation = () => {
  const location = useLocation();
  const { blUuidState, devUuidState, useNameState } = location.state || {};
  const [selectedDevUuid, setSelectedDevUuid] = useState(null);
  const dispatch = useDispatch();
  const { isLoadingGeneration, generation, temperature } = useSelector(
    (state) => state.generation
  );
  const { isLoadingDevices, devices, capacity } = useSelector((state) => state.devices);

  //const { useCodePagarMe } = useSelector((state) => state.users);

  const { useName } = getUserCookie();
  const useCodePagarMe = (useName == "Maya Energy" || useName == "darcio") ? true : false


  const [deviceInfo, setDeviceInfo] = useState({});
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [optionFilter, setOptionFilter] = useState("month");

  const [isLoadingReport, setIsLoadingReport] = useState(true)


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

  function handleReportGeneration(){
    reportClientRule(generation, useNameState, capacity, setIsLoadingReport)
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
      //dispatch(getCapacities(deviceInfo.dev_uuid))
      dispatch(
        getGeneration({
          startDate,
          endDate,
          blUuid: blUuidState,
          devUuid: deviceInfo?.dev_uuid,
          type: optionFilter,
        })
      );
    } else if (devUuidState) {
      //dispatch(getCapacities(devUuidState))
      dispatch(
        getGeneration({
          startDate,
          endDate,
          blUuid: blUuidState,
          devUuid: devUuidState,
          type: optionFilter,
        })
      );
    }
  }, [startDate, endDate, blUuidState, devUuidState, deviceInfo, optionFilter]);

  useEffect(() => {
    dispatch(getDevices(blUuidState));
  }, [blUuidState]);

  if (isLoadingDevices) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadingDevices}
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
          <Box sx={{
            display: "flex",
            alignItems: "center"
          }}>
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

            <ToolTipNoAccess useCodePagarMe={useCodePagarMe}>
              <Box sx={{display: 'flex', justifyContent: 'center', width:'220px'}}>
                <Button
                  startIcon={<DownloadForOffline fontSize="small" />}
                  variant="contained"
                  sx={{ color: "primary", ml: 1, variant: "contained"}}
                  disabled={useCodePagarMe ? false : true}
                  onClick={() => handleReportGeneration()}
                >
                  {
                    isLoadingReport ? (
                      'Preparar relatório'
                    ) : (
                    
                      <PDFDownloadLink 
                        document={<ClientReport />}
                        fileName="relatório-cliente.pdf"
                        style={{color: 'white', textDecoration: 'none'}}>
                        {({ blob, url, loading, error }) => (useCodePagarMe ? (loading ? "Carregando relatório..." : "Relatório cliente") : "Relatório indisponível")}
                      </PDFDownloadLink>
                    )
                  }
                </Button>
              </Box>
            </ToolTipNoAccess>
          </Box>
          <Tabs />
        </Box>

        <Box sx={{ mt: 3 }}>
          <DeviceDetail
            loadingDevices={isLoadingDevices}
            name={deviceInfo?.dev_name || ""}
            address={deviceInfo?.dev_address || ""}
            contactNumber={deviceInfo?.dev_contract_name || ""}
            kwp={deviceInfo?.dev_capacity || ""}
            devUuid={selectedDevUuid}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item sm={12} lg={3}>
              {isLoadingGeneration ? (
                <LoadingSkeletonBigNumbers />
              ) : (
                <BigNumber
                  title="Geração Estimada"
                  value={`${
                    deviceInfo?.generation?.gen_estimated
                      ? deviceInfo?.generation?.gen_estimated + "Kwh"
                      : "-"
                  }`}
                  icon={<Bolt />}
                />
              )}
            </Grid>
            <Grid item sm={12} lg={3}>
              {isLoadingGeneration ? (
                <LoadingSkeletonBigNumbers />
              ) : (
                <BigNumber
                  title="Geração Real"
                  value={`${
                    deviceInfo?.generation?.gen_real
                      ? deviceInfo?.generation?.gen_real + "Kwh"
                      : "-"
                  }`}
                  icon={<ElectricBolt />}
                />
              )}
            </Grid>
            <Grid item sm={12} lg={3}>
              {isLoadingGeneration ? (
                <LoadingSkeletonBigNumbers />
              ) : (
                <BigNumber
                  title="Geração percentual"
                  value={`${
                    deviceInfo?.generation?.gen_real
                      ? parseFloat(
                          (deviceInfo?.generation.gen_real /
                            deviceInfo?.generation.gen_estimated) *
                            100
                        ).toFixed(2)
                      : 0
                  } %`}
                  icon={<OfflineBolt />}
                />
              )}
            </Grid>
            <Grid item sm={12} lg={3}>
              {isLoadingGeneration ? (
                <LoadingSkeletonBigNumbers />
              ) : (
                <BigNumber
                  title="Temperatura"
                  value={temperature ? `${temperature}°` : "-"}
                  icon={<Thermostat />}
                />
              )}
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <ChartsGeneration
            startDate={startDate}
            optionFilter={optionFilter}
            generation={generation}
            isLoading={isLoadingGeneration}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Generation;
