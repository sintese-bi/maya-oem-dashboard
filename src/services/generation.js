import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";
import moment from "moment-timezone";

import { axiosBaseQuery } from "./api";
import { handlesGeneration } from "src/helpers/handles";

export const generationApi = createApi({
  reducerPath: "generation",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getGeneration: builder.query({
      query: (params) => ({ url: `/generation`, method: "get", params }),
      transformResponse: (
        {
          deviceData: devicesGeneration,
          recentAlerts,
          latestTemp: devicesTemperature,
        },
        _,
        args
      ) => {
        const { date, type } = args;
        const month = parseInt(moment(date).format("MM"));
        const year = parseInt(moment(date).format("YYYY"));
        const day = type === "month" ? new Date(year, month, 0).getDate() : 12;

        // LABEL DO GRAFICO
        const label =
          type === "month"
            ? Array(day)
                .fill(null)
                .map((_, i) => i + 1)
            : [
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago",
                "Set",
                "Out",
                "Nov",
                "Dez",
              ];

        return {
          generation:
            devicesGeneration.length !== 0
              ? handlesGeneration(devicesGeneration[0], type, day, label)
              : {
                  label,
                  realGeneration: [],
                  estimatedGeneration: [],
                  percentMax: [],
                  percentMin: [],
                  realGenerationTotal: 0,
                  estimatedGenerationTotal: 0,
                  generationPercentageTotal: 0,
                  generationPercentage: [],
                },
          alerts: recentAlerts,
          devicesTemperature,
        };
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
    getProjection: builder.query({
      query: (params) => ({
        url: `/projection`,
        method: "get",
        params,
      }),
      transformErrorResponse: (error) => {
        const { response: err } = error;
        const message = err?.data?.message || "Erro desconhecido";

        toast.error(message, {
          duration: 5000,
        });
        return message;
      },
    }),
    patchProjection: builder.mutation({
      query: (data) => ({
        url: `/projection`,
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

export const {
  useGetGenerationQuery,
  useGetProjectionQuery,
  usePatchProjectionMutation,
} = generationApi;
