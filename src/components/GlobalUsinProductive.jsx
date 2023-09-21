import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { columnsDevices } from "../constants/columns";
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
} from "@mui/material";
import MUIDataTable from "mui-datatables";

import { Info, ElectricBolt } from "@mui/icons-material";
import {
  ChartsDashboard,
  ChartsDashboardHorizontal,
} from "src/components/Charts";
import { numbers } from "src/helpers/utils";
import { BigNumber } from "./BigNumber";
import moment from "moment";
import Plants from "./Plants";
import { useDispatch, useSelector } from "react-redux";
import { getGraphData } from "src/store/actions/users";
import { LoadingSkeletonBigNumbers } from "./Loading";

export const GlobalUsinProductive = ({
  dataDevices,
  isLoading,
  setEstimatedGeneration,
  setRealGeneration,
}) => {
  const { graphData, loadingGraphData } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [realGenerationTotal, setRealGenerationTotal] = useState("0");
  const [estimatedGenerationTotal, setEstimatedGenerationTotal] = useState("0");
  const [generationPercentState, setGenerationPercentState] = useState(0);
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [topDevicesKWp, setTopDevicesKWp] = useState([]);
  const [globalGenerationGraph, setGlobalGenerationGraph] = useState([]);
  const [realGenerationFiltered, setRealGenerationFiltered] = useState(0);
  const [estimatedGenerationFiltered, setEstimatedGenerationFiltered] =
    useState(0);

  function handleTopDevicesKWp(devices) {
    setTopDevicesKWp(devices.sort((a, b) => b.capacity - a.capacity));
  }

  useEffect(() => {
    setRealGenerationFiltered(
      (
        graphData.somaPorDiaReal?.[
          moment(endDate).subtract(1, "days").format("YYYY-MM-DD")
        ] / 1000
      ).toFixed(2)
    );
    setEstimatedGenerationFiltered(
      (
        graphData.somaPorDiaEstimada?.[
          moment(endDate).subtract(1, "days").format("YYYY-MM-DD")
        ] / 1000
      ).toFixed(2)
    );
  }, [graphData]);

  useEffect(() => {
    dispatch(getGraphData({ startDate: startDate, endDate: endDate }));
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
    setGenerationPercentState(
      (
        (graphData.somaPorDiaReal?.[
          moment(endDate).subtract(1, "days").format("YYYY-MM-DD")
        ] /
          graphData.somaPorDiaEstimada?.[
            moment(endDate).subtract(1, "days").format("YYYY-MM-DD")
          ]) *
        100
      ).toFixed()
    );
  }, [realGenerationFiltered, realGenerationFiltered]);

  return (
    <>
      {isLoading ? (
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
          <Typography variant="h4">Carregando dados...</Typography>
        </Box>
      ) : (
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
            <Typography variant="h4">
              Producão de todas as usinas do mês
            </Typography>
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
                {loadingGraphData ? (
                  <LoadingSkeletonBigNumbers />
                ) : (
                  <BigNumber
                    title="Produção total"
                    value={`${realGenerationFiltered}MWh`}
                    icon={<ElectricBolt />}
                  />
                )}
              </Grid>
              <Grid item sm={12} lg={3}>
                {loadingGraphData ? (
                  <LoadingSkeletonBigNumbers />
                ) : (
                  <BigNumber
                    title="Produtividade estimada"
                    value={`${estimatedGenerationFiltered}MWh`}
                    icon={<ElectricBolt />}
                  />
                )}
              </Grid>
            </Box>
            <List sx={{ width: "100%", mb: 4 }}>
              <ListItem>
                <ListItemAvatar>
                  <Info />
                </ListItemAvatar>
                <ListItemText>
                  {loadingGraphData
                    ? `Buscando dados...`
                    : `Sua produtividade atual é de ${realGenerationFiltered}MWh`}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Info />
                </ListItemAvatar>
                <ListItemText>
                  {loadingGraphData
                    ? `Buscando dados...`
                    : generationPercentState > 100
                    ? `A produtividade global atual está ${
                        generationPercentState - 100
                      }% acima da esperada`
                    : `A produtividade global atual está ${
                        100 - generationPercentState
                      }% abaixo da esperada`}
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
              <ChartsDashboard dataDevices={graphData} />
            </Box>
            <Box
              component="main"
              sx={{
                width: "100%",
              }}
            >
              <Plants toptopDevicesKWp={topDevicesKWp} />
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};
