// Biblitecas

import { Box, Typography, Button } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import moment from "moment";

// Componentes

import { ToolTipNoAccess } from "../shared/ToolTipNoAccess";
import { AdministratorReport } from "src/reports/AdministratorReport";

// icons

import { DownloadForOffline } from "@mui/icons-material";

export const DashboardHeader = ({
  handleReportGeneration,
  isLoadingReportGeneration,
  useTypeMember,
  useName,
  label,
}) => {
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
            width: "220px",
          }}
        >
          <Button
            startIcon={<DownloadForOffline fontSize="small" />}
            variant={useTypeMember ? "outlined" : ""}
            onClick={() => handleReportGeneration()}
            sx={{
              height: "40px",
            }}
          >
            {isLoadingReportGeneration ? (
              "Preparar relatório"
            ) : (
              <PDFDownloadLink
                document={<AdministratorReport />}
                fileName="relatório-integrador.pdf"
                style={{ textDecoration: "none" }}
              >
                {({ blob, url, loading, _ }) =>
                  useTypeMember
                    ? loading
                      ? "Carregando relatório..."
                      : "Relatório Integrador"
                    : "Relatório indisponível"
                }
              </PDFDownloadLink>
            )}
          </Button>
        </Box>
      </ToolTipNoAccess>
    </Box>
  );
};
