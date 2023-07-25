
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Bolt,
  ElectricBolt,
  OfflineBolt,
  Thermostat,
} from "@mui/icons-material";
import { getDevices } from "src/store/actions/devices";
import { getGeneration } from "src/store/actions/generation";
import { BigNumber } from "../../components/BigNumber";
import { ChartsGeneration } from "../../components/Charts";
import { DeviceDetail } from "../../components/DeviceDetail";
import { LoadingSkeletonBigNumbers } from "../../components/Loading";
import Tabs from "../../components/shared/Tabs";

const Generation = () => {
  const location = useLocation();
  const { blUuidState, devUuidState } = location.state || {};
  const [selectedDevUuid, setSelectedDevUuid] = useState(null);
  const dispatch = useDispatch();
  const { isLoadingGeneration, generation, temperature } = useSelector(
    (state) => state.generation
  );
  const { isLoadingDevices, devices } = useSelector((state) => state.devices);

  const [deviceInfo, setDeviceInfo] = useState([]);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [optionFilter, setOptionFilter] = useState("month");
  

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
          devUuid: deviceInfo.dev_uuid,
          type: optionFilter,
        })
      );
    } else if (devUuidState) {
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
          <Box>
            <FormControl sx={{ mr: 1, width: 200 }}>
              <InputLabel>Lista de Usuários</InputLabel>
              <NativeSelect
                label="Lista de Usuários"
                id="dev_name"
                value={deviceInfo?.dev_uuid}
                onChange={(evt) => handleSelectDevices(evt.target.value)}
                input={<Select />}
                defaultValue={deviceInfo?.dev_uuid}
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
          <Tabs />
        </Box>

        <Box sx={{ mt: 3 }}>
          <DeviceDetail
            loadingDevices={isLoadingDevices}
            name={deviceInfo.dev_name}
            address={deviceInfo.dev_address}
            contactNumber={deviceInfo.dev_contract_name}
            kwp={deviceInfo.dev_capacity}
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