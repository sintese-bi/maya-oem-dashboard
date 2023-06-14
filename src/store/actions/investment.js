import { investment } from "../typesActions/types";

import api from "../../services/api";
import toast from "react-hot-toast";

export const getInvestment = (date, devUuid) => (dispatch) => {

  dispatch({ type: investment.GET_INVESTMENT_REQUEST });
  api
    .get(`/investment?devUuid=${devUuid}`)
    .then((res) => {
      const { data } = res;
      dispatch({
        type: investment.GET_INVESTMENT_SUCCESS,
        payload: {
          data: data.length !== 0 ? data[0] : [],
          date
        },
      });
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: investment.GET_INVESTMENT_FAILURE, message });
    });
};

