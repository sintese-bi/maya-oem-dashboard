// Biblitecas
import { reportAdministrator } from "../../reports/reportsRules/reportAdministratorRule";
import {
  Box,
  Typography,
  Button,
  Modal,
  Card,
  Input,
  Tooltip,
} from "@mui/material";
import { Cancel, Check, CheckCircle, Info } from "@mui/icons-material";
import {
  PDFDownloadLink,
  BlobProvider,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";

// Componentes

import { ToolTipNoAccess } from "../shared/ToolTipNoAccess";
import { AdministratorReport } from "src/reports/AdministratorReport";

// icons

import { DownloadForOffline } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";

const styles = StyleSheet.create({
  pdfViewer: {
    height: "85vh",
    width: "500px",
  },
  page: {
    backgroundColor: "white",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "20px",
    backgroundColor: "#0097B2",
  },
  generationDateText: {
    fontSize: "12px",
    fontWeight: "semibold",
    color: "white",
    marginBottom: "4px",
    marginLeft: "14px",
  },
  generationDateValue: {
    fontSize: "12px",
    fontWeight: "semibold",
    color: "white",
    marginBottom: "14px",
    marginLeft: "14px",
  },
  logo: {
    padding: "20px",
    backgroundColor: "white",
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
  },
  cardsRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginVertical: "3px",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "186px",
    backgroundColor: "#0097B2",
    borderRadius: "10px",
    padding: "20px",
    color: "white",
  },
  cardLabel: {
    fontSize: "6px",
    fontWeight: "ultrabold",
    opacity: 0.8,
    marginBottom: "8px",
  },
  cardNumber: {
    fontSize: "14px",
    fontWeight: "ultrabold",
  },
  icon: {
    width: "36px",
    height: "36px",
    borderRadius: "50px",
  },
  madeBy: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    top: "100px",
  },
  light: {
    height: "10px",
    width: "10px",
  },
  pdfEndImg: {
    height: "14px",
    width: "80px",
  },
  madeByText: {
    fontSize: "8px",
    marginBottom: "8px",
  },
});

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

export const DashboardHeader = ({
  handleReportGeneration,
  isLoadingReportGeneration,
  useTypeMember,
  useName,
  label,
}) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  function handleUploadLogo() {
    setOpen(false);
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        my: 4,
        width: "100%",
      }}
    >
      <ToolTipNoAccess useTypeMember={useTypeMember}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Tooltip
            title="O processo de relatório possui 3 passos, o 1º passo é a escolha de sua logo,
           o 2º é a escolha da cor de seu relatório, e o último passo vai ser o download do arquivo em si.
            Caso nenhuma cor ou logo seja escolhida, o arquiivo irá conter o tema MAYA WATCH."
          >
            <Info fontSize="small" />
          </Tooltip>
          {useTypeMember ? (
            isLoadingReportGeneration ? (
              <Button
                startIcon={<DownloadForOffline fontSize="small" />}
                variant={useTypeMember ? "outlined" : ""}
                sx={{ width: "100%" }}
                onClick={() => {
                  setOpen(true);
                  handleReportGeneration();
                }}
              >
                Preparar relatório
              </Button>
            ) : (
              <PDFDownloadLink
                document={<AdministratorReport />}
                fileName="relatório-admnistrador.pdf"
                style={{ textDecoration: "none", height: "100%" }}
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    "Carregando relatório..."
                  ) : (
                    <Button
                      startIcon={<DownloadForOffline fontSize="small" />}
                      variant={useTypeMember ? "outlined" : ""}
                      sx={{ width: "100%" }}
                    >
                      Relatório Administrador
                    </Button>
                  )
                }
              </PDFDownloadLink>
            )
          ) : (
            "Relatório indisponível"
          )}
        </Box>
      </ToolTipNoAccess>
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        open={open}
      >
        <Carousel
          sx={{ height: 380, width: 360 }}
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
      </Modal>
    </Box>
  );
};
