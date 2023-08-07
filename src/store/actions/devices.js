import { devices } from "../typesActions/types";

import api, { configRequest } from "../../services/api";

import toast from "react-hot-toast";

export const getDevices = (blUuid) => (dispatch) => {
  dispatch({ type: devices.GET_DEVICES_REQUEST });
  api
    .get(`/devices/${blUuid}`, configRequest())
    .then((res) => {
      const { data } = res;

      dispatch({
        type: devices.GET_DEVICES_SUCCESS,
        result: data,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_DEVICES_FAILURE, message });
    });
};

export const getCapacities = (devUuid) => (dispatch) => {
  dispatch({type: devices.GET_CAPACITY_DEVICE_REQUEST})
  api
   .get(`/reportclient/${devUuid}`)
   .then((res) => {
    const {data} = res;
    dispatch({
      type: devices.GET_CAPACITY_DEVICE_SUCCESS,
      result: data
    })
   })
   .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido - capacity";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_CAPACITY_DEVICE_FAILURE, message });
   })
}