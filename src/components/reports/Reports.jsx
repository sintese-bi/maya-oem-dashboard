import { Avatar, Box, Button, Link, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import { listBrand } from "src/utils/list-brand";
import { SendEmail } from "../dashboard/total-month/total-month-components/total-month-devices-components/total-month-send-email";
import { Info } from "@mui/icons-material";

export const Reports = () => {
  const { allDevices } = useSelector((state) => state.users);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(allDevices);
  }, [allDevices]);

  const options = {
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
  };

  const columns = [
    {
      name: "uuid",
      label: "ID do Dispositivos/usuário",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
      },
    },
    {
      name: "blUuid",
      label: "ID do marca",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
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
                  useNameState: dataTable.rowData[2],
                  capacity: dataTable.rowData[4],
                }}
                underline="hover"
              >
                <Typography sx={{ mr: 2 }} variant="body1">
                  {name}
                </Typography>
              </Link>
            </Stack>
          );
        },
      },
    },
    {
      name: "name",
      label: "Planta",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "sendEmail",
      label: "Gerar relatório",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 2 }}>Relatório mensal</Typography>
              <Tooltip title="enviar relatório do mês para cliente da planta">
                <Info sx={{ fontSize: "16px" }} />
              </Tooltip>
            </Box>
          );
        },
        customBodyRender: (name, dataTable) => {
          return (
            <Stack direction="row" alignItems="center" gap={1}>
              <SendEmail
                devUuidState={dataTable.rowData[0]}
                blUuidState={dataTable.rowData[1]}
                data={dataTable.rowData}
                useNameState={dataTable.rowData[2]}
                capacity={dataTable.rowData[4]}
                address={dataTable.rowData[17]}
                email={dataTable.rowData[18]}
                deviceName={dataTable.rowData[3]}
              />
            </Stack>
          );
        },
      },
    },
  ];

  return (
    <Box sx={{ width: "90vw", height: "70vh", overflow: "scroll" }}>
      <Box sx={{ height: 200 }}>
        <MUIDataTable data={data} columns={columns} options={options} />
      </Box>
    </Box>
  );
};
