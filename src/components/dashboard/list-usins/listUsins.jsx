import { Box, Button, Card, Modal, Tooltip } from "@mui/material";
import Plants from "../total-month/total-month-components/total-month-devices";
import { TopUsins } from "../top-usins/topUsins";
import { useSelector } from "react-redux";
import { Cancel, Info } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { callingWebWorkers } from "src/web-workers";
import { DashboardContext } from "src/contexts/dashboard-context";
import { set } from "react-hook-form";
import MUIDataTable from "mui-datatables";
import { columnsDevices } from "src/constants/columns";

export const ListUsins = ({ data, devicesTableRef, type, usinsByState }) => {
  const { handleMassEmail } = useContext(DashboardContext);
  const [open, setOpen] = useState(false);
  const { allDevices, massEmailFinished } = useSelector((state) => state.users);

  const [massEmailFinishedState, setMassEmailFinishedState] =
    useState(massEmailFinished);

  useEffect(() => {
    setMassEmailFinishedState(massEmailFinished);
  }, [massEmailFinished]);

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
      if (row[6] > row[7]) {
        return {
          style: { background: "rgba(152, 251, 152, 0.2)" },
        };
      } else if (row[6] == 0) {
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
  } = useSelector((state) => state.users);

  return (
    <Card sx={{ p: 1, width: "100%" }}>
      <Box sx={{ width: "100%", display: "flex", gap: 4 }}>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(!open);
          }}
          sx={{ my: 2 }}
        >
          Principais usinas.
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Essa funcionalidade envia relatório para todos os clientes com e-mail cadastrado em 'relatório mensal'.">
            <Info fontSize="small" />
          </Tooltip>
          <Button
            disabled={!massEmailFinishedState ? true : false}
            variant="outlined"
            color="success"
            onClick={() => {
              handleMassEmail();
            }}
          >
            {"Envio massivo de relatórios"}
          </Button>
        </Box>
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
          <TopUsins devices={allDevices} />
        </Card>
      </Modal>
    </Card>
  );
};
