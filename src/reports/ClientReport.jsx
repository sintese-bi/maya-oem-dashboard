import { useEffect } from "react";
import { reportAdministrator } from "./reportsRules/reportAdministratorRule";
import { reportClient } from "./reportsRules/reportClientRule";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";
import {
  handleMonthFilter,
  handleQuinzenaFilter,
  handleWeekFilter,
} from "src/helpers/utils";

export const ClientReport = () => {
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
      backgroundColor: reportClient.color,
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
      backgroundColor: reportClient.color,
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

  const startDate = reportClient.requistionStartDate;
  const endDate = reportClient.requisitionEndDate;

  const realData = reportClient.graphData.realGeneration;
  const estimatedData = reportClient.graphData.estimatedGeneration;

  const sortedDates = reportClient.graphData.realGeneration.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const realValues = sortedDates.map((data) => {
    return {
      value: parseFloat(data.value),
      date: moment(data.date).format("MM/DD/YYYY"),
    };
  });
  const estimatedValues = sortedDates.map((data, index) =>
    parseFloat(estimatedData[index])
  );

  let filteredWeekValues = handleWeekFilter(
    startDate,
    endDate,
    realValues,
    estimatedValues
  );

  let filteredMonthValues = handleMonthFilter(
    startDate,
    endDate,
    realValues,
    estimatedValues
  );

  let filteredQuinzenasValues = handleQuinzenaFilter(
    startDate,
    endDate,
    realValues,
    estimatedValues
  );

  const filterPeriodData = () => {
    switch (reportClient.optionFilter) {
      case "days":
        return {
          data: {
            realGeneration: realValues.map((data) => Number(data.value)),
            estimatedGeneration: estimatedValues.map((data) => data),
          },
          period: "Dias",
        };
        break;
      case "weeks":
        return {
          data: {
            realGeneration: filteredWeekValues.data.realGeneration.map(
              (data) => data / 1000
            ),
            estimatedGeneration:
              filteredWeekValues.data.estimatedGeneration.map(
                (data) => data / 1000
              ),
          },
          period: "Semanas",
        };
        break;
      case "months":
        return {
          data: {
            realGeneration: filteredMonthValues.data.realGeneration,
            estimatedGeneration: filteredMonthValues.data.estimatedGeneration,
          },
          period: "Meses",
        };
        break;
      case "biweek":
        return {
          data: {
            realGeneration: filteredQuinzenasValues.data.realGeneration,
            estimatedGeneration:
              filteredQuinzenasValues.data.estimatedGeneration,
          },
          period: "Quinzenas",
        };
        break;
      default:
        break;
    }
  };

  const filterPeriod = () => {
    switch (reportClient.optionFilter) {
      case "days":
        return realValues?.map((data) =>
          moment(data.date, "MM/DD/YYYY").format("DD")
        );
        break;
      case "weeks":
        return filteredWeekValues.weeks.map((data) => {
          let date = `${moment(data.startWeek).format("DD/MM")} - ${moment(
            data.endWeek
          ).format("DD/MM")}`;
          return date;
        });
        break;
      case "months":
        return filteredMonthValues.months.map((data) => {
          let date = `${moment(data.startMonth).format("DD/MM")} - ${moment(
            data.endMonth
          ).format("DD/MM")}`;
          return date;
        });
        break;
      case "biweek":
        return filteredQuinzenasValues.quinzenas.map((data) => {
          let date = `${moment(data.startQuinzena).format("DD/MM")} - ${moment(
            data.endQuinzena
          ).format("DD/MM")}`;
          return date;
        });
        break;
      default:
        break;
    }
  };

  const labelsTemp = filterPeriod();
  const periodData = filterPeriodData();

  const maxEstimated = Math.max(...periodData.data.estimatedGeneration);
  const maxReal = Math.max(...periodData.data.realGeneration);

  const yAxis = maxEstimated > maxReal ? maxEstimated : maxReal;

  let division = Math.ceil(yAxis / 100);
  let result = [];
  for (let i = 0; i <= division; i++) {
    if (i == division) {
      result.push(Math.ceil(Number(yAxis.toFixed())));
    } else {
      result.push(i * 100);
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
          {/*<View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100vw",
              height: "50vh",
              paddingHorizontal: "10px",
              paddingTop: "22px",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "486px",
                width: "100%",
                marginBottom: "24px",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "100%",
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
                  Série histórica da produção de Usinas. (MWh)
                </Text>
                <View
                  style={{
                    width: "100%",
                    height: "140px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
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
                      height: "100px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1,
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
                          width: "30px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "column",
                          marginTop: "auto",
                          height: `${yAxis / 100 + 42}px`,
                          borderRight: "1px solid #545353",
                        }}
                      >
                        {result.reverse().map((data, index) => (
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
                        width: "96%",
                        height: "130px",
                        display: "flex",
                        gap: 8,
                        flexDirection: "row",
                        marginLeft: "15px",
                      }}
                    >
                      {periodData.data?.realGeneration.map(
                        (realValue, index) => {
                          return (
                            <View
                              key={realValue.value}
                              style={{
                                display: "flex",
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
                                      realValue != 0
                                        ? 42 + realValue / 100
                                        : realValue
                                    }px`,
                                    backgroundColor: "#6CE5E8",
                                    marginTop: "auto",
                                  }}
                                ></View>
                                <View
                                  style={{
                                    width: "8px",
                                    height: `${
                                      periodData.data?.estimatedGeneration[
                                        index
                                      ] != 0
                                        ? 42 +
                                          periodData.data?.estimatedGeneration[
                                            index
                                          ] /
                                            100
                                        : periodData.data?.estimatedGeneration[
                                            index
                                          ]
                                    }px`,
                                    backgroundColor: "#2D8BBA",
                                    marginTop: "auto",
                                  }}
                                ></View>
                              </View>
                              <Text style={{ fontSize: "8px" }}>
                                {labelsTemp[index]}
                              </Text>
                            </View>
                          );
                        }
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "42px",
                      borderTop: "1px solid #545353",
                      width: "80%",
                      height: "60px",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      {`Dias`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View> */}
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
                  {reportClient.realGenerationTotal}
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
                  {reportClient.estimatedGenerationTotal}
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
                <Text style={styles.cardNumber}>{reportClient.savedtree}</Text>
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
                <Text style={styles.cardNumber}>{reportClient.carbon}</Text>
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
