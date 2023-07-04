import { generation } from "../typesActions/types";

import api, { configRequest } from "../../services/api";

import toast from "react-hot-toast";

export const getGeneration = (params) => (dispatch) => {
  dispatch({ type: generation.GET_GENERATION_REQUEST });

  const {blUuid, devUuid, date, type} = params
  console.log(params)
  api
    .get(`/generationandtemperature?blUuid=${blUuid}&date=${date}&devUuid=${devUuid}&type=${type}`, configRequest())
    .then((res) => {
      const { data } = res;
      dispatch({
        type: generation.GET_GENERATION_SUCCESS,
        result: data,

        args: { type: params.type, date: params.date },
      });
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: generation.GET_GENERATION_FAILURE, message });
    });
};

export const getAlerts = (devUuid) => (dispatch) => {
  dispatch({ type: generation.GET_GENERATION_ALERTS_REQUEST });

  api
    .get(`/alerts?devUuid=${devUuid}`, configRequest())
    .then((res) => {
      const { data } = res;
      dispatch({
        type: generation.GET_GENERATION_ALERTS_SUCCESS,
        result: data.length !== 0 ? data[0]:[],
      });
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: generation.GET_GENERATION_ALERTS_FAILURE, message });
    });
};
