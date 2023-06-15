import { Box, Container, Grid } from "@mui/material";
import MUIDataTable from "mui-datatables";

export default function DataTable(columns, data){
  
  const options = {
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
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
  )
}