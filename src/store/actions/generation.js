import { generation } from "../typesActions/types";

import api, { configRequest } from "../../services/api";

import toast from "react-hot-toast";

export const getGeneration = (params) => async (dispatch) => {
  dispatch({ type: generation.GET_GENERATION_REQUEST });
  const { blUuid, startDate, endDate } = params;
  let { devUuid } = params;

  // Loop while para aguardar até que o devUuid esteja definido
  while (!devUuid) {
    // Aguardar 500 milissegundos antes de verificar novamente
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Obter novamente o valor de devUuid após o atraso
    devUuid = params.devUuid;
  }
  // Caso o devUuid esteja definido, continuar com a chamada à API
  api
    .get(
      `/generationandtemperature?blUuid=${blUuid}&startDate=${startDate}&endDate=${endDate}&devUuid=${devUuid}&type=month`,
      configRequest()
    )
    .then((res) => {
      const { data } = res;
      dispatch({
        type: generation.GET_GENERATION_SUCCESS,
        result: data,
        args: { type: 'month', date: params.date },
      });
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido - getGeneration";

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
        result: data.length !== 0 ? data[0] : [],
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

export const reportgenerationEmai = (data) => (dispatch) => {
  dispatch({ type: generation.SEND_EMAIL_TO_DEVICE_REQUEST });

  api
    .get(`/sendgenerationemail?dev_uuid=${data.dev_uuid}`, data, configRequest())
    .then(() => {
      toast.success("Email enviado", {
        duration: 5000,
      });

      dispatch({
        type: generation.SEND_EMAIL_TO_DEVICE_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: generation.SEND_EMAIL_TO_DEVICE_FAILURE, message });
    });
}