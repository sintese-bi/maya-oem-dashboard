import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import MayaXBlueLogo from "src/assets/img/logo/maya-x-blue.png";
import Percent from "src/assets/img/percent.png";
export const ClientReport = ({
  report_client_data,
  graphMonthlyBase64,
  graphDailyBase64,
}) => {
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
      fontSize: "58px",
    },
    strongText: {
      fontSize: "38px",
    },
    weakText: {
      textAlign: "center",
      opacity: 0.6,

      fontSize: "24px",
    },
    biggerWeakText: {
      opacity: 0.6,

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

      fontSize: "28px",
    },
    smallerBigNumbersBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      padding: "40px 0px 40px 0px",
      width: "300px",
      backgroundColor: "white",
      borderRadius: "20px",
    },
    smallerBigNumbersBoxResult: {
      textAlign: "center",

      fontSize: "28px",
    },
    energyAndCreditField: {
      display: "flex",
      flexDirection: "row",
      padding: "0px 50px 0px 50px",
      gap: "20px",
      height: "1200px",
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

  return (
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
              <Text style={styles.strongText}>
                {report_client_data["Nome_usina"]}
              </Text>
            </View>
            <View style={styles.unityAndPeriodItem}>
              <Text style={styles.biggerWeakText}>Período</Text>
              <Text style={styles.titleText}>
                {report_client_data["Período"]}
              </Text>
              <Text style={styles.strongText}></Text>
            </View>
          </View>
          <View style={styles.logo}>
            <Image
              style={{ width: "80%", height: "80%" }}
              src={"https://ucarecdn.com/258f82dc-bf80-4b30-a4be-bcea7118f14a/"}
            ></Image>
          </View>
        </View>
        <View style={styles.smallerBigNumbers}>
          <View style={styles.smallerBigNumbersItem}>
            <Text style={styles.smallerBigNumbersLabel}>Geração real mês</Text>
            <View style={styles.smallerBigNumbersBox}>
              <Image
                style={{ width: "52px", height: "52px" }}
                src={
                  "https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/preview/144x144/"
                }
              ></Image>
              <Text style={styles.smallerBigNumbersBoxResult}>
                {report_client_data["Geração_real_mês"].toFixed(1)}
              </Text>
            </View>
          </View>
          <View style={styles.smallerBigNumbersItem}>
            <Text style={styles.smallerBigNumbersLabel}>
              Geração estimada mês
            </Text>
            <View style={styles.smallerBigNumbersBox}>
              <Image
                style={{ width: "52px", height: "52px" }}
                src={
                  "https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/preview/144x144/"
                }
              ></Image>
              <Text style={styles.smallerBigNumbersBoxResult}>
                {report_client_data["Geração_estimada_mês"].toFixed(1)}
              </Text>
            </View>
          </View>
          <View style={styles.smallerBigNumbersItem}>
            <Text style={styles.smallerBigNumbersLabel}>Desempenho</Text>
            <View style={styles.smallerBigNumbersBox}>
              <Image
                style={{ width: "44px", height: "44px" }}
                src={Percent}
              ></Image>
              <Text style={styles.smallerBigNumbersBoxResult}>
                {report_client_data["Desempenho"].toFixed(1)}
              </Text>
            </View>
          </View>

          <View style={styles.smallerBigNumbersItem}>
            <Text style={styles.smallerBigNumbersLabel}>Árvores salvas</Text>
            <View style={styles.smallerBigNumbersBox}>
              <Image
                style={{ width: "52px", height: "52px" }}
                src={
                  "https://ucarecdn.com/fdd89a32-bb13-4195-8288-a4b4f2a7a535/-/preview/64x64/"
                }
              ></Image>
              <Text style={styles.smallerBigNumbersBoxResult}>
                {report_client_data["Árvores_salvas"].toFixed(1)}
              </Text>
            </View>
          </View>
          <View style={styles.smallerBigNumbersItem}>
            <Text style={styles.smallerBigNumbersLabel}>Carbono</Text>
            <View style={styles.smallerBigNumbersBox}>
              <Image
                style={{ width: "52px", height: "52px" }}
                src={
                  "https://ucarecdn.com/1f80ba16-e9a0-4e85-a96a-b96f7c1e7231/-/preview/82x82/"
                }
              ></Image>
              <Text style={styles.smallerBigNumbersBoxResult}>
                {report_client_data["Carbono"].toFixed(1)}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: "50px", padding: "0px 50px 0px 50px" }}>
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
              marginTop: "50px",
              borderRadius: "20px",
            }}
          >
            <Image
              src={graphMonthlyBase64}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
        </View>
        <View style={{ marginTop: "50px", padding: "0px 50px 0px 50px" }}>
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
              marginTop: "50px",

              borderRadius: "20px",
            }}
          >
            <Image
              src={graphDailyBase64}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
        </View>
        <View
          style={{ marginTop: "100px", padding: "0px 50px 0px 50px" }}
        ></View>

        <View
          style={{
            marginTop: "260px",
            padding: "0px 50px 0px 50px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "60%",
              padding: "30px 0px 30px 0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "column",
              backgroundColor: "white",
              marginTop: "100px",
              borderRadius: "20px",
            }}
          >
            <Text style={styles.weakText}>Feito com carinho por Maya Tech</Text>
            <Image
              style={{ width: "300px", height: "200px" }}
              src={MayaXBlueLogo}
            ></Image>
          </View>
        </View>
      </Page>
    </Document>
  );
};
