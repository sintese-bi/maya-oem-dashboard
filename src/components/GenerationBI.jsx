import { useEffect, useState } from "react";
import { BigNumber } from "./BigNumber";
import { LoadingSkeletonBigNumbers } from "./Loading";
import { numbers } from "src/helpers/utils";
import { Box, Grid, Typography } from "@mui/material";
import { ChartsLinear } from "src/components/Charts";

import {
  Bolt,
  OfflineBolt,
  Thermostat,
  ElectricBolt,
} from "@mui/icons-material";

export const GenerationBI = ({
  startDate,
  endDate,
  optionFilter,
  generation,
  isLoading,
  isLoadingDevices,
  temperature,
  deviceInfo,
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
    if (totalRealGeneration > totalEstimatedGeneration) {
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
          value: numbers(data.value),
        };
      });

    setTopAndLowValue({
      topValue: realGenerationFinalArray?.pop(),
      lowValue: realGenerationFinalArray?.shift(),
    });
  }, [generation]);

  useEffect(() => {
    console.log(totalRealGeneration, totalEstimatedGeneration, generation);
    setProductivePercent(
      ((totalRealGeneration / totalEstimatedGeneration) * 100).toFixed("")
    );
  }, [totalRealGeneration, totalEstimatedGeneration]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {isLoadingDevices ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title={`Melhor dia - ${topAndLowValue?.topValue?.date || ""}`}
              value={`${topAndLowValue?.topValue?.value || 0}Kwh`}
              icon={<Bolt />}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          {isLoadingDevices ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title={`Pior dia - ${topAndLowValue?.lowValue?.date || ""}`}
              value={`${topAndLowValue?.lowValue?.value || 0}Kwh`}
              icon={<Bolt />}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          {isLoadingDevices ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title="Geração Estimada"
              value={`${
                deviceInfo?.generation?.gen_estimated
                  ? numbers(
                      deviceInfo?.generation?.gen_estimated.toFixed("2")
                    ) + "Kwh"
                  : "-"
              }`}
              icon={<Bolt />}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          {isLoadingDevices ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title="Geração Real"
              value={`${
                deviceInfo?.generation?.gen_real
                  ? numbers(deviceInfo?.generation?.gen_real.toFixed("2")) +
                    "Kwh"
                  : "-"
              }`}
              icon={<ElectricBolt />}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          {isLoadingDevices ? (
            <LoadingSkeletonBigNumbers />
          ) : (
            <BigNumber
              title="Geração percentual"
              value={`${
                deviceInfo?.generation?.gen_real
                  ? numbers(
                      parseFloat(
                        (deviceInfo?.generation.gen_real /
                          deviceInfo?.generation.gen_estimated) *
                          100
                      ).toFixed(2)
                    )
                  : 0
              } %`}
              icon={<OfflineBolt />}
            />
          )}
        </Grid>
        <Grid item xs={4}>
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
      <Box sx={{ mt: 16, bgcolor: "background.paper", p: 4, boxShadow: 3 }}>
        <Typography sx={{ fontSize: "20px", mb: 6, fontWeight: "600" }}>
          {isLoading
            ? ""
            : deviceIsProductive
            ? `
							Parabéns! A produção da sua usina esta dentro do esperado.
							Sua produtividade no período escolhido é de ${numbers(
                (totalRealGeneration / 1000).toFixed(2)
              )}Mwh, o que corresponde a ${productivePercent}% da produção estimada.
						`
            : `
							Sua usina não está produzindo conforme esperado, fique atento aos próximos dias de monitoramento e observe a produção da sua
							usina.
							Sua produtividade no período escolhido é de ${numbers(
                (totalRealGeneration / 1000).toFixed(2)
              )}Mwh o que corresponde a ${productivePercent}% da produção estimada.
						`}
        </Typography>
        <ChartsLinear
          startDate={startDate}
          endDate={endDate}
          optionFilter={optionFilter}
          generation={generation}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};
