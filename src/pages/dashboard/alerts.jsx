// IMPORTS
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// LIBS DE ESTILOS
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { theme } from "src/theme";

// QUERIES
import { getAlerts } from "src/store/actions/generation";

// COMPONENTS
import Tabs from "../../components/shared/Tabs";
import { LoadingList } from "src/components/Loading";

// ASSETS
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Alerts = () => {
  const location = useLocation();
  const { devUuidState } = location.state || {};
  const dispatch = useDispatch();

  const { isLoadingGeneration, alerts } = useSelector((state) => state.generation);

  useEffect(() => {
    dispatch(getAlerts(devUuidState));
  }, [devUuidState]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Tabs />
        </Box>

        <Box sx={{ mt: 4 }}>
          {isLoadingGeneration ? (
            <LoadingList />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Dispositivo/Usuário</TableCell>
                    <TableCell>Inversor</TableCell>
                    <TableCell>Mensagem do alerta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {alerts && alerts.length ? (
                    alerts.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(even)": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <TableCell>{item.devName}</TableCell>
                        <TableCell component="th" scope="row">
                          {item.alInv}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.alAlert}
                        </TableCell>
                      </TableRow>
                    ))
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
                        <CheckCircleIcon fontSize="large" />
                        <Typography variant="h5">
                          Sem alertas no momento.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Alerts;
