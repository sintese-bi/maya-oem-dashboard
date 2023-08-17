import { devices } from "../typesActions/types";

const initialState = {
  isLoadingDevices: false,
  isLoadingCapacity: false,
  isLoadingAlerts: false,
  devices: [],
  capacity: [],
  allDevices: [],
  devicesALerts: []
};

export default function userReducer(state = initialState, action) {
  const { type, result } = action;

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
