// Biblitecas

import { Box, Typography, Button } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import moment from "moment";

// Componentes

import { ToolTipNoAccess } from "../ToolTipNoAccess";
import { AdministratorReport } from "src/reports/AdministratorReport";

// icons

import { DownloadForOffline } from "@mui/icons-material";

export const DashboardHeader = ({
  handleReportGeneration,
  isLoadingReport,
  useTypeMember,
  useName,
  label,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
        mb: 8,
        width: "100%",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3">Usuário: {useName}</Typography>
        <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
          Data: {moment().format("DD/MM/YYYY")}
        </Typography>
      </Box>
      <ToolTipNoAccess useTypeMember={useTypeMember}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "220px",
            position: "absolute",
            right: 0,
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
            {isLoadingReport ? (
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
