import {
  AttachMoney,
  Block,
  Bolt,
  Forest,
  Home,
  InsertDriveFile,
  SignalWifiOff,
  SolarPower,
  Wifi,
} from "@mui/icons-material";
import { Box, Avatar, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { numbers } from "src/helpers/utils";
import { MobileBigNumberDashboard } from "../mobile-test-dashboard/MobileBigNumbers";
import { useContext, useState } from "react";
import { MobileTestCustomIndicators } from "../mobile-test-custom-indicators/mobile-test-custom-indicators";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { DashboardContext } from "src/contexts/dashboard-context";

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
  type = "",
  usinsByState = [],
  handleChangeColumns = () => {},
  monthEconomyTotal = 10,
  treesSavedTotal = 0,
}) => {
  const { usersAPIData } = useContext(DashboardContext);
  const { reportsCounting = 0 } = useSelector((state) => state.users);
  const { genrealdaylasthourData = [] } = useSelector((state) => state.devices);
  const monthGeratcion = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const columns = [
    {
      name: "name",
      label: "Planta",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (data) => {
          return <p style={{ fontWeight: "bolder" }}>Planta</p>;
        },
      },
    },
  ];
  const options = {
    sortOrder: {
      name: "capacity",
      direction: "desc",
    },
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
    setRowProps: (row) => {
      if (row[7] < row[8] && row[7] != 0) {
        return {
          style: { background: "rgba(152, 251, 152, 0.2)" },
        };
      } else if (row[7] == 0) {
        return {
          style: { background: "rgba(255, 105, 97, 0.2)" },
        };
      } else {
        return {
          style: { background: "aliceblue" },
        };
      }
    },
  };

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        gap: 4,
      }}
    >
      <Box sx={{ width: "100%", mb: 1 }}>
        <Button
          component={Link}
          to={"/mobile-test"}
          variant="outlined"
          startIcon={<Home />}
        >
          Voltar
        </Button>
      </Box>
      <Box>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
      <Carousel
        sx={{
          width: "100vw",
          height: 400,
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
        }}
        navButtonsAlwaysInvisible={true}
        indicators={false}
        indicatorIconButtonProps={{
          style: {
            color: "#14B8A6",
          },
        }}
        index={currentPage}
        autoPlay={false}
      >
        <Box
          sx={{
            height: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            rowGap: 2,
            py: 4,
            mt: 8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
            lg={6}
          >
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
          </Box>
          <Box
            item
            lg={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <MobileBigNumberDashboard
              type={7}
              title="Economia do mês"
              btn={true}
              value={"R$45002"}
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
          </Box>
        </Box>
        <Box sx={{ px: 1 }}>
          <MUIDataTable
            options={options}
            data={usersAPIData.devices}
            columns={columns}
          />
        </Box>
      </Carousel>
      <MobileTestCustomIndicators
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};
