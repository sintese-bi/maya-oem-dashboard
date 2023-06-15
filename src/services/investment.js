import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";
import moment from "moment-timezone";

import { handlesInvestment } from "src/helpers/handles";

import { axiosBaseQuery } from "./api";

export const investmentApi = createApi({
  reducerPath: "investment",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getInvestment: builder.query({
      query: (params) => ({
        url: `/investment`,
        method: "get",
        params,
      }),
      transformResponse: (result, _, args) => {
        const { date } = args;
        const month = parseInt(moment(date).format("MM"));
        const year = parseInt(moment(date).format("YYYY"));
        const day = parseInt(moment(date).format("DD"));

        const data = result?.[0];
        return data?.generation?.length
          ? handlesInvestment(data, day, month, year)
          : [];
      },
      transformErrorResponse: (error) => {
        const { response: err } = error;
        const message = err?.data?.message || "Erro desconhecido";

        toast.error(message, {
          duration: 5000,
        });
        return message;
      },
    }),
  }),
});

export const { useGetInvestmentQuery, useLazyGetInvestmentQuery } =
  investmentApi;
