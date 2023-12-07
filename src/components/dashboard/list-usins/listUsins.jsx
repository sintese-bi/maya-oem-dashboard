import { Card } from "@mui/material";
import Plants from "../total-month/total-month-components/total-month-devices";

export const ListUsins = ({ data, devicesTableRef, type }) => {
  return (
    <Card sx={{ p: 1, width: "100%" }}>
      <Plants
        title={"Listagem de usinas"}
        data={data}
        devicesTableRef={devicesTableRef}
        type={type}
      />
    </Card>
  );
};
