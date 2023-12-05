// bibliotecas

import { Avatar, Box } from "@mui/material";

//components

import { BigNumberDashboard } from "src/components/shared/BigNumber";

//icons

import {
  AccountCircle,
  BrandingWatermark,
  ElectricBolt,
  ThumbDownOffAlt,
  ThumbUpOffAlt,
  Warning,
} from "@mui/icons-material";
import { numbers } from "src/helpers/utils";

export const MyDevicesResume = ({
  realGeneration,
  estimatedGeneration,
  percent,
  type,
  handleChangeColumns,
  allDevices,
  brands,
  notDefined,
  unactived,
  online,
  offline,
  alerts,
}) => {
  return (
    <Box>
      {/*<Box
        sx={{
          display: "flex",
          width: "84%",
          my: 4,
        }}
      >
        <Typography variant="h4">Resumo de usinas</Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: "100%", py: 2, fontWeight: "bold", ml: 2 }}
        >
          {moment().format("DD/MM/YYYY")}
        </Typography>
      </Box>
      */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <BigNumberDashboard
          title="Usinas"
          value={allDevices.length !== 0 ? allDevices.length : 0}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <AccountCircle />
            </Avatar>
          }
          type={1}
          activeBtn={type === 1 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
        <BigNumberDashboard
          title="Portal de inversor"
          value={brands.length !== 0 ? brands.length : 0}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <BrandingWatermark />
            </Avatar>
          }
          type={2}
          activeBtn={type === 2 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
        {/*<BigNumberDashboard
          title="Capacidade total Usinas"
          value={`${capacityTotal}MWp`}
          icon={<AlignVerticalTop />}
          type={3}
          activeBtn={type === 3 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
      />*/}
        <BigNumberDashboard
          title="Online"
          value={online.length !== 0 ? online.length : 0}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <ThumbUpOffAlt />
            </Avatar>
          }
          type={6}
          activeBtn={type === 6 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
        {/*<BigNumberDashboard
          title="Inativo"
          value={unactived.length !== 0 ? unactived.length : 0}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <ThumbUpOffAlt />
            </Avatar>
          }
          type={6}
          activeBtn={type === 6 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
        */}
        <BigNumberDashboard
          title="Offline"
          value={offline.length !== 0 ? offline.length : 0}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <ThumbDownOffAlt />
            </Avatar>
          }
          type={5}
          activeBtn={type === 5 ? true : false}
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
          title="Produzido hoje"
          btn={true}
          value={numbers(realGeneration, "KWh")}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 0,
                width: 0,
              }}
            >
              <ElectricBolt />
            </Avatar>
          }
          type={0}
          activeBtn={false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
        {/*
        <BigNumberDashboard
          title="Não informado"
          value={notDefined.length !== 0 ? notDefined.length : 0}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <ThumbUpOffAlt />
            </Avatar>
          }
          type={6}
          activeBtn={type === 6 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
        */}
        <BigNumberDashboard
          title="Esperado hoje"
          btn={true}
          value={numbers(estimatedGeneration, "KWh")}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 0,
                width: 0,
              }}
            >
              <ElectricBolt />
            </Avatar>
          }
          type={0}
          activeBtn={false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />

        <BigNumberDashboard
          title="Desempenho(%) hoje"
          btn={true}
          value={percent}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <ElectricBolt />
            </Avatar>
          }
          type={0}
          activeBtn={false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
        <BigNumberDashboard
          title="Usinas em Alerta"
          value={alerts.length !== 0 ? alerts.length : 0}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <Warning />
            </Avatar>
          }
          type={4}
          activeBtn={type === 4 ? true : false}
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
        {/* <BigNumberDashboard
          title="Economia de carbono emitido"
          value={`${emittedCarbon} CO₂`}
          icon={<AlignVerticalTop />}
          type={3}
          activeBtn={type === 3 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
      */}
      </Box>
    </Box>
  );
};
