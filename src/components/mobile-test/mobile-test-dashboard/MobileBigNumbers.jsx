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
              <Typography color="textPrimary" variant="h5">
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
  
  export const MobileBigNumberDashboard = (props) => {
    const { title, value, icon, handleChangeColumns, type, btn, activeBtn } =
      props;
  
    return (
      <Card sx={{ width: "90%" }}>
        <CardActionArea>
          <CardContent sx={{ height: 120  ,}}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                  sx={{ fontWeight: "bold", fontSize: "12px" }}
                >
                  {title.toUpperCase()}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                xs={12}
              >
                <Typography
                  color="textPrimary"
                  variant="h4"
                  sx={{ fontWeight: "bold" }}
                >
                  {value}
                </Typography>
  
                {icon}
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
  
        <CardActions sx={{ height: 40 }}>
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
            {!btn ? "Visualizar" : ""}
          </Typography>
        </CardActions>
      </Card>
    );
  };
  