import { Box } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import { AdministratorReport } from "src/reports/AdministratorReport";
import { ClientReport } from "src/reports/ClientReport";

export const ReportTest = () => {
  return (
    <Box sx={{ width: "100%", height: 700 }}>
      <PDFViewer style={{ width: "600px", height: "100%" }}>
        <AdministratorReport />
      </PDFViewer>
    </Box>
  );
};
