import { getUserCookie } from "../services/session";
import { useState, useEffect } from "react";
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
    backgroundColor: "#E4E4E4",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "center",
    padding: '8px'
  },
  header: {
    right: '-24px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '20px'
  },
  generationDateText: {
    fontSize: '6px',
    opacity: 0.8,
    marginBottom: '4px'
  },
  generationDateValue: {
    fontSize: '8px',
    fontWeight: 'ultrabold',
    marginBottom: '14px'
  },
  logo: {
    padding: '20px',
    backgroundColor: 'white',
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
  },
  cardsRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginVertical: '8px'
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    width: "180px",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: '20px',
  },
  cardLabel: {
    fontSize: "6px",
    fontWeight: "ultrabold",
    opacity: 0.8,
    marginBottom: '8px'
  },
  cardNumber: {
    fontSize: "16px",
    fontWeight: "ultrabold",
  },
  icon: {
    width: '36px',
    height: '36px',
    borderRadius: '50px',
  },
  madeBy: {
    marginTop: "100px",
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: 'center',
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
    fontSize: '8px',
    marginBottom: '8px'
  }
});

export const AdministratorReport = ({dataDevices}) => {
   const { useName } = getUserCookie()
   const date = new Date()
   const [generationRealTotalValue, setGenerationRealTotalValue] = useState(0)
   const [generationEstimatedTotalValue, setGenerationEstimatedTotalValue] = useState(0)
   const [percent, setPercent] = useState(0)
   const [potence, setPotence] = useState(1000)

   useEffect(() => {
    let generationRealNumberValue = dataDevices.map((data) => {
      let generationRealValue = Number(data.generationRealMonth.replace(/\Kwh/g, ''))
      return generationRealValue;
    })
    setGenerationRealTotalValue(generationRealNumberValue.reduce((total, element) => total + element, 0).toFixed())

    let generationEstimatedNumberValue = dataDevices.map((data) => {
      let generationEstimatedValue = Number(data.generationEstimatedMonth.replace(/\Kwh/g, ''))
      return generationEstimatedValue;
    })
    setGenerationEstimatedTotalValue(generationEstimatedNumberValue.reduce((total, element) => total + element, 0).toFixed())
  }, [dataDevices])

   useEffect(() => {
      let percentResult = (generationRealTotalValue/generationEstimatedTotalValue)*100
      setPercent(percentResult.toFixed())
   }, [generationRealTotalValue, generationEstimatedTotalValue])

  return (
    <Document>
    <Page size="A5" style={styles.page}>
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.generationDate}>
            <Text style={styles.generationDateText}>Data de geração</Text>
            <Text style={styles.generationDateValue}>
             {date.getDate() < 10 ? '0' : ''}{date.getDate()}/
             {(date.getMonth() + 1) < 10 ? '0' : ''}{date.getMonth() + 1}/
             {date.getFullYear()}
            </Text>
            <Text style={{fontSize: '18px'}}>{useName}</Text>
          </View>
          <View style={styles.logo}>
            <Image style={{width: '140px', height: '60px'}} src="https://ucarecdn.com/0eb9df1d-e0d6-440f-96a7-a4037dffb862/"></Image>
          </View>
        </View>
        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardLabel}>DISPOSITIVOS/PLANTAS</Text>
              <Text style={styles.cardNumber}>{dataDevices.length}</Text>
            </View>     
            <Image style={styles.icon} src="https://ucarecdn.com/efd49320-e555-4813-af4b-bfffce905f67/"></Image>
          </View>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardLabel}>POTÊNCIA TOTAL</Text>
              <Text style={styles.cardNumber}>{potence} Kwp</Text>
            </View>
             <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>             
          </View>
        </View>
        <View style={styles.cardsRow}>
          <View style={styles.card}>
          <View>
            <Text style={styles.cardLabel}>GERAÇÃO TOTAL REAL</Text>
            <Text style={styles.cardNumber}>{generationRealTotalValue} Kwh</Text>
          </View>
          <Image style={styles.icon} src="https://ucarecdn.com/1f249566-c5ca-4724-bbbe-6878d50b1814/"></Image>            
        </View>
        <View style={styles.card}>
          <View>
            <Text style={styles.cardLabel}>GERAÇÃO TOTAL ESTIMADA</Text>
            <Text style={styles.cardNumber}>{generationEstimatedTotalValue} Kwh</Text>
          </View>
          <Image style={styles.icon} src="https://ucarecdn.com/1f249566-c5ca-4724-bbbe-6878d50b1814/"></Image>            
        </View>
        </View>
        <View style={styles.cardsRow}>
          <View style={styles.card}>
          <View>
            <Text style={styles.cardLabel}>PERCENTUAL</Text>
            <Text style={styles.cardNumber}>{percent} %</Text>
          </View>
          <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>
        </View>
        </View>
        <View style={styles.madeBy}>
          <Text style={styles.madeByText}>POWERED BY: MAYA TECH S.A</Text>
          <Image
            style={{width: '60px', height: '10px'}}
            src="https://ucarecdn.com/8961b481-f63f-4b00-96ee-a79fa1ba3470/-/brightness/-50/-/filter/briaril/100/-/preview/3000x3000/"
          ></Image>
        </View>
      </View>
    </Page>
  </Document>
  )
};
