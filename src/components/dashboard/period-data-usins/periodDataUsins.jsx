import {
  Box,
  Button,
  Card,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ChartsDashboard } from "src/components/shared/Charts";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { numbers } from "src/helpers/utils";
import { getUserCookie } from "src/services/session";
import { getGraphData } from "src/store/actions/users";
import { useEffect } from "react";
import { ReportButton } from "./reportButton";
import { TotalMonthInfo } from "../total-month/total-month-components/total-month-info";

export const PeriodDataUsins = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  optionFilter,
  setOptionFilter,
  adminGraphRef,
  realGenerationTotal,
  estimatedGenerationTotal,
  percentTotal,
  handleReportGeneration,
  isLoadingReportGeneration,
  useTypeMember,
}) => {
  const { graphData, isLoadingGraph, selectedUser } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const { useUuid, useName } = getUserCookie();

  useEffect(() => {
    let graphStartDate = graphData?.dates?.startDate;
    let graphEndDate = graphData?.dates?.endDate;
    if (
      moment(startDate).isSame(graphStartDate) &&
      moment(endDate).isSame(graphEndDate)
    ) {
      return;
    }
    if (selectedUser.length != 0) {
      dispatch(
        getGraphData({
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
          uuid: selectedUser[0]?.useUuidState,
        })
      );
    } else {
      dispatch(
        getGraphData({
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
          uuid: useUuid,
        })
      );
    }
  }, [startDate, endDate, optionFilter, useUuid]);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        overflow: "scroll",
        gap: 2,
        py: 2,
        px: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ mb: 2, mt: 1 }}>
          Produção mensal
        </Typography>
      </Box>
      <Box sx={{ display: "flex", width: "100%", mt: 4, mb: 6 }}>
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
              setEndDate(endDate ? moment(endDate).format("YYYY-MM-DD") : "")
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
      </Box>
      <TotalMonthInfo
        useName={useName}
        realGenerationTotal={realGenerationTotal}
        estimatedGenerationTotal={estimatedGenerationTotal}
        percentTotal={percentTotal}
        startDate={startDate}
        endDate={endDate}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100%",
          overflow: "scroll",

          px: 2,
          gap: 8,
        }}
      >
        <Box sx={{ width: "70%" }}>
          <ChartsDashboard
            startDate={startDate}
            endDate={endDate}
            optionFilter={optionFilter}
            dataDevices={graphData.data}
            isLoading={isLoadingGraph}
            adminGraphRef={adminGraphRef}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mb: 2,
            }}
          >
            <Typography>
              Total: {numbers(realGenerationTotal, "KWh")}
            </Typography>
            <Typography>
              Esperado: {numbers(estimatedGenerationTotal, "KWh")}
            </Typography>
            <Typography>Desempenho: {percentTotal}%</Typography>
          </Box>
          <ReportButton
            isLoadingReportGeneration={isLoadingReportGeneration}
            useTypeMember={useTypeMember}
            handleReportGeneration={handleReportGeneration}
          />
        </Box>
      </Box>
    </Card>
  );
};
