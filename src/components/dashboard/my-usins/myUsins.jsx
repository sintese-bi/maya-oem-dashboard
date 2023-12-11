import {
  Block,
  Bolt,
  ReportProblem,
  SignalWifiOff,
  SolarPower,
  Wifi,
} from "@mui/icons-material";
import { Card, Typography, Box } from "@mui/material";
import { numbers } from "src/helpers/utils";

export const MyUsins = ({
  realGeneration,
  estimatedGeneration,
  percent,
  allDevices,
  brands,
  notDefined,
  unactived,
  online,
  offline,
  alerts,
  type,
  handleChangeColumns,
}) => {
  return (
    <Card sx={{ width: "100%", p: 2, height: 364 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Minhas usinas hoje
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          gap: 1,
        }}
      >
        <Typography
          onClick={() => {
            handleChangeColumns(1);
          }}
          sx={{
            display: "flex",
            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
            cursor: "pointer",
            "&:hover": {
              transition: "1s",
              fontSize: "12px",
              opacity: 1,
            },
          }}
        >
          Usinas: {allDevices.length}
          <SolarPower fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          sx={{
            display: "flex",

            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
          }}
        >
          Total produzido: {numbers(realGeneration, "KWh")}
          <Bolt fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          sx={{
            display: "flex",

            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
          }}
        >
          Total esperado: {numbers(estimatedGeneration, "KWh")}
          <Bolt fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          sx={{
            display: "flex",

            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
          }}
        >
          Desempenho: {percent}%
        </Typography>
        <Typography
          onClick={() => {
            handleChangeColumns(6);
          }}
          sx={{
            display: "flex",
            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
            cursor: "pointer",
            "&:hover": {
              transition: "1s",
              fontSize: "12px",
              opacity: 1,
            },
          }}
        >
          Online: {online.length}
          <Wifi fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          onClick={() => {
            handleChangeColumns(5);
          }}
          sx={{
            display: "flex",
            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
            cursor: "pointer",
            "&:hover": {
              transition: "1s",
              fontSize: "12px",
              opacity: 1,
            },
          }}
        >
          Offline: {offline.length}
          <SignalWifiOff fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          onClick={() => {
            handleChangeColumns(8);
          }}
          sx={{
            display: "flex",
            cursor: "pointer",
            "&:hover": {
              transition: "1s",
              fontSize: "12px",
              opacity: 1,
            },
            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
          }}
        >
          Inativo: {unactived.length}
          <Block fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          onClick={() => {
            handleChangeColumns(7);
          }}
          sx={{
            display: "flex",
            fontSize: "14px",
            cursor: "pointer",
            "&:hover": {
              transition: "1s",
              fontSize: "12px",
              opacity: 1,
            },
            fontWeight: "bold",
            opacity: 0.6,
          }}
        >
          Sem Inversor: {notDefined.length}
          <Block fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          onClick={() => {
            handleChangeColumns(4);
          }}
          sx={{
            display: "flex",
            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
            cursor: "pointer",
            "&:hover": {
              transition: "1s",
              fontSize: "12px",
              opacity: 1,
            },
          }}
        >
          Alertas: {alerts.length}
          <ReportProblem fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          onClick={() => {
            handleChangeColumns(2);
          }}
          sx={{
            display: "flex",
            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
            cursor: "pointer",
            "&:hover": {
              transition: "1s",
              fontSize: "12px",
              opacity: 1,
            },
          }}
        >
          Portais: {brands.length}
          <SolarPower fontSize="small" sx={{ ml: 2 }} />
        </Typography>
      </Box>
    </Card>
  );
};
