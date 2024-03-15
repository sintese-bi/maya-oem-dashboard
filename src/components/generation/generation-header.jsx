import moment from "moment-timezone";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ClientReport } from "src/reports/ClientReport";
import { ToolTipNoAccess } from "src/components/shared/ToolTipNoAccess";
import { Cancel, CheckCircle, Info } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  Select,
  TextField,
  Button,
  Card,
  Modal,
  Input,
  Typography,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DownloadForOffline } from "@mui/icons-material";

import Tabs from "../../components/shared/Tabs";
import { useState } from "react";
import { reportClient } from "src/reports/reportsRules/reportClientRule";
import Carousel from "react-material-ui-carousel";

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

export const GenerationHeader = ({
  deviceInfo,
  handleSelectDevices,
  handleReportGeneration,
  devices,
  startDate,
  endDate,
  useTypeMember,
  isLoadingReport,
  generation,
  useNameState,
  setAction,
  setOpen,
  setStartDate,
  setEndDate,
}) => {
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  function handleUploadLogo() {
    setUploadImageModal(false);
  }
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        mt: 3,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ mr: 1, width: 200 }}>
          <InputLabel>Lista de Usuários</InputLabel>
          <NativeSelect
            label="Lista de Usuários"
            id="dev_name"
            value={deviceInfo?.dev_uuid || ""}
            onChange={(evt) => handleSelectDevices(evt.target.value)}
            input={<Select />}
          >
            {devices &&
              devices.map((dev, index) => (
                <option key={index} value={dev.dev_uuid}>
                  {dev.dev_name}
                </option>
              ))}
          </NativeSelect>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="Data Inicial"
            value={startDate}
            onChange={(startDate) =>
              setStartDate(
                startDate ? moment(startDate).format("YYYY-MM-DD") : ""
              )
            }
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Data Final"
            value={endDate}
            onChange={(endDate) =>
              setEndDate(endDate ? moment(endDate).format("YYYY-MM-DD") : "")
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
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
            isLoadingReport ? (
              <Button
                startIcon={<DownloadForOffline fontSize="small" />}
                variant={useTypeMember ? "outlined" : ""}
                sx={{ width: "100%" }}
                onClick={() => {
                  setUploadImageModal(true);
                  handleReportGeneration();
                }}
              >
                Preparar relatório
              </Button>
            ) : (
              <PDFDownloadLink
                document={<ClientReport />}
                fileName="relatório-cliente.pdf"
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
                      Relatório cliente
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
      <Tabs />
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        open={uploadImageModal}
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
                  setUploadImageModal(!uploadImageModal);
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
                      reportClient.logo = reader.result;
                    });
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
                sx={{ visibility: "hidden", overflow: "hidden", width: 0 }}
              />
            </Button>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              variant="outlined"
              sx={{ mt: 2 }}
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
                  setUploadImageModal(!uploadImageModal);
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
                justifyContent: "center",
                alignItems: "center",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: 2,
                p: 2,
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
                  reportClient.color = selectedColor;
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
