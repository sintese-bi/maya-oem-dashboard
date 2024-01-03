import moment from "moment-timezone";
import toast from "react-hot-toast";
import { sunArrayPercentage } from "./utils";

// ESTRUTURANDO DADOS PARA O GRAFICO DE PROJETADA VS REAL (Kwh)
export const handlesGeneration = (data, type, day, label) => {
  const estimated = data.generation[0]?.gen_estimated
    ? data.generation[0]?.gen_estimated
    : 0;

  const realGeneration = Array(day).fill(0);
  const estimatedGeneration = Array(day).fill(estimated);

  // RETORNAR PORCENTAGEM MAXIMA E MINIMA
  let percentMax = estimatedGeneration[0] * 0.2 + estimatedGeneration[0];
  let percentMin = estimatedGeneration[0] - estimatedGeneration[0] * 0.2;

  if (type === "month") {
    percentMax = Array(day).fill(percentMax);
    percentMin = Array(day).fill(percentMin);
  } else {
    percentMax = Array(12).fill(percentMax);
    percentMin = Array(12).fill(percentMin);
  }

  // FORMATANDO OS DADOS CONFORME O TIPO DO FILTRO mês OU ano
  if (type === "month") {
    data.generation.map((gen) => {
      label.filter((day, index) => {
        let dayBooleano =
          moment(gen.gen_date).format("DD") +
            "/" +
            moment(gen.gen_date).format("MM") ===
          day
            ? true
            : false;

        if (dayBooleano)
          realGeneration[index] = gen.gen_real
            ? {
                value: parseFloat(gen.gen_real).toFixed(2),
                date: moment(gen.gen_date).format("MM/DD/YYYY"),
              }
            : { value: 0, date: moment(gen.gen_date).format("MM/DD/YYYY") };
        // realGeneration[index] = parseFloat(gen.gen_real / 1000).toFixed(2); // FOI DUVIDIDO POR 1000 POR CAUSA DA MARCA FRONUIS
      });
    });
  } else {
    label.filter((data, index) => {
      let sunGenReal = { value: 0, date: "" };
      data.generation.map((gen) => {
        let mothBooleano =
          moment(gen.gen_date).format("MM") +
            "/" +
            moment(gen.gen_date).format("YYYY") ===
          data
            ? true
            : false;

        if (mothBooleano) {
          sunGenReal.value = gen.gen_real + sunGenReal.value;
          sunGenReal.date = moment(gen.gen_date).format("DD/MM/YYYY");
        }
      });
      realGeneration[index] = sunGenReal;
      // realGeneration[index] = parseFloat(sunGenReal / 1000).toFixed(2); // FOI DUVIDIDO POR 1000 POR CAUSA DA MARCA FRONUIS
    });
  }

  const realGenerationTotal = realGeneration.reduce(function (soma, i) {
    return parseFloat(soma) + parseFloat(i.value);
  });

  let realGenerationValues = realGeneration.map((data) => data.value);

  const generationPercentage = sunArrayPercentage(
    realGenerationValues,
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
    estimatedGenerationTotal: estimated,
    percentMax,
    percentMin,
    generationPercentageTotal,
    generationPercentage,
  };
};

// ESTRUTRANDO DADOS PARA BIGNUBER DE INVESTIMENTO
export const handlesInvestment = (data, day, month, year) => {
  const formatData = [];
  const carbonPaid = 0.817;
  let dailysavings = 0;
  let monthlysavings = 0;
  let annualsavings = 0;
  let totalsavings = 0;
  let ttt = 0;

  // SOMAR VALORES DE GERAÇÃO, CONFORME A DATA DO FILTRO - dia, mês, ano e total
  data.generation.map((gen) => {
    if (
      parseInt(moment(gen.gen_date).format("DD")) === day &&
      parseInt(moment(gen.gen_date).format("MM")) === month &&
      parseInt(moment(gen.gen_date).format("YYYY")) === year
    )
      dailysavings = gen.gen_real < 0 ? 0 : parseFloat(gen.gen_real).toFixed(2);

    if (
      parseInt(moment(gen.gen_date).format("MM")) === month &&
      parseInt(moment(gen.gen_date).format("YYYY")) === year
    )
      monthlysavings = gen.gen_real + monthlysavings;

    if (parseInt(moment(gen.gen_date).format("YYYY")) === year)
      annualsavings = gen.gen_real + annualsavings;

    ttt = gen.gen_real + ttt;
    totalsavings = gen.gen_real + totalsavings;
  });

  const amountPaid = localStorage.getItem(data.dev_uuid)
    ? parseFloat(localStorage.getItem(data.dev_uuid).replace(",", "."))
    : 0;

  // VALOR DE INVESTIMENTO = VALOR PAGO * GERAÇÃOO REALA
  dailysavings = parseFloat(dailysavings * amountPaid).toFixed(2); // FOI DUVIDIDO POR 1000 POR CAUSA DA MARCA FRONUIS ------ dailysavings = parseFloat((dailysavings * amountPaid) / 1000).toFixed(2);
  monthlysavings = parseFloat(monthlysavings * amountPaid).toFixed(2); // FOI DUVIDIDO POR 1000 POR CAUSA DA MARCA FRONUIS ------ monthlysavings = parseFloat((monthlysavings * amountPaid) / 1000).toFixed(2);
  annualsavings = parseFloat(annualsavings * amountPaid).toFixed(2); // FOI DUVIDIDO POR 1000 POR CAUSA DA MARCA FRONUIS ------ annualsavings = parseFloat((annualsavings * amountPaid) / 1000).toFixed(2);
  totalsavings = parseFloat(totalsavings * amountPaid).toFixed(2); // FOI DUVIDIDO POR 1000 POR CAUSA DA MARCA FRONUIS ------ totalsavings = parseFloat((totalsavings * amountPaid) / 1000).toFixed(2);

  // VALOR DE CARBONO = CREDITO DE CARBONO * GERAÇÃOO REALA
  const dailyCarbon = parseFloat(dailysavings * carbonPaid).toFixed(2); // FOI DUVIDIDO POR 1000 POR CAUSA DA MARCA FRONUIS ------ const dailyCarbon = parseFloat((dailysavings * carbonPaid) / 1000).toFixed(2);
  const monthlyCarbon = parseFloat(monthlysavings * carbonPaid).toFixed(2); // FOI DUVIDIDO POR 1000 POR CAUSA DA MARCA FRONUIS ------ const monthlyCarbon = parseFloat((monthlysavings * carbonPaid) / 1000).toFixed(2);
  const annualCarbon = parseFloat(annualsavings * carbonPaid).toFixed(2); // FOI DUVIDIDO POR 1000 POR CAUSA DA MARCA FRONUIS ------ const annualCarbon = parseFloat((annualsavings * carbonPaid) / 1000).toFixed(2);
  const totalCarbon = parseFloat(totalsavings * carbonPaid).toFixed(2); // FOI DUVIDIDO POR 1000 POR CAUSA DA MARCA FRONUIS ------ const totalCarbon = parseFloat((totalsavings * carbonPaid) / 1000).toFixed(2);

  // VERIFICANDO SE O USÚARIO INFORMOU O VALOR A SER PAGO
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

      dailyCarbon,
      monthlyCarbon,
      annualCarbon,
      totalCarbon,
    });
  }

  return formatData[0];
};
