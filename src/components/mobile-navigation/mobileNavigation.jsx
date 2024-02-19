import { Close } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";

export const MobileNavigation = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        position: "absolute",
        top: 0,
        display: "flex",
        justifyContent: "space-around",
        p: 6,
        bgcolor: "background.paper",
        zIndex: 10,
        boxShadow: "1px 5px 25px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bgcolor: "rgba(0,0,0,0.6)",
          width: 30,
          height: 30,
          right: 10,
          top: 10,
          borderRadius: "50px",
        }}
      >
        <Close sx={{ color: "white" }} />
      </Box>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={4}
      >
        <Grid item>item</Grid>
        <Grid item>item</Grid>
        <Grid item>item</Grid>
        <Grid item>item</Grid>
        <Grid item>item</Grid>
        <Grid item>item</Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        spacing={4}
      >
        <Grid item>item</Grid>
        <Grid item>item</Grid>
        <Grid item>item</Grid>
      </Grid>
    </Box>
  );
};
