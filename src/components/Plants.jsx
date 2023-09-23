import { useState, useEffect } from "react";
import moment from "moment-timezone";
import MUIDataTable from "mui-datatables";
import { ChartsLinear } from "src/components/Charts";
import { useDispatch, useSelector } from "react-redux";
import { getAllDevicesGeneration } from "src/store/actions/devices";

import { columnsDevices } from "src/constants/columns";

import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function Plants(props) {
  const { data, devicesTableRef } = props;

  const [open, setOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [optionFilter, setOptionFilter] = useState("month");

  const {
    isLoading,
    brands,
    blUuids,
    generationBelowEstimated,
    alerts,
    offline,
    online,
  } = useSelector((state) => state.users);

  const [columns, setColumns] = useState(columnsDevices);

  const { devicesGeneration, isLoadingDevicesGeneration } = useSelector(
    (state) => state.devices
  );

  const dispatch = useDispatch();

  const options = {
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
  };

  function handleChartLinearData(props) {
    dispatch(getAllDevicesGeneration(props));
  }

  useEffect(() => {
    if (selectedDevice) {
      dispatch(
        getAllDevicesGeneration(
          Object.assign(selectedDevice, {
            startDate: startDate,
            endDate: endDate,
          })
        )
      );
    }
  }, [startDate, endDate]);

  function handleModalState() {
    setStartDate(moment().startOf("month").format("YYYY-MM-DD"));
    setEndDate(moment().format("YYYY-MM-DD"));
    setOpen(!open);
  }

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Grid container spacing={3} sx={{ width: "100%" }} ref={devicesTableRef}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Listagem de usinas"
            data={data}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleModalState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 4,
            overflowY: "auto",
          }}
          minHeight={100}
          maxHeight={200}
        >
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
                setEndDate(endDate ? moment(endDate).format("YYYY-MM-DD") : "")
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <ChartsLinear
            startDate={startDate}
            endDate={endDate}
            generation={devicesGeneration}
            optionFilter={optionFilter}
            isLoading={isLoadingDevicesGeneration}
          />
        </Box>
      </Modal>
    </Box>
  );
}
