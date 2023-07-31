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

export const Report = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.main}>
        <View>
          <View style={styles.datesAndApresentation}>
            <Text style={styles.creationDate}>Março de 2022</Text>
            <Text style={styles.filteredDate}>De 01/03/2022 a 31/03/2022</Text>
            <Text style={styles.clientName}>Olá Janete Lima</Text>
          </View>
          <View style={styles.economyCard}>
            <Text style={styles.economyCardText}>
              Neste mês, você economizou
            </Text>
            <Text style={styles.economyCardFirstMoney}>R$548,42</Text>
            <Image src="https://ucarecdn.com/d1cd1010-94d6-481f-81cd-2788bf644cd3/"></Image>
            <Text style={styles.economyCardText}>
              Desde o ínicio da operação da sua Usina:
            </Text>
            <Text style={styles.economyCardSecondMoney}>R$4.587,98</Text>
          </View>
          <View>
            <Text style={styles.yourContributionToWorld}>
              Sua contribuição para o mundo
            </Text>
            <View style={styles.saveWorldCards}>
              <Image
                style={styles.saveWorldCardsImgs}
                src="https://ucarecdn.com/efd49320-e555-4813-af4b-bfffce905f67/"
              ></Image>
              <View>
                <Text style={styles.saveWorldCardsNumbers}>2</Text>
                <Text style={styles.filteredDate}>
                  Toneladas de co2 evitados
                </Text>
              </View>
            </View>
            <View style={styles.saveWorldCards}>
              <Image
                style={styles.saveWorldCardsImgs}
                source="https://ucarecdn.com/17b3e20c-e6a4-4807-90b2-024841485e69/"
              ></Image>
              <View>
                <Text style={styles.saveWorldCardsNumbers}>0,60</Text>
                <Text style={styles.filteredDate}>
                  Toneladas de co2 evitados
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.mayaLogo}>
            <Image
              style={styles.mayaLogoPng}
              src="https://ucarecdn.com/87d56ae2-8c84-489e-91fa-792d5aa18b6b/"
            ></Image>
          </View>
          <View style={styles.productionCard}>
            <Image
              style={styles.saveWorldCardsImgs}
              src="https://ucarecdn.com/41bca4b7-5a93-45b8-aec8-16ac5d7c9a9e/"
            ></Image>
            <View>
              <Text style={styles.productionCardText}>
                Sua produção em relação ao esperado foi de
              </Text>
              <Text style={styles.productionCardNumber}>151%</Text>
            </View>
          </View>
          <Text style={styles.yourContributionToWorld}>
            Sua produção dos últimos meses:
          </Text>
          <View style={styles.production}>
            <View style={styles.productionElement}>
              <Text style={styles.productionElementDate}>Jun/21</Text>
              <View style={styles.productionElementGraph}>
                <Text>Desempenho: 89%</Text>
                <View style={styles.productionElementGraphResults}>
                  <View>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 120,40 120,-40"
                        fill="#009C77"
                      />
                    </Svg>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 130,40 180,-40"
                        fill="#E6AF32"
                      />
                    </Svg>
                  </View>
                  <View style={styles.productionElementProductionAmount}>
                    <Text
                      style={
                        styles.productionElementProductionAmountFirstNumber
                      }
                    >
                      243,0kWh
                    </Text>
                    <Text
                      style={
                        styles.productionElementProductionAmountSecondNumber
                      }
                    >
                      243,0kWh
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.productionElement}>
              <Text style={styles.productionElementDate}>Jun/21</Text>
              <View style={styles.productionElementGraph}>
                <Text>Desempenho: 89%</Text>
                <View style={styles.productionElementGraphResults}>
                  <View>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 120,40 120,-40"
                        fill="#009C77"
                      />
                    </Svg>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 130,40 180,-40"
                        fill="#E6AF32"
                      />
                    </Svg>
                  </View>
                  <View style={styles.productionElementProductionAmount}>
                    <Text
                      style={
                        styles.productionElementProductionAmountFirstNumber
                      }
                    >
                      243,0kWh
                    </Text>
                    <Text
                      style={
                        styles.productionElementProductionAmountSecondNumber
                      }
                    >
                      243,0kWh
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.productionElement}>
              <Text style={styles.productionElementDate}>Jun/21</Text>
              <View style={styles.productionElementGraph}>
                <Text>Desempenho: 89%</Text>
                <View style={styles.productionElementGraphResults}>
                  <View>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 120,40 120,-40"
                        fill="#009C77"
                      />
                    </Svg>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 130,40 180,-40"
                        fill="#E6AF32"
                      />
                    </Svg>
                  </View>
                  <View style={styles.productionElementProductionAmount}>
                    <Text
                      style={
                        styles.productionElementProductionAmountFirstNumber
                      }
                    >
                      243,0kWh
                    </Text>
                    <Text
                      style={
                        styles.productionElementProductionAmountSecondNumber
                      }
                    >
                      243,0kWh
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.productionElement}>
              <Text style={styles.productionElementDate}>Jun/21</Text>
              <View style={styles.productionElementGraph}>
                <Text>Desempenho: 89%</Text>
                <View style={styles.productionElementGraphResults}>
                  <View>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 120,40 120,-40"
                        fill="#009C77"
                      />
                    </Svg>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 130,40 180,-40"
                        fill="#E6AF32"
                      />
                    </Svg>
                  </View>
                  <View style={styles.productionElementProductionAmount}>
                    <Text
                      style={
                        styles.productionElementProductionAmountFirstNumber
                      }
                    >
                      243,0kWh
                    </Text>
                    <Text
                      style={
                        styles.productionElementProductionAmountSecondNumber
                      }
                    >
                      243,0kWh
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.productionElement}>
              <Text style={styles.productionElementDate}>Jun/21</Text>
              <View style={styles.productionElementGraph}>
                <Text>Desempenho: 89%</Text>
                <View style={styles.productionElementGraphResults}>
                  <View>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 120,40 120,-40"
                        fill="#009C77"
                      />
                    </Svg>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 130,40 180,-40"
                        fill="#E6AF32"
                      />
                    </Svg>
                  </View>
                  <View style={styles.productionElementProductionAmount}>
                    <Text
                      style={
                        styles.productionElementProductionAmountFirstNumber
                      }
                    >
                      243,0kWh
                    </Text>
                    <Text
                      style={
                        styles.productionElementProductionAmountSecondNumber
                      }
                    >
                      243,0kWh
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.productionElement}>
              <Text style={styles.productionElementDate}>Jun/21</Text>
              <View style={styles.productionElementGraph}>
                <Text>Desempenho: 89%</Text>
                <View style={styles.productionElementGraphResults}>
                  <View>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 120,40 120,-40"
                        fill="#009C77"
                      />
                    </Svg>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 130,40 180,-40"
                        fill="#E6AF32"
                      />
                    </Svg>
                  </View>
                  <View style={styles.productionElementProductionAmount}>
                    <Text
                      style={
                        styles.productionElementProductionAmountFirstNumber
                      }
                    >
                      243,0kWh
                    </Text>
                    <Text
                      style={
                        styles.productionElementProductionAmountSecondNumber
                      }
                    >
                      243,0kWh
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.productionElement}>
              <Text style={styles.productionElementDate}>Jun/21</Text>
              <View style={styles.productionElementGraph}>
                <Text>Desempenho: 89%</Text>
                <View style={styles.productionElementGraphResults}>
                  <View>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 120,40 120,-40"
                        fill="#009C77"
                      />
                    </Svg>
                    <Svg height="8" width="140">
                      <Polygon
                        points="0,0 0,40 130,40 180,-40"
                        fill="#E6AF32"
                      />
                    </Svg>
                  </View>
                  <View style={styles.productionElementProductionAmount}>
                    <Text
                      style={
                        styles.productionElementProductionAmountFirstNumber
                      }
                    >
                      243,0kWh
                    </Text>
                    <Text
                      style={
                        styles.productionElementProductionAmountSecondNumber
                      }
                    >
                      243,0kWh
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.productionkWh}>
              <View style={styles.productionkWhItem}>
                <Svg height="10" width="10">
                  <Polygon points="0,0 0,10 10,10 10,-10" fill="#009C77" />
                </Svg>
                <Text style={styles.productionkWhItemText}>Produção (kWh)</Text>
              </View>
              <View style={styles.productionkWhItem}>
                <Svg height="10" width="10">
                  <Polygon points="0,0 0,10 10,10 10,-10" fill="#E6AF32" />
                </Svg>
                <Text style={styles.productionkWhItemText}>
                  Produção esperada (kWh)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.foot}>
        <View style={styles.congrats}>
          <Image
            style={styles.saveWorldCardsImgs}
            src="https://ucarecdn.com/4a094dd7-f0ba-4e01-a94e-ed2b2cc134ea/"
          ></Image>
          <View>
            <Text style={styles.congratsMainText}>
              Parábens pelos seus resultados!
            </Text>
            <Text style={styles.congratsSecondText}>
              Além de economizar, você torna nossa sociedade mais sustentável
            </Text>
          </View>
        </View>
        <View style={styles.madeBy}>
          <Text style={styles.congratsSecondText}>Feito com </Text>
          <Image
            style={styles.light}
            src="https://ucarecdn.com/b17681b4-6bfd-4435-8153-548ea4880939/"
          ></Image>
          <Text style={styles.congratsSecondText}>pela</Text>
          <Image
            style={styles.pdfEndImg}
            src="https://ucarecdn.com/bc612b90-2b8d-4845-b516-65f33806e959/"
          ></Image>
        </View>
      </View>
    </Page>
  </Document>
);
