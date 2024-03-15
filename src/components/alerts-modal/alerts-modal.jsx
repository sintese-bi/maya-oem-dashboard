import { Close, ForkRight } from "@mui/icons-material";
import { Box, Card, Modal } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

export const AlertsModal = ({ devicesGenerationWithAlerts }) => {
  const [open, setOpen] = useState(false);

  function handleAlertsModal() {
    setOpen(false);
  }

  const options = {
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
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
      <Card sx={{ px: 4, pb: 4 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            py: 2,
          }}
        >
          <Close
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setOpen(false);
            }}
          />
        </Box>
        <MUIDataTable
          title={"Devices em alertas"}
          data={[]}
          columns={[{}]}
          options={options}
        />
      </Card>
    </Modal>
  );
};
