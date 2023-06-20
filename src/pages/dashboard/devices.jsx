// IMPORTS
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkRouter, useLocation } from "react-router-dom";

// QUERYS
import { getUserCookie } from "src/services/session";
import { getUserBrands } from "src/store/actions/users";

// COMPONENTS / LIBS DE ESTILOS
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Link,
  Avatar,
  Stack,
  Typography,
  Backdrop,
} from "@mui/material";
import MUIDataTable from "mui-datatables";

//ASSETS
import { listBrand } from "src/utils/list-brand";
import { columnsDevices } from "src/constants/columns";

export default function Devices() {
  // PROPS DE CONTROLLER
  const location = useLocation();
  const { useUuidState } = location.state || {};
  const { useUuid } = getUserCookie();
  const uuid = useUuidState ? useUuidState : useUuid;

  // ESTADOS DE QUERIES
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.users);
  
  const options = {
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
  };

  useEffect(() => {
    dispatch(getUserBrands(uuid));
  }, [uuid]);

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
                columns={columnsDevices}
                options={options}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
