import {useState, useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import AlertPercentageForm from 'src/components/AlertPercentageForm';
import { ChartsLinear } from "src/components/Charts";
import { getDashboard, getCapacities } from "src/store/actions/users";
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
 		if (dataDevices.length !== 0) {
      		setData(dataDevices);
      		setColumns(columnsDevices);
    	}
 	}, [dataDevices])

  useEffect(() => {
    dispatch(getDashboard(useUuid));
  }, [useUuid]);

  function handleModalState(actionType){
    setOpen(!open)
  }

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
      {dataDevices.length !== 0 ? (
        <Box
          component="main"
          sx={{
            width: '94%',
          }}
        >
          <TableContainer component={Paper}>
           <Typography sx={{fontSize: '22px', fontWeight: 'bold', py: 4, px: 2}}>Plantas</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dispositivo/Usuário</TableCell>
                  <TableCell>Gráfico geração real/estimada</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataDevices && dataDevices.length ? (
                  dataDevices.map((data, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(even)": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <TableCell>{data.name}</TableCell>
                        <TableCell component="th" scope="row" onClick={() => handleModalState()}>
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
                        <CheckCircleIcon fontSize="large" />
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
        <ChartsLinear />
      </Modal>
    </Box>
	)
}