import { FileCopy } from "@material-ui/icons";
import {
  AttachMoney,
  AttachMoneyOutlined,
  Bolt,
  Forest,
  Percent,
} from "@mui/icons-material";
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
  monthEconomy,
  treesSaved,
}) => {
  const [perfomanceUsins, setPerfomanceUsins] = useState(0);

  useEffect(() => {
    setPerfomanceUsins(notDefined.length + unactived.length + offline.length);
  }, [notDefined, unactived, offline]);

  return (
    <Grid container spacing={1} sx={{ width: "100%" }}>
      <Grid item xs={6} sx={{ width: "90%" }}>
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
      <Grid item xs={6} sx={{ width: "90%" }}>
        <BigNumberDashboard
          title="Economia no mês"
          btn={true}
          type={9}
          handleChangeColumns={handleChangeColumns}
          value={numbers(monthEconomy, "R$")}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <AttachMoneyOutlined />
            </Avatar>
          }
        />
      </Grid>
      <Grid item xs={6} sx={{ width: "90%" }}>
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
      <Grid item xs={6} sx={{ width: "90%" }}>
        <BigNumberDashboard
          title="Árvores salvas no mês"
          btn={true}
          value={treesSaved}
          icon={
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <Forest />
            </Avatar>
          }
        />
      </Grid>
    </Grid>
  );
};
