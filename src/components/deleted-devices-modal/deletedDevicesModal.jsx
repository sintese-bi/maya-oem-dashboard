import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardContext } from "src/contexts/dashboard-context";
import { deviceRecover } from "src/store/actions/devices";

export const DeletedDevicesModal = ({
  setAction,
  setTitle,
  setDescription,
  setOpen,
  welcome,
}) => {
  const [data, setData] = useState([]);
  const { deletedDevices } = useSelector((state) => state.users);
  const { handleGetAllDevicesRequest } = useContext(DashboardContext);

  const dispatch = useDispatch();

  useEffect(() => {
    setTitle("Plantas deletadas");
    setDescription("");
  }, []);

  useEffect(() => {
    if (deletedDevices !== undefined) setData(deletedDevices);
  }, [deletedDevices]);

  function handleDeletedDevice(uuid) {
    setData(deletedDevices.filter((data) => data.uuid != uuid));
  }

  const columns = [
    {
      name: "uuid",
      label: "Identificação do device",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
      },
    },
    {
      name: "blUuid",
      label: "Identificação da marca",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
      },
    },
    {
      name: "brand",
      label: "Portal",
      options: {
        display: true,
        viewColumns: true,
        filter: true,
      },
    },
    {
      name: "name",
      label: "Nome do device",
      options: {
        display: true,
        viewColumns: true,
        filter: true,
      },
    },
    {
      name: "recoveryButton",
      label: "Recuperação de planta",
      options: {
        display: true,
        viewColumns: true,
        filter: true,
        customBodyRender: (name, dataTable) => {
          return (
            <Box>
              <Button
                variant="outlined"
                color="success"
                onClick={() =>
                  dispatch(
                    deviceRecover(
                      { dev_uuid: dataTable.rowData[0] },
                      handleDeletedDevice
                    )
                  )
                }
              >
                Recuperar planta
              </Button>
            </Box>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
    download: false,
    print: false,
    textLabels: {
      body: {
        noMatch: "Nenhum dado encontrado", // this would be whatever you want the message to say
      },
    },
  };

  if (deletedDevices == undefined) {
    return (
      <Box
        sx={{
          overflow: "auto",
          height: "70vh",
          width: "70vw",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Agurdando plantas deletadas...
        </Typography>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Box sx={{ overflow: "auto", height: "70vh", width: "70vw" }}>
      <MUIDataTable
        title={"Devices deletados"}
        data={deletedDevices}
        columns={columns}
        options={options}
      />
    </Box>
  );
};
