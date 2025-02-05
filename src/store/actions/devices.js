import { devices } from "../typesActions/types";

import api, { configRequest } from "../../services/api";

import toast from "react-hot-toast";
import axios from "axios";

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
      console.log(error);

      const message =
        err && err.data ? err.data.message : "Erro desconhecido - getDevices";

      toast.error(`${message} getDevices`, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_DEVICES_FAILURE, message });
    });
};

export const bigNumberSum = (use_uuid) => (dispatch) => {
  dispatch({ type: devices.GET_BIG_NUMBER_REQUEST });
  api
    .post("/bignumbersum", { use_uuid }, configRequest())
    .then((res) => {
      const { data } = res;

      dispatch({ type: devices.GET_BIG_NUMBER_SUCCESS, result: data });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data
          ? err.data.message
          : "Erro desconhecido - getAllDevices";

      toast.error(`${message} getAllDevices`, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_BIG_NUMBER_FAILURE, message });
    });
};

export const gettingReportData = (params) => (dispatch) => {
  dispatch({ type: devices.GET_CLIENT_REPORT_DATA_REQUEST });
  axios
    .post("https://balance.mayaoem.com.br/generationinfo", params, {
      headers: {
        Authorization: `Bearer iqwj9ej1291u49310i30ke1201i312i9321oesdaleqwoijeiooiOvb`,
      },
    })
    .then((res) => {
      const { data } = res;
      toast.success(data.message, {
        duration: 5000,
      });
      console.log(data);
      dispatch({ type: devices.GET_CLIENT_REPORT_DATA_SUCCESS, result: data });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data
          ? err.data.message
          : "Erro desconhecido - gettingReportData";

      toast.error(`${message} gettingReportData`, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_CLIENT_REPORT_DATA_FAILURE, message });
    });
};

export const deviceRecover =
  (params, handleGetAllDeletedDevicesRequest) => (dispatch) => {
    dispatch({ type: devices.DEVICE_RECOVER_REQUEST });
    api
      .put("/devicerecover", params, configRequest())
      .then((res) => {
        const { data } = res;
        toast.success(data.message, {
          duration: 5000,
        });
        handleGetAllDeletedDevicesRequest();
        dispatch({
          type: devices.DEVICE_RECOVER_SUCCESS,
          result: data,
        });
      })
      .catch((error) => {
        const { response: err } = error;
        console.log(error);

        const message =
          err && err.data
            ? err.data.message
            : "Erro desconhecido - deviceRecover";

        toast.error(`${message} deviceRecover`, {
          duration: 5000,
        });
        dispatch({ type: devices.DEVICE_RECOVER_FAILURE, message });
      });
  };

export const genrealdaylasthour = (params) => (dispatch) => {
  dispatch({ type: devices.GET_GENREALDAYLASTHOUR_REQUEST });

  axios
    .get(
      `https://app2.mayaoem.com.br/v2/user?user=${params}`,
      params,
      configRequest()
    )
    .then((res) => {
      const { data } = res;
      dispatch({
        type: devices.GET_GENREALDAYLASTHOUR_SUCCESS,
        result: data.devices,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data
          ? err.data.message
          : "Erro desconhecido - genrealdaylasthour";

      toast.error(`${message} genrealdaylasthour`, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_GENREALDAYLASTHOUR_FAILURE, message });
    });
};

export const genrealdayDevicelasthour = (params) => (dispatch) => {
  dispatch({ type: devices.GET_GENREALDAYDEVICELASTHOUR_REQUEST });

  axios
    .get(
      `https://app2.mayaoem.com.br/v2/device?device=${params.devUuidState}`,
      params,
      configRequest()
    )
    .then((res) => {
      const { data } = res;
      dispatch({
        type: devices.GET_GENREALDAYDEVICELASTHOUR_SUCCESS,
        result: data,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data
          ? err.data.message
          : "Erro desconhecido - genrealdaylasthour";

      toast.error(`${message} genrealdaylasthour`, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_GENREALDAYDEVICELASTHOUR_FAILURE, message });
    });
};

export const getAllDevices = (blUuids) => (dispatch) => {
  const allDevices = [];
  dispatch({ type: devices.GET_ALL_DEVICES_REQUEST });

  blUuids.map((data) => {
    api
      .get(`/devices/${data}`, configRequest())
      .then((res) => {
        const { data } = res;
        allDevices.push(data);
      })
      .catch((error) => {
        const { response: err } = error;
        console.log(error);

        const message =
          err && err.data
            ? err.data.message
            : "Erro desconhecido - getAllDevices";

        toast.error(`${message} getAllDevices`, {
          duration: 5000,
        });
        dispatch({ type: devices.GET_ALL_DEVICES_FAILURE, message });
      });
  });

  dispatch({
    type: devices.GET_ALL_DEVICES_SUCCESS,
    result: allDevices,
  });
};

export const createDevice = (params, handleBrandInfoRequest) => (dispatch) => {
  dispatch({ type: devices.POST_DEVICE_REQUEST });

  api
    .post(`/deviceLogin`, params, configRequest())
    .then((res) => {
      const { data } = res;
      toast.success(data.message, {
        duration: 5000,
      });
      handleBrandInfoRequest();
      dispatch({
        type: devices.POST_DEVICE_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data ? err.data.message : "Erro desconhecido - createDevice";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: devices.POST_DEVICE_FAILURE, message });
    });
};

export const getDevicesAlerts = (devicesWithAlerts) => (dispatch) => {
  dispatch({ type: devices.GET_DEVICES_ALERTS_REQUEST });
  if (devicesWithAlerts.length == 0) {
    dispatch({
      type: devices.GET_DEVICES_ALERTS_FAILURE,
      message: "Nenhum alerta encontrado",
    });
  }
  devicesWithAlerts.map((data) => {
    api
      .get(`/alerts/${data.uuid}`, configRequest())
      .then((res) => {
        const { data } = res;
        dispatch({
          type: devices.GET_DEVICES_ALERTS_SUCCESS,
          result: data.length !== 0 ? data[0] : [],
        });
      })
      .catch((error) => {
        const { response: err } = error;
        console.log(error);

        const message =
          err && err.data ? err.data.message : "Erro desconhecido";

        toast.error(message, {
          duration: 5000,
        });
        dispatch({ type: devices.GET_DEVICES_ALERTS_FAILURE, message });
      });
  });
};

export const getAllDevicesGeneration = (props) => (dispatch) => {
  dispatch({ type: devices.GET_ALL_DEVICES_GENERATION_REQUEST });
  api
    .get(
      `/generationandtemperature?blUuid=${props.blUuid}&startDate=${props.startDate}&endDate=${props.endDate}&devUuid=${props.devUuid}&type=month`,
      configRequest()
    )
    .then((res) => {
      const { data } = res;

      dispatch({
        type: devices.GET_ALL_DEVICES_GENERATION_SUCCESS,
        result: Object.assign(data, { deviceName: props.name }),
        args: { type: "month", date: props.date },
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data
          ? err.data.message
          : "Erro desconhecido - getAllDevicesGeneration";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_ALL_DEVICES_GENERATION_FAILURE, message });
    });
};

export const deleteDevice = (devUuid) => (dispatch) => {
  dispatch({ type: devices.DELETE_DEVICE_REQUEST });
  api
    .post(`/deleteDevice`, { devUuid }, configRequest())
    .then((res) => {
      const { data } = res;
      toast.success(data.message, {
        duration: 5000,
      });
      dispatch({
        type: devices.DELETE_DEVICE_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(`${message} deleteDevices`, {
        duration: 5000,
      });
      dispatch({ type: devices.DELETE_DEVICE_FAILURE, message });
    });
};

export const getCapacities = (devUuid) => (dispatch) => {
  dispatch({ type: devices.GET_CAPACITY_DEVICE_REQUEST });
  api
    .get(`/reportclient/${devUuid}`)
    .then((res) => {
      const { data } = res;
      dispatch({
        type: devices.GET_CAPACITY_DEVICE_SUCCESS,
        result: data,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);
      const message =
        err && err.data ? err.data.message : "Erro desconhecido - capacity";

      toast.error(`${message} getCapacities`, {
        duration: 5000,
      });
      dispatch({ type: devices.GET_CAPACITY_DEVICE_FAILURE, message });
    });
};
