import toast from "react-hot-toast";
import moment from "moment";

//FORMATA DATA TIME = 00:00
export const formatTime = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();

  // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;

  var strTime = hours + ":" + minutes;
  return strTime;
};

//FORMATA DATA = day-month-year
export const formatDate = (dt, s = "-") => {
  const yearF = dt?.getFullYear();
  const monthF = `00${dt?.getMonth() + 1}`.slice(-2);
  const dayF = `00${dt?.getDate()}`.slice(-2);

  return yearF + s + monthF + s + dayF;
};

//FORMATA DATA = day-month-year
export const formatDatePtbr = (dt, s = "-") => {
  const date = dt.split("-", 3);
  return date[2] + s + date[1] + s + date[0];
};

//CHECK PERIOD || EM QUE PERÍODO DO DIA ESTAMOS ?
export const checkPeriod = (period) => {
  const dataPeriod = [
    { timeEnd: "00:00", timeStart: "11:59", period: "matutino" },
    { timeEnd: "12:00", timeStart: "17:59", period: "vespertino" },
    { timeEnd: "18:00", timeStart: "23:59", period: "noturno" },
  ];

  return dataPeriod.filter(
    (dt) => period >= dt.timeEnd && period <= dt.timeStart && dt
  );
};

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const RandomCharValuesFake = (max, min, length) => {
  let array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return array;
};

//PEGANDO A QUANTIDADE DE DIAS DO MÊS
export const daysOfTheMonth = (date) => {
  var numAno = date.getFullYear(),
    numMes = date.getMonth() + 1,
    numDias = new Date(numAno, numMes, 0).getDate();

  return numDias;
};

// ESTRUTURANDO DADOS PARA O GRAFICO DE PROJETADA VS REAL (Kwh)
export const realVsEstimatedGeneration = (data, type, day, month, year) => {
  const realGeneration = Array(day).fill(0);
  const estimatedGeneration = Array(day).fill(10);
  const label =
    type === "month"
      ? Array(day)
          .fill(null)
          .map((_, i) => i + 1)
      : [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ];

  if (type === "month") {
    data.aggregated.map((generation) => {
      let yearBooleano = parseInt(generation.agg_year) === year ? true : false;
      let monthBooleano =
        parseInt(generation.agg_month) === month ? true : false;

      if (yearBooleano && monthBooleano) {
        label.filter((d, index) => {
          let dayBooleano = parseInt(generation.agg_day) === d ? true : false;

          if (dayBooleano && generation.aggregated_channels.length !== 0) {
            if (generation.aggregated_channels[0].agg_ch_value) {
              realGeneration[index] = parseFloat(
                generation.aggregated_channels[0].agg_ch_value / 1000
              ).toFixed(2);
            }
          }
        });
      }
    });
  } else {
    data.aggregated.map((generation) => {
      let yearBooleano = parseInt(generation.agg_year) === year ? true : false;
      if (yearBooleano) {
        label.filter((_, index) => {
          let dayBooleano =
            parseInt(generation.agg_month) === index + 1 ? true : false;
          if (dayBooleano && generation.aggregated_channels.length !== 0) {
            if (generation.aggregated_channels[0].agg_ch_value) {
              realGeneration[index] = parseFloat(
                generation.aggregated_channels[0].agg_ch_value / 1000
              ).toFixed(2);
            }
          }
        });
      }
    });
  }

  const realGenerationTotal = realGeneration.reduce(function (soma, i) {
    return parseFloat(soma) + parseFloat(i);
  });

  const generationPercentage = sunArrayPercentage(
    realGeneration,
    estimatedGeneration
  );

  const generationPercentageTotal = generationPercentage.reduce(function (
    soma,
    i
  ) {
    return parseInt(soma) + parseInt(i);
  });

  return {
    label,
    realGeneration,
    estimatedGeneration,

    realGenerationTotal: parseFloat(realGenerationTotal).toFixed(2),
    estimatedGenerationTotal: estimatedGeneration[0],
    generationPercentageTotal,
    generationPercentage,
  };
};

// ESTRUTRANDO DADOS PARA BIGNUBER DE INVESTIMENTO
export const investmentGeneration = (data, day, month, year, uuId) => {
  const formatData = [];
  const carbonPaid = 0.817;
  let dailysavings = 0.0;
  let monthlysavings = 0.0;
  let annualsavings = 0.0;
  let totalsavings = 0.0;

  data.aggregated.map((generation) => {
    if (generation.aggregated_channels.length !== 0) {
      if (generation.aggregated_channels[0].agg_ch_value) {
        if (
          parseInt(generation.agg_day) === day &&
          parseInt(generation.agg_month) === month &&
          parseInt(generation.agg_year) === year
        ) {
          dailysavings = parseFloat(
            generation.aggregated_channels[0].agg_ch_value
          );
        }

        if (
          parseInt(generation.agg_month) === month &&
          parseInt(generation.agg_year) === year
        )
          monthlysavings += parseFloat(
            generation.aggregated_channels[0].agg_ch_value
          );

        if (parseInt(generation.agg_year) === year)
          annualsavings += parseFloat(
            generation.aggregated_channels[0].agg_ch_value
          );

        totalsavings += parseFloat(
          generation.aggregated_channels[0].agg_ch_value
        );
      }
    }
  });

  const amountPaid = localStorage.getItem(uuId);

  // VALOR DE VESTIMENTO * GERAÇÃO REAL
  dailysavings = parseFloat(
    (dailysavings * parseFloat(amountPaid)) / 1000
  ).toFixed(2);
  monthlysavings = parseFloat(
    (monthlysavings * parseFloat(amountPaid)) / 1000
  ).toFixed(2);
  annualsavings = parseFloat(
    (annualsavings * parseFloat(amountPaid)) / 1000
  ).toFixed(2);
  totalsavings = parseFloat(
    (totalsavings * parseFloat(amountPaid)) / 1000
  ).toFixed(2);
  // CREDITO DE CARBONO * GERAÇÃO REAL
  const dailyCarbon = parseFloat((dailysavings * carbonPaid) / 1000).toFixed(2);
  const monthlyCarbon = parseFloat(
    (monthlysavings * carbonPaid) / 1000
  ).toFixed(2);
  const annualCarbon = parseFloat((annualsavings * carbonPaid) / 1000).toFixed(
    2
  );
  const totalCarbon = parseFloat((totalsavings * carbonPaid) / 1000).toFixed(2);

  if (!amountPaid) {
    formatData.push({
      dailysavings,
      monthlysavings,
      annualsavings,
      totalsavings,
      dailyCarbon,
      monthlyCarbon,
      annualCarbon,
      totalCarbon,
    });
    toast.success(
      "Preenche o 'valor de investimento', para mostrar o calculo de"
    );
  } else {
    formatData.push({
      dailysavings: parseFloat(dailysavings).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }),
      monthlysavings: parseFloat(monthlysavings).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }),
      annualsavings: parseFloat(annualsavings).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }),
      totalsavings: parseFloat(totalsavings).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }),

      dailyCarbon: parseFloat(dailyCarbon).toLocaleString("pt-br"),
      monthlyCarbon: parseFloat(monthlyCarbon).toLocaleString("pt-br"),
      annualCarbon: parseFloat(annualCarbon).toLocaleString("pt-br"),
      totalCarbon: parseFloat(totalCarbon).toLocaleString("pt-br"),
    });
  }

  return formatData;
};

// FORMATANDO INPUT MONETARIO PT BR
export const formatarMoeda = (amountPaid) => {
  var valor = amountPaid;

  valor = valor + "";
  valor = parseInt(valor.replace(/[\D]+/g, ""));
  valor = valor + "";
  valor = valor.replace(/([0-9]{2})$/g, ",$1");

  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  if (valor == "NaN") return "";
  return valor;
};

export const sunArrayPercentage = (arr1, arr2) => {
  return arr1.map((value, idx) => {
    return parseInt((value * arr2[idx]) / 100);
  });
};

// PROPS DE ESTILIZAÇÃO DE SELECT
export const selectPropsStyle = () => {
  return {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };
};

// FORMATA UMA STRING PARA UM VALOR MONETÁRIO SEPARANDO OS MILHARES POR VIRGULA
export const numbers = (value, unity) => {
  let number = value;

  if (unity != "CO2" && unity != "R$") {
    if (number.length > 6 && number.length < 10) {
      let stringToNumber = Number(number / 1000).toFixed(2);
      let numberToArray = stringToNumber?.split("");
      numberToArray.splice(-3, 1, ",");
      let transformedNumber =
        numberToArray.join("") +
        ` ${unity == "KWh" ? "MWh" : unity == "KWp" ? "MWp" : ""}`;
      return transformedNumber;
    } else if (number.length >= 10) {
      let stringToNumber = Number(number / 1000).toFixed(2);
      let numberToArray = stringToNumber?.split("");
      numberToArray.splice(-3, 1, ",");
      numberToArray.splice(-6, 0, ".");
      let transformedNumber =
        numberToArray.join("") +
        ` ${unity == "KWh" ? "MWh" : unity == "KWp" ? "MWp" : ""}`;
      return transformedNumber;
    } else if (number.length <= 6) {
      let numberToArray = number?.split("");
      numberToArray.splice(-3, 1, ",");
      let transformedNumber =
        numberToArray.join("") +
        ` ${unity == "KWh" ? "KWh" : unity == "KWp" ? "KWp" : ""}`;
      return transformedNumber;
    }
  } else {
    if (number.length > 6 && number.length < 10) {
      let stringToNumber = Number(number).toFixed(2);
      let numberToArray = stringToNumber?.split("");
      numberToArray.splice(-3, 1, ",");
      numberToArray.splice(-6, 0, ".");
      let transformedNumber = numberToArray.join("") + ` ${unity}`;
      return transformedNumber;
    } else if (number.length >= 10) {
      let stringToNumber = Number(number).toFixed(2);
      let numberToArray = stringToNumber?.split("");
      numberToArray.splice(-3, 1, ",");
      numberToArray.splice(-6, 0, ".");
      numberToArray.splice(-10, 0, ".");
      let transformedNumber = numberToArray.join("") + ` ${unity}`;
      return transformedNumber;
    } else if (number.length <= 6) {
      let numberToArray = number?.split("");
      numberToArray.splice(-3, 1, ",");
      let transformedNumber = numberToArray.join("") + ` ${unity}`;
      return transformedNumber;
    }
  }
};

export const handleWeekFilter = (
  startDate,
  endDate,
  realGeneration,
  estimatedGeneration
) => {
  const weeks = [];
  let recentDate = moment(startDate).startOf("week");
  let endOfInterval = moment(endDate);
  while (recentDate.isBefore(endDate) || recentDate.isSame(endDate, "week")) {
    let startWeek = recentDate.clone().startOf("week");
    let endWeek = recentDate.clone().endOf("week");

    if (endWeek.isAfter(endOfInterval)) {
      endWeek = endOfInterval.clone();
    }

    weeks.push({
      startWeek: moment(startWeek).format("MM/DD/YYYY"),
      endWeek: moment(endWeek).format("MM/DD/YYYY"),
    });

    recentDate.add(1, "week");
  }

  let filteredValues = {
    data: filterValuesByWeeks(realGeneration, estimatedGeneration, weeks),
    weeks,
  };
  return filteredValues;
};

export const handleMonthFilter = (
  startDate,
  endDate,
  realGeneration,
  estimatedGeneration
) => {
  const months = [];
  let recentDate = moment(startDate).startOf("month");

  while (recentDate.isBefore(endDate) || recentDate.isSame(endDate)) {
    let startMonth = recentDate.clone().startOf("month");
    let endMonth = recentDate.clone().endOf("month");

    months.push({
      startMonth: moment(startMonth).format("MM/DD/YYYY"),
      endMonth: moment(endMonth).format("MM/DD/YYYY"),
    });
    recentDate.add(1, "month");
  }
  let filteredValues = {
    data: filterValuesByMonths(realGeneration, estimatedGeneration, months),
    months,
  };

  return filteredValues;
};

export const handleQuinzenaFilter = (
  startDate,
  endDate,
  realGeneration,
  estimatedGeneration
) => {
  const quinzenas = [];
  let recentDate = moment(startDate).startOf("month");

  while (recentDate.isBefore(endDate) || recentDate.isSame(endDate)) {
    let startQuinzena = recentDate.clone();
    let endQuinzena = recentDate.add(14, "days");

    quinzenas.push({
      startQuinzena: moment(startQuinzena).format("MM/DD/YYYY"),
      endQuinzena: moment(endQuinzena).format("MM/DD/YYYY"),
    });

    recentDate.add(1, "days");
  }
  let filteredValues = {
    data: filterValuesByQuinzenas(
      realGeneration,
      estimatedGeneration,
      quinzenas
    ),
    quinzenas,
  };

  return filteredValues;
};

function filterValuesByQuinzenas(dataArray, estimatedGeneration, quinzenas) {
  const filteredValues = [];

  for (const quinzena of quinzenas) {
    const startQuinzena = new Date(quinzena.startQuinzena);
    const endQuinzena = new Date(quinzena.endQuinzena);
    const valuesInQuinzena = dataArray?.filter((item) => {
      let date = moment(item.date, "MM/DD/YYYY");
      const itemDate = new Date(date);
      return itemDate >= startQuinzena && itemDate <= endQuinzena;
    });
    filteredValues.push(valuesInQuinzena);
  }

  let finalResult = {
    realGeneration: filteredValues.map((quinzena) => {
      let totalValue = quinzena?.reduce(
        (total, element) => total + Number(element.value),
        0
      );
      return totalValue?.toFixed(2);
    }),
    estimatedGeneration: Array(filteredValues.length).fill(
      estimatedGeneration?.[0] * 15
    ),
  };

  return finalResult;
}

function filterValuesByMonths(dataArray, estimatedGeneration, months) {
  const filteredValues = [];

  for (const month of months) {
    const startMonth = new Date(month.startMonth);
    const endMonth = new Date(month.endMonth);
    const valuesInMonth = dataArray?.filter((item) => {
      let date = moment(item.date, "MM/DD/YYYY");
      const itemDate = new Date(date);
      return itemDate >= startMonth && itemDate <= endMonth;
    });
    filteredValues.push(valuesInMonth);
  }

  let finalResult = {
    realGeneration: filteredValues.map((month) => {
      let totalValue = month?.reduce(
        (total, element) => total + Number(element.value),
        0
      );
      return totalValue?.toFixed(2);
    }),
    estimatedGeneration: Array(filteredValues.length).fill(
      estimatedGeneration?.[0] * 30
    ),
  };
  return finalResult;
}

function filterValuesByWeeks(dataArray, estimatedGeneration, weeks) {
  const filteredValues = [];
  for (const week of weeks) {
    const startWeek = new Date(week.startWeek);
    const endWeek = new Date(week.endWeek);

    const valuesInWeek = dataArray?.filter((item) => {
      let date = moment(item.date, "MM/DD/YYYY");
      const itemDate = new Date(date);
      return itemDate >= startWeek && itemDate <= endWeek;
    });
    filteredValues.push(valuesInWeek);
  }

  let finalResult = {
    realGeneration: filteredValues.map((week) => {
      let totalValue = week?.reduce(
        (total, element) => total + Number(element.value),
        0
      );
      return totalValue?.toFixed(2);
    }),
    estimatedGeneration: Array(filteredValues.length).fill(
      estimatedGeneration?.[0] * 7
    ),
  };

  return finalResult;
}
