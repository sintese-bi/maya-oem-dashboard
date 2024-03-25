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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const DeletedDevicesModal = ({
  setAction,
  setTitle,
  setDescription,
  setOpen,
  welcome,
}) => {
  const { deletedDevices } = useSelector((state) => state.users);

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
        customBodyRender: () => {
          return (
            <Box>
              <Button variant="outlined" color="success">
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
