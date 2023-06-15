import { handlesGeneration } from "src/helpers/handles";
import { generation } from "../typesActions/types";
import moment from "moment-timezone";

const initialState = {
  message: "",
  isLoadingGeneration: false,
  generation: [],
  alerts: [],
  temperature: [],
};

export default function userReducer(state = initialState, action) {
  const { type, result, args } = action;

  switch (type) {
    // LISTAGEM DE GERAÇÃO, ALERTA E TEMPERATURA DO DISPOSITIVO
    case generation.GET_GENERATION_REQUEST:
      return {
        ...state,
        isLoadingGeneration: true,
        generation: [],
        alerts: [],
        temperature: [],
      };

    case generation.GET_GENERATION_SUCCESS:
      const { deviceData, latestTemp, recentAlerts } = result;
      const { date, type } = args;

      const month = parseInt(moment(date).format("MM"));
      const year = parseInt(moment(date).format("YYYY"));
      const day = type === "month" ? new Date(year, month, 0).getDate() : 12;

      // LABEL DO GRAFICO
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

      return {
        isLoadingGeneration: false,
        generation:
          deviceData.length !== 0
            ? handlesGeneration(deviceData[0], type, day, label)
            : {
                label,
                realGeneration: [],
                estimatedGeneration: [],
                percentMax: [],
                percentMin: [],
                realGenerationTotal: 0,
                estimatedGenerationTotal: 0,
                generationPercentageTotal: 0,
                generationPercentage: [],
              },
        alerts: recentAlerts,
        temperature: latestTemp?.[0]?.temperature[0]?.temp_temperature,
      };

    case generation.GET_GENERATION_FAILURE:
      return {
        ...state,
        isLoadingGeneration: false,
        generation: [],
        alerts: [],
        temperature: [],
      };

    default:
      return state;
  }
}
