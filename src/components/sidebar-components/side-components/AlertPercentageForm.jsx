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
} from "@mui/material";
import { useEffect, useState } from "react";
import { alertFrequency, patchAlertFrequency } from "src/store/actions/users";
import { display, style } from "@mui/system";
import { AlertsDefineComponent } from "./alerts/AlertsDefineComponent";
import { DefineAlertEmail } from "./alerts/DefineAlertEmail";
import { DefineCapacityAndDevicesEmails } from "./alerts/DefineCapacityAndDevicesEmails";

// SCHEMA DE VALIDAÇÃO DE CAMPOS

export default function AlertPercentageForm({ welcome, setOpen }) {
  const { allDevicesFromUser } = useSelector((state) => state.users);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(512);

  useEffect(() => {
    setData(allDevicesFromUser);
  }, [allDevicesFromUser]);

  useEffect(() => {
    if (currentPage == 2) {
      setCarouselWidth("94vw");
    }
  }, [currentPage]);

  return (
    <Box>
      {welcome ? (
        <>
          <Carousel
            next={() => {
              setCurrentPage(currentPage + 1);
            }}
            prev={() => {
              setCurrentPage(currentPage - 1);
            }}
            navButtonsAlwaysInvisible={true}
            indicators={false}
            indicatorIconButtonProps={{
              style: {
                color: "#14B8A6",
              },
            }}
            index={currentPage}
            autoPlay={false}
            sx={{ width: carouselWidth }}
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
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <ArrowBackIos
              fontSize="small"
              sx={{ cursor: "pointer", "&:hover": { color: "#14B8A6" } }}
              onClick={() =>
                currentPage < 3 && currentPage >= 0
                  ? setCurrentPage(currentPage - 1)
                  : null
              }
            />
            <ArrowForwardIos
              fontSize="small"
              sx={{ cursor: "pointer", "&:hover": { color: "#14B8A6" } }}
              onClick={() =>
                currentPage < 3 && currentPage >= 0
                  ? setCurrentPage(currentPage + 1)
                  : null
              }
            />
          </Box>
        </>
      ) : (
        <AlertsDefineComponent setOpen={setOpen} welcome={welcome} />
      )}
    </Box>
  );
}
