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
          {useTypeMember ? (
            isLoadingReportGeneration ? (
              <Button
                startIcon={<DownloadForOffline fontSize="small" />}
                variant={useTypeMember ? "outlined" : ""}
                sx={{ width: "100%" }}
                onClick={() => handleReportGeneration()}
              >
                Preparar relatório
              </Button>
            ) : (
              <PDFDownloadLink
                document={<AdministratorReport />}
                fileName="relatório-administrador.pdf"
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
                      Relatório Global
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
    </Box>
  );
};
