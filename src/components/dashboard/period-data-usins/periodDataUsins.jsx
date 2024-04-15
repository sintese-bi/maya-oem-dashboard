import {
  Box,
  Button,
  Card,
  Grid,
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
  realGenerationFiltered,
  estimatedGenerationFiltered,
  percentGenerationFiltered,
  handleAdminReportGeneration,
  isLoadingReportGeneration,
  setIsLoadingReportGeneration,
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
        height: "100%",
        gap: 2,
        py: 2,
        px: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ mb: 2, mt: 1 }}>
          Produção mensal de todas as usinas
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ display: "flex", width: "100%" }}>
        <Grid
          item
          lg={8}
          md={8}
          sm={12}
          xs={12}
          sx={{ display: "flex", gap: 1 }}
        >
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
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField
            sx={{ width: "100%", backgroundColor: "transparent" }}
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
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        sx={{
          mt: 2,
          px: 2,
        }}
      >
        <Grid item lg={8} md={12} sm={11} xs={11}>
          <ChartsDashboard
            startDate={startDate}
            endDate={endDate}
            optionFilter={optionFilter}
            devices={graphData.data?.totalByDate}
            isLoading={isLoadingGraph}
            adminGraphRef={adminGraphRef}
          />
        </Grid>

        <Grid
          lg={4}
          md={12}
          sm={12}
          xs={12}
          item
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
              alignItems: "self-start",
              flexDirection: "column",
              mb: 2,
            }}
          >
            <Typography
              variant="body2"
              fontWeight={"bold"}
              sx={{ color: "#F28444" }}
            >
              TOTAL: {numbers(realGenerationFiltered, "KWh")}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={"bold"}
              sx={{ color: "#1C66A6" }}
            >
              ESPERADO: {numbers(estimatedGenerationFiltered, "KWh")}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={"bold"}
              sx={{ color: "#208C4F" }}
            >
              DESEMPENHO: {percentGenerationFiltered}%
            </Typography>
          </Box>
          <ReportButton
            isLoadingReportGeneration={isLoadingReportGeneration}
            useTypeMember={useTypeMember}
            handleAdminReportGeneration={handleAdminReportGeneration}
            setIsLoadingReportGeneration={setIsLoadingReportGeneration}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
