import {
  Box,
  Button,
  Card,
  LinearProgress,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { amountOfSentEmails } from "src/services/web-socket";
import { WebSocketContext } from "src/contexts/web-scoket";
import { configRequest } from "src/services/api";
import { getUserCookie } from "src/services/session";

export const ListUsins = ({ data, devicesTableRef, type, usinsByState }) => {
  const [amountOfSentEmails, setAmountOfSentEmails] = useState(0);
  const {
    isLoading,
    brands,
    devices,
    generationBelowEstimated,
    massEmailFinished,
    alerts,
    notDefined,
    unactived,
    offline,
    online,
    massive_reports_status,
    amount_of_reports,
    mass_email_amount_percentage,
    mass_email_status,
  } = useSelector((state) => state.users);

  const [massiveEmailDate, setMasssiveEmailDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const {
    handleMassEmail,
    handlePostUseDateReport,
    handleMassiveReportsStatusRequest,
  } = useContext(DashboardContext);

  const [open, setOpen] = useState(false);

  const [massEmailFinishedState, setMassEmailFinishedState] =
    useState(massEmailFinished);

  useEffect(() => {
    if (typeof mass_email_amount_percentage !== "string")
      setAmountOfSentEmails(
        massive_reports_status === "completed"
          ? 0
          : mass_email_amount_percentage
      );
  }, [mass_email_amount_percentage, massive_reports_status]);

  useEffect(() => {
    setMassEmailFinishedState(massEmailFinished);
  }, [massEmailFinished]);

  useEffect(() => {
    if (massiveEmailDate != moment().format("YYYY-MM-DD"))
      handlePostUseDateReport(massiveEmailDate);
  }, [massiveEmailDate]);

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
      if (row[7] < row[8]) {
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

  const normalise = (value) =>
    ((value - 0) * amount_of_reports) / (amount_of_reports - 0);

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "300px", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={normalise(props.value)}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

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
            variant="outlined"
            color="success"
            onClick={() => {
              setAmountOfSentEmails(0);
              handleMassEmail();
            }}
            disabled={!massive_reports_status}
          >
            {massive_reports_status === "completed" ? (
              "Envio massivo de relatórios"
            ) : !massive_reports_status ? (
              <Typography>Conectando com banco de dados...</Typography>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2">Cancelar envio massivo</Typography>
                <LinearProgressWithLabel value={amountOfSentEmails} />
              </Box>
            )}
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Essa funcionalidade agenda uma data de sua escolha para o envio massivo de relatórios acontecer.">
            <Info fontSize="small" />
          </Tooltip>

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              disabled={massive_reports_status == "completed" ? false : true}
              label="Agendar envio massivo"
              value={massiveEmailDate}
              onChange={(massiveEmailDate) =>
                setMasssiveEmailDate(
                  moment(massiveEmailDate).format("YYYY-MM-DD")
                )
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
          <TopUsins devices={devices} />
        </Card>
      </Modal>
    </Card>
  );
};
