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
import { Link } from "react-router-dom";

export const BigNumber = (props) => {
  const { title, value, icon, btnTitle = false } = props;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              {icon}
            </Avatar>
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
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                {title}
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {value}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "success.main",
                  height: 56,
                  width: 56,
                }}
              >
                {icon}
              </Avatar>
            </Grid>
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
              padding: "10px",
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
