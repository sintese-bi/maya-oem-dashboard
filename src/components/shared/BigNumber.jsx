// COMPONENTS
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

export const BigNumber = (props) => {
  const { title, value, icon, btnTitle = false } = props;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={1} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {value}
            </Typography>
          </Grid>
          <Grid item>
            {icon ? (
              <Avatar
                sx={{
                  backgroundColor: "success.main",
                  height: 56,
                  width: 56,
                }}
              >
                {icon}
              </Avatar>
            ) : null}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const BigNumberDashboard = (props) => {
  const { title, value, icon, handleChangeColumns, type, btn, activeBtn } =
    props;

  return (
    <Card sx={{ width: 285 }}>
      <CardActionArea>
        <CardContent sx={{ height: 120 }}>
          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                {title}
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {value}
              </Typography>
            </Grid>
            <Grid item>{icon}</Grid>
          </Grid>
        </CardContent>
      </CardActionArea>

      {!btn ? (
        <CardActions>
          <Typography
            onClick={() => handleChangeColumns(type)}
            size="small"
            style={{
              color: activeBtn ? "lightblue" : "#10B981",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              underline: "none",
              paddingTop: "5px",
              paddingBottom: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
              cursor: "pointer",
            }}
          >
            Visualizar
          </Typography>
        </CardActions>
      ) : null}
    </Card>
  );
};
