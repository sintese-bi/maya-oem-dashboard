import {
  Block,
  Bolt,
  ReportProblem,
  SignalWifiOff,
  SolarPower,
  Wifi,
} from "@mui/icons-material";
import { Card, Typography, Box } from "@mui/material";
import { PieChartMyUsins } from "src/components/shared/Charts";
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
    <Card
      sx={{
        width: "100%",
        py: 4,
        px: 4,

        display: "flex",

        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            Minhas usinas hoje
          </Typography>
          <Typography
            onClick={() => {
              handleChangeColumns(1);
            }}
            sx={{
              display: "flex",
              fontSize: "16px",
              fontWeight: "bold",
              opacity: 0.6,
              cursor: "pointer",
              "&:hover": {
                transition: "1s",
                fontSize: "14px",
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

              fontSize: "16px",
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

              fontSize: "16px",
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

              fontSize: "16px",
              fontWeight: "bold",
              opacity: 0.6,
            }}
          >
            Desempenho: {percent}%
          </Typography>

          <Typography
            onClick={() => {
              handleChangeColumns(2);
            }}
            sx={{
              display: "flex",
              fontSize: "16px",
              fontWeight: "bold",
              opacity: 0.6,
              cursor: "pointer",
              "&:hover": {
                transition: "1s",
                fontSize: "14px",
                opacity: 1,
              },
            }}
          >
            Portais: {brands.length}
            <SolarPower fontSize="small" sx={{ ml: 2 }} />
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            Minhas usinas hoje
          </Typography>
          <Typography
            onClick={() => {
              handleChangeColumns(6);
            }}
            sx={{
              display: "flex",
              fontSize: "16px",
              fontWeight: "bold",
              opacity: 0.6,
              cursor: "pointer",
              "&:hover": {
                transition: "1s",
                fontSize: "14px",
                opacity: 1,
              },
            }}
          >
            Online: {online.length}
            <Wifi
              fontSize="small"
              sx={{ ml: 2, color: "rgba(54, 162, 235, 1)" }}
            />
          </Typography>
          <Typography
            onClick={() => {
              handleChangeColumns(5);
            }}
            sx={{
              display: "flex",
              fontSize: "16px",
              fontWeight: "bold",
              opacity: 0.6,
              cursor: "pointer",
              "&:hover": {
                transition: "1s",
                fontSize: "14px",
                opacity: 1,
              },
            }}
          >
            Offline: {offline.length}
            <SignalWifiOff
              fontSize="small"
              sx={{ ml: 2, color: "rgba(255, 99, 132, 1)" }}
            />
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
                fontSize: "14px",
                opacity: 1,
              },
              fontSize: "16px",
              fontWeight: "bold",
              opacity: 0.6,
            }}
          >
            Inativo: {unactived.length}
            <Block
              fontSize="small"
              sx={{ ml: 2, color: "rgba(75, 192, 192, 1)" }}
            />
          </Typography>
          <Typography
            onClick={() => {
              handleChangeColumns(7);
            }}
            sx={{
              display: "flex",
              fontSize: "16px",
              cursor: "pointer",
              "&:hover": {
                transition: "1s",
                fontSize: "14px",
                opacity: 1,
              },
              fontWeight: "bold",
              opacity: 0.6,
            }}
          >
            Sem Inversor: {notDefined.length}
            <Block
              fontSize="small"
              sx={{ ml: 2, color: "rgba(255, 206, 86, 1)" }}
            />
          </Typography>
          <Typography
            onClick={() => {
              handleChangeColumns(4);
            }}
            sx={{
              display: "flex",
              fontSize: "16px",
              fontWeight: "bold",
              opacity: 0.6,
              cursor: "pointer",
              "&:hover": {
                transition: "1s",
                fontSize: "14px",
                opacity: 1,
              },
            }}
          >
            Alertas: {alerts.length}
            <ReportProblem fontSize="small" sx={{ ml: 2 }} />
          </Typography>
        </Box>
      </Box>

      {/*<PieChartMyUsins
        notDefined={notDefined}
        unactived={unactived}
        online={online}
        offline={offline}
          />*/}
    </Card>
  );
};
