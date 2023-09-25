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
import { numbers } from "src/helpers/utils";
import { UserDevicesTotalInfo } from "./dashboard-components/user-devices-total-info";

export const GlobalUsinProductive = ({
  useName,
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
            mt: 4,
          }}
        >
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "96%",
              py: 4,
              px: 3,
            }}
          >
            <UserDevicesTotalInfo
              useName={useName}
              realGenerationTotal={realGenerationTotal}
              estimatedGenerationTotal={estimatedGenerationTotal}
              percentTotal={percentTotal}
            />
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
              <Plants
                data={data}
                devicesTableRef={devicesTableRef}
                type={type}
              />
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};
