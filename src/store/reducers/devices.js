import { devices, capacitiesDevice } from "../typesActions/types";

const initialState = {
  isLoadingDevices: false,
  devices: [],
  capacity: [],
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
      };

    case devices.GET_DEVICES_SUCCESS:
      console.log("result ", result)
      return {
        isLoadingDevices: false,
        devices: [...devices, result],
      };

    case devices.GET_DEVICES_FAILURE:
      return {
        ...state,
        isLoadingDevices: false,
        devices: [],
      };

    case capacitiesDevice.GET_CAPACITY_DEVICE_REQUEST:
      return {
        ...state,
        capacity: []
      }

    case capacitiesDevice.GET_CAPACITY_DEVICE_SUCCESS:
      return {
        ...state,
        capacity: [...capacity, result]
      }
    case capacitiesDevice.GET_CAPACITY_DEVICE_FAILURE:
      return {
        ...state,
        capacity: []
      }


    default:
      return state;
  }
}
