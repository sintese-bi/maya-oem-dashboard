import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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

import { Info, ElectricBolt } from "@mui/icons-material";
import { ChartsDashboard } from "src/components/Charts";
import { BigNumber } from "./BigNumber";
import moment from "moment";
import Plants from "./Plants";
import { useDispatch, useSelector } from "react-redux";
import { getGraphData } from "src/store/actions/users";
import { LoadingSkeletonBigNumbers } from "./Loading";

export const GlobalUsinProductive = ({
  realGenerationTotal,
  estimatedGenerationTotal,
  percentTotal,
  dataDevices,
  isLoading,
  setEstimatedGeneration,
  setRealGeneration,
  setPercent,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  type,
  data,
  devicesTableRef,
}) => {
  const { graphData, isLoadingGraph } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [generationPercentState, setGenerationPercentState] = useState(0);
  const [topDevicesKWp, setTopDevicesKWp] = useState([]);
  const [realGenerationFiltered, setRealGenerationFiltered] = useState(0);
  const [estimatedGenerationFiltered, setEstimatedGenerationFiltered] =
    useState(0);

  function handleTopDevicesKWp(devices) {
    setTopDevicesKWp(devices.sort((a, b) => b.capacity - a.capacity));
  }

  useEffect(() => {
    const somaPorDiaReal = graphData.somaPorDiaReal
      ? graphData?.somaPorDiaReal
      : { key: 0 };
    const somaPorDiaEstimada = graphData.somaPorDiaEstimada
      ? graphData.somaPorDiaEstimada
      : { key: 0 };
    setRealGenerationFiltered(
      (
        Object.values(somaPorDiaReal).reduce(
          (total, element) => total + element,
          0
        ) / 1000
      ).toFixed(2)
    );
    setEstimatedGenerationFiltered(
      (
        Object.values(somaPorDiaEstimada).reduce(
          (total, element) => total + element,
          0
        ) / 1000
      ).toFixed(2)
    );
  }, [graphData]);

  useEffect(() => {
    let graphStartDate = graphData?.dates?.startDate;
    let graphEndDate = graphData?.dates?.endDate;
    if (
      moment(startDate).isSame(graphStartDate) &&
      moment(endDate).isSame(graphEndDate)
    ) {
      return;
    }
    dispatch(
      getGraphData({
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
      })
    );
  }, [startDate, endDate]);

  useEffect(() => {
    handleTopDevicesKWp(dataDevices);
    let generationRealMonthTotal = (
      graphData?.data?.somaPorDiaReal?.[moment().format("YYYY-MM-DD")] / 1000
    ).toFixed(2);
    setRealGeneration(generationRealMonthTotal);

    let generationEstimatedMonthTotal = (
      graphData?.data?.somaPorDiaEstimada?.[moment().format("YYYY-MM-DD")] /
      1000
    ).toFixed(2);
    setEstimatedGeneration(generationEstimatedMonthTotal);

    setPercent(
      (
        (generationRealMonthTotal / generationEstimatedMonthTotal) *
        100
      ).toFixed()
    );
  }, [graphData]);

  useEffect(() => {
    setGenerationPercentState(100);
  }, [realGenerationFiltered, estimatedGenerationFiltered]);

  return (
    <>
      {isLoadingGraph ? (
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
                {isLoadingGraph ? (
                  <LoadingSkeletonBigNumbers />
                ) : (
                  <BigNumber
                    title="Produção total"
                    value={`${realGenerationTotal}MWh`}
                    icon={<ElectricBolt />}
                  />
                )}
              </Grid>
              <Grid item sm={12} lg={3}>
                {isLoadingGraph ? (
                  <LoadingSkeletonBigNumbers />
                ) : (
                  <BigNumber
                    title="Produtividade estimada"
                    value={`${estimatedGenerationTotal}MWh`}
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
                  {isLoadingGraph
                    ? `Buscando dados...`
                    : `Sua produtividade atual é de ${realGenerationTotal}MWh`}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Info />
                </ListItemAvatar>
                <ListItemText>
                  {isLoadingGraph
                    ? `Buscando dados...`
                    : `A produtividade global atual está ${percentTotal}%`}
                </ListItemText>
              </ListItem>
            </List>
            <Box sx={{ width: "100%", mt: 10, mb: 4 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Data Inicial"
                  value={startDate}
                  onChange={(startDate) => {
                    setStartDate(
                      startDate ? moment(startDate).format("YYYY-MM-DD") : ""
                    );
                  }}
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
              <ChartsDashboard
                dataDevices={graphData.data}
                isLoading={isLoadingGraph}
              />
            </Box>
            <Box
              component="main"
              sx={{
                width: "100%",
              }}
            >
              <Plants data={data} devicesTableRef={devicesTableRef} />
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};
