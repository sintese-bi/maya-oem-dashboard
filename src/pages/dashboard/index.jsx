// IMPORTS
import api, { configRequest } from "../../services/api";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink } from '@react-pdf/renderer'
import { AdministratorReport } from "src/reports/AdministratorReport";
import { reportAdministratorRule } from "src/reports/reportsRules/reportAdministratorRule";
import { ToolTipNoAccess } from 'src/components/ToolTipNoAccess'

import { GlobalUsinProductive } from "src/components/GlobalUsinProductive";

import {ChartsDashboardHorizontal} from 'src/components/Charts'
import {ChartsDashboard} from 'src/components/Charts'

// QUERYS
import {
  columnsDevices,
} from "src/constants/columns";
import { getUserCookie } from "src/services/session";
import { getDashboard, getCapacities } from "src/store/actions/users";
import { getDeletedDevices } from "src/store/actions/devices";

// COMPONENTS / LIBS DE ESTILOS
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Button,
  Typography,
  Modal,
  Card
} from "@mui/material";
import AlertPercentageForm from "src/components/AlertPercentageForm";
import { PaymentWarn } from "src/components/PaymentWarn";
import { BigNumberDashboard } from "src/components/BigNumber";

// ASSETS
import {
  AccountCircle,
  AlignVerticalTop,
  BrandingWatermark,
  ThumbDownOffAlt,
  ThumbUpOffAlt,
  Warning,
  DownloadForOffline,
} from "@mui/icons-material";
import MUIDataTable from "mui-datatables";

export default function Dashboard() {
  // PROPS DE CONTROLLER
  const { useUuid, useName } = getUserCookie();
  const useCodePagarMe = (useName == "Maya Energy" || useName == "darcio") ? true : false

  // ESTADOS DE QUERIES
  const dispatch = useDispatch();
  const {
    isLoading,
    brands,
    blUuids,
    dataDevices,
    generationBelowEstimated,
    alerts,
    offline,
    online,
    capacity,
    //useCodePagarMe
  } = useSelector((state) => state.users);
  const {
    devicesDeleted
  } = useSelector((state) => state.devices);

  const [open, setOpen] = useState(false)

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [type, setType] = useState(1);

  const [isLoadingReport, setIsLoadingReport] = useState(true)

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
        setData(brands.map((data) => {
          let brandItem = {brand: data}
          return brandItem
        }));
        break;
      case 3:
        setData(generationBelowEstimated);
        break;
      case 4:
        setData(alerts);
        break;
      case 5:
        setData(offline);
        break;
      case 6:
        setData(online);
        break;
      default:
        break;
    }
  }

  function handleReportGeneration(){
    useCodePagarMe ? reportAdministratorRule(capacity, dataDevices, setIsLoadingReport) : setOpen(!open)
  }

  useEffect(() => {
     dispatch(getDashboard(useUuid))
  }, [useUuid])

  useEffect(() => {
    dispatch(getCapacities(blUuids))
  }, [blUuids])

  useEffect(() => {
    if (dataDevices.length !== 0) {
      setData(dataDevices);
      setColumns(columnsDevices);
    }
  }, [dataDevices]);

  useEffect(() => {
    type == 2 ? setColumns([columnsDevices[2]]) : setColumns(columnsDevices)
  }, [type])

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
      <Box sx={{
        display: 'flex',
        justifyContent: 'end',
        my: 3,
        ml: 3
      }}>
        <ToolTipNoAccess useCodePagarMe={useCodePagarMe}>
          <Box sx={{display: 'flex', justifyContent: 'center', width:'220px'}}>
            <Button
              startIcon={<DownloadForOffline fontSize="small" />}
              variant={useCodePagarMe ? 'outlined' : ''}
              onClick={() => handleReportGeneration()}
            >
              {
                isLoadingReport ? (
                  'Preparar relatório'
                ) : 
                (
                  <PDFDownloadLink 
                    document={<AdministratorReport />} 
                    fileName="relatório-integrador.pdf"
                    style={{textDecoration: 'none'}}
                  >
                    {({ blob, url, loading, error }) => (useCodePagarMe ? (loading ? "Carregando relatório..." : "Relatório Integrador") : "Relatório indisponível")}
                  </PDFDownloadLink>
                )
              }
            </Button>
          </Box>
        </ToolTipNoAccess>
      </Box>
      <Box sx={{display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <Box sx={{width: '84%', my: 4}}>
          <Typography variant="h4">Resumo de usinas</Typography>
        </Box>
        <Box sx={{
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
          type={2}
          activeBtn={type === 2 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />

        <BigNumberDashboard
          title="Semanal abaixo da estimada"
          value={
            generationBelowEstimated.length !== 0
              ? generationBelowEstimated.length
              : 0
          }
          icon={<AlignVerticalTop />}
          type={3}
          activeBtn={type === 3 ? true : false }
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
        </Box>
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
          type={5}
          activeBtn={type === 5 ? true : false }
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />

        <BigNumberDashboard
          title="Online"
          value={online.length !== 0 ? online.length : 0}
          icon={<ThumbUpOffAlt />}
          type={6}
          activeBtn={type === 6 ? true : false }
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />

        <BigNumberDashboard
          title="Plantas em Alerta"
          value={alerts.length !== 0 ? alerts.length : 0}
          icon={<Warning />}
          type={4}
          activeBtn={type === 4 ? true : false }
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
      </Box>
      <GlobalUsinProductive dataDevices={dataDevices} isLoading={isLoading} />
      {/* 
        Gráfico horizontal/Gráfico vertical

        <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mt: 10}}>
          <ChartsDashboardHorizontal dataDevices={dataDevices} />
          <ChartsDashboard dataDevices={dataDevices} />
        </Box>
        
      */}
      <Modal
        open={open}
        onClose={handleReportGeneration}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
      {
        <PaymentWarn/>
      }
      </Modal>
    </>
  );
}