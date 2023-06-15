// COMPONENTS
import {
  Accordion,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";

export const LoadingSkeletonBigNumbers = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              <Skeleton width={300} />
            </Typography>
            <Typography color="textPrimary" variant="h4">
              <Skeleton />
            </Typography>
          </Grid>
          <Grid item>
            <Skeleton variant="circular" width={56} height={56} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const LoadingInput = () => {
  return <Skeleton width={300} height={60} />;
};

export const LoadingAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<Skeleton variant="circular" width={56} height={56} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{ m: 1 }} variant="h4">
          <Skeleton width={300} />
        </Typography>
      </AccordionSummary>
    </Accordion>
  );
};

export const LoadingSkeletonCharts = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Card>
          <CardHeader
            title={
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography color="textPrimary" variant="h5">
                  <Skeleton width={300} />
                </Typography>
              </Box>
            }
          />
          <Divider />
          <CardContent>
            <Box
              sx={{
                height: 400,
                position: "relative",
              }}
            >
              <Skeleton width="60%" />
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export const LoadingSkeletonInvestment = () => {
  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Grid item sm={6} lg={3} key={index}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Grid item>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="overline"
                        >
                          <Skeleton width={150} height={30} />
                        </Typography>
                        <Typography color="textPrimary" variant="h4">
                          <Skeleton width={300} />
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Skeleton variant="circular" width={56} height={56} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export const LoadingList = () => {
  return Array(5)
    .fill(0)
    .map((_, index) => <Skeleton width="100%" height={56} key={index} />);
};
