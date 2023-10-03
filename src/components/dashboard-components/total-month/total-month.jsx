import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Box,
  Typography,
  Card,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import {
  AdmnistratorGraph,
  ChartsDashboard,
} from "src/components/shared/Charts";
import moment from "moment";
import Plants from "./total-month-components/total-month-devices";
import { useDispatch, useSelector } from "react-redux";
import { getGraphData } from "src/store/actions/users";
import { TotalMonthInfo } from "./total-month-components/total-month-info";

export const TotalMonth = ({
  useName,
  realGenerationTotal,
  estimatedGenerationTotal,
  percentTotal,
  dataDevices,
  allDevices,
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
  adminGraphRef,
  setIsLoadingReportGeneration,
}) => {
  const { graphData, isLoadingGraph } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [optionFilter, setOptionFilter] = useState("days");
  const [generationPercentState, setGenerationPercentState] = useState(0);
  const [topDevicesKWp, setTopDevicesKWp] = useState([]);
  const [realGenerationFiltered, setRealGenerationFiltered] = useState(0);
  const [estimatedGenerationFiltered, setEstimatedGenerationFiltered] =
    useState(0);

  function handleTopDevicesKWp(devices) {
    setTopDevicesKWp(devices.sort((a, b) => b.capacity - a.capacity));
  }

  function handleSendAllReportByEmail() {
    alert("Sending all report by email");
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
    setIsLoadingReportGeneration(true);
  }, [startDate, endDate, optionFilter]);

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
            <TotalMonthInfo
              useName={useName}
              realGenerationTotal={realGenerationTotal}
              estimatedGenerationTotal={estimatedGenerationTotal}
              percentTotal={percentTotal}
              startDate={startDate}
              endDate={endDate}
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
              <TextField
                sx={{ width: 200, backgroundColor: "transparent", ml: 4 }}
                label="Filtrar por"
                select
                defaultValue="days"
                variant="standard"
                onChange={(e) => setOptionFilter(e.target.value)}
              >
                <MenuItem value="days">Dias</MenuItem>
                <MenuItem value="weeks">Semanas</MenuItem>
                <MenuItem value="biweek">Quinzena</MenuItem>
                <MenuItem value="months">Mês</MenuItem>
              </TextField>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 6,
                }}
              >
                <ChartsDashboard
                  startDate={startDate}
                  endDate={endDate}
                  optionFilter={optionFilter}
                  dataDevices={graphData.data}
                  isLoading={isLoadingGraph}
                  adminGraphRef={adminGraphRef}
                />
              </Box>
              {/* O gráfico abaixo não está sendo rederenizado, serve apenas para a construção do relatório administrador */}
            </Box>
            <Box
              component="main"
              sx={{
                width: "100%",
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={handleSendAllReportByEmail}
              >
                Enviar email para todas as plantas
              </Button>
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
