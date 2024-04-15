// Biblitecas
import { Box, Button, Modal, Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";
import { PDFDownloadLink } from "@react-pdf/renderer";

// Componentes

import { ToolTipNoAccess } from "../../shared/ToolTipNoAccess";
import { AdministratorReport } from "src/reports/AdministratorReport";

// icons

import { DownloadForOffline } from "@mui/icons-material";
import { useState } from "react";
import { ReportButtonCarousel } from "./reportButtonCarousel";

export const ReportButton = ({
  handleAdminReportGeneration,
  isLoadingReportGeneration,
  useTypeMember,
  setIsLoadingReportGeneration,
}) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  function handleUploadLogo() {
    setOpen(false);
  }

  const handleClick = (url) => {
    setTimeout(() => {
      setIsLoadingReportGeneration(true);
    }, [1500]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        my: 4,
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
                  handleAdminReportGeneration();
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
                      onClick={() => {
                        handleClick(url);
                      }}
                    >
                      Relatório gerencial
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
        <>
          <ReportButtonCarousel
            open={open}
            setOpen={setOpen}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            handleUploadLogo={handleUploadLogo}
          />
        </>
      </Modal>
    </Box>
  );
};
