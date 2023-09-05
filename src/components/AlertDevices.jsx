import {useState, useEffect} from 'react'
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
  Paper
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material"

export default function AlertDevices(){
  let laoded = 0;
  const { useUuid } = getUserCookie();
  const { devicesALerts, isLoadingAlerts }  = useSelector((state) => state.devices)

  const {
    dataDevices,
    //useCodePagarMe
  } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [data, setData] = useState([])
  
  useEffect(() => {
    if(dataDevices.length !== 0 ){
      let devicesWithAlerts = dataDevices.filter((data) => data.alert !== 0)
      setData(devicesWithAlerts)
      laoded = 1
    }
  }, [dataDevices])

  useEffect(() => {
    if(devicesALerts.length === 0 && laoded === 0){
      dispatch(getDevicesAlerts(data))
    }
  }, [data])

  useEffect(() => {
    if(dataDevices.length === 0){
      dispatch(getDashboard(useUuid));
    }
  }, [useUuid]);

  if (isLoadingAlerts) {
      return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoadingAlerts}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
      );
    }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignItems: 'center', py: 4}}>
      {devicesALerts.length !== 0 ? (
        <Box
          component="main"
          sx={{
            width: '94%',
          }}
          onClick={() => console.log(devicesALerts, isLoadingAlerts)}
        >
          <TableContainer component={Paper}>
           <Typography sx={{fontSize: '22px', fontWeight: 'bold', py: 4, px: 2}}>Plantas em alerta</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dispositivo/Usuário</TableCell>
                  <TableCell>Inversor</TableCell>
                  <TableCell>Mensagem do alerta</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devicesALerts && devicesALerts.length ? (
                  devicesALerts?.map((item) => (
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
                      </TableRow>   
                      ))
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
      ) : null }
    </Box>
  )
}