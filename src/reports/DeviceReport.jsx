import { reportDevice } from "./reportsRules/reportDeviceRule";
import moment from "moment";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import {
  handleMonthFilter,
  handleQuinzenaFilter,
  handleWeekFilter,
} from "src/helpers/utils";

export const DeviceReport = () => {
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

  const sortedDates = reportDevice.devicesGenerationData?.realGeneration?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const realValues = sortedDates?.map((data) => {
    return {
      value: parseFloat(data.value),
      date: moment(data.date).format("MM/DD/YYYY"),
    };
  });
  const estimatedValues =
    reportDevice.devicesGenerationData?.estimatedGeneration?.map((data) =>
      parseFloat(data)
    );
  const realGeneration = realValues?.map((data) => Number(data.value) / 1000);
  const estimatedGeneration = estimatedValues?.map((data) => data / 1000);

  const maxEstimated = Math.max(...estimatedGeneration);
  const maxReal = Math.max(...realGeneration);

  const yAxis = maxEstimated > maxReal ? maxEstimated : maxReal;

  const division = Math.ceil(yAxis);
  let result = [];
  for (let i = 0; i <= division; i++) {
    if (i == division) {
      result.push(Math.ceil(Number(yAxis)));
    } else {
      result.push(i);
    }
  }

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
                    {reportDevice.date.getDate() < 10 ? "0" : ""}
                    {reportDevice.date.getDate()}/
                    {reportDevice.date.getMonth() + 1 < 10 ? "0" : ""}
                    {reportDevice.date.getMonth() + 1}/
                    {reportDevice.date.getFullYear()}
                  </Text>
                </View>
                <View style={styles.generationDate}>
                  <Text style={styles.generationDateText}>
                    Data de aquisição dos dados
                  </Text>
                  <Text style={styles.generationDateValue}>
                    {reportDevice.requistionStartDate} -
                    {reportDevice.requisitionEndDate}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: "12px", marginBottom: "10px" }}>
                  End. de instalação: {reportDevice.address}
                </Text>
                <Text style={{ fontSize: "8px", marginBottom: "10px" }}>
                  Planta: {reportDevice.deviceName}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: "18px", marginRight: "20px" }}>
                  Cliente: {reportDevice.useName}
                </Text>
              </View>
            </View>
            <View style={styles.logo}>
              <Image
                style={{ width: "160px", height: "62px" }}
                src="https://ucarecdn.com/258f82dc-bf80-4b30-a4be-bcea7118f14a/"
              ></Image>
            </View>
          </View>
          {/*
            <View
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "100vw",
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
                fontWeight: "heavy",
                fontSize: "12px",
              }}
            >
              Comparação da geração real e estimada
            </Text>
            <View
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "40px",
                  gap: 2,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontSize: "10px" }}>Geração real</Text>
                  <View
                    style={{
                      height: "14px",
                      width: "14px",
                      backgroundColor: "#6CE5E8",
                      borderRadius: "5px",
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontSize: "10px" }}>Geração estimada</Text>
                  <View
                    style={{
                      height: "14px",
                      width: "14px",
                      borderRadius: "5px",
                      backgroundColor: "#2D8BBA",
                    }}
                  ></View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                    widh: "12px",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      M
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: "10px" }}>
                      W
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: "10px" }}>
                      h
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "4%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "column",
                      height: `${division * 50}px`,
                    }}
                  >
                    {result?.reverse().map((data, index) => (
                      <Text
                        key={index}
                        style={{
                          fontSize: "8px",
                        }}
                      >
                        {data}
                      </Text>
                    ))}
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    gap: 8,
                    flexDirection: "row",
                    marginLeft: "15px",
                  }}
                >
                  {realValues?.map((realValue, index) => {
                    return (
                      <View
                        key={realValue.value}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          gap: 1,
                          marginTop: "auto",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            gap: 1,
                            marginTop: "auto",
                          }}
                        >
                          <View
                            style={{
                              width: "8px",
                              height: `${
                                realValue.value != 0
                                  ? 50 * (realValue.value / 1000)
                                  : realValue.value
                              }px`,
                              backgroundColor: "#6CE5E8",
                              marginTop: "auto",
                            }}
                          ></View>
                          <View
                            style={{
                              width: "8px",
                              height: `${
                                estimatedValues[index] != 0
                                  ? 50 * (estimatedValues[index] / 1000)
                                  : estimatedValues[index]
                              }px`,
                              backgroundColor: "#2D8BBA",
                              marginTop: "auto",
                            }}
                          ></View>
                        </View>
                        <Text
                          style={{
                            position: "absolute",
                            bottom: "-12px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "8px",
                          }}
                        >
                          {moment(realValue.date).format("DD")}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "10px",
                  marginTop: "26px",
                }}
              >
                {"Dias"}
              </Text>
            </View>
          </View>
          */}
          <View style={styles.cardsRow}>
            <View style={styles.card}>
              <View>
                <Text style={styles.cardLabel}>GERAÇÃO TOTAL REAL</Text>
                <Text style={styles.cardNumber}>
                  {reportDevice.realGenerationTotal}
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
                  {reportDevice.estimatedGenerationTotal}
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
                <Text style={styles.cardNumber}>{reportDevice.percent} %</Text>
              </View>
              <Image
                style={styles.icon}
                src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/"
              ></Image>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "69%",
              justifyContent: "space-around",
              marginVertical: "8px",
            }}
          >
            <View style={styles.card}>
              <View>
                <Text style={styles.cardLabel}>
                  ÁRVORES SALVAS PELA ECONOMIA DE CARBONO
                </Text>
                <Text style={styles.cardNumber}>{reportDevice.savedtree}</Text>
              </View>
              <Image
                style={styles.icon}
                src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
              ></Image>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.cardLabel}>
                  EMISSÃO DE CARBONO ECONOMIZADA NA ATMOSFERA
                </Text>
                <Text style={styles.cardNumber}>{reportDevice.carbon}</Text>
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
            <Text style={{ fontSize: "12px" }}>{reportDevice.situation}</Text>
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
