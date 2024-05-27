import {
  AttachMoney,
  Block,
  Bolt,
  FileCopy,
  Forest,
  InsertDriveFile,
  Money,
  Percent,
  ReportProblem,
  SignalWifiOff,
  SolarPower,
  Wifi,
} from "@mui/icons-material";
import { Card, Typography, Box, Grid, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { BigNumberDashboard } from "src/components/shared/BigNumber";
import { ChartUsinsBystate } from "src/components/shared/Charts";
import { numbers } from "src/helpers/utils";
import { number } from "yup";

export const MyUsins = ({
  realGenerationTotal,
  estimatedGenerationTotal,
  devices,
  brands,
  notDefined,
  unactived,
  online,
  offline,
  capacityTotal,
  handleChangeColumns,
  monthEconomyTotal,
  treesSavedTotal,
  percentageTotal,
}) => {
  const { reportsCounting } = useSelector((state) => state.users);
  const { genrealdaylasthourData } = useSelector((state) => state.devices);

  return (
    <Grid container columns={{ xs: 12, sm: 12, md: 12, lg: 12 }} spacing={2}>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ width: "100%" }}>
        <BigNumberDashboard
          type={1}
          title="Usinas"
          btn={false}
          value={devices.length}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <SolarPower />
            </Avatar>
          }
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ width: "100%" }}>
        <BigNumberDashboard
          type={2}
          title="Portais"
          btn={false}
          value={brands.length}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            ></Avatar>
          }
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={6}
          title="Online"
          btn={false}
          value={online.length}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <Wifi />
            </Avatar>
          }
        />
      </Grid>

      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={5}
          title="Offline"
          btn={false}
          value={offline.length}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <SignalWifiOff />
            </Avatar>
          }
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={8}
          title="Geração real total"
          btn={true}
          value={numbers(realGenerationTotal, "KWh")}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <Block />
            </Avatar>
          }
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={7}
          title="Geração estimada total"
          btn={true}
          value={numbers(estimatedGenerationTotal, "KWh")}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <Block />
            </Avatar>
          }
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={7}
          title="Relatórios"
          btn={true}
          value={`${reportsCounting}/${devices.length}`}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <InsertDriveFile />
            </Avatar>
          }
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={7}
          title="Árvores salvas"
          btn={true}
          value={numbers(treesSavedTotal)}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <Forest />
            </Avatar>
          }
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={7}
          title="Economia do mês"
          btn={true}
          value={numbers(monthEconomyTotal, "R$")}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <AttachMoney />
            </Avatar>
          }
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={7}
          title="Potência todas as usinas"
          btn={true}
          value={numbers(capacityTotal, "KWp")}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <AttachMoney />
            </Avatar>
          }
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={10}
          title="Desempenho"
          btn={true}
          value={percentageTotal}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <Percent />
            </Avatar>
          }
        />
      </Grid>
    </Grid>
  );
};
