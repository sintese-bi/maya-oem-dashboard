import { LocationOn } from "@mui/icons-material";
import { Card, Typography } from "@mui/material";

export const LocationUsins = () => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        p: 1,
        height: 364,
      }}
    >
      <LocationOn />
      <Typography sx={{ fontSize: "10px" }}>
        Mapeamento de usinas disponível em breve
      </Typography>
    </Card>
  );
};
