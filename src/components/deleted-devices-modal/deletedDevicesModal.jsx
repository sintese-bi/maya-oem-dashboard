import { Close } from "@mui/icons-material";
import { Box, Card, Modal } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const DeletedDevicesModal = () => {
  const { deletedDevices } = useSelector((state) => state.users);
  const [open, setOpen] = useState(false);

  function handleAlertsModal() {
    setOpen(false);
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
      name: "name",
      label: "Nome do device",
      options: {
        display: true,
        viewColumns: true,
        filter: true,
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
  };

  return (
    <Modal
      open={open}
      onClose={handleAlertsModal}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ px: 4, pb: 4, height: "80vh", width: "90%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            py: 2,
          }}
        >
          <Close sx={{ cursor: "pointer" }} onClick={handleAlertsModal} />
        </Box>
        <Box sx={{ overflow: "auto", height: "90%" }}>
          <MUIDataTable
            title={"Devices deletados"}
            data={deletedDevices}
            columns={columns}
            options={options}
          />
        </Box>
      </Card>
    </Modal>
  );
};
