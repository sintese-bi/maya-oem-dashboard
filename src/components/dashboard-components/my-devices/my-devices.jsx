// bibliotecas

import moment from "moment";
import { Box, Typography } from "@mui/material";

//components

import { BigNumber, BigNumberDashboard } from "src/components/shared/BigNumber";
import { LoadingSkeletonBigNumbers } from "src/components/Loading";

//icons

import { MyDevicesResume } from "./my-devices-components/my-devices-resume";

export const MyDevices = ({
  isLoadingGraph,
  realGeneration,
  estimatedGeneration,
  realGenerationValueDataDevices,
  estimatedGenerationValueDataDevices,
  percent,
  label,
  type,
  handleChangeColumns,
  dataDevices,
  allDevices,
  brands,
  capacityTotal,
  online,
  offline,
  alerts,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        mt: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          my: 2,
        }}
      >
        <Typography variant="h4">Minhas usinas</Typography>
        <Typography
          sx={{
            lineHeight: "100%",
            py: 2,
            fontWeight: "bold",
            ml: 2,
            fontSize: "20px",
          }}
        >
          Hoje, {moment().format("DD/MM/YYYY")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          p: 4,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <MyDevicesResume
          label={"Resumo de usinas"}
          realGeneration={realGeneration}
          estimatedGeneration={estimatedGeneration}
          realGenerationValueDataDevices={realGenerationValueDataDevices}
          estimatedGenerationValueDataDevices={
            estimatedGenerationValueDataDevices
          }
          percent={percent}
          type={type}
          handleChangeColumns={handleChangeColumns}
          dataDevices={dataDevices}
          allDevices={allDevices}
          brands={brands}
          capacityTotal={capacityTotal}
          online={online}
          offline={offline}
          alerts={alerts}
        />
      </Box>
    </Box>
  );
};
