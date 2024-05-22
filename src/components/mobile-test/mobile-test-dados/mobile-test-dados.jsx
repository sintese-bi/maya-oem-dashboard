import {
  AttachMoney,
  Block,
  Bolt,
  Forest,
  InsertDriveFile,
  SignalWifiOff,
  SolarPower,
  Wifi,
} from "@mui/icons-material";
import { Grid, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { numbers } from "src/helpers/utils";
import { MobileBigNumberDashboard } from "../mobile-test-dashboard/MobileBigNumbers";

export const MobileTestDados = ({
  realGenerationLastDay = 0,
  estimatedGenerationLastDay = 0,
  percentLastDay = 0,
  allDevices = [],
  devices = [],
  brands = [],
  notDefined = [],
  unactived = [],
  online = [],
  offline = [],
  capacityTotal = 0,
  alerts = 0,
  type = '',
  usinsByState = [],
  handleChangeColumns = () => {},
  monthEconomyTotal = 10,
  treesSavedTotal = 0,
}) => {
  const { reportsCounting = 0 } = useSelector((state) => state.users);
  const { genrealdaylasthourData = [] } = useSelector((state) => state.devices);
  const monthGeratcion = 3;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <MobileBigNumberDashboard
          type={1}
          title="Usinas"
          btn={false}
          value={devices.length || 0}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 50,
                width: 50,
              }}
            >
              <SolarPower />
            </Avatar>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <MobileBigNumberDashboard
          type={2}
          title="Portais"
          btn={false}
          value={brands.length || 0}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 50,
                width: 50,
              }}
            ></Avatar>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <MobileBigNumberDashboard
          type={6}
          title="Online"
          btn={false}
          value={online.length || 0}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 50,
                width: 50,
              }}
            >
              <Wifi />
            </Avatar>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <MobileBigNumberDashboard
          type={5}
          title="Offline"
          btn={false}
          value={offline.length || 0}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 50,
                width: 50,
              }}
            >
              <SignalWifiOff />
            </Avatar>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <MobileBigNumberDashboard
          type={8}
          title="Inativo"
          btn={false}
          value={unactived.length || 0}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 50,
                width: 50,
              }}
            >
              <Block />
            </Avatar>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <MobileBigNumberDashboard
          type={7}
          title="Sem inversor"
          btn={false}
          value={notDefined.length || 0}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 50,
                width: 50,
              }}
            >
              <Block />
            </Avatar>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <MobileBigNumberDashboard
          type={7}
          title="Relatórios"
          btn={true}
          value={`${reportsCounting || 0}/${devices.length || 0}`}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 50,
                width: 50,
              }}
            >
              <InsertDriveFile />
            </Avatar>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <MobileBigNumberDashboard
          type={7}
          title="Árvores salvas"
          btn={true}
          value={"10"}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 50,
                width: 50,
              }}
            >
              <Forest />
            </Avatar>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <MobileBigNumberDashboard
          type={10}
          title="Plantas em alerta"
          btn={false}
          value={genrealdaylasthourData.length || 0}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 50,
                width: 50,
              }}
            >
              <Bolt />
            </Avatar>
          }
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <MobileBigNumberDashboard
          type={7}
          title="Potência todas as usinas"
          btn={true}
          value={"4 KWp"}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 50,
                width: 50,
              }}
            >
              <Bolt />
            </Avatar>
          }
        />
      </Grid>
      <Grid item lg={6}   xs={12}>
        <MobileBigNumberDashboard
          type={7}
          title="Economia do mês"
          btn={true}
          value={("R$45002")}
          handleChangeColumns={handleChangeColumns}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 50,
                width: 50,
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
