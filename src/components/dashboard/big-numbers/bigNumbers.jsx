import { FileCopy } from "@material-ui/icons";
import { Bolt, Percent } from "@mui/icons-material";
import { Avatar, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { BigNumberDashboard } from "src/components/shared/BigNumber";
import { numbers } from "src/helpers/utils";

export const BigNumbers = ({
  notDefined,
  unactived,
  offline,
  capacityTotal,
  realGenerationValueDataDevices,
}) => {
  const [perfomanceUsins, setPerfomanceUsins] = useState(0);

  useEffect(() => {
    setPerfomanceUsins(notDefined.length + unactived.length + offline.length);
  }, [notDefined, unactived, offline]);

  return (
    <Grid container columnSpacing={1} rowSpacing={1} sx={{ width: "100%" }}>
      <Grid item xs={4}>
        <BigNumberDashboard
          title="Relatórios"
          value={10}
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
      <Grid item xs={4}>
        <BigNumberDashboard
          title="Desempenho de usinas"
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
      <Grid item xs={4}>
        <BigNumberDashboard
          title="Potência Instalada"
          value={capacityTotal}
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
      <Grid item xs={4}>
        <BigNumberDashboard
          title="Produção real"
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
