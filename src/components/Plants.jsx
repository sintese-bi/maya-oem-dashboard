import {useState, useEffect} from 'react'
import moment from "moment-timezone";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import AlertPercentageForm from 'src/components/AlertPercentageForm';
import { ChartsLinear } from "src/components/Charts";
import { getDashboard, getCapacities } from "src/store/actions/users";
import { getAllDevicesGeneration } from "src/store/actions/devices";
import { theme } from "src/theme";
import { getUserCookie } from "src/services/session";
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
  Paper,
  Modal,
  Tooltip
} from "@mui/material";
import { CheckCircle, Poll } from "@mui/icons-material"

export default function Plants(){
  const { useUuid, useName } = getUserCookie();

  const [open, setOpen] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState({})
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [optionFilter, setOptionFilter] = useState("month");

	const {
	  isLoading,
    dataDevices,
    //useCodePagarMe
 	} = useSelector((state) => state.users);

  const {
    devicesGeneration,
    isLoadingDevicesGeneration
  } = useSelector((state) => state.devices);

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
  
 	useEffect(() => {
 		if (dataDevices.length !== 0) {
      let devices = dataDevices.map((data) => {
        return {blUuid: data.blUuid, startDate, endDate, devUuid: data.uuid, type: optionFilter, name: data.name}
      })
      setData(devices)
    }
 	}, [dataDevices])

  useEffect(() => {
    setSelectedDevice(devicesGeneration)
  }, [devicesGeneration])

  function handleChartLinearData(props) {
    dispatch(getAllDevicesGeneration(props))
  }

  function handleModalState(){
    setOpen(!open)
  }

  useEffect(() => {
    dispatch(getDashboard(useUuid));
  }, [useUuid]);


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
      {data.length !== 0 ? (
        <Box
          component="main"
          sx={{
            width: '94%',
          }}
        >
          <TableContainer component={Paper}>
           <Typography sx={{fontSize: '22px', fontWeight: 'bold', py: 4, px: 2}} onClick={() => console.log(devicesGeneration)}>Plantas</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dispositivo/Usuário</TableCell>
                  <TableCell>Gráfico geração real/estimada</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data.length ? (
                  data.map((data, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(even)": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <TableCell>{data.name}</TableCell>
                        <TableCell component="th" scope="row" onClick={() => {
                          handleChartLinearData({
                            blUuid: data.blUuid, 
                            startDate: data.startDate, 
                            endDate: data.endDate, 
                            devUuid: data.devUuid, 
                            type: optionFilter, 
                            name: data.name 
                          })
                          setOpen(!open)
                        }}>
                          <Tooltip
                            sx={{ color: "action.active", mr: 1, my: 0.5 }}
                            title={'Análise em gráfico da geração real e geração estimada de cada planta.'}
                          >
                            <Poll size="small" />
                          </Tooltip>
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
                        <CheckCircle fontSize="large" />
                        <Typography variant="h5">
                          Plantas não achadas
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : null }
      <Modal
        open={open}
        onClose={handleModalState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <ChartsLinear 
          startDate={startDate}
          endDate={endDate}
          generation={devicesGeneration}
          optionFilter={optionFilter}
          isLoading={isLoadingDevicesGeneration}
        />
      </Modal>
    </Box>
	)
}