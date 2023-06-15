import moment from "moment-timezone";
import { handlesInvestment } from "../../helpers/handles";
import { investment } from "../typesActions/types";

const initialState = {
  loadingInvestment: false,
  investmentData: [],
  message: "",
};

export default function userReducer(state = initialState, action) {
  const { data, date } = action?.payload || { erros: {} };

  switch (action.type) {
    case investment.GET_INVESTMENT_REQUEST:
      return {
        ...state,
        loadingInvestment: true,
        investmentData: [],
      };

    case investment.GET_INVESTMENT_SUCCESS:

      const month = parseInt(moment(date).format("MM"));
      const year = parseInt(moment(date).format("YYYY"));
      const day = parseInt(moment(date).format("DD"));

      return {
        ...state,
        loadingInvestment: false,
        investmentData: data.generation.length !== 0 ? handlesInvestment(data, day, month, year) : []
      };

    case investment.GET_INVESTMENT_FAILURE:
      return {
        ...state,
        loadingInvestment: false,
        investmentData: [],
      };

    default:
      return state;
  }
}

