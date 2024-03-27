import { Close, ForkRight } from "@mui/icons-material";
import { Box, Card, CircularProgress, Modal, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
    if (genrealdaylasthourData?.length !== 0) {
      setData(
        genrealdaylasthourData?.map((data) => {
          return devices.filter((device) => device.uuid == data)[0];
        })
      );

      setTitle("Plantas em alerta");
      setDescription("");
    }
  }, [genrealdaylasthourData]);

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

  const columns = [{}];

  if (genrealdaylasthourData == undefined) {
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
    <MUIDataTable
      title={"Plantas em alertas"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};
