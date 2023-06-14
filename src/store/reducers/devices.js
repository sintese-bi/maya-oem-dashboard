import { devices } from "../typesActions/types";

const initialState = {
  isLoadingDevices: false,
  devices: [],
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
      return {
        isLoadingDevices: false,
        devices: result,
      };

    case devices.GET_DEVICES_FAILURE:
      return {
        ...state,
        isLoadingDevices: false,
        devices: [],
      };

    default:
      return state;
  }
}
