// IMPORTS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// QUERYS
import {
  columnsDevices,
} from "src/constants/columns";
import { getUserCookie } from "src/services/session";
import { getDashboard } from "src/store/actions/users";

// COMPONENTS / LIBS DE ESTILOS
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";
import AlertPercentageForm from "src/components/AlertPercentageForm";
import { BigNumberDashboard } from "src/components/BigNumber";

// ASSETS
import {
  AccountCircle,
  AlignVerticalTop,
  BrandingWatermark,
  ThumbDownOffAlt,
  ThumbUpOffAlt,
  Warning,
} from "@mui/icons-material";
import MUIDataTable from "mui-datatables";

export default function Dashboard() {
  // PROPS DE CONTROLLER
  const { useUuid } = getUserCookie();

  // ESTADOS DE QUERIES
  const dispatch = useDispatch();
  const {
    isLoading,
    brands,
    dataDevices,
    generationBelowEstimated,
    alerts,
    offline,
    online,
  } = useSelector((state) => state.users);

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [type, setType] = useState(1);

  const options = {
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
  };

  function handleChangeColumns(type) {
    setType(type)
    switch (type) {
      case 1:
        setData(dataDevices);
        break;
      case 2:
        setData(generationBelowEstimated);
        break;
      case 3:
        setData(alerts);
        break;
      case 4:
        setData(offline);
        break;
      case 5:
        setData(online);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    dispatch(getDashboard(useUuid));
  }, [useUuid]);

  useEffect(() => {
    if (dataDevices.length !== 0) {
      setData(dataDevices);
      setColumns(columnsDevices);
    }
  }, [dataDevices]);

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
    <>
      <AlertPercentageForm />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <BigNumberDashboard
          title="Dispositivos/usuário"
          value={dataDevices.length !== 0 ? dataDevices.length : 0}
          icon={<AccountCircle />}
          type={1}
          activeBtn={type === 1 ? true : false }
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />

        <BigNumberDashboard
          title="Marcas"
          value={brands.length !== 0 ? brands.length : 0}
          icon={<BrandingWatermark />}
          btn={true}
          activeBtn={false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />

        <BigNumberDashboard
          title="Geração abaixo da estimada"
          value={
            generationBelowEstimated.length !== 0
              ? generationBelowEstimated.length
              : 0
          }
          icon={<AlignVerticalTop />}
          type={2}
          activeBtn={type === 2 ? true : false }
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          mt: 3,
        }}
      >
        <BigNumberDashboard
          title="Offline"
          value={offline.length !== 0 ? offline.length : 0}
          icon={<ThumbDownOffAlt />}
          type={4}
          activeBtn={type === 4 ? true : false }
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />

        <BigNumberDashboard
          title="Online"
          value={online.length !== 0 ? online.length : 0}
          icon={<ThumbUpOffAlt />}
          type={5}
          activeBtn={type === 5 ? true : false }
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />

        <BigNumberDashboard
          title="Plantas em Alerta"
          value={alerts.length !== 0 ? alerts.length : 0}
          icon={<Warning />}
          type={3}
          activeBtn={type === 3 ? true : false }
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
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
    </>
  );
}
