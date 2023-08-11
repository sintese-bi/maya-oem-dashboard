import {useState, useEffect} from 'react'
import AlertPercentageForm from 'src/components/AlertPercentageForm';
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard, getCapacities } from "src/store/actions/users";
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
} from "@mui/material";

export default function AlertDevices(){
  const { useUuid, useName } = getUserCookie();

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
      		setData(dataDevices?.filter((data) => data?.alert != 0));
      		setColumns(columnsDevices);
    	}
 	}, [dataDevices])

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
		<Box sx={{display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignItems: 'center'}}>
			<Box sx={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '50%', py: 4}}>
				<AlertPercentageForm />
			</Box>
			{data.length !== 0 ? (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
          }}
        >
          <Container maxWidth={false}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MUIDataTable
                    title={"Listagem de marcas"}
                    data={data}
                    columns={columns}
                    options={options}
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      ) : null}
		</Box>
	)
}