// IMPORTS
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// LIBS DE ESTILOS
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
  TextField
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// QUERIES
import { getDevices } from "src/store/actions/devices";
import { getGeneration } from "src/store/actions/generation";

// COMPONENTS
import { BigNumber } from "../../components/BigNumber";
import { ChartsGeneration } from "../../components/Charts";
import { DeviceDetail } from "../../components/DeviceDetail";
import { LoadingSkeletonBigNumbers } from "../../components/Loading";
import Tabs from "../../components/shared/Tabs";

// ASSETS
import {
  Bolt,
  ElectricBolt,
  OfflineBolt,
  Thermostat,
} from "@mui/icons-material";

const Generation = () => {
  // PROPS DE CONTROLLER E ESTILIZAÇÃO
  const location = useLocation();
  const { blUuidState, devUuidState } = location.state || {};

  const dispatch = useDispatch();
  const { isLoadingGeneration, generation, temperature } = useSelector(
    (state) => state.generation
  );
  const { isLoadingDevices, devices } = useSelector((state) => state.devices);

  // ESTADOS DE CONTROLLER
  const [deviceInfo, setDeviceInfo] = useState([]);
  const [date, setDate] = useState(moment().format());
  const [optionFilter, setOptionFilter] = useState("month");

  // SELECT DE USÚARIOS
  function handleSelectDevices(useUuid) {
    const datInfo = devices.filter((evt) => evt.dev_uuid === useUuid);
    setDeviceInfo(datInfo[0]);
  }

  // ----- useEffect DAS ACTIONS ----- //
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
    if (devUuidState) {
      dispatch(
        getGeneration({
          date,
          blUuid: blUuidState,
          devUuid: devUuidState,
          type: optionFilter,
        })
      );
    } else if (devices.length !== 0) {
      dispatch(
        getGeneration({
          date,
          blUuid: blUuidState,
          devUuid: deviceInfo.dev_uuid,
          type: optionFilter,
        })
      );
    }
  }, [date, blUuidState, devUuidState, deviceInfo, optionFilter]);

  useEffect(() => {
    dispatch(getDevices(blUuidState));
  }, [blUuidState]);

  // SCREEN LOADING
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
        {/* LISTA DE USUARIO  */}
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
                openTo="year"
                label="Data de geração"
                value={date}
                views={["year", "month"]}
                maxDate={moment()}
                minDate={moment("2023-01-01").toDate()}
                onChange={(date) => setDate(moment(date._d).format())}
                // onMonthChange={handleFilterGeneration}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <FormControl sx={{ ml: 1, width: 100 }}>
              <InputLabel>Período</InputLabel>
              <Select
                label="Período"
                id="period"
                value={optionFilter}
                onChange={(evt) => setOptionFilter(evt.target.value)}
              >
                <MenuItem value="month">Mês</MenuItem>
                <MenuItem value="year">Ano</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Tabs />
        </Box>

        {/* DETALHES DE DADOS DO USUARIO  */}
        <Box sx={{ mt: 3 }}>
          <DeviceDetail
            loadingDevices={isLoadingDevices}
            name={deviceInfo.dev_name}
            address={deviceInfo.dev_address}
            contactNumber={deviceInfo.dev_contract_name}
            kwp={deviceInfo.dev_capacity}
          />
        </Box>

        {/* BIG NUMBERS DE GERAÇÃO    */}
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

        {/* GRAFICO DE GERAÇÃO */}
        <Box sx={{ mt: 3 }}>
          <ChartsGeneration
            date={date}
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
