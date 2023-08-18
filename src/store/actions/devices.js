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
      const message = err && err.data ? err.data.message : "Erro desconhecido - getDevices";

      toast.error(`${message} getDevices`, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_DEVICES_FAILURE, message });
    });
};

export const getAllDevices = (blUuids) => (dispatch) => {
  const allDevices = []
  dispatch({type: devices.GET_ALL_DEVICES_REQUEST})

  blUuids.map((data) => {
    api
    .get(`/devices/${data}`, configRequest())
    .then((res) => {
      const { data } = res;
      allDevices.push(data)
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido - getAllDevices";

      toast.error(`${message} getAllDevices`, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_ALL_DEVICES_FAILURE, message });
    });
  })

  dispatch({
    type: devices.GET_ALL_DEVICES_SUCCESS,
    result: allDevices,
  });
}

export const getDevicesAlerts = (devicesWithAlerts) => (dispatch) => {
  dispatch({type: devices.GET_DEVICES_ALERTS_REQUEST})
  devicesWithAlerts.map((data) => {
    api
    .get(`/alerts?devUuid=${data.uuid}`, configRequest())
    .then((res) => {
      const { data } = res;
      console.log(data)
      dispatch({
        type: devices.GET_DEVICES_ALERTS_SUCCESS,
        result: data.length !== 0 ? data[0] : [],
      });
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_DEVICES_ALERTS_FAILURE, message });
    });
  })
}

export const getAllDevicesGeneration = (props) => (dispatch) => {
  dispatch({type: devices.GET_ALL_DEVICES_GENERATION_REQUEST})
    api
    .get(
      `/generationandtemperature?blUuid=${props.blUuid}&startDate=${props.startDate}&endDate=${props.endDate}&devUuid=${props.devUuid}&type=${props.type}`,
      configRequest()
    )
    .then((res) => {
      const { data } = res;
      console.log('getGeneration:', data)
      dispatch({
        type: devices.GET_ALL_DEVICES_GENERATION_SUCCESS,
        result: Object.assign(data, {deviceName: props.name}),
        args: { type: props.type, date: props.date},
      });
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido - getAllDevicesGeneration";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_ALL_DEVICES_GENERATION_FAILURE, message });
    });
}

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

      toast.error(`${message} getCapacities`, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_CAPACITY_DEVICE_FAILURE, message });
   })
}