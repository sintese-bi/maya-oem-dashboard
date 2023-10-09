import { reportAdministrator } from "./reportsRules/reportAdministratorRule";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Svg,
  Polygon,
  Image,
  Font,
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

export const AdministratorReport = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.main}>
          <View style={styles.header}>
            <View style={styles.generationDate}>
              <Text style={styles.generationDateText}>Data de geração</Text>
              <Text style={styles.generationDateValue}>
                {reportAdministrator.date.getDate() < 10 ? "0" : ""}
                {reportAdministrator.date.getDate()}/
                {reportAdministrator.date.getMonth() + 1 < 10 ? "0" : ""}
                {reportAdministrator.date.getMonth() + 1}/
                {reportAdministrator.date.getFullYear()}
              </Text>
              <Text
                style={{
                  fontSize: "24px",
                  fontWeight: "heavy",
                  color: "white",
                  marginLeft: "14px",
                }}
              >
                {
                  //reportAdministrator.useName
                  "Maya Energy"
                }
              </Text>
            </View>
            <View style={styles.logo}>
              <Image
                style={{ width: "140px", height: "60px" }}
                src="https://ucarecdn.com/258f82dc-bf80-4b30-a4be-bcea7118f14a/"
              ></Image>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100vw",
              height: "50vh",
              paddingHorizontal: "10px",
              paddingTop: "22px",
              justifyContent: "space-between",
              zIndex: 1,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                width: "68%",
              }}
            >
              <View
                style={{
                  height: "282px",
                  width: "382px",
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
                  style={{ width: "100%", height: "100%" }}
                  src={reportAdministrator.adminGraphRef}
                ></Image>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <View style={styles.card}>
                <View>
                  <Text style={styles.cardLabel}>DISPOSITIVOS/PLANTAS</Text>
                  <Text style={styles.cardNumber}>
                    {reportAdministrator.devicesLength}
                  </Text>
                </View>
                <Image
                  style={styles.icon}
                  src="https://ucarecdn.com/efd49320-e555-4813-af4b-bfffce905f67/-/gamma/0/-/contrast/-100/-/saturation/382/-/filter/gavin/100/-/preview/3000x3000/"
                ></Image>
              </View>
              <View style={styles.card}>
                <View>
                  <Text style={styles.cardLabel}>POTÊNCIA TOTAL</Text>
                  <Text style={styles.cardNumber}>
                    {reportAdministrator.capacityTotalValue} Kwp
                  </Text>
                </View>
                <Image
                  style={styles.icon}
                  src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
                ></Image>
              </View>
              <View style={styles.card}>
                <View>
                  <Text style={styles.cardLabel}>GERAÇÃO TOTAL REAL</Text>
                  <Text style={styles.cardNumber}>
                    {reportAdministrator.generationRealTotalValue} MWh
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
                    {reportAdministrator.generationEstimatedTotalValue} MWh
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
                  <Text style={styles.cardNumber}>
                    {reportAdministrator.percent} %
                  </Text>
                </View>
                <Image
                  style={styles.icon}
                  src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
                ></Image>
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "374px",
              width: "600px",
              position: "absolute",
              top: "342px",
              zIndex: 2,
            }}
          >
            <Image
              style={{ height: "80%", width: "84%", opacity: 0.3 }}
              src="https://ucarecdn.com/c8c3dec4-caa1-4614-84e6-fcb019555765/Desconto%20em%20conta%20macaqueira-04.jpg"
            ></Image>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                height: "56px",
                paddingHorizontal: "10px",
                backgroundColor: "#D9D9D9",
                borderRadius: 20,
                top: "-12",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "heavy",
                }}
              >
                Parabéns usuário, por sua enorme contribuição ao mundo.
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingHorizontal: "8px",
                justifyContent: "space-around",
                width: "72%",
              }}
            >
              <View style={styles.card}>
                <View>
                  <Text style={styles.cardLabel}>
                    EMISSÃO DE CARBONO ECONOMIZADA NA ATMOSFERA
                  </Text>
                  <Text style={styles.cardNumber}>
                    {reportAdministrator.percent} CO2
                  </Text>
                </View>
                <Image
                  style={styles.icon}
                  src="https://ucarecdn.com/17b3e20c-e6a4-4807-90b2-024841485e69/-/gamma/0/-/preview/3000x3000/"
                ></Image>
              </View>
              <View style={styles.card}>
                <View>
                  <Text style={styles.cardLabel}>
                    ÁRVORES SALVAS PELA ECONOMIA DE CARBONO
                  </Text>
                  <Text style={styles.cardNumber}>
                    {reportAdministrator.savedtree}
                  </Text>
                </View>
                <Image
                  style={styles.icon}
                  src="https://ucarecdn.com/efd49320-e555-4813-af4b-bfffce905f67/-/gamma/0/-/contrast/-100/-/saturation/382/-/filter/gavin/100/-/preview/3000x3000/"
                ></Image>
              </View>
            </View>
          </View>
          <View style={styles.madeBy}>
            <Text style={styles.madeByText}>POWERED BY: MAYA TECH S.A</Text>
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
