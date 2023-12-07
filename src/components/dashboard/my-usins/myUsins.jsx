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
}) => {
  return (
    <Card sx={{ width: 382, p: 2, height: 364 }}>
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
          sx={{
            display: "flex",

            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
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
          Total esperado: {numbers(realGeneration, "KWh")}
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
          sx={{
            display: "flex",

            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
          }}
        >
          Online: {online.length}
          <Wifi fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          sx={{
            display: "flex",

            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
          }}
        >
          Offline: {offline.length}
          <SignalWifiOff fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          sx={{
            display: "flex",

            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
          }}
        >
          Inativo: {unactived.length}
          <Block fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          sx={{
            display: "flex",

            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
          }}
        >
          Sem Inversor: {notDefined.length}
          <Block fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          sx={{
            display: "flex",

            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
          }}
        >
          Alertas: {alerts.length}
          <ReportProblem fontSize="small" sx={{ ml: 2 }} />
        </Typography>
        <Typography
          sx={{
            display: "flex",

            fontSize: "14px",
            fontWeight: "bold",
            opacity: 0.6,
          }}
        >
          Portais: {brands.length}
          <SolarPower fontSize="small" sx={{ ml: 2 }} />
        </Typography>
      </Box>
    </Card>
  );
};
