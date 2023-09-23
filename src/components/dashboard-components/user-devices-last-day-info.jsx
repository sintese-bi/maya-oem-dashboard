// bibliotecas

import moment from "moment";
import { Box, Grid, Typography } from "@mui/material";

//components

import { BigNumber, BigNumberDashboard } from "src/components/BigNumber";
import { LoadingSkeletonBigNumbers } from "src/components/Loading";

//icons

import { ElectricBolt } from "@mui/icons-material";

export const UserDivcesLastDayInfo = ({
  isLoading,
  realGeneration,
  estimatedGeneration,
  percent,
  label,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "80%",
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
          justifyContent: "space-between",
        }}
      >
        <Grid item sm={12} lg={3}>
          {isLoading ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title="Produzido (MWh)"
              value={`${realGeneration}MWh`}
              icon={<ElectricBolt />}
            />
          )}
        </Grid>
        <Grid item sm={12} lg={3}>
          {isLoading ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title="Esperado (MWh)"
              value={`${estimatedGeneration}MWh`}
              icon={<ElectricBolt />}
            />
          )}
        </Grid>
        <Grid item sm={12} lg={3}>
          {isLoading ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title="Desempenho (%)"
              value={`${percent}%`}
              icon={<ElectricBolt />}
            />
          )}
        </Grid>
      </Box>
    </Box>
  );
};
