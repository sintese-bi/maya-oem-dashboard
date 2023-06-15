import { generation } from "../typesActions/types";

import api, { configRequest } from "../../services/api";

import toast from "react-hot-toast";

export const getGeneration = (params) => (dispatch) => {
  dispatch({ type: generation.GET_GENERATION_REQUEST });

  api
    .get("/generation", configRequest(), params)
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


