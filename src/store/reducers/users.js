import { users } from "../typesActions/types";

import moment from "moment-timezone";

const initialState = {
  message: "",
  isLoading: false,
  loading: false,
  loadingRegister: false,
  loadingShow: false,
  loadingUser: false,
  isLoadingAlertFrequency: false,
  authData: [],
  brandListUser: [],
  profileLevel: [],
  useEmail: "",
  useName: "",
  resultBrandCheck: [],
  data: [],
  brands: [],
  dataDevices: [],
  generationBelowEstimated: [],
  alerts: [],
  offline: [],
  online: [],
  percentage: [],
  frequencyName: [],
};

export default function userReducer(state = initialState, action) {
  const { payload, brandListUser, profileLevel, result } = action;
  const { brand_login } = result || [];

  switch (action.type) {
    // AUTENTICAÇÃO DE USUARIO
    case users.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        brandListUser: [],
        profileLevel: [],
      };

    case users.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        brandListUser,
        profileLevel,
      };

    case users.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        brandListUser: [],
        profileLevel: [],
      };

    // REGISTRAR DADOS DO USUARIO
    case users.POST_REGISTER_REQUEST:
      return {
        ...state,
        loadingRegister: true,
        register: false,
      };

    case users.POST_REGISTER_SUCCESS:
      return {
        ...state,
        loadingRegister: false,
        register: true,
      };

    case users.POST_REGISTER_FAILURE:
      return {
        ...state,
        loadingRegister: false,
        register: false,
      };

    // GET DADOS DO USUARIO
    case users.GET_SHOW_REQUEST:
      return {
        ...state,
        loadingShow: true,
        useEmail: "",
        useName: "",
      };

    case users.GET_SHOW_SUCCESS:
      const { use_email, use_name } = payload;
      return {
        ...state,
        loadingShow: false,
        useEmail: use_email,
        useName: use_name,
      };

    case users.GET_SHOW_FAILURE:
      return {
        ...state,
        loadingShow: false,
        useEmail: "",
        useName: "",
      };

    // VERIFICA LOGIN E SENHA DAS BRAND DO USUARIO
    case users.CHECK_BRAND_REQUEST:
      return {
        ...state,
        loadingBrnad: true,
        resultBrandCheck: [],
      };

    case users.CHECK_BRAND_SUCCESS:
      return {
        ...state,
        loadingBrnad: false,
      };

    case users.CHECK_BRAND_FAILURE:
      return {
        ...state,
        loadingBrnad: false,
        resultBrandCheck: [],
      };

    // LISTAGEM DE USUARIO E SUAR BRAND
    case users.GET_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        data: [],
      };

    case users.GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: result.map((item) => {
          return {
            use_uuid: item.use_uuid,
            use_name: item.use_name,
            use_email: item.use_email,
            brand_login: item.brand_login,
          };
        }),
      };

    case users.GET_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: [],
      };

    // LISTAGEM DE USUARIO E SUAR BRAND
    case users.GET_USER_BRANDS_REQUEST:
      return {
        ...state,
        isLoading: true,
        data: [],
      };

    case users.GET_USER_BRANDS_SUCCESS:
      const dataResult = brand_login
        .map((item) => {
          const res = item.devices.map((dev) => {
            let sumRealWeek = 0;
            let sumRealMonth = 0;

            dev.generation.forEach((item) => {
              if (
                moment(item.gen_date) >= moment().subtract(7, "day").toDate() &&
                moment(item.gen_date) <= moment()
              ) {
                sumRealWeek += item.gen_real;
              }
            });
            dev.generation.forEach((item) => (sumRealMonth += item.gen_real));

            const generationRealDay = dev.generation.filter(
              (item) => item.gen_date === moment().format("YYYY-MM-DD")
            );

            return {
              brand: dev.dev_brand,
              blUuid: item.bl_uuid,
              name: dev.dev_name,
              uuid: dev.dev_uuid,
              generationRealDay:
                generationRealDay.length !== 0
                  ? generationRealDay[0].gen_real
                  : 0,
              generationRealWeek: sumRealWeek.toFixed(2),
              generationRealMonth: sumRealMonth.toFixed(2),
              generationEstimated:
                dev.generation.length !== 0
                  ? dev.generation[0].gen_estimated
                  : 0,
              alert: dev.alerts.length,
              staName: dev?.status ? dev?.status.sta_name : "Não informado!",
              staCode: dev?.status ? dev?.status.sta_code : "Não informado!",
            };
          });

          return res;
        })
        .flat();

      return {
        ...state,
        isLoading: false,
        data: dataResult,
      };

    case users.GET_USER_BRANDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: [],
      };

    // ATUALIZAR PROJEÇÃO E FEREQUENCIA DE ALERTA DE GERAÇÃO
    case users.PATH_ALERT_FREQUENCY_REQUEST:
      return {
        ...state,
        isLoadingAlertFrequency: true,
      };

    case users.PATH_ALERT_FREQUENCY_SUCCESS:
      return {
        ...state,
        isLoadingAlertFrequency: false,
      };

    case users.PATH_ALERT_FREQUENCY_FAILURE:
      return {
        ...state,
        isLoadingAlertFrequency: false,
      };

    case users.GET_ALERT_FREQUENCY_REQUEST:
      return {
        ...state,
        isLoadingAlertFrequency: true,
        percentage: [],
        frequencyName: [],
      };

    case users.GET_ALERT_FREQUENCY_SUCCESS:
      return {
        ...state,
        isLoadingAlertFrequency: false,
        percentage: result?.use_percentage,
        frequencyName: result?.use_frequency_name,
      };

    case users.GET_ALERT_FREQUENCY_FAILURE:
      return {
        ...state,
        isLoadingAlertFrequency: false,
        percentage: [],
        frequencyName: [],
      };

    // -------------------
    case users.GET_DASHBOARD_REQUEST:
      return {
        ...state,
        isLoading: true,
        brands: [],
        dataDevices: [],
        generationBelowEstimated: [],
        alerts: [],
        offline: [],
        online: [],
      };

    case users.GET_DASHBOARD_SUCCESS:
      const dataDevices = brand_login
        .map((item) => {
          const res = item.devices.map((dev) => {
            let sumRealWeek = 0;
            let sumEstimatedlWeek = 0;

            let sumRealMonth = 0;
            let sumEstimatedMonth = 0;

            dev.generation.forEach((item) => {
              if (
                moment(item.gen_date) >= moment().subtract(7, "day").toDate() &&
                moment(item.gen_date) <= moment()
              ) {
                sumRealWeek += item.gen_real;
                sumEstimatedlWeek += item.gen_estimated
              }
            });
            dev.generation.forEach((item) => {
              sumRealMonth += item.gen_real
              sumEstimatedMonth += item.gen_estimated
            });

            const generationRealDay = dev.generation.filter(
              (item) => item.gen_date === moment().format("YYYY-MM-DD")
            );

            return {
              brand: dev.dev_brand,
              blUuid: item.bl_uuid,
              name: dev.dev_name,
              uuid: dev.dev_uuid,
              generationRealDay:
                generationRealDay.length !== 0
                  ? generationRealDay[0].gen_real
                  : 0,
              generationRealWeek: sumRealWeek.toFixed(2),
              generationRealMonth: sumRealMonth.toFixed(2),
              generationEstimatedDay:
                dev.generation.length !== 0
                  ? dev.generation[0].gen_estimated
                  : 0,
              generationEstimatedlWeek: sumEstimatedlWeek.toFixed(2),
              generationEstimatedMonth: sumEstimatedMonth.toFixed(2),
              alert: dev.alerts.length,
              staName: dev?.status ? dev?.status.sta_name : "Não informado!",
              staCode: dev?.status ? dev?.status.sta_code : "Não informado!",
            };
          });

          return res;
        })
        .flat();

      const brands = [...new Set(dataDevices.map((item) => item.brand))];

      const generationBelowEstimated = dataDevices.filter(
        (item) => item.generationRealDay < item.generationEstimated
      );
      const alerts = dataDevices.filter((item) => item.alert !== 0);

      const offline = dataDevices.filter((item) => item.staCode === "offline");
      const online = dataDevices.filter((item) => item.staCode === "online");

      return {
        ...state,
        isLoading: false,
        brands,
        dataDevices,
        generationBelowEstimated,
        alerts,
        offline,
        online,
      };

    case users.GET_DASHBOARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        brands: [],
        dataDevices: [],
        generationBelowEstimated: [],
        alerts: [],
        offline: [],
        online: [],
      };

    default:
      return state;
  }
}
