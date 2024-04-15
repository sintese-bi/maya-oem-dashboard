import moment from "moment";
import { reportAdministrator } from "./reportsRules/reportAdministratorRule";
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

export const AdministratorReport = () => {
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
      backgroundColor: reportAdministrator.color,
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
      width: "182px",
      backgroundColor: reportAdministrator.color,
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
      marginTop: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "50%",
      bottom: "0px",
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

  const startDate = reportAdministrator.requistionStartDate;
  const endDate = reportAdministrator.requisitionEndDate;

  const realData = reportAdministrator.graphData.realGeneration;
  const estimatedData = reportAdministrator.graphData.estimatedGeneration;

  const sortedDates = Object.keys(
    reportAdministrator.graphData.realGeneration
  ).sort((a, b) => new Date(a) - new Date(b));

  // Mapear as datas para os valores correspondentes
  const realValues = sortedDates.map((data) => {
    return {
      value: parseFloat(realData[data]),
      date: moment(data).format("MM/DD/YYYY"),
    };
  });
  const estimatedValues = sortedDates.map((data) =>
    parseFloat(estimatedData[data])
  );

  let filteredWeekValues = handleWeekFilter(
    startDate,
    endDate,
    realValues,
    estimatedValues
  );

  let filteredMonthValues = handleMonthFilter(
    reportAdministrator.requistionStartDate,
    reportAdministrator.requisitionEndDate,
    realValues,
    estimatedValues
  );

  let filteredQuinzenasValues = handleQuinzenaFilter(
    reportAdministrator.requistionStartDate,
    reportAdministrator.requisitionEndDate,
    realValues,
    estimatedValues
  );

  const filterPeriodData = () => {
    switch (reportAdministrator.optionFilter) {
      case "days":
        return {
          data: {
            realGeneration: realValues.map((data) => Number(data.value) / 1000),
            estimatedGeneration: estimatedValues.map((data) => data / 1000),
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
    switch (reportAdministrator.optionFilter) {
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{ marginRight: "22px" }}>
                <Text style={styles.generationDateText}>Data de geração</Text>
                <Text style={styles.generationDateValue}>
                  {reportAdministrator.date.getDate() < 10 ? "0" : ""}
                  {reportAdministrator.date.getDate()}/
                  {reportAdministrator.date.getMonth() + 1 < 10 ? "0" : ""}
                  {reportAdministrator.date.getMonth() + 1}/
                  {reportAdministrator.date.getFullYear()}
                </Text>
              </View>
              <View style={styles.generationDate}>
                <Text style={styles.generationDateText}>
                  Data de aquisição dos dados
                </Text>
                <Text style={styles.generationDateValue}>
                  {reportAdministrator.requistionStartDate} -
                  {reportAdministrator.requisitionEndDate}
                </Text>
              </View>
            </View>
            <View style={styles.logo}>
              <Image
                style={{ width: "140px", height: "60px" }}
                src={reportAdministrator.logo}
              ></Image>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100vw",
              height: "40vh",
              paddingHorizontal: "10px",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            {/*
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
                      position: "relative",
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
                        bottom: "0px",
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
                          width: "40px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "column",
                          marginTop: "auto",
                          height: `${42 + yAxis / 100}px`,
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
            */}
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "16px",
                  justifyContent: "space-between",
                  width: "98%",
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
                    <Text style={styles.cardLabel}>
                      POTÊNCIA TOTAL DAS USINAS
                    </Text>
                    <Text style={styles.cardNumber}>
                      {reportAdministrator.capacityTotalValue}
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
                      {reportAdministrator.generationRealTotalValue}
                    </Text>
                  </View>
                  <Image
                    style={styles.icon}
                    src="https://ucarecdn.com/9a316c8f-b101-4a3a-8752-f52188ca3e51/-/brightness/-74/-/contrast/500/-/saturation/86/-/filter/ferand/100/-/preview/3000x3000/"
                  ></Image>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                  width: "98%",
                }}
              >
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardLabel}>GERAÇÃO TOTAL ESTIMADA</Text>
                    <Text style={styles.cardNumber}>
                      {reportAdministrator.generationEstimatedTotalValue}
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
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardLabel}>
                      EMISSÃO DE CARBONO ECONOMIZADA NA ATMOSFERA
                    </Text>
                    <Text style={styles.cardNumber}>
                      {reportAdministrator.carbon}
                    </Text>
                  </View>
                  <Image
                    style={styles.icon}
                    src="https://ucarecdn.com/17b3e20c-e6a4-4807-90b2-024841485e69/-/gamma/0/-/preview/3000x3000/"
                  ></Image>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "98%",
                }}
              >
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
          </View>
          <View
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              justifyContent: "flex-start",
              display: "flex",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                marginBottom: "26px",
              }}
            >
              Listagem de plantas com desempenho de hoje
            </Text>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <Text
                style={{ width: "20%", fontSize: "8px", textAlign: "center" }}
              >
                DEVICE
              </Text>
              <Text
                style={{ width: "20%", fontSize: "8px", textAlign: "center" }}
              >
                POTÊNCIA
              </Text>
              <Text
                style={{ width: "20%", fontSize: "8px", textAlign: "center" }}
              >
                GERAÇÃO REAL
              </Text>
              <Text
                style={{ width: "20%", fontSize: "8px", textAlign: "center" }}
              >
                GERAÇÃO ESTIMADA
              </Text>
              <Text
                style={{ width: "20%", fontSize: "8px", textAlign: "center" }}
              >
                DESEMPENHO
              </Text>
            </View>
            {reportAdministrator.devices.map((data, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    padding: "12px 5px 12px 5px",
                    backgroundColor: reportAdministrator.color,
                    color: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Text
                    style={{
                      width: "20%",
                      fontSize: "10px",
                      textAlign: "center",
                    }}
                  >
                    {data.name}
                  </Text>
                  <Text
                    style={{
                      width: "20%",
                      fontSize: "10px",
                      textAlign: "center",
                    }}
                  >
                    {data.capacity} KWp
                  </Text>
                  <Text
                    style={{
                      width: "20%",
                      fontSize: "10px",
                      textAlign: "center",
                    }}
                  >
                    {data.generationRealDay} KWh
                  </Text>
                  <Text
                    style={{
                      width: "20%",
                      fontSize: "10px",
                      textAlign: "center",
                    }}
                  >
                    {data.generationEstimatedDay} KWh
                  </Text>
                  <Text
                    style={{
                      width: "20%",
                      fontSize: "10px",
                      textAlign: "center",
                    }}
                  >
                    {data.perfomance} %
                  </Text>
                </View>
              );
            })}
          </View>
          {/**<View
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
          </View> */}
          {/** <View style={styles.madeBy}>
            <Text style={styles.madeByText}>POWERED BY: MAYA TECH S.A</Text>
            <Image
              style={{ width: "60px", height: "24px" }}
              src="https://ucarecdn.com/8961b481-f63f-4b00-96ee-a79fa1ba3470/-/brightness/-50/-/filter/briaril/100/-/preview/3000x3000/"
            ></Image>
          </View> */}
        </View>
      </Page>
    </Document>
  );
};
