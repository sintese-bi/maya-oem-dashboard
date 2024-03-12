import { devices } from "../typesActions/types";
import { handlesGeneration } from "src/helpers/handles";
import moment from "moment-timezone";

const initialState = {
  isLoadingDevices: false,
  isLoadingCapacity: false,
  isLoadingAlerts: true,
  isLoadingDevicesGeneration: false,
  loadingDeleteDevice: false,
  loadingCreateDevice: true,
  deviceCreated: false,
  devices: [],
  capacity: [],
  allDevices: [],
  devicesALerts: [],
  devicesGeneration: [],
  deviceDelete: true,
  bignumbersumValues: [],
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
        allDevices: [],
      };

    case devices.GET_ALL_DEVICES_SUCCESS:
      return {
        ...state,
        allDevices: result,
      };

    case devices.GET_ALL_DEVICES_FAILURE:
      return {
        ...state,
        allDevices: [],
      };

    case devices.GET_DEVICES_ALERTS_REQUEST:
      return {
        ...state,
        isLoadingAlerts: true,
        devicesALerts: [],
      };

    case devices.GET_DEVICES_ALERTS_SUCCESS:
      return {
        ...state,
        isLoadingAlerts: false,
        devicesALerts: [...state.devicesALerts, result],
      };

    case devices.GET_DEVICES_ALERTS_FAILURE:
      return {
        ...state,
        isLoadingAlerts: false,
        devicesALerts: [],
      };

    case devices.GET_ALL_DEVICES_GENERATION_REQUEST:
      return {
        ...state,
        isLoadingDevicesGeneration: true,
        devicesGeneration: [],
      };

    case devices.GET_ALL_DEVICES_GENERATION_SUCCESS:
      const { deviceData, latestTemp, deviceName } = result;
      const { date, type } = args;

      function dateOrder(dateA, dateB) {
        const form = "DD/MM";
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
        const form = "MM/YYYY";
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
        return (
          moment(gen.gen_date).format("DD") +
          "/" +
          moment(gen.gen_date).format("MM")
        );
      });

      let monthsInfo = [];
      deviceData[0].generation.map((gen) => {
        let monthAlreadyCount = monthsInfo.filter(
          (data) =>
            data ==
            moment(gen.gen_date).format("MM") +
              "/" +
              moment(gen.gen_date).format("YYYY")
        );

        if (monthAlreadyCount.length == 0) {
          monthsInfo.push(
            moment(gen.gen_date).format("MM") +
              "/" +
              moment(gen.gen_date).format("YYYY")
          );
        }
      });

      datesInfo.sort(dateOrder);
      monthsInfo.sort(monthOrder);

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
        ...state,
        isLoadingDevicesGeneration: false,
        devicesGeneration:
          deviceData[0].generation.length !== 0
            ? Object.assign(
                handlesGeneration(deviceData[0], type, day, label),
                { deviceName: deviceName }
              )
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
      };

    case devices.GET_ALL_DEVICES_GENERATION_FAILURE:
      return {
        ...state,
        isLoadingDevicesGeneration: false,
        devicesGeneration: [],
      };

    case devices.GET_ALL_DEVICES_GENERATION_FAILURE:
      return {
        ...state,
        isLoadingDevicesGeneration: false,
        devicesGeneration: [],
      };

    case devices.POST_DEVICE_REQUEST:
      return {
        ...state,
        loadingCreateDevice: true,
        deviceCreated: false,
      };

    case devices.POST_DEVICE_SUCCESS:
      return {
        ...state,
        loadingCreateDevice: false,
        deviceCreated: true,
      };

    case devices.POST_DEVICE_FAILURE:
      return {
        ...state,
        loadingCreateDevice: false,
        deviceCreated: false,
      };

    case devices.GET_CAPACITY_DEVICE_REQUEST:
      return {
        ...state,
        isLoadingCapacity: true,
        capacity: [],
      };

    case devices.GET_CAPACITY_DEVICE_SUCCESS:
      return {
        ...state,
        isLoadingCapacity: false,
        capacity: result,
      };

    case devices.GET_CAPACITY_DEVICE_FAILURE:
      return {
        ...state,
        isLoadingCapacity: false,
        capacity: [],
      };

    case devices.DELETE_DEVICE_REQUEST:
      return {
        ...state,
        loadingDeleteDevice: true,
        deviceDelete: false,
      };

    case devices.DELETE_DEVICE_SUCCESS:
      return {
        ...state,
        loadingDeleteDevice: false,
        deviceDelete: true,
      };

    case devices.DELETE_DEVICE_FAILURE:
      return {
        ...state,
        loadingDeleteDevice: false,
        deviceDelete: false,
      };

    case devices.GET_BIG_NUMBER_REQUEST:
      return {
        ...state,
        bignumbersumValues: [],
      };

    case devices.GET_BIG_NUMBER_SUCCESS:
      return {
        ...state,
        bignumbersumValues: result,
      };

    case devices.GET_BIG_NUMBER_FAILURE:
      return {
        ...state,
        bignumbersumValues: [],
      };

    case devices.GET_GENREALDAYLASTHOUR_REQUEST:
      return {
        ...state,
        genrealdaylasthourData: [],
      };

    case devices.GET_GENREALDAYLASTHOUR_SUCCESS:
      return {
        ...state,
        genrealdaylasthourData: result,
      };

    case devices.GET_GENREALDAYLASTHOUR_FAILURE:
      return {
        ...state,
        genrealdaylasthourData: [],
      };

    case devices.GET_GENREALDAYDEVICELASTHOUR_REQUEST:
      return {
        ...state,
        genrealdayDeviceLasthourData: [],
      };

    case devices.GET_GENREALDAYDEVICELASTHOUR_SUCCESS:
      console.log(result);
      return {
        ...state,
        genrealdayDeviceLasthourData: result,
      };

    case devices.GET_GENREALDAYDEVICELASTHOUR_FAILURE:
      return {
        ...state,
        genrealdayDeviceLasthourData: [],
      };

    default:
      return state;
  }
}
