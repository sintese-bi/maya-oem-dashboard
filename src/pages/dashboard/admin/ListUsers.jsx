// IMPORTS
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";

// QUERIES
import { getUsers } from "src/store/actions/users";

// COMPONENTS / LIBS DE ESTILOS
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Chip,
  Link,
  Avatar,
  Paper,
  styled,
  TableRow,
  TableCell,
  Backdrop,
} from "@mui/material";
import MUIDataTable from "mui-datatables";

//ASSETS
import { listBrand } from "src/utils/list-brand";

export default function ListUsers() {
  // ESTADOS DE QUERIES
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.users);

  const columns = [
    {
      name: "use_uuid",
      label: "ID do Usuário",
      options: {
        display: false,
        viewColumns: false,
        filter: false,
      },
    },
    {
      name: "use_name",
      label: "Nome Completo",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (name, dataTable) => {
          return (
            <Link
              component={LinkRouter}
              to={{ pathname: "/dashboard" }}
              state={{ useUuidState: dataTable.rowData[0], useNameState: name }}
              underline="hover"
            >
              {name}
            </Link>
          );
        },
      },
    },
    {
      name: "use_email",
      label: "E-mail",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "brand_login",
      label: "Quantidade de marcas",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (itens) => {
          return itens?.length;
        },
      },
    },
    {
      name: "brand_login",
      label: "Lista de marcas",
      options: {
        display: false,
        viewColumns: false,
        filter: false,
        customBodyRender: (itens) => {
          return itens;
        },
      },
    },
    {
      name: "brand_login",
      label: "Situação",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (itens) => {
          return itens.length !== 0 ? "Ativo" : "Em processo";
        },
      },
    },
  ];

  const options = {
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    selectableRows: "none",
    expandableRowsHeader: false,
    expandableRows: true,
    renderExpandableRow: (rowData) => {
      const colSpan = rowData.length + 1;
      return (
        <TableRow>
          <TableCell colSpan={colSpan}>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
              {rowData[4]
                ? rowData[4].map((item, index) => (
                    <ListItem key={index}>
                      <Chip
                        key={index}
                        label={item.bl_name}
                        component={LinkRouter}
                        variant="outlined"
                        to={{
                          pathname: `/dashboard/generation/${item.bl_name}`,
                        }}
                        state={{ blUuidState: item.bl_uuid }}
                        clickable
                        avatar={
                          <Avatar
                            src={
                              listBrand.filter(
                                (brand) => brand.params === item.bl_name
                              )[0].media
                            }
                          />
                        }
                        sx={{ mr: 2, mb: 2 }}
                      />
                    </ListItem>
                  ))
                : "Nem dado encontrado!"}
            </Paper>
          </TableCell>
        </TableRow>
      );
    },
  };

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  useEffect(() => {
    dispatch(getUsers());
  }, []);

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
                title={"Listagem de Clientes  suas marcas"}
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
