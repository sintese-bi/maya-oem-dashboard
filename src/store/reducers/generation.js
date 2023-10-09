import { handlesGeneration } from "src/helpers/handles";
import { generation } from "../typesActions/types";
import moment from "moment-timezone";

const initialState = {
  message: "",
  isLoadingGeneration: false,
  generation: [],
  alerts: [],
  temperature: [],
  isSendingEmail: false,
  emailDontExist: null,
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
        temperature: [],
      };

    case generation.GET_GENERATION_SUCCESS:
      const { deviceData, latestTemp } = result;
      const { date, type } = args;

      function dateOrder(dateA, dateB) {
        const form = 'DD/MM';
        const date1 = moment(dateA, form);
        const date2 = moment(dateB, form);

        if (date1.isBefore(date2)) {
          return -1;
        } else if (date1.isAfter(date2)) {
          return 1;
        } else {
          return 0;
        }
      }

      function monthOrder(dateA, dateB) {
        const form = 'MM/YYYY';
        const date1 = moment(dateA, form);
        const date2 = moment(dateB, form);

        if (date1.isBefore(date2)) {
          return -1;
        } else if (date1.isAfter(date2)) {
          return 1;
        } else {
          return 0;
        }
      }

      let datesInfo = deviceData[0].generation.map((gen) => {
        return moment(gen.gen_date).format("DD") + "/" + moment(gen.gen_date).format("MM")
      })

      let monthsInfo = []
      deviceData[0].generation.map((gen) => {
        let monthAlreadyCount = monthsInfo.filter((data) => data == moment(gen.gen_date).format("MM") + "/" + moment(gen.gen_date).format("YYYY"))

        if (monthAlreadyCount.length == 0) {
          monthsInfo.push(moment(gen.gen_date).format("MM") + "/" + moment(gen.gen_date).format("YYYY"))
        }

      })

      datesInfo.sort(dateOrder)
      monthsInfo.sort(monthOrder)

      const month = parseInt(moment(date).format("MM"));
      const year = parseInt(moment(date).format("YYYY"));
      const day = type === "month" ? datesInfo.length : 12;

      // LABEL DO GRAFICO
      const label =
        type === "month"
          ? datesInfo
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
        temperature: latestTemp?.[0]?.temperature[0]?.temp_temperature,
      };

    case generation.GET_GENERATION_FAILURE:
      return {
        ...state,
        isLoadingGeneration: false,
        generation: [],
        temperature: [],
      };

    case generation.GET_GENERATION_ALERTS_REQUEST:
      return {
        ...state,
        isLoadingGeneration: true,
        alerts: [],
      };

    case generation.GET_GENERATION_ALERTS_SUCCESS:
      const alerts =
        result.length !== 0
          ? result.alerts.map((item) => {
            return {
              devName: result.dev_name,
              alInv: item.al_inv,
              alAlert: item.al_alerts,
            };
          })
          : [];
      return {
        ...state,
        isLoadingGeneration: false,
        alerts,
      };

    case generation.GET_GENERATION_ALERTS_FAILURE:
      return {
        ...state,
        isLoadingGeneration: false,
        alerts: [],
      };

    case generation.SEND_EMAIL_TO_DEVICE_REQUEST:
      return {
        ...state,
        isSendingEmail: true
      }
    case generation.SEND_EMAIL_TO_DEVICE_SUCCESS:
      return {
        ...state,
        isSendingEmail: false
      }
    case generation.SEND_EMAIL_TO_DEVICE_FAILURE:
      return {
        ...state,
        isSendingEmail: false,
        emailDontExist: true
      }

    case generation.UPDATE_EMAIL_REQUEST:
      return {
        ...state,
      }

    case generation.UPDATE_EMAIL_SUCCESS:
      return {
        ...state,
        emailDontExist: false
      }

    case generation.UPDATE_EMAIL_FAILURE:
      return {
        ...state,
        emailDontExist: true
      }


    default:
      return state;
  }
}
