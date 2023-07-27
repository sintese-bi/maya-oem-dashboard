import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Svg,
    Polygon,
    Image,
  } from "@react-pdf/renderer";
  
  const styles = StyleSheet.create({
    pdfViewer: {
      height: "85vh",
      width: "500px",
    },
    page: {
      backgroundColor: "#E4E4E4",
    },
    main: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    datesAndApresentation: {
      paddingLeft: "20px",
    },
    creationDate: {
      color: "#009C77",
      fontSize: "16px",
      marginTop: "26px",
    },
    filteredDate: {
      width: "150px",
      color: "#009C77",
      fontSize: "12px",
      marginBottom: "6px",
    },
    clientName: {
      fontSize: "22px",
      marginTop: "20px",
      marginBottom: "40px",
    },
    economyCard: {
      width: "260px",
      padding: 16,
      backgroundColor: "#009C77",
      borderRadius: "10px",
    },
    economyCardFirstMoney: {
      marginTop: "10px",
      marginBottom: "20px",
      fontSize: "26px",
      color: "lightgreen",
    },
    economyCardSecondMoney: {
      marginTop: "6px",
      color: "lightgreen",
    },
    economyCardText: {
      color: "white",
      fontSize: "12px",
    },
    saveWorldCards: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "260px",
      padding: "12px",
      backgroundColor: "white",
      borderRadius: "10px",
      marginBottom: "8px",
    },
    saveWorldCardsImgs: {
      marginRight: "10px",
      height: "70px",
      width: "70px",
    },
    saveWorldCardsNumbers: {
      fontSize: "26px",
      marginBottom: "8px",
    },
    yourContributionToWorld: {
      marginVertical: "20px",
      marginLeft: "12px",
      fontSize: "12px",
    },
    congrats: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingVertical: "8px",
      paddingHorizontal: "22px",
      backgroundColor: "white",
      marginTop: "4px",
      width: "90%",
      borderRadius: "10px",
    },
    congratsMainText: {
      fontWeight: "ultrabold",
      fontSize: "20px",
      color: "#009C77",
    },
    congratsSecondText: {
      fontSize: "12px",
    },
    mayaLogo: {
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      right: "-24px",
      height: "86px",
      width: "260px",
      backgroundColor: "white",
      borderTopLeftRadius: "50px",
      borderBottomLeftRadius: "50px",
      marginTop: "20px",
    },
    mayaLogoPng: {
      marginLeft: "40px",
      height: "60%",
      width: "60%",
    },
    production: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "white",
      paddingVertical: "20px",
    },
    productionElement: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginVertical: "2px",
    },
    productionElementDate: {
      fontSize: "10px",
      fontWeight: "light",
    },
    productionElementGraph: {
      fontSize: "8px",
      fontWeight: "light",
    },
    productionElementProductionAmount: {
      fontSize: "8px",
    },
    productionElementProductionAmountFirstNumber: {
      color: "#009C77",
    },
    productionElementProductionAmountSecondNumber: {
      color: "#E6AF32",
    },
    productionElementGraphResults: {
      width: "190px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    productionkWh: {
      width: "80%",
      marginVertical: "20px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: "8px",
    },
    productionkWhItem: {
      display: "flex",
      flexDirection: "row",
    },
    productionkWhItemText: {
      marginLeft: "6px",
    },
  
    productionCard: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "260px",
      padding: "12px",
      backgroundColor: "white",
      borderRadius: "10px",
      marginTop: "140px",
    },
    productionCardText: {
      width: "150px",
      fontSize: "12px",
      marginBottom: "6px",
    },
    productionCardNumber: {
      fontSize: "26px",
      color: "#E6AF32",
    },
    madeBy: {
      marginVertical: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      width: "40%",
      flexDirection: "row",
    },
    pdfEndImg: {
      height: "20px",
      width: "100px",
    },
    foot: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    light: {
      height: "10px",
      width: "10px",
    },
  });
  
  export const ClientReport = ({devUuid}) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.main}>
         <View style={styles.saveWorldCards}>
            <Text>{devUuid}</Text>
         </View>
        </View>
      </Page>
    </Document>
  );
  