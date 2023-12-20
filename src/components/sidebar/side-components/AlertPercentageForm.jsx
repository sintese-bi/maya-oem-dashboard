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
  const [currentPage, setCurrentPage] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(512);

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

  useEffect(() => {
    if (currentPage == 2) {
      setCarouselWidth("92vw");
    } else {
      setCarouselWidth(512);
    }
  }, [currentPage]);

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
        return (
          <DefineAlertEmail
            welcome={welcome}
            setTitle={setTitle}
            setDescription={setDescription}
            setSecondaryAction={setSecondaryAction}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        );

        break;
      case "DefineCapacityAndDevicesEmails":
        <DefineCapacityAndDevicesEmails
          setOpen={setOpen}
          open={open}
          setTitle={setTitle}
          setDescription={setDescription}
          currentPage={currentPage}
        />;
        break;
    }
  };

  return (
    <Box>
      {userDevicesIsReady ? (
        <>
          <Box sx={{ width: carouselWidth }}>
            <CarousselContent />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            {/*<ArrowBackIos
              fontSize="small"
              sx={{ cursor: "pointer", "&:hover": { color: "#14B8A6" } }}
              onClick={() =>
                currentPage > 0 ? setCurrentPage(currentPage - 1) : null
              }
            />

            <ArrowForwardIos
              fontSize="small"
              sx={{ cursor: "pointer", "&:hover": { color: "#14B8A6" } }}
              onClick={() =>
                currentPage < 2 ? setCurrentPage(currentPage + 1) : null
              }
            />*/}
          </Box>
        </>
      ) : (
        <NoDevicesWarning />
      )}
    </Box>
  );
}
