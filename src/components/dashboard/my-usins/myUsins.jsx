import {
  AttachMoney,
  Block,
  Bolt,
  FileCopy,
  Forest,
  InsertDriveFile,
  Money,
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

export const MyUsins = ({
  realGenerationLastDay,
  estimatedGenerationLastDay,
  percentLastDay,
  allDevices,
  brands,
  notDefined,
  unactived,
  online,
  offline,
  alerts,
  type,
  usinsByState,
  handleChangeColumns,
  monthEconomyTotal,
  treesSavedTotal,
}) => {
  const { reportsCounting } = useSelector((state) => state.users);

  return (
    <Grid container columns={{ xs: 12, sm: 12, md: 12, lg: 12 }} spacing={2}>
      <Grid item xs={4} sx={{ width: "100%" }}>
        <BigNumberDashboard
          type={1}
          title="Usinas"
          btn={false}
          value={allDevices.length}
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
      <Grid item xs={4} sx={{ width: "100%" }}>
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
      <Grid item xs={4} sx={{ width: "90%" }}>
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

      <Grid item xs={4} sx={{ width: "90%" }}>
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
      <Grid item xs={4} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={8}
          title="Inativo"
          btn={false}
          value={unactived.length}
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
      <Grid item xs={4} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={7}
          title="Sem inversor"
          btn={false}
          value={notDefined.length}
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
      <Grid item xs={4} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={7}
          title="Sem inversor"
          btn={false}
          value={`${reportsCounting}/${allDevices.length}`}
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
      <Grid item xs={4} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={7}
          title="Árvores salvas"
          btn={false}
          value={treesSavedTotal}
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
      <Grid item xs={4} sx={{ width: "90%" }}>
        <BigNumberDashboard
          type={7}
          title="Economia do mês"
          btn={false}
          value={numbers(monthEconomyTotal)}
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
    </Grid>
  );
};
