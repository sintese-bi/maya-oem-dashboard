import {useState, useEffect} from 'react'
import AlertPercentageForm from 'src/components/AlertPercentageForm';
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard, getCapacities } from "src/store/actions/users";
import { getDevicesAlerts } from "src/store/actions/devices";
import { getUserCookie } from "src/services/session";
import { theme } from "src/theme";
import {
  columnsDevices,
} from "src/constants/columns";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Button,
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
  const { useUuid, useName } = getUserCookie();
  const { devicesALerts, isLoadingAlerts }  = useSelector((state) => state.devices)

  const {
    isLoading,
    dataDevices,
    //useCodePagarMe
  } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const options = {
      filter: true,
      rowsPerPage: 10,
      rowsPerPageOptions: [10, 50, 100, 200, 300],
      filterType: "dropdown",
      responsive: "simple",
      selectableRows: "none",
    };

  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  
  useEffect(() => {
    if(dataDevices.length != 0 ){
      let devicesWithAlerts = dataDevices.filter((data) => data.alert != 0)
      setData(devicesWithAlerts)
      laoded = 1
    }
  }, [dataDevices])

  useEffect(() => {
    if(devicesALerts.length == 0 && laoded == 0){
      dispatch(getDevicesAlerts(data))
    }
  }, [data])

  useEffect(() => {
    dispatch(getDashboard(useUuid));
  }, [useUuid]);

  useEffect(() => {
    devicesALerts.map((seila) => {
      console.log(seila)
    })
  }, [devicesALerts])

  if (isLoading) {
      return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
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
                          {data.al_inv}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.al_alerts}
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
        </Box>
      ) : null }
    </Box>
  )
}