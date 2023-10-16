import { reportClient } from "./reportsRules/reportClientRule";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

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
    justifyContent: "center",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "20px",
    paddingLeft: "20px",
    backgroundColor: "#0097B2",
    color: "white",
  },
  generationDateText: {
    fontSize: "6px",
    opacity: 0.8,
    marginBottom: "4px",
  },
  generationDateValue: {
    fontSize: "8px",
    fontWeight: "ultrabold",
    marginBottom: "14px",
  },
  logo: {
    padding: "22px",
    backgroundColor: "white",
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
  },
  cardsRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginVertical: "8px",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "180px",
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
    fontSize: "16px",
    fontWeight: "ultrabold",
  },
  cardText: {
    fontSize: "10px",
    fontWeight: "ultrabold",
    width: "86px",
  },
  icon: {
    width: "36px",
    height: "36px",
    borderRadius: "50px",
  },
  madeBy: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
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

export const ClientReport = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.main}>
          <View style={styles.header}>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View style={{ marginRight: "22px" }}>
                  <Text style={styles.generationDateText}>Data de geração</Text>
                  <Text style={styles.generationDateValue}>
                    {reportClient.date.getDate() < 10 ? "0" : ""}
                    {reportClient.date.getDate()}/
                    {reportClient.date.getMonth() + 1 < 10 ? "0" : ""}
                    {reportClient.date.getMonth() + 1}/
                    {reportClient.date.getFullYear()}
                  </Text>
                </View>
                <View style={styles.generationDate}>
                  <Text style={styles.generationDateText}>
                    Data de aquisição dos dados
                  </Text>
                  <Text style={styles.generationDateValue}>
                    {reportClient.requistionStartDate} -
                    {reportClient.requisitionEndDate}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: "12px", marginBottom: "10px" }}>
                  End. de instalação: {reportClient.address}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: "18px", marginRight: "20px" }}>
                  Cliente: {reportClient.useName}
                </Text>
              </View>
            </View>
            <View style={styles.logo}>
              <Image
                style={{ width: "160px", height: "62px" }}
                src={reportClient.logo}
              ></Image>
            </View>
          </View>
          <View
            style={{
              width: "100vw",
              backgroundColor: "white",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "10px",
              borderRadius: "10px",
              opacity: 0.9,
            }}
          >
            <Text
              style={{
                marginBottom: "16px",
                marginLeft: "16px",
                fontWeight: "heavy",
                fontSize: "12px",
              }}
            >
              Série histórica da produção de Usinas.
            </Text>
            <Image
              style={{
                width: "100%",
                height: "220px",
              }}
              src={`${
                reportClient.graph
                  ? reportClient.graph
                  : `https://ucarecdn.com/
              258f82dc-bf80-4b30-a4be-bcea7118f14a/
              -/preview/500x500/
              -/quality/smart_retina/
              -/format/auto/`
              }`}
            ></Image>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              width: "600px",
              position: "absolute",
              top: "192px",
              zIndex: 2,
            }}
          >
            <Image
              style={{ height: "100%", width: "80%" }}
              src="https://ucarecdn.com/c8c3dec4-caa1-4614-84e6-fcb019555765/Desconto%20em%20conta%20macaqueira-04.jpg"
            ></Image>
          </View>
          <View style={styles.cardsRow}>
            <View style={styles.card}>
              <View>
                <Text style={styles.cardLabel}>MARCA</Text>
                <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {reportClient.brand}
                </Text>
              </View>
              <Image
                style={styles.icon}
                src="https://ucarecdn.com/efd49320-e555-4813-af4b-bfffce905f67/-/gamma/0/-/contrast/-100/-/saturation/382/-/filter/gavin/100/-/preview/3000x3000/"
              ></Image>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.cardLabel}>POTÊNCIA DA USINA</Text>
                <Text style={styles.cardNumber}>{reportClient.capacity}</Text>
              </View>
              <Image
                style={styles.icon}
                src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
              ></Image>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.cardLabel}>NÍVEL DE GERAÇÃO</Text>
                <Text style={styles.cardText}>{reportClient.lowLevel}</Text>
              </View>
              <Image
                style={styles.icon}
                src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"
              ></Image>
            </View>
          </View>
          <View style={styles.cardsRow}>
            <View style={styles.card}>
              <View>
                <Text style={styles.cardLabel}>GERAÇÃO TOTAL REAL</Text>
                <Text style={styles.cardNumber}>
                  {reportClient.realGenerationTotal}Mwh
                </Text>
              </View>
              <Image
                style={styles.icon}
                src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
              ></Image>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.cardLabel}>GERAÇÃO TOTAL ESTIMADA</Text>
                <Text style={styles.cardNumber}>
                  {reportClient.estimatedGenerationTotal}Mwh
                </Text>
              </View>
              <Image
                style={styles.icon}
                src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
              ></Image>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.cardLabel}>PERCENTUAL</Text>
                <Text style={styles.cardNumber}>{reportClient.percent} %</Text>
              </View>
              <Image
                style={styles.icon}
                src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"
              ></Image>
            </View>
          </View>
          <View style={styles.cardsRow}>
            <View style={styles.card}>
              <View>
                <Text style={styles.cardLabel}>
                  ÁRVORES SALVAS PELA ECONOMIA DE CARBONO
                </Text>
                <Text style={styles.cardNumber}>{reportClient.savedtree}</Text>
              </View>
              <Image
                style={styles.icon}
                src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
              ></Image>
            </View>
          </View>
          <View
            style={{
              width: "80%",
              backgroundColor: "#D9D9D9",
              paddingVertical: "24px",
              paddingHorizontal: "12px",
              marginBottom: "10px",
              marginTop: "10px",
              borderRadius: "10px",
            }}
          >
            <Text style={{ fontSize: "12px" }}>{reportClient.situation}</Text>
          </View>
          <View style={styles.madeBy}>
            <Text style={styles.madeByText}>POWERED BY: MAYA TECH S.A </Text>
            <Image
              style={{ width: "60px", height: "24px" }}
              src="https://ucarecdn.com/8961b481-f63f-4b00-96ee-a79fa1ba3470/-/brightness/-50/-/filter/briaril/100/-/preview/3000x3000/"
            ></Image>
          </View>
        </View>
      </Page>
    </Document>
  );
};
