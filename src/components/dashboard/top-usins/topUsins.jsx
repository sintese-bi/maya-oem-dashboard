import { Card } from "@mui/material";
import Plants from "../total-month/total-month-components/total-month-devices";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

import {
  Avatar,
  Button,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import { listBrand } from "src/utils/list-brand";
import { CheckBox, ReportProblem, Info } from "@mui/icons-material";
import { ModalPlantsGraph } from "src/components/dashboard/total-month/total-month-components/total-month-devices-components/total-month-generation-graph";
import { DeleteDevice } from "src/components/dashboard/total-month/total-month-components/total-month-devices-components/total-month-delete-devices";
import { SendEmail } from "src/components/dashboard/total-month/total-month-components/total-month-devices-components/total-month-send-email";
import { Box } from "@mui/system";

export const TopUsins = ({ dataDevices, ref, type, title }) => {
  const [data, setData] = useState([]);

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
      name: "name",
      label: "Planta",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "generationRealMonth",
      label: "Produção real mês (KWh)",
      options: {
        filter: true,
        sort: true,
        sortDirection: "desc",
      },
    },
    {
      name: "address",
      label: "Endereço",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  useEffect(() => {
    console.log(dataDevices);
    setData(
      dataDevices
        .sort((a, b) => b.generationRealMonth - a.generationRealMonth)
        .slice(0, 4)
    );
  }, [dataDevices]);

  return (
    <Card sx={{ width: 500, p: 1, height: 364, overflow: "scroll" }}>
      <MUIDataTable
        title={"Principais usinas"}
        data={data}
        columns={columns}
        options={options}
      />
    </Card>
  );
};
