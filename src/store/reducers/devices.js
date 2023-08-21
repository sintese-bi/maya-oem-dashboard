import { devices } from "../typesActions/types";
import { handlesGeneration } from "src/helpers/handles";
import moment from "moment-timezone";

const initialState = {
  isLoadingDevices: false,
  isLoadingCapacity: false,
  isLoadingAlerts: false,
  isLoadingDevicesGeneration: false,
  devices: [],
  capacity: [],
  allDevices: [],
  devicesALerts: [],
  devicesGeneration: []
};

export default function userReducer(state = initialState, action) {
  const { type, result, args } = action;

  switch (type) {
    // LISTAGEM DE GERAÇÃO, ALERTA E TEMPERATURA DO DISPOSITIVO
    case devices.GET_DEVICES_REQUEST:
      return {
        ...state,
        isLoadingDevices: true,
        devices: [],
        capacity: [],
      };

    case devices.GET_DEVICES_SUCCESS:
      console.log("result-devices", result)
      return {
        ...state,
        isLoadingDevices: false,
        devices: result,
      };

    case devices.GET_DEVICES_FAILURE:
      return {
        ...state,
        isLoadingDevices: false,
        devices: [],
        capacity: [],
      };

    case devices.GET_ALL_DEVICES_REQUEST:
      return {
        ...state,
        allDevices: []
      }

    case devices.GET_ALL_DEVICES_SUCCESS:
      console.log("all-devices-result", result)
      return {
        ...state,
        allDevices: result
      }

      case devices.GET_ALL_DEVICES_FAILURE:
      return {
        ...state,
        allDevices: []
      }

    case devices.GET_DEVICES_ALERTS_REQUEST:
      return {
        ...state,
        isLoadingAlerts: true,
        devicesALerts: []
      }

    case devices.GET_DEVICES_ALERTS_SUCCESS:
      console.log('getDevicesAlerts-result', result, state.isLoadingAlerts)
      return {
        ...state,
        isLoadingAlerts: false,
        devicesALerts: [...state.devicesALerts, result]
      }
 
    case devices.GET_DEVICES_ALERTS_FAILURE:
      console.log('erro')
      return {
        ...state,
        isLoadingAlerts: false,
        devicesALerts: []
      }

    case devices.GET_ALL_DEVICES_GENERATION_REQUEST:
      return {
        ...state,
        isLoadingDevicesGeneration: true,
        devicesGeneration: []
      }

    case devices.GET_ALL_DEVICES_GENERATION_SUCCESS:
      const { deviceData, latestTemp, deviceName } = result;
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
        ...state,
        isLoadingDevicesGeneration: false,
        devicesGeneration:
          deviceData.length !== 0
            ? Object.assign(handlesGeneration(deviceData[0], type, day, label), {deviceName: deviceName})
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
              }
      };


    case devices.GET_ALL_DEVICES_GENERATION_FAILURE:
      return {
        ...state,
        isLoadingDevicesGeneration: false,
        devicesGeneration: []
      }

    case devices.GET_CAPACITY_DEVICE_REQUEST:
      return {
        ...state,
        isLoadingCapacity: true,
        capacity: []
      }

    case devices.GET_CAPACITY_DEVICE_SUCCESS:
      return {
        ...state,
        isLoadingCapacity: false,
        capacity: result
      }
      
    case devices.GET_CAPACITY_DEVICE_FAILURE:
      return {
        ...state,
        isLoadingCapacity: false,
        capacity: []
      }

    default:
      return state;
  }
}
