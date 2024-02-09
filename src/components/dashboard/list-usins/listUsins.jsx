import { Box, Button, Card, Modal } from "@mui/material";
import Plants from "../total-month/total-month-components/total-month-devices";
import { TopUsins } from "../top-usins/topUsins";
import { useSelector } from "react-redux";
import { Cancel } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { callingWebWorkers } from "src/web-workers";
import { DashboardContext } from "src/contexts/dashboard-context";
import { set } from "react-hook-form";

export const ListUsins = ({ data, devicesTableRef, type, usinsByState }) => {
  const { handleMassEmail } = useContext(DashboardContext);
  const [open, setOpen] = useState(false);
  const { allDevices, massEmailFinished } = useSelector((state) => state.users);

  const [massEmailFinishedState, setMassEmailFinishedState] =
    useState(massEmailFinished);

  useEffect(() => {
    setMassEmailFinishedState(massEmailFinished);
  }, [massEmailFinished]);

  return (
    <Card sx={{ p: 1, width: "100%" }}>
      <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            callingWebWorkers();
          }}
          sx={{ my: 2 }}
        >
          Principais usinas.
        </Button>
        <Button
          disabled={true}
          variant="outlined"
          color="success"
          onClick={() => {
            handleMassEmail();
          }}
          sx={{ my: 2 }}
        >
          {"Funcionalidade em desenvolvimento"}
        </Button>
      </Box>
      <Plants
        title={"Listagem de usinas"}
        data={data}
        devicesTableRef={devicesTableRef}
        type={type}
        usinsByState={usinsByState}
      />
      <Modal
        keepMounted
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Card
          sx={{
            width: "90%",
            height: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ width: "94%", display: "flex", justifyContent: "end", my: 2 }}
          >
            <Cancel onClick={() => setOpen(false)} sx={{ cursor: "pointer" }} />
          </Box>
          <TopUsins dataDevices={allDevices} />
        </Card>
      </Modal>
    </Card>
  );
};
