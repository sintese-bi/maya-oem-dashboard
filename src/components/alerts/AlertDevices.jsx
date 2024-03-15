import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "src/store/actions/users";
import { getDevicesAlerts } from "src/store/actions/devices";
import { getUserCookie } from "src/services/session";
import { theme } from "src/theme";
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Card,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import moment from "moment";

export default function AlertDevices() {
  const { useUuid } = getUserCookie();
  const { devicesALerts, isLoadingAlerts } = useSelector(
    (state) => state.devices
  );

  const {
    devices,
    selectedUser,
    //useCodePagarMe
  } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (devices.length !== 0) {
      let devicesWithAlerts = devices.filter((data) => data.alert !== 0);
      setData(devicesWithAlerts);
    }
  }, [devices]);

  useEffect(() => {
    dispatch(getDevicesAlerts(data));
  }, [data]);

  useEffect(() => {
    if (devices.length === 0) {
      selectedUser.length != 0
        ? dispatch(
            getDashboard(selectedUser[0]?.useUuidState, "alert-devices.jsx")
          )
        : dispatch(getDashboard(useUuid, "alert-devices.jsx"));
    }
  }, [useUuid]);

  return (
    <Card
      sx={{
        py: 2,
        paddingLeft: 2,
        overflow: "auto",
        height: "100%",
        width: "100%",
      }}
    >
      {devicesALerts.length !== 0 ? (
        <Box
          component="main"
          sx={{
            width: "100%",
          }}
        >
          <TableContainer component={Paper}>
            <Typography
              sx={{ fontSize: "22px", fontWeight: "bold", py: 4, px: 2 }}
            >
              Plantas em alerta
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dispositivo/Usuário</TableCell>
                  <TableCell>Mensagem do alerta</TableCell>
                  <TableCell>Inversor</TableCell>
                  <TableCell>Data do alerta</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devicesALerts && devicesALerts.length ? (
                  devicesALerts?.map((item) =>
                    item.alerts?.map((data, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(even)": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <TableCell>{item.dev_name}</TableCell>
                        <TableCell component="th" scope="row">
                          {data.al_alerts}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.al_inv}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {moment(data.alert_created_at).format(
                            "DD/MM/YYYY HH:mm:ss"
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )
                ) : (
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      colSpan={3}
                      sx={{
                        height: 300,
                        color: theme.palette.secondary.main,
                      }}
                    >
                      <CheckCircle fontSize="large" />
                      <Typography variant="h5">
                        Sem alertas no momento.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" fontWeight="bolder">
            NENHUM ALERTA ENCONTRADO
          </Typography>
        </Box>
      )}
    </Card>
  );
}
