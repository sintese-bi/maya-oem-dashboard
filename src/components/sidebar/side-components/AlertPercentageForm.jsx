// IMPORTS
import { yupResolver } from "@hookform/resolvers/yup";
import { ChartsDashboard } from "../../shared/Charts";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Carousel from "react-material-ui-carousel";
import * as Yup from "yup";

import { AdministratorReport } from "src/reports/AdministratorReport";
import { ToolTipNoAccess } from "src/components/shared/ToolTipNoAccess";

import { getUserCookie, setUserCookie } from "src/services/session";

// LIBS DE ESTILOS
import {
  Info,
  SaveAs,
  DownloadForOffline,
  Lock,
  Home,
  ArrowBackIos,
  ArrowForwardIos,
  Cancel,
} from "@mui/icons-material";
import {
  Box,
  Card,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Typography,
  Paper,
  Backdrop,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  alertFrequency,
  getAllDevicesFromUser,
  patchAlertFrequency,
} from "src/store/actions/users";
import { display, style } from "@mui/system";
import { AlertsDefineComponent } from "./alerts/AlertsDefineComponent";
import { DefineAlertEmail } from "./alerts/DefineAlertEmail";
import { DefineCapacityAndDevicesEmails } from "./alerts/DefineCapacityAndDevicesEmails";
import { Portal } from "src/components/portals/Portal";

// SCHEMA DE VALIDAÇÃO DE CAMPOS

export default function AlertPercentageForm({
  setSecondaryAction,
  secondaryAction,
  setTitle,
  setDescription,
  welcome,
  setOpen,
  open,
}) {
  const dispatch = useDispatch();
  const userDevicesIsReady = localStorage.getItem("userDevicesIsReady");

  const [counting, setCounting] = useState(1);

  function detectPrevious(action) {
    if (welcome) {
      switch (action) {
        case "AlertsDefineComponent":
          setSecondaryAction("AlertsDefineComponent");
          break;
        case "DefineAlertEmail":
          setSecondaryAction("AlertsDefineComponent");
          break;
        case "Portal":
          setSecondaryAction("DefineAlertEmail");
          break;
        case "DefineCapacityAndDevicesEmails":
          setSecondaryAction("Portal");
          break;
      }
    } else {
      switch (action) {
        case "AlertsDefineComponent":
          setSecondaryAction("AlertsDefineComponent");
          break;
        case "DefineAlertEmail":
          setSecondaryAction("AlertsDefineComponent");
          break;
        case "Portal":
          setSecondaryAction("DefineAlertEmail");
          break;
        case "DefineCapacityAndDevicesEmails":
          setSecondaryAction("Portal");
          break;
      }
    }
  }

  function detectNext(action) {
    if (welcome) {
      switch (action) {
        case "AlertsDefineComponent":
          setSecondaryAction("DefineAlertEmail");
          break;
        case "DefineAlertEmail":
          setSecondaryAction("Portal");
          break;
        case "Portal":
          setSecondaryAction("DefineCapacityAndDevicesEmails");
          break;
        case "DefineCapacityAndDevicesEmails":
          setSecondaryAction("DefineCapacityAndDevicesEmails");
          break;
      }
    } else {
      switch (action) {
        case "AlertsDefineComponent":
          setSecondaryAction("DefineAlertEmail");
          break;
        case "DefineAlertEmail":
          setSecondaryAction("DefineAlertEmail");
          break;
      }
    }
  }

  const NoDevicesWarning = () => {
    return (
      <Card sx={{ p: 2, width: "30vw" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Prezado usuário!
        </Typography>
        <Typography variant="body2" sx={{}}>
          Prezado cliente estamos ingerindo seus dados na plataforma, gentileza
          aguardar. Entraremos em contato em breve com suas usinas prontas para
          serem monitoradas!
        </Typography>
      </Card>
    );
  };

  const CarousselContent = () => {
    switch (secondaryAction) {
      case "AlertsDefineComponent":
        return (
          <AlertsDefineComponent
            setTitle={setTitle}
            setDescription={setDescription}
            welcome={welcome}
            setSecondaryAction={setSecondaryAction}
          />
        );
        break;
      case "DefineAlertEmail":
        setCounting(2);
        return (
          <DefineAlertEmail
            welcome={welcome}
            setTitle={setTitle}
            setDescription={setDescription}
            setSecondaryAction={setSecondaryAction}
          />
        );
        break;

      case "Portal":
        setCounting(3);
        return (
          <Portal
            welcome={welcome}
            setTitle={setTitle}
            setDescription={setDescription}
            setSecondaryAction={setSecondaryAction}
          />
        );

      case "DefineCapacityAndDevicesEmails":
        setCounting(4);
        return (
          <DefineCapacityAndDevicesEmails
            setOpen={setOpen}
            open={open}
            setTitle={setTitle}
            setDescription={setDescription}
            setSecondaryAction={setSecondaryAction}
          />
        );
        break;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {userDevicesIsReady ? (
        <>
          <Box>
            <CarousselContent />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: "bold",
                mt: 4,
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: {
                    lg: "end",
                    md: "end",
                    sm: "center",
                    xs: "center",
                  },
                  alignItems: "center",
                  width: "50%",
                }}
              >
                {welcome ? `${counting}/4` : `${counting}/2`}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: {
                    lg: "end",
                    md: "end",
                    sm: "center",
                    xs: "center",
                  },
                  alignItems: "center",
                  width: "50%",
                  gap: 1,
                }}
              >
                <Button
                  color="inherit"
                  onClick={() => detectPrevious(secondaryAction)}
                >
                  <ArrowBackIos titleAccess="Voltar" fontSize="small" />
                  Voltar
                </Button>

                <Button
                  color="inherit"
                  onClick={() => detectNext(secondaryAction)}
                >
                  Próximo
                  <ArrowForwardIos titleAccess="Avançar" fontSize="small" />
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <NoDevicesWarning />
      )}
    </Box>
  );
}
