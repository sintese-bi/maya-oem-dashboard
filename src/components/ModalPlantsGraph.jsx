import { Poll } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";
import { useState, useEffect } from "react";
import moment from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Avatar,
  Link,
  Stack,
  Typography,
  Box,
  Modal,
  TextField,
  MenuItem,
} from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import { listBrand } from "src/utils/list-brand";
import { getAllDevicesGeneration } from "src/store/actions/devices";

import { ChartsLinear } from "src/components/Charts";

export const ModalPlantsGraph = ({ devUuidState, blUuidState }) => {
  const [open, setOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [optionFilter, setOptionFilter] = useState("days");

  const dispatch = useDispatch();

  const { devicesGeneration, isLoadingDevicesGeneration } = useSelector(
    (state) => state.devices
  );

  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

  function handleChartLinearData(props) {
    dispatch(getAllDevicesGeneration(props));
  }

  function handleModalState() {
    setStartDate(moment().startOf("month").format("YYYY-MM-DD"));
    setEndDate(moment().format("YYYY-MM-DD"));
    setOpen(!open);
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
  }, [startDate, endDate, optionFilter]);

  return (
    <>
      <Avatar
        onClick={() => {
          handleChartLinearData({
            blUuid: blUuidState,
            startDate,
            endDate,
            devUuid: devUuidState,
            type: optionFilter,
            name: "undefined",
          });
          setSelectedDevice({
            blUuid: blUuidState,
            devUuid: devUuidState,
            type: optionFilter,
            name: "undefined",
          });
          setOpen(!open);
        }}
      >
        <Poll />
      </Avatar>
      <Modal
        open={open}
        onClose={handleModalState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ bgcolor: "background.paper", px: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              py: 4,
            }}
          >
            <Cancel
              fontSize="large"
              onClick={() => setOpen(!open)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
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
            <MenuItem disabled value="quinzena">
              Quinzena
            </MenuItem>
            <MenuItem value="months">Mês</MenuItem>
          </TextField>
          <ChartsLinear
            startDate={startDate}
            endDate={endDate}
            generation={devicesGeneration}
            optionFilter={optionFilter}
            isLoading={isLoadingDevicesGeneration}
          />
        </Box>
      </Modal>
    </>
  );
};
