import { devices, capacitiesDevice } from "../typesActions/types";

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
  dispatch({type: capacitiesDevice.GET_CAPACITY_DEVICE_REQUEST})
  api
   .get(`/reportclient/938d0b05-bd00-4992-9d22-4ceb646e817c`)
   .then((res) => {
    const {data} = res;
    console.log('getCapacitiesDevices', data)
    dispatch({
      type: capacities.GET_CAPACITY_DEVICE_SUCCESS,
      result: data
    })
   })
   .catch((error) => {
     const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
   })
}