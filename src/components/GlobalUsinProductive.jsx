import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Link as LinkRouter } from "react-router-dom";
import api, { configRequest } from "src/services/api";
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
  TextField,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  Link,
} from "@mui/material";
import { Info, ElectricBolt } from "@mui/icons-material";
import {
  ChartsDashboard,
  ChartsDashboardHorizontal,
} from "src/components/Charts";
import { numbers } from "src/helpers/utils";
import { BigNumber } from "./BigNumber";
import moment from "moment";

export const GlobalUsinProductive = ({ dataDevices, isLoading }) => {
  const [realGenerationTotal, setRealGenerationTotal] = useState("0");
  const [estimatedGenerationTotal, setEstimatedGenerationTotal] = useState("0");
  const [generationPercentState, setGenerationPercentState] = useState({
    biggerThanEsimated: false,
    percentValue: "0%",
  });
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [topDevicesKWp, setTopDevicesKWp] = useState([]);
  const [globalGenerationGraph, setGlobalGenerationGraph] = useState([]);

  function handleTopDevicesKWp(devices) {
    setTopDevicesKWp(
      devices.sort((a, b) => b.capacity - a.capacity).slice(0, 10)
    );
  }

  async function handleGlobalGenerationData() {
    const { data } = await api.post(
      "/genrealday",
      { startDate: startDate, endDate: endDate },
      configRequest()
    );
    if (!data) {
      return;
    }
    setGlobalGenerationGraph(data.somaPorDia);
  }

  useEffect(() => {
    handleGlobalGenerationData();
  }, [startDate, endDate, dataDevices]);

  useEffect(() => {
    handleTopDevicesKWp(dataDevices);
    let generationRealMonth = dataDevices.map((data) => {
      let generationRealValue = Number(
        data.generationRealMonth.replace(/\Kwh/g, "")
      );
      return generationRealValue;
    });
    let generationRealMonthTotal = generationRealMonth
      .reduce((total, element) => total + element, 0)
      .toFixed("2");
    setRealGenerationTotal(generationRealMonthTotal);

    let generationEstimatedMonth = dataDevices.map((data) => {
      let generationEstimatedValue = Number(
        data.generationEstimatedMonth.replace(/\Kwh/g, "")
      );
      return generationEstimatedValue;
    });
    let generationEstimatedMonthTotal = generationEstimatedMonth
      .reduce((total, element) => total + element, 0)
      .toFixed("2");
    setEstimatedGenerationTotal(generationEstimatedMonthTotal);
  }, [dataDevices]);

  useEffect(() => {
    console.log(realGenerationTotal, estimatedGenerationTotal);
    let generationPercentStateTemp = {
      biggerThanEsimated: false,
      percentValue: "0%",
    };
    let percent = (
      (realGenerationTotal / estimatedGenerationTotal) *
      100
    ).toFixed();
    if (percent < 100) {
      generationPercentStateTemp.percentValue = 100 - percent;
      generationPercentStateTemp.biggerThanEsimated = false;
    } else {
      generationPercentStateTemp.percentValue = percent - 100;
      generationPercentStateTemp.biggerThanEsimated = true;
    }
    setGenerationPercentState(generationPercentStateTemp);
  }, [realGenerationTotal, estimatedGenerationTotal]);

  return (
    <>
      {isLoading ? null : (
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
          <Box
            sx={{
              display: "flex",
              width: "84%",
              my: 4,
            }}
          >
            <Typography variant="h4">Produtividade de usinas</Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: "100%", py: 2, fontWeight: "bold", ml: 2 }}
            >
              {moment().format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "86%",
              py: 4,
              px: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 10,
                width: "84%",
              }}
            >
              <Grid item sm={12} lg={3}>
                <BigNumber
                  title="Produção total"
                  value={`${numbers(
                    (realGenerationTotal / 1000).toFixed(2)
                  )}MWh`}
                  icon={<ElectricBolt />}
                />
              </Grid>
              <Grid item sm={12} lg={3}>
                <BigNumber
                  title="Produtividade estimada"
                  value={`${numbers(
                    (estimatedGenerationTotal / 1000).toFixed(2)
                  )}MWh`}
                  icon={<ElectricBolt />}
                />
              </Grid>
            </Box>
            <List sx={{ width: "100%", mb: 4 }}>
              <ListItem>
                <ListItemAvatar>
                  <Info />
                </ListItemAvatar>
                <ListItemText>{`Sua produtividade atual é de ${numbers(
                  (realGenerationTotal / 1000).toFixed(2)
                )}MWh`}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Info />
                </ListItemAvatar>
                <ListItemText>
                  {generationPercentState.biggerThanEsimated
                    ? `A produtividade global atual está ${generationPercentState.percentValue}% acima da esperada`
                    : `Sua produtividade hoje está ${generationPercentState.percentValue}%
            		  abaixo da esperada`}
                </ListItemText>
              </ListItem>
            </List>
            <Box sx={{ width: "100%", mt: 10, mb: 4 }}>
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
              <ChartsDashboard dataDevices={globalGenerationGraph} />
            </Box>
            <ChartsDashboardHorizontal dataDevices={dataDevices} />
            <Box
              component="main"
              sx={{
                width: "94%",
              }}
            >
              <TableContainer component={Paper}>
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    py: 4,
                    px: 2,
                    mt: 4,
                  }}
                >
                  Top 10 usinas
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Dispositivo/Usuário</TableCell>
                      <TableCell>Capacidade (KWp)</TableCell>
                      <TableCell>Conferir planta</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topDevicesKWp.map((device) => (
                      <TableRow>
                        <TableCell>{device.name}</TableCell>
                        <TableCell>
                          {(device.capacity / 1000).toFixed(2)}MWp
                        </TableCell>
                        <TableCell>
                          <Link
                            component={LinkRouter}
                            to={{
                              pathname: `/dashboard/generation/${device.brand}`,
                            }}
                            state={{
                              devUuidState: device.uuid,
                              blUuidState: device.blUuid,
                              useNameState: device.name,
                            }}
                            underline="hover"
                          >
                            <Typography variant="body2">
                              {device.name}
                            </Typography>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};
