import { Route, Routes } from "react-router-dom";

//LAYOUTS
import LayoutDashboard from "./layouts/LayoutDashboard";
import PrivateRoute from "./PrivateRoute";

import energySchema from "src/assets/img/enery-schema.png";
import Tree from "src/assets/img/TREE.png";
import Cloud from "src/assets/img/CLOUD.png";

// PAGINAS
import PasswordRecovery from "./pages/passwordRecovery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";
import Generation from "./pages/dashboard/generation";
import Investment from "./pages/dashboard/investment";
import Alerts from "./pages/dashboard/alerts";
import AlertDevices from "src/components/alerts/AlertDevices";
import Plants from "src/components/dashboard/total-month/total-month-components/total-month-devices";

import PrivateAdminRoute from "./PrivateAdminRoute";
import ListUsers from "./pages/dashboard/admin/ListUsers";
import {
  HomePage,
  AdminCalculator,
  ClientCalculator,
} from "./components/calculator";
import { FaturaModulo } from "./components/modules/faturaModule";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { ChartGenrealdaylasthour } from "./components/shared/Charts";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

const Report = () => {
  const styles = StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    apresentation: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      marginLeft: "46px",
    },
    unityAndPeriod: {
      display: "flex",
      padding: "60px 0px 60px 0px",
      flexDirection: "column",
      gap: "40px",
    },
    unityAndPeriodItem: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    logo: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      width: "700px",
      height: "400px",
      backgroundColor: "white",
      borderTopLeftRadius: "200px",
      borderBottomLeftRadius: "200px",
    },
    titleText: {
      fontFamily: "Open Sans",
      fontSize: "58px",
      fontWeight: "600",
    },
    strongText: {
      fontFamily: "Open Sans",
      fontSize: "38px",
      fontWeight: "600",
    },
    weakText: {
      textAlign: "center",
      opacity: 0.6,
      fontFamily: "Open Sans",
      fontSize: "24px",
    },
    biggerWeakText: {
      opacity: 0.6,
      fontFamily: "Open Sans",
      fontSize: "38px",
    },
    smallerBigNumbers: {
      marginTop: "100px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "0px 60px 0px 60px",
    },
    smallerBigNumbersItem: {
      height: "200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
    },
    smallerBigNumbersLabel: {
      textAlign: "center",
      width: "300px",
      fontFamily: "Open Sans",
      fontSize: "28px",
      fontWeight: "600",
    },
    smallerBigNumbersBox: {
      padding: "40px 0px 40px 0px",
      width: "300px",
      backgroundColor: "white",
      borderRadius: "20px",
    },
    smallerBigNumbersBoxResult: {
      textAlign: "center",
      fontFamily: "Open Sans",
      fontSize: "28px",
      fontWeight: "600",
    },
    energyAndCreditField: {
      display: "flex",
      flexDirection: "row",
      padding: "0px 50px 0px 50px",
      gap: "20px",
    },
    energy: {
      marginTop: "100px",
      width: "50%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    energyFields: {
      display: "flex",
      justifyContent: "space-around",
      padding: "40px 0px 40px 0px",
      flexDirection: "row",
      backgroundColor: "white",
      borderRadius: "40px",
      height: "300px",
    },
    energyStream: {
      display: "flex",
      justifyContent: "space-around",
      padding: "120px 0px 120px 0px",
      flexDirection: "row",
      backgroundColor: "white",
      borderRadius: "40px",
    },
    energyFieldsItem: {
      width: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: "50px",
      padding: "20px 40px 20px 40px",
    },
  });
  const [graphMonthlyBase64, setGraphMonthlyBase64] = useState("");
  const [graphDailyBase64, setGraphDailyBase64] = useState("");

  const { report_client_data } = useSelector((state) => state.devices);

  useEffect(() => {
    console.log(report_client_data);
  }, [report_client_data]);

  return (
    <>
      <PDFViewer
        style={{
          height: "85vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Document>
          <Page
            size="A0"
            style={{ backgroundColor: "#f5f5f5", padding: "40px 0px 40px 0px" }}
          >
            <View style={styles.header}>
              <View style={styles.apresentation}>
                <Text style={styles.titleText}>
                  {report_client_data["Nome_usina"]}
                </Text>
                <Text style={styles.biggerWeakText}>
                  Segue os resultados da sua Usina:
                </Text>
              </View>
              <View style={styles.unityAndPeriod}>
                <View style={styles.unityAndPeriodItem}>
                  <Text style={styles.biggerWeakText}>Unidade</Text>
                  <Text style={styles.strongText}>Felipe VGP - 4 kWp</Text>
                </View>
                <View style={styles.unityAndPeriodItem}>
                  <Text style={styles.biggerWeakText}>Período</Text>
                  <Text style={styles.titleText}>
                    {report_client_data["Período"]}
                  </Text>
                  <Text style={styles.strongText}>08/02/2024 a 11/03/2024</Text>
                </View>
              </View>
              <View style={styles.logo}>
                <Image
                  style={{ width: "80%", height: "80%" }}
                  src={
                    "https://ucarecdn.com/258f82dc-bf80-4b30-a4be-bcea7118f14a/"
                  }
                ></Image>
              </View>
            </View>
            <View style={styles.smallerBigNumbers}>
              <View style={styles.smallerBigNumbersItem}>
                <Text style={styles.smallerBigNumbersLabel}>
                  PAGARIA SEM A USINA (R$)
                </Text>
                <View style={styles.smallerBigNumbersBox}>
                  <Text style={styles.smallerBigNumbersBoxResult}>
                    {report_client_data["Pagou_sem_Usina"]}
                  </Text>
                </View>
              </View>
              <View style={styles.smallerBigNumbersItem}>
                <Text style={styles.smallerBigNumbersLabel}>PAGO (R$)</Text>
                <View style={styles.smallerBigNumbersBox}>
                  <Text style={styles.smallerBigNumbersBoxResult}>
                    {report_client_data["Pago"]}
                  </Text>
                </View>
              </View>
              <View style={styles.smallerBigNumbersItem}>
                <Text style={styles.smallerBigNumbersLabel}>ECONOMIA (R$)</Text>
                <View style={styles.smallerBigNumbersBox}>
                  <Text style={styles.smallerBigNumbersBoxResult}>
                    {report_client_data["Economia"]}
                  </Text>
                </View>
              </View>
              <View style={styles.smallerBigNumbersItem}>
                <Text style={styles.smallerBigNumbersLabel}>
                  CONSUMO TOTAL (KWH)
                </Text>
                <View style={styles.smallerBigNumbersBox}>
                  <Text style={styles.smallerBigNumbersBoxResult}>
                    {report_client_data["Consumo_total"]}
                  </Text>
                </View>
              </View>
              <View style={styles.smallerBigNumbersItem}>
                <Text style={styles.smallerBigNumbersLabel}>GERAÇÃO (KWH)</Text>
                <View style={styles.smallerBigNumbersBox}>
                  <Text style={styles.smallerBigNumbersBoxResult}>
                    {report_client_data["Geração"]}
                  </Text>
                </View>
              </View>
              <View style={styles.smallerBigNumbersItem}>
                <Text style={styles.smallerBigNumbersLabel}>
                  DESEMPENHO (%)
                </Text>
                <View style={styles.smallerBigNumbersBox}>
                  <Text style={styles.smallerBigNumbersBoxResult}>
                    {report_client_data["Desempenho"]}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.energyAndCreditField}>
              <View style={styles.energy}>
                <Text style={styles.strongText}>ENERGIA (kWh)</Text>
                <View style={styles.energyFields}>
                  <View style={styles.energyFieldsItem}>
                    <Text style={styles.weakText}>
                      CONSUMIDA DA CONCESSIONÁRIA
                    </Text>
                    <Text style={styles.strongText}>220,00</Text>
                  </View>
                  <View style={styles.energyFieldsItem}>
                    <Text style={styles.weakText}>INJETADA </Text>
                    <Text style={styles.strongText}>183,00</Text>
                  </View>
                </View>
                <View style={styles.energyFields}>
                  <View style={styles.energyFieldsItem}>
                    <Text style={styles.weakText}>FATURADA</Text>
                    <Text style={styles.strongText}>170,00</Text>
                  </View>
                  <View style={styles.energyFieldsItem}>
                    <Text style={styles.weakText}>COMPENSADA</Text>
                    <Text style={styles.strongText}>50,00</Text>
                  </View>
                </View>
              </View>
              <View style={styles.energy}>
                <Text style={styles.strongText}>
                  ENERGIA (kWh) CRÉDITO DE ENERGIA (kWh)
                </Text>
                <View style={styles.energyFields}>
                  <View style={styles.energyFieldsItem}>
                    <Text style={styles.weakText}>ANTERIOR</Text>
                    <Text style={styles.strongText}>
                      {report_client_data["Saldo_anterior"]}
                    </Text>
                  </View>
                  <View style={styles.energyFieldsItem}>
                    <Text style={styles.weakText}>COMPENSADO(-)</Text>
                    <Text style={styles.strongText}>0</Text>
                  </View>
                  <View style={styles.energyFieldsItem}>
                    <Text style={styles.weakText}>
                      TRANSFERIDO (-) OU RECEBIDO (+)
                    </Text>
                    <Text style={styles.strongText}>
                      {report_client_data["Transferido"]}
                    </Text>
                  </View>
                  <View style={styles.energyFieldsItem}>
                    <Text style={styles.weakText}>EXPIRADO</Text>
                    <Text style={styles.strongText}>0</Text>
                  </View>
                </View>
                <View style={styles.energyFields}>
                  <View style={styles.energyFieldsItem}>
                    <Text style={styles.weakText}>ATUAL</Text>
                    <Text style={styles.strongText}>
                      {report_client_data["Saldo_atual"]}
                    </Text>
                  </View>
                  <View style={styles.energyFieldsItem}>
                    <Text style={styles.weakText}>
                      ATUAL EXPIRAÇÃO VENCIMENTO
                    </Text>
                    <Text style={styles.strongText}>0</Text>
                  </View>
                  <View style={styles.energyFieldsItem}>
                    <Text style={styles.weakText}>VENCIMENTO</Text>
                    <Text style={styles.strongText}>02/2029</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.energyAndCreditField}>
              <View style={styles.energy}>
                <Text style={styles.strongText}>FLUXO DE ENERGIA (kWh)</Text>
                <View style={styles.energyStream}>
                  <Image
                    src={energySchema}
                    style={{ height: "500px", width: "660px" }}
                  />
                </View>
              </View>
              <View style={styles.energy}>
                <Text style={styles.strongText}>CONSUMO (kWh)</Text>
                <View style={styles.energyStream}>
                  <View style={{ height: "500px", width: "660px" }}></View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: "100px", padding: "0px 50px 0px 50px" }}>
              <Text style={styles.strongText}>
                Sua contribuição para o mundo
              </Text>
              <View
                style={{
                  width: "100%",
                  padding: "30px 0px 30px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexDirection: "row",
                  marginTop: "140px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    padding: "20px 100px 20px 100px",
                    height: "300px",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    gap: "100px",
                  }}
                >
                  <Image
                    src={Tree}
                    style={{ height: "120px", width: "120px" }}
                  />
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "300px",
                    }}
                  >
                    <Text
                      style={{ fontSize: "100px", fontFamily: "Open Sans" }}
                    >
                      0
                    </Text>
                    <Text style={{ fontSize: "42px", fontFamily: "Open Sans" }}>
                      Árvores foram cultivadas
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    padding: "20px 100px 20px 100px",
                    height: "300px",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    gap: "100px",
                  }}
                >
                  <Image
                    src={Cloud}
                    style={{ height: "120px", width: "120px" }}
                  />
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "300px",
                      padding: "0px 10px 0px 10px",
                    }}
                  >
                    <Text
                      style={{ fontSize: "100px", fontFamily: "Open Sans" }}
                    >
                      0,05
                    </Text>
                    <Text style={{ fontSize: "42px", fontFamily: "Open Sans" }}>
                      Toneladas de CO2 evitados
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: "260px", padding: "0px 50px 0px 50px" }}>
              <Text style={styles.strongText}>PRODUÇÃO MENSAL (kWh)</Text>
              <View
                style={{
                  width: "100%",
                  padding: "30px 0px 30px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexDirection: "row",
                  backgroundColor: "white",
                  marginTop: "100px",
                  borderRadius: "20px",
                }}
              ></View>
            </View>
            <View style={{ marginTop: "260px", padding: "0px 50px 0px 50px" }}>
              <Text style={styles.strongText}>PRODUÇÃO DIÁRIA (kWh)</Text>
              <View
                style={{
                  width: "100%",
                  padding: "30px 0px 30px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexDirection: "row",
                  backgroundColor: "white",
                  marginTop: "100px",
                  borderRadius: "20px",
                }}
              ></View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/passwordaRecovery" element={<PasswordRecovery />} />

      <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={<LayoutDashboard />}>
          <Route index element={<Dashboard />} />
          {/* <Route index path="devices" element={<Devices />} /> */}
          <Route path="generation/:brand" element={<Generation />} />
          <Route path="alerts/:brand" element={<Alerts />} />
          <Route index path="devices" element={<Plants />} />

          <Route element={<PrivateAdminRoute />}>
            <Route path="report" element={<Report />} />
            <Route path="alertDevices" element={<AlertDevices />} />
            <Route path="manager" element={<FaturaModulo />} />
            <Route path="investment/:brand" element={<Investment />} />
            <Route path="calculator" element={<HomePage />} />
            <Route path="calculator/client" element={<ClientCalculator />} />
            <Route path="calculator/admin" element={<AdminCalculator />} />
            <Route path="users" element={<ListUsers />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
