import { FileCopy } from "@material-ui/icons";
import { Bolt, Percent } from "@mui/icons-material";
import { Avatar, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { BigNumberDashboard } from "src/components/shared/BigNumber";
import { numbers } from "src/helpers/utils";

export const BigNumbers = ({
  allDevices,
  notDefined,
  unactived,
  offline,
  capacityTotal,
  realGenerationValueDataDevices,
  handleChangeColumns,
}) => {
  const [perfomanceUsins, setPerfomanceUsins] = useState(0);

  useEffect(() => {
    setPerfomanceUsins(notDefined.length + unactived.length + offline.length);
  }, [notDefined, unactived, offline]);

  return (
    <Grid container columnSpacing={1} rowSpacing={1} sx={{ width: "100%" }}>
      <Grid item xs={6}>
        <BigNumberDashboard
          title="Relatórios gerados no mês"
          btn={true}
          value={`1/${allDevices.length}`}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <FileCopy />
            </Avatar>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <BigNumberDashboard
          title="Usinas em baixo desempenho no mês"
          type={9}
          handleChangeColumns={handleChangeColumns}
          value={perfomanceUsins}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <Percent />
            </Avatar>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <BigNumberDashboard
          title="Potência total instalada"
          btn={true}
          value={numbers(
            capacityTotal
              .reduce((total, element) => element + total, 0)
              .toFixed(2),
            "KWp"
          )}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <Bolt />
            </Avatar>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <BigNumberDashboard
          title="Geração total no mês"
          btn={true}
          value={numbers(realGenerationValueDataDevices.toFixed("2"), "KWh")}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <Bolt />
            </Avatar>
          }
        />
      </Grid>
    </Grid>
  );
};
