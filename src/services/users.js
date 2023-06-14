import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";

import { axiosBaseQuery } from "./api";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({ url: "/users", method: "get" }),
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
    getUserBrands: builder.query({
      query: (uuid) => ({ url: `/userBrands/${uuid}`, method: "get" }),
      transformResponse: (data) => {
        const { brand_login } = data;
        
        const result = brand_login.map((item) => {
          const res = item.devices.map(dev => {
            return {
              brand: dev.dev_brand,
              blUuid: item.bl_uuid,   
              name: dev.dev_name, 
              uuid: dev.dev_uuid, 
              generationReal: dev.generation.length !== 0 ? dev.generation[0].gen_real + "Kwh" : '-', 
              temperature: dev.temperature.length !== 0 ? dev.temperature[0].temp_temperature : '-', 
              alert: dev.alerts.length, 
            }
          })

          return res
        });

        return data ? result.flat() : [];
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

export const { useGetUsersQuery, useGetUserBrandsQuery } = usersApi;
