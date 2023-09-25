// bibliotecas

import { Box, Typography } from "@mui/material";
import moment from "moment";

//components

import { BigNumberDashboard } from "src/components/BigNumber";

//icons

import {
  BrandingWatermark,
  AccountCircle,
  AlignVerticalTop,
  Warning,
  ThumbUpOffAlt,
  ThumbDownOffAlt,
  ElectricBolt,
} from "@mui/icons-material";
import { numbers } from "src/helpers/utils";

export const UserDevicesResume = ({
  label,
  realGeneration,
  estimatedGeneration,
  percent,
  type,
  handleChangeColumns,
  dataDevices,
  brands,
  capacityTotal,
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
          value={dataDevices.length !== 0 ? dataDevices.length : 0}
          icon={<AccountCircle />}
          type={1}
          activeBtn={type === 1 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
        <BigNumberDashboard
          title="Portal de inversor"
          value={brands.length !== 0 ? brands.length : 0}
          icon={<BrandingWatermark />}
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
          icon={<ThumbUpOffAlt />}
          type={6}
          activeBtn={type === 6 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
        <BigNumberDashboard
          title="Offline"
          value={offline.length !== 0 ? offline.length : 0}
          icon={<ThumbDownOffAlt />}
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
          title="Produzido (MWh)"
          value={numbers(realGeneration)}
          icon={<ElectricBolt />}
          type={1}
          activeBtn={type === 1 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />

        <BigNumberDashboard
          title="Esperado (MWh)"
          value={numbers(estimatedGeneration)}
          icon={<ElectricBolt />}
          type={1}
          activeBtn={type === 1 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />

        <BigNumberDashboard
          title="Desempenho (%)"
          value={percent}
          icon={<ElectricBolt />}
          type={1}
          activeBtn={type === 1 ? true : false}
          handleChangeColumns={(type) => handleChangeColumns(type)}
        />
        <BigNumberDashboard
          title="Usinas em Alerta"
          value={alerts.length !== 0 ? alerts.length : 0}
          icon={<Warning />}
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
