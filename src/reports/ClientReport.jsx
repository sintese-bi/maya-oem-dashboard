import { getUserCookie } from "../services/session";
import { useState, useEffect } from "react";
import {numbers} from '../helpers/utils'
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
    padding: '22px',
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
  cardText: {
    fontSize: '8px',
    fontWeight: "ultrabold",
    width: '86px'
  },
  icon: {
    width: '36px',
    height: '36px',
    borderRadius: '50px',
  },
  madeBy: {
    marginTop: "62px",
    display: "flex",
    flexDirection: 'column',
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
    fontSize: '8px',
    marginBottom: '8px'
  },
});

export const ClientReport = ({generation, brand}) => {
    const { useName } = getUserCookie()
    const date = new Date()
    const [estimatedGenerationTotal, setEstimatedGenerationTotal] = useState(0)
    const [realGenerationTotal, setRealGenerationTotal] = useState(0)
    const [percent, setPercent] = useState(0);
    const [lowLevel, setLowLevel] = useState(true)

    useEffect(() => {
      setEstimatedGenerationTotal(generation?.estimatedGenerationTotal?.toFixed());
      setRealGenerationTotal(numbers(Number(generation.realGenerationTotal).toFixed()));
    }, [generation])

    useEffect(() => {
      let percentValue = (Number(generation.realGenerationTotal)/estimatedGenerationTotal)*100
      setPercent(percentValue.toFixed())
      generation.realGenerationTotal < estimatedGenerationTotal ? setLowLevel(true) : setLowLevel(false)
    }, [estimatedGenerationTotal])

  return (
    <Document>
    <Page size="A4" style={styles.page}>
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
            <Image style={{width: '160px', height: '62px'}} src="https://ucarecdn.com/0eb9df1d-e0d6-440f-96a7-a4037dffb862/"></Image>
          </View>
        </View>
        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardLabel}>MARCA</Text>
              <Text style={styles.cardText}>{brand}</Text>
            </View>     
            <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>
          </View>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardLabel}>POTÊNCIA</Text>
              <Text style={styles.cardNumber}>1000 Kwp</Text>
            </View>
             <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>             
          </View>
          <View style={styles.card}>
           <View>
             <Text style={styles.cardLabel}>GERAÇÃO TOTAL REAL</Text>
             <Text style={styles.cardNumber}>{realGenerationTotal} Kwh</Text>
           </View>
           <Image style={styles.icon} src="https://ucarecdn.com/1f249566-c5ca-4724-bbbe-6878d50b1814/"></Image>            
          </View>
        </View>
        <View style={styles.cardsRow}>
          <View style={styles.card}>
           <View>
             <Text style={styles.cardLabel}>GERAÇÃO TOTAL ESTIMADA</Text>
             <Text style={styles.cardNumber}>{estimatedGenerationTotal} Kwh</Text>
           </View>
           <Image style={styles.icon} src="https://ucarecdn.com/1f249566-c5ca-4724-bbbe-6878d50b1814/"></Image>            
          </View>
          <View style={styles.card}>
           <View>
            <Text style={styles.cardLabel}>PERCENTUAL</Text>
            <Text style={styles.cardNumber}>{percent} %</Text>
           </View>
           <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>
          </View>
          <View style={styles.card}>
           <View>
             <Text style={styles.cardLabel}>NÍVEL DE GERAÇÃO</Text>
             <Text style={styles.cardText}>{lowLevel ? 'O valor real está abaixo do estimado' : 'O valor real está acima do valor estimadoo'}</Text>
           </View>
           <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>            
          </View>
        </View>
        <View style={styles.cardsRow}>
        <View style={styles.card}>
           <View>
             <Text style={styles.cardLabel}>LOCALIZAÇÃO</Text>
             <Text style={styles.cardText}>Rua xxxx, nº362, Bairro Albuquerque</Text>
           </View>
           <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>            
          </View>
          <View style={styles.card}>
           <View>
             <Text style={styles.cardLabel}>PORTAL</Text>
             <Text style={styles.cardText}>xxxxxxx</Text>
           </View>
           <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>            
          </View>
          <View style={styles.card}>
           <View>
             <Text style={styles.cardLabel}>Status</Text>
             <Text style={styles.cardText}>Online</Text>
           </View>
           <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>            
          </View>
        </View>
        <View style={styles.cardsRow}>
          <View style={styles.card}>
           <View>
             <Text style={styles.cardLabel}>EMAIL</Text>
             <Text style={styles.cardText}>email@gmail.com</Text>
           </View>
           <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>            
          </View>
          <View style={styles.card}>
           <View>
             <Text style={styles.cardLabel}>CELULAR</Text>
             <Text style={styles.cardText}>(xx) x xxxx-xxxx</Text>
           </View>
           <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>            
          </View>
          <View style={styles.card}>
           <View>
             <Text style={styles.cardLabel}>NOME DE REF. DO CONTRATO</Text>
             <Text style={styles.cardText}>Felix Albuquerque</Text>
           </View>
           <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>            
          </View> 
        </View>
        <View style={styles.cardsRow}>
           <View style={styles.card}>
           <View>
             <Text style={styles.cardLabel}>Nº DE CONTRATO</Text>
             <Text style={styles.cardText}>1232930120</Text>
           </View>
           <Image style={styles.icon} src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"></Image>            
          </View>
        </View>
        <View style={styles.madeBy}>
          <Text style={styles.madeByText}>POWERED BY: MAYA TECH S.A </Text>
          <Image
            style={{width: '60px', height: '24px'}}
            src="https://ucarecdn.com/8961b481-f63f-4b00-96ee-a79fa1ba3470/-/brightness/-50/-/filter/briaril/100/-/preview/3000x3000/"
          ></Image>
        </View>
      </View>
    </Page>
  </Document>
  )
};
