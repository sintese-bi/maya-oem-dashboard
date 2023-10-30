import { Poll } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";
import { useState, useEffect } from "react";
import moment from "moment-timezone";
import { LoadingSkeletonBigNumbers } from "../../../../Loading";
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
  Grid,
} from "@mui/material";
import { Thermostat } from "@mui/icons-material";
import { Link as LinkRouter } from "react-router-dom";
import { BigNumber } from "../../../../shared/BigNumber";
import { listBrand } from "src/utils/list-brand";
import { getAllDevicesGeneration } from "src/store/actions/devices";

import { ChartsLinear } from "src/components/shared/Charts";
import { numbers } from "src/helpers/utils";

export const ModalPlantsGraph = ({ devUuidState, blUuidState }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [optionFilter, setOptionFilter] = useState("days");
  const [generationRealTotal, setGenerationRealTotal] = useState("");
  const [generationEstimatedTotal, setGenerationEstimatedTotalt] = useState("");

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

  useEffect(() => {
    setGenerationEstimatedTotalt(
      devicesGeneration.estimatedGeneration
        ?.reduce((total, element) => total + element, 0)
        .toFixed(2)
    );
    setGenerationRealTotal(
      devicesGeneration.realGeneration
        ?.reduce((total, element) => total + Number(element.value), 0)
        .toFixed(2)
    );
  }, [devicesGeneration]);

  return (
    <Box>
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
        <Box
          sx={{
            bgcolor: "background.paper",
            px: 4,
            maxHeight: "80%",
            overflow: "auto",
          }}
        >
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
            <MenuItem value="biweek">Quinzena</MenuItem>
            <MenuItem value="months">Mês</MenuItem>
          </TextField>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              mt: 2,
            }}
          >
            <Grid item xs={4}>
              {isLoadingDevicesGeneration ? (
                <LoadingSkeletonBigNumbers />
              ) : (
                <BigNumber
                  title="Produzido"
                  value={
                    devicesGeneration
                      ? `${numbers(String(generationRealTotal), "KWh")}`
                      : `${100}KWh`
                  }
                  icon={false}
                />
              )}
            </Grid>
            <Grid item xs={4}>
              {isLoadingDevicesGeneration ? (
                <LoadingSkeletonBigNumbers />
              ) : (
                <BigNumber
                  title="Esperado"
                  value={
                    devicesGeneration
                      ? `${numbers(String(generationEstimatedTotal), "KWh")}`
                      : `${100}KWh`
                  }
                  icon={false}
                />
              )}
            </Grid>
          </Box>
          <Typography
            sx={{
              width: "full",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
              py: 6,
            }}
          >
            {`Desempenho: ${
              generationEstimatedTotal
                ? (
                    (generationRealTotal / generationEstimatedTotal) *
                    100
                  ).toFixed(2)
                : 0
            }%`}
          </Typography>
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
};
