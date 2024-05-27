import { Cancel, CheckCircle } from "@mui/icons-material";
import { Box, Button, Card, Input, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { reportAdministrator } from "src/reports/reportsRules/reportAdministratorRule";

export const ReportButtonCarousel = ({
  open,
  setOpen,
  setCurrentPage,
  currentPage,
  selectedColor,
  setSelectedColor,
  handleUploadLogo,
}) => {
  const colors = [
    "#87B8EA",
    "#5e80a3",
    "#79a4e1",
    "#5d548c",
    "#01796f",
    "#8da399",
    "#0a0c0d",
    "#213635",
    "#1c5052",
    "#348e91",
    "#3d8d90",
    "#454545",
  ];
  return (
    <Carousel
      sx={{ height: 380, width: { lg: 360, md: 300, sm: 300, xs: 300 } }}
      navButtonsAlwaysInvisible={true}
      indicators={false}
      indicatorIconButtonProps={{
        style: {
          color: "#14B8A6",
        },
      }}
      index={currentPage}
      autoPlay={false}
    >
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            mb: 2,
          }}
        >
          <Cancel
            fontSize="large"
            onClick={() => {
              setOpen(!open);
            }}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        <img
          src="https://ucarecdn.com/258f82dc-bf80-4b30-a4be-bcea7118f14a/maya-watch-logo.png"
          alt="logo"
          id="logo"
          style={{ width: "140px", height: "80px" }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ width: 224, mt: 2 }}
        >
          Fazer upload da sua logo
          <Input
            type="file"
            onChange={(e) => {
              if (e.target.files.length != 0) {
                var reader = new FileReader();
                reader.addEventListener("loadend", () => {
                  document.getElementById("logo").src = reader.result;
                  reportAdministrator.logo = reader.result;
                });
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
            sx={{ visibility: "hidden", overflow: "hidden", width: 0 }}
          />
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Confirmar
        </Button>
      </Card>
      <Card sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            mb: 2,
          }}
        >
          <Cancel
            fontSize="large"
            onClick={() => {
              setOpen(!open);
            }}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        <Typography variant="body2" sx={{ my: 2, ml: 2 }}>
          Escolha a cor do tema de seu relatório
        </Typography>
        <Box
          sx={{
            display: "grid",
            justifyContent: "space-around",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 2,
            p: 3,
          }}
        >
          {colors.map((data) => {
            return (
              <div
                key={data}
                onClick={() => {
                  selectedColor == data
                    ? setSelectedColor("")
                    : setSelectedColor(data);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: data,
                  height: "42px",
                  width: "42px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                {selectedColor == data ? (
                  <CheckCircle sx={{ color: "white" }} />
                ) : null}
              </div>
            );
          })}
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            if (selectedColor != "") {
              reportAdministrator.color = selectedColor;
            }
            handleUploadLogo();
          }}
        >
          Confirmar escolha
        </Button>
      </Card>
    </Carousel>
  );
};
