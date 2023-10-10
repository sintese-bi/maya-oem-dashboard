// Biblitecas
import { reportAdministrator } from "../../reports/reportsRules/reportAdministratorRule";
import { Box, Typography, Button } from "@mui/material";
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
    </Box>
  );
};
