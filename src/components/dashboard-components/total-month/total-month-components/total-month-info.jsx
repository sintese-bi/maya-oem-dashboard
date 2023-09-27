//Bibliotecas

import moment from "moment";
import { Box, Typography, Card } from "@mui/material";

// formatação de números

import { numbers } from "src/helpers/utils";
import { meses } from "src/helpers/months";

export const TotalMonthInfo = ({
  useName,
  realGenerationTotal,
  estimatedGenerationTotal,
  percentTotal,
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
        my: 2,
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
        <Typography variant="h4">{`Total produzido em ${
          meses[moment().format("M")]
        }`}</Typography>
      </Box>
      <Typography sx={{ my: 2 }}>
        {`Prezado ${useName} sua produtivade este mês é ${numbers(
          realGenerationTotal
        )}GWh`}
      </Typography>
      <Card sx={{ p: 4 }}>
        <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
          {`Para este mês suas usinas devem produzir ${numbers(
            estimatedGenerationTotal
          )}GWh, 
            no momento você produziu ${numbers(realGenerationTotal)}GWh.
            Isto corresponde a um desempenho de ${percentTotal}% `}
        </Typography>
      </Card>
    </Box>
  );
};
