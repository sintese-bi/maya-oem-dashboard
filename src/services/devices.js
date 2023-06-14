import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";

import { axiosBaseQuery } from "./api";

export const devicesApi = createApi({
  reducerPath: "devices",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getDevices: builder.query({
      query: (blUuid) => ({ url: `/devices/${blUuid}`, method: "get" }),
      
      transformResponse: (data) => data || [],
      transformErrorResponse: (error) => {
        const { response: err } = error;
        const message = err?.data?.message || "Erro desconhecido";

        toast.error(message, {
          duration: 5000,
        });
        return message;
      },
    }),
    patchAlertPercentagem: builder.mutation({
      query: (data) => ({
        url: `/alertPercentagem`,
        method: "patch",
        data,
      }),
      transformResponse: (data) => {
        toast.success(data.message, {
          duration: 5000,
        });

        return data;
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

export const { useGetDevicesQuery, usePatchAlertPercentagemMutation } = devicesApi;
