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
import { Info, SaveAs, DownloadForOffline, Lock } from "@mui/icons-material";
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
} from "@mui/material";
import { useEffect, useState } from "react";
import { alertFrequency, patchAlertFrequency } from "src/store/actions/users";
import { style } from "@mui/system";
import { AlertsDefineComponent } from "./alerts/AlertsDefineComponent";
import { DefineAlertEmail } from "./alerts/DefineAlertEmail";
import { DefineCapacityAndDevicesEmails } from "./alerts/DefineCapacityAndDevicesEmails";

// SCHEMA DE VALIDAÇÃO DE CAMPOS

export default function AlertPercentageForm({ welcome, setOpen }) {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <Box>
      {welcome ? (
        <Carousel
          navButtonsAlwaysInvisible={true}
          activeIndicatorIconButtonProps={{
            style: {
              color: "#14B8A6",
            },
          }}
          indicatorIconButtonProps={{
            style: {
              color: "#D1D5DB",
            },
          }}
          index={currentPage}
          autoPlay={false}
          sx={{ width: 512 }}
        >
          <AlertsDefineComponent
            welcome={welcome}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <DefineAlertEmail
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <DefineCapacityAndDevicesEmails setOpen={setOpen} />
        </Carousel>
      ) : (
        <AlertsDefineComponent setOpen={setOpen} welcome={welcome} />
      )}
    </Box>
  );
}
