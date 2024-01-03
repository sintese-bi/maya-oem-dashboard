//Bibliotecas

import moment from "moment";
import { Box, Typography, Card } from "@mui/material";

// formatação de números

import { meses } from "src/helpers/months";
import { numbers } from "src/helpers/utils";

export const TotalMonthInfo = ({
  useName,
  realGenerationFiltered,
  estimatedGenerationFiltered,
  percentGenerationFiltered,
  label,
  startDate,
  endDate,
}) => {
  function handleMonth() {
    let isDifferent =
      moment(startDate).format("M") != moment(endDate).format("M")
        ? true
        : false;

    let month = isDifferent
      ? `${meses[moment(startDate).format("M")]} até  ${
          meses[moment(endDate).format("M")]
        }`
      : meses[moment(startDate).format("M")];

    return month;
  }

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
        <Typography variant="h4">{`Total produzido em ${handleMonth()}`}</Typography>
      </Box>
      <Typography sx={{ my: 2 }}>
        {`Prezado ${useName} sua produtivade este período é ${numbers(
          realGenerationFiltered,
          "KWh"
        )}`}
      </Typography>
      <Card sx={{ p: 4 }}>
        <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
          {`Para este período suas usinas devem produzir ${numbers(
            estimatedGenerationFiltered,
            "KWh"
          )}, 
            no momento você produziu ${numbers(realGenerationFiltered, "KWh")}.
            Isto corresponde a um desempenho de ${percentGenerationFiltered}% `}
        </Typography>
      </Card>
    </Box>
  );
};
