import { Box } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import { AdministratorReport } from "src/reports/AdministratorReport";
import { ClientReport } from "src/reports/ClientReport";

export const ReportsTests = () => {
  return (
    <Box sx={{ bgcolor: "red", height: "100vh" }}>
      <PDFViewer>
        <ClientReport />
      </PDFViewer>
      <PDFViewer>
        <AdministratorReport />
      </PDFViewer>
    </Box>
  );
};
