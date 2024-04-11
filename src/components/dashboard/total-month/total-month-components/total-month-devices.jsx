import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import moment from "moment-timezone";
import MUIDataTable from "mui-datatables";
import { ChartsLinear } from "src/components/shared/Charts";
import { useDispatch, useSelector } from "react-redux";
import { getAllDevicesGeneration } from "src/store/actions/devices";

import { columnsDevices } from "src/constants/columns";

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { getAllDevices, getDashboard } from "src/store/actions/users";
import { getUserCookie } from "src/services/session";
import { Avatar } from "@mui/material";
import { listBrand } from "src/utils/list-brand";

export default function Plants(props) {
  const { type, devicesTableRef, title, usinsByState } = props;
  const { useUuid, profileLevel } = getUserCookie();

  const devicesRef = useRef(null);
  const [data, setData] = useState([]);
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
    devices,
    generationBelowEstimated,
    alerts,
    notDefined,
    unactived,
    offline,
    online,
    allDevices,
  } = useSelector((state) => state.users);

  const [columns, setColumns] = useState(columnsDevices);

  const dispatch = useDispatch();

  const options = {
    sortOrder: {
      name: "capacity",
      direction: "desc",
    },
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
    setRowProps: (row) => {
      if (row[7] < row[8] && row[7] != 0) {
        return {
          style: { background: "rgba(152, 251, 152, 0.2)" },
        };
      } else if (row[7] == 0) {
        return {
          style: { background: "rgba(255, 105, 97, 0.2)" },
        };
      } else {
        return {
          style: { background: "aliceblue" },
        };
      }
    },
  };

  const exportToXLSX = () => {
    const transformedData = data.map((data) => {
      let {
        brand,
        name,
        generationEstimatedDay,
        generationEstimatedMonth,
        generationEstimatedWeek,
        generationRealDay,
        generationRealMonth,
        generationRealWeek,
        capacity,
        alert,
        staName,
      } = data;
      return {
        brand,
        name,
        generationEstimatedDay,
        generationEstimatedMonth,
        generationEstimatedWeek,
        generationRealDay,
        generationRealMonth,
        generationRealWeek,
        capacity,
        alert,
        staName,
      };
    });
    transformedData.unshift([
      "Marca",
      "Nome do device",
      "Geração Estimada do dia",
      "Geração Estimada da mês",
      "Geração Estimada do semana",
      "Geração Real do dia",
      "Geração Real da mês",
      "Geração Real do semana",
      "Capacidade",
      "Alertas",
      "Situação",
    ]);
    const formattedData = transformedData.map((row) => Object.values(row));
    const worksheet = XLSX.utils.aoa_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  function handleTransformColumnData(data) {
    let transformedData = data.map((data) => {
      return data;
    });
    return transformedData;
  }

  function handleChangeColumns(type) {
    if (typeof type == "string") {
      setData(
        usinsByState
          .filter((data) => data.state == type)
          .map((data) => data.amountOfUsins)[0]
      );
      devicesRef.current.scrollIntoView();
    } else {
      switch (type) {
        case 1:
          setData(handleTransformColumnData(devices));
          devicesRef.current.scrollIntoView();
          break;
        case 2:
          setData(
            brands.map((data) => {
              let brandItem = { brand: data };
              return brandItem;
            })
          );
          devicesRef.current.scrollIntoView();

          break;
        case 3:
          setData(handleTransformColumnData(generationBelowEstimated));
          devicesRef.current.scrollIntoView();

          break;
        case 4:
          setData(handleTransformColumnData(alerts));
          devicesRef.current.scrollIntoView();

          break;
        case 5:
          setData(handleTransformColumnData(offline));
          devicesRef.current.scrollIntoView();

          break;
        case 6:
          setData(handleTransformColumnData(online));
          devicesRef.current.scrollIntoView();

          break;
        case 7:
          setData(handleTransformColumnData(notDefined));
          devicesRef.current.scrollIntoView();

          break;
        case 8:
          setData(handleTransformColumnData(unactived));
          devicesRef.current.scrollIntoView();

          break;
        case 9:
          setData(
            handleTransformColumnData(
              devices.filter((data) => data.staCode != "online")
            )
          );
          devicesRef.current.scrollIntoView();
          break;
        default:
          break;
      }
    }

    setColumns(
      type == 2
        ? [
            {
              name: "brand",
              label: "Nome da marca",
              options: {
                filter: true,
                sort: true,
                customBodyRender: (name, dataTable) => {
                  const brandImg = listBrand.filter(
                    (brand) => brand.params === name
                  )[0];
                  return (
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Avatar src={brandImg?.media} />

                      <Typography sx={{ mr: 2 }} variant="body1">
                        {name}
                      </Typography>
                    </Stack>
                  );
                },
              },
            },
          ]
        : columnsDevices
    );
  }

  useEffect(() => {
    handleChangeColumns(type);
  }, [type]);

  useEffect(() => {
    setData(handleTransformColumnData(devices));
  }, [devices]);

  useEffect(() => {
    if (profileLevel != "admin") {
      dispatch(getAllDevices(useUuid));
    }
  }, [useUuid]);

  function handleModalState() {
    setStartDate(moment().startOf("month").format("YYYY-MM-DD"));
    setEndDate(moment().format("YYYY-MM-DD"));
    setOpen(!open);
  }

  function MuiDataTableTitle() {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Typography variant="h5">Listagem de usinas</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: "aliceblue",
              height: 15,
              width: 15,
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          ></Box>
          <Typography>Desempenho acima de 100%</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: "rgba(152, 251, 152, 0.2)",
              height: 15,
              width: 15,
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          ></Box>
          <Typography>Desempenho entre 1-100%</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: "rgba(255, 105, 97, 0.2)",
              height: 15,
              width: 15,
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          ></Box>
          <Typography>Desempenho 0%</Typography>
        </Box>
      </Box>
    );
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
        <Grid item xs={12} ref={devicesRef}>
          <MUIDataTable
            title={<MuiDataTableTitle />}
            data={data}
            columns={columns}
            options={options}
          />
          <Button variant="contained" onClick={exportToXLSX}>
            Download XLSX
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
