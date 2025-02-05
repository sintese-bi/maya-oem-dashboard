import { Close, ForkRight } from "@mui/icons-material";
import { Box, Card, CircularProgress, Modal, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { columnsDevices } from "src/constants/columns";

export const AlertsModal = ({
  setAction,
  setTitle,
  setDescription,
  setOpen,
  welcome,
}) => {
  const [data, setData] = useState([]);
  const { genrealdaylasthourData } = useSelector((state) => state.devices);
  const { devices } = useSelector((state) => state.users);

  useEffect(() => {
    if (genrealdaylasthourData.length !== 0 && devices.length !== 0) {
      let filteredDevices = genrealdaylasthourData.map((data) => {
        let test = devices.filter((device) => device.uuid == data.uuid)[0];
        return test;
      });

      setData(filteredDevices);

      setTitle(`Plantas em alerta: ${filteredDevices.length}`);
      setDescription("");
    }
  }, [genrealdaylasthourData]);

  useEffect(() => {
    //console.log(data);
  }, [data]);

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
    filter: true,
  };

  const columns = columnsDevices;

  if (data.length == 0) {
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
          Agurdando plantas em alerta...
        </Typography>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Box sx={{ overflow: "auto", height: "70vh", width: "70vw" }}>
      <MUIDataTable
        title={"Plantas em alertas"}
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
};
