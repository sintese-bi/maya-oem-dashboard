import { useEffect, useState } from "react";
import { BigNumber } from "../shared/BigNumber";
import { LoadingSkeletonBigNumbers } from "../Loading";
import { numbers } from "src/helpers/utils";
import { Box, Grid, Typography, MenuItem, TextField } from "@mui/material";
import { ChartsLinear } from "src/components/shared/Charts";

import {
  Bolt,
  OfflineBolt,
  Thermostat,
  ElectricBolt,
} from "@mui/icons-material";
import moment from "moment";

export const GenerationBI = ({
  startDate,
  endDate,
  optionFilter,
  generation,
  isLoading,
  isLoadingDevices,
  temperature,
  deviceInfo,
  graphRef,
  setOptionFilter,
}) => {
  const [totalRealGeneration, setTotalRealGeneration] = useState();
  const [totalEstimatedGeneration, setTotalEstimatedGeneration] = useState();
  const [deviceIsProductive, setDeviceIsProductive] = useState(false);
  const [productivePercent, setProductivePercent] = useState(0);
  const [topAndLowValue, setTopAndLowValue] = useState({
    topValue: { value: "", date: "" },
    lowValue: { value: "", date: "" },
  });
  const [topValueDate, lowValueDate] = useState();

  useEffect(() => {
    setTotalRealGeneration(
      generation?.realGeneration
        ?.reduce((total, element) => total + Number(element?.value), 0)
        ?.toFixed("2")
    );
    setTotalEstimatedGeneration(
      generation?.estimatedGeneration
        ?.reduce((total, element) => total + element, 0)
        ?.toFixed("2")
    );
    if ((totalRealGeneration / totalEstimatedGeneration) * 100 >= 80) {
      setDeviceIsProductive(true);
    }

    let realGenerationTempArray = generation?.realGeneration?.filter(
      (data) => data.value != 0
    );
    let realGenerationFinalArray = realGenerationTempArray
      ?.sort((a, b) => Number(a.value) - Number(b.value))
      ?.map((data) => {
        return {
          ...data,
          value: numbers(data.value, "KWh"),
          date: moment(data.date).format("DD/MM/YYYY"),
        };
      });

    setTopAndLowValue({
      topValue: realGenerationFinalArray?.pop(),
      lowValue: realGenerationFinalArray?.shift(),
    });
  }, [generation]);

  useEffect(() => {
    setProductivePercent(
      ((totalRealGeneration / totalEstimatedGeneration) * 100).toFixed("")
    );
  }, [totalRealGeneration, totalEstimatedGeneration]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 4,

        width: "100%",
      }}
    >
      <Typography variant="h4" sx={{ mb: 6 }}>
        Informações do dia
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {isLoadingDevices ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title={`Melhor dia - ${topAndLowValue?.topValue?.date || ""}`}
              value={`${topAndLowValue?.topValue?.value || 0}`}
              icon={<Bolt />}
            />
          )}
        </Grid>
        <Grid item xs={3}>
          {isLoadingDevices ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title={`Pior dia - ${topAndLowValue?.lowValue?.date || ""}`}
              value={`${topAndLowValue?.lowValue?.value || 0}`}
              icon={<Bolt />}
            />
          )}
        </Grid>
        <Grid item xs={3}>
          {isLoadingDevices ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title="Geração Estimada do dia"
              value={`${
                deviceInfo?.generation?.gen_estimated
                  ? numbers(
                      deviceInfo?.generation?.gen_estimated.toFixed("2"),
                      "KWh"
                    )
                  : "-"
              }`}
              icon={<Bolt />}
            />
          )}
        </Grid>
        <Grid item xs={3}>
          {isLoadingDevices ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title="Geração Real do dia"
              value={`${
                deviceInfo?.generation?.gen_real
                  ? numbers(
                      deviceInfo?.generation?.gen_real.toFixed("2"),
                      "KWh"
                    )
                  : "-"
              }`}
              icon={<ElectricBolt />}
            />
          )}
        </Grid>
        <Grid item xs={3}>
          {isLoadingDevices ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title="Geração percentual"
              value={`${
                deviceInfo?.generation?.gen_real
                  ? parseFloat(
                      (deviceInfo?.generation.gen_real /
                        deviceInfo?.generation.gen_estimated) *
                        100
                    ).toFixed(2)
                  : 0
              } %`}
              icon={<OfflineBolt />}
            />
          )}
        </Grid>
        <Grid item xs={3}>
          {isLoadingDevices ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title="Temperatura"
              value={temperature ? `${temperature}°` : "-"}
              icon={<Thermostat />}
            />
          )}
        </Grid>
      </Grid>
      <Typography variant="h4" sx={{ mb: 6, mt: 16 }}>
        Informações do período
      </Typography>
      <Box sx={{ bgcolor: "background.paper", p: 4, boxShadow: 3 }}>
        <Typography sx={{ fontSize: "20px", mb: 6, fontWeight: "600" }}>
          {isLoading
            ? ""
            : deviceIsProductive
            ? `
							${
                productivePercent > 100 ? "Parabéns!" : ""
              }A produção da sua usina esta dentro do esperado.
							Sua produtividade no período escolhido é de ${numbers(
                String(totalRealGeneration),
                "KWh"
              )}Mwh, o que corresponde a ${productivePercent}% da produção estimada.
						`
            : `
							Sua usina não está produzindo conforme esperado, fique atento aos próximos dias de monitoramento e observe a produção da sua
							usina.
							Sua produtividade no período escolhido é de ${numbers(
                String(totalRealGeneration),
                "KWh"
              )}Mwh o que corresponde a ${productivePercent}% da produção estimada.
						`}
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
            mb: 18,
          }}
        >
          <Grid item xs={4}>
            {isLoading ? (
              <LoadingSkeletonBigNumbers />
            ) : (
              <BigNumber
                title="Geração Total Real"
                value={`${
                  generation.realGeneration
                    ? numbers(
                        generation.realGeneration
                          .reduce(
                            (total, element) => total + Number(element.value),
                            0
                          )
                          .toFixed(2),
                        "KWh"
                      )
                    : "-"
                }`}
                icon={<Bolt />}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            {isLoading ? (
              <LoadingSkeletonBigNumbers />
            ) : (
              <BigNumber
                title="Geração Total Estimada"
                value={`${
                  generation.estimatedGeneration
                    ? numbers(
                        generation.estimatedGeneration
                          .reduce((total, element) => total + element, 0)
                          .toFixed(2),
                        "KWh"
                      )
                    : "-"
                }`}
                icon={<Bolt />}
              />
            )}
          </Grid>
        </Box>
        <TextField
          sx={{
            width: 200,
            backgroundColor: "transparent",
            ml: 1,
          }}
          label="Filtrar período do gráfico por"
          select
          defaultValue="days"
          variant="standard"
          onChange={(e) => setOptionFilter(e.target.value)}
        >
          <MenuItem value="days">Dias</MenuItem>
          <MenuItem value="weeks">Semanas</MenuItem>
          <MenuItem value="biweek">Quinzena</MenuItem>
          <MenuItem value="months">Mês</MenuItem>
        </TextField>
        <ChartsLinear
          startDate={startDate}
          endDate={endDate}
          optionFilter={optionFilter}
          generation={generation}
          isLoading={isLoading}
          graphRef={graphRef}
        />
      </Box>
    </Box>
  );
};
