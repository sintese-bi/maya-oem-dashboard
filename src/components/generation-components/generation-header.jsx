import moment from "moment-timezone";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ClientReport } from "src/reports/ClientReport";
import { ToolTipNoAccess } from "src/components/shared/ToolTipNoAccess";
import { Cancel } from "@mui/icons-material";
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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DownloadForOffline } from "@mui/icons-material";

import Tabs from "../../components/shared/Tabs";
import { useState } from "react";
import { reportClient } from "src/reports/reportsRules/reportClientRule";

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
            width: "200px",
          }}
        >
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
                      Relatório Cliente
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
          <Button onClick={handleUploadLogo} variant="outlined" sx={{ mt: 2 }}>
            Confirmar
          </Button>
        </Card>
      </Modal>
    </Box>
  );
};
