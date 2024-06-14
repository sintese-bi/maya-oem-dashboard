import { Home } from "@mui/icons-material";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import { ReportButton } from "src/components/dashboard/period-data-usins/reportButton";
import { GenerationHeader } from "src/components/generation/generation-header";
import { DashboardContext } from "src/contexts/dashboard-context";
import { MobileTestCustomIndicators } from "../mobile-test-custom-indicators/mobile-test-custom-indicators";
import citiesData from "src/services/municipios";

export const MobileTestReports = () => {
  const {
    userData,
    usersAPIData,
    devicesAPIData,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleAdminReportGeneration,
    isLoadingReportGeneration,
    setIsLoadingReportGeneration,
  } = useContext(DashboardContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    switch (currentPage) {
      case 0:
        setTitle("Relatório geral");
        setDescription(
          "Relatório refente aos dados gerais de todos os devices!"
        );
        break;
      case 1:
        setTitle("Relatório cliente");
        setDescription("Relatório refente aos dados do device escolhido!");
        break;
    }
  }, [currentPage]);

  useEffect(() => {
    if (devicesAPIData.bignumbersumValues?.length === undefined) {
      console.log(devicesAPIData.bignumbersumValues);
    }
  }, [devicesAPIData.bignumbersumValues]);

  useEffect(() => {
    if (usersAPIData.devices.length !== 0) {
      setDeviceInfo({
        ...usersAPIData.devices[0],
        dev_uuid: usersAPIData.devices[0]["uuid"],
      });
    }
  }, [usersAPIData.devices]);

  if (devicesAPIData.bignumbersumValues?.length !== undefined) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={devicesAPIData.bignumbersumValues?.length !== undefined}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        gap: 4,
      }}
    >
      <Box sx={{ width: "100%", mb: 6 }}>
        <Button
          component={Link}
          to={"/mobile"}
          variant="outlined"
          startIcon={<Home />}
        >
          Voltar
        </Button>
      </Box>
      <Box>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
      <Carousel
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
        navButtonsAlwaysInvisible={true}
        indicators={false}
        indicatorIconButtonProps={{
          style: {
            color: "#14B8A6",
          },
        }}
        index={currentPage}
        autoPlay={false}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
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
          </Box>
          <ReportButton
            setTitle={setTitle}
            setDescription={setDescription}
            isLoadingReportGeneration={isLoadingReportGeneration}
            useTypeMember={userData.useTypeMember}
            handleAdminReportGeneration={handleAdminReportGeneration}
            setIsLoadingReportGeneration={setIsLoadingReportGeneration}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", height: 40 }}>
            <Autocomplete
              name="Dispositivo"
              options={usersAPIData.devices}
              getOptionLabel={(device) => {
                return `${device.name}`;
              }}
              onChange={(event, newValue) => {
                setDeviceInfo({ ...newValue, dev_uuid: newValue["uuid"] });
              }}
              value={usersAPIData.devices[0]}
              renderInput={(params) => (
                <TextField {...params} label="Device" variant="outlined" />
              )}
            />
          </Box>
          <GenerationHeader
            useTypeMember={userData.useTypeMember}
            deviceInfo={deviceInfo}
          />
        </Box>
      </Carousel>
      <MobileTestCustomIndicators
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};
