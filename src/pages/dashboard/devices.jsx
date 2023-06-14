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

export default function Devices() {
  // PROPS DE CONTROLLER
  const location = useLocation();
  const { useUuidState } = location.state || {};
  const { useUuid } = getUserCookie();
  const uuid = useUuidState ? useUuidState : useUuid;

  // ESTADOS DE QUERIES
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.users);

  const columns = [
    {
      name: "uuid",
      label: "ID do Dispositivos/usuário",
      options: {
        display: false,
        viewColumns: false,
        filter: false,
      },
    },
    {
      name: "blUuid",
      label: "ID do marca",
      options: {
        display: false,
        viewColumns: false,
        filter: false,
      },
    },
    {
      name: "brand",
      label: "Nome da marca",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (name, dataTable) => {
          const brandImg = listBrand.filter(
            (brand) => brand.params === name
          )[0];
          return (
            <Stack direction="row" alignItems="center" gap={1}>
              <Avatar src={brandImg?.media} />
              <Link
                component={LinkRouter}
                to={{
                  pathname: `/dashboard/generation/${name}`,
                }}
                state={{
                  devUuidState: dataTable.rowData[0],
                  blUuidState: dataTable.rowData[1],
                }}
                underline="hover"
              >
                <Typography variant="body1">{name}</Typography>
              </Link>
            </Stack>
          );
        },
      },
    },
    {
      name: "name",
      label: "Dispositivos/usuário",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "generationReal",
      label: "Geração real",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "temperature",
      label: "Temperatura",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "alert",
      label: "Quantidade de alertas",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

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
                columns={columns}
                options={options}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
