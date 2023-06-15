// IMPORTS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment-timezone";

// LIBS DE ESTILOS
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Select,
  TextField,
} from "@mui/material";

// QUERIES
import { getInvestment } from "src/store/actions/investment";
import { getDevices } from "src/store/actions/devices";

// COMPONENTS
import { BigNumber } from "../../components/BigNumber";
import {
  LoadingInput,
  LoadingSkeletonInvestment,
} from "../../components/Loading";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { InvestmentModal } from "src/components/Modal";
import Tabs from "../../components/shared/Tabs";

// ASSETS
import BoltIcon from "@mui/icons-material/Bolt";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";

const Investment = () => {
  // PROPS DE CONTROLLER E ESTILIZAÇÃO
  const location = useLocation();
  const { blUuidState } = location.state || {};

  const dispatch = useDispatch();
  const { isLoadingDevices, devices } = useSelector((state) => state.devices);
  const { loadingInvestment, investmentData } = useSelector(
    (state) => state.investment
  );

  // ESTADOS DE CONTROLLER
  const [deviceInfo, setDeviceInfo] = useState([]);
  const [date, setDate] = useState(moment().format());

  // SELECT DE USÚARIOS
  function handleSelectDevices(uuid) {
    const datInfo = devices.filter((evt) => evt.dev_uuid === uuid);
    setDeviceInfo(datInfo[0]);
  }

  // ----- useEffect DAS ACTIONS ----- //
  useEffect(() => {
    if (devices.length !== 0) setDeviceInfo(devices[0]);
  }, [devices]);

  useEffect(() => {
    dispatch(getDevices(blUuidState));
  }, [blUuidState]);

  useEffect(() => {
    if (deviceInfo.length !== 0)
      dispatch(getInvestment(date, deviceInfo?.dev_uuid));
  }, [date, deviceInfo, dispatch]);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
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
              m: -1,
            }}
          >
            {isLoadingDevices ? (
              <>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item sx={{ mr: 1 }}>
                      <LoadingInput />
                    </Grid>
                    <Grid item>
                      <LoadingInput />
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <>
                <Box>
                  <FormControl sx={{ mr: 1, width: 300 }}>
                    <InputLabel>Lista de Usuários</InputLabel>
                    <NativeSelect
                      id="dev_name"
                      value={deviceInfo?.dev_uuid}
                      label="Lista de Usuários"
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

                  {/* MODAL  */}
                  <InvestmentModal devUuid={deviceInfo?.dev_uuid} date={date} />
                </Box>
              </>
            )}

            <Tabs />
          </Box>

          {/* BIG NUMBERS DE GERAÇÃO    */}
          {loadingInvestment ? (
            <LoadingSkeletonInvestment />
          ) : (
            <>
              {investmentData.length === 0 ? (
                <LoadingSkeletonInvestment />
              ) : (
                <>
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item sm={6} lg={3}>
                        <BigNumber
                          title="Economia Diária"
                          value={investmentData?.dailysavings}
                          icon={<BoltIcon />}
                        />
                      </Grid>
                      <Grid item sm={6} lg={3}>
                        <BigNumber
                          title="Economia Mensal"
                          value={investmentData?.monthlysavings}
                          icon={<ElectricBoltIcon />}
                        />
                      </Grid>
                      <Grid item sm={6} lg={3}>
                        <BigNumber
                          title="Economia Anual"
                          value={investmentData?.annualsavings}
                          icon={<OfflineBoltIcon />}
                        />
                      </Grid>
                      <Grid item sm={6} lg={3}>
                        <BigNumber
                          title="Economia Total"
                          value={investmentData?.totalsavings}
                          icon={<OfflineBoltIcon />}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item sm={6} lg={3}>
                        <BigNumber
                          title="Economia de CO2 Diária"
                          value={`${investmentData?.dailyCarbon} t`}
                          icon={<BoltIcon />}
                        />
                      </Grid>
                      <Grid item sm={6} lg={3}>
                        <BigNumber
                          title="Economia de CO2 Mensal"
                          value={`${investmentData?.monthlyCarbon} t`}
                          icon={<ElectricBoltIcon />}
                        />
                      </Grid>
                      <Grid item sm={6} lg={3}>
                        <BigNumber
                          title="Economia de CO2 Anual"
                          value={`${investmentData?.annualCarbon} t`}
                          icon={<OfflineBoltIcon />}
                        />
                      </Grid>
                      <Grid item sm={6} lg={3}>
                        <BigNumber
                          title="Economia de CO2 Total"
                          value={`${investmentData?.totalCarbon} t`}
                          icon={<OfflineBoltIcon />}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Investment;
