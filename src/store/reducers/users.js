import { users } from "../typesActions/types";

import moment from "moment-timezone";

const initialState = {
  message: "",
  isLoading: false,
  isDashboardDataLoading: false,
  isAllDevicesDataLoading: false,
  isLoadingGraph: false,
  loading: false,
  loadingRegister: false,
  loadingPasswordRecovery: false,
  loadingShow: false,
  loadingUser: false,
  isLoadingAlertFrequency: false,
  isLoadingCapacity: false,
  loadingSendingEmail: false,
  authData: [],
  brandListUser: [],
  profileLevel: [],
  useEmail: "",
  useName: "",
  useCodePagarMe: "",
  resultBrandCheck: [],
  data: [],
  brands: [],
  blUuids: [],
  dataDevices: [],
  allDevices: [],
  graphData: [],
  generationBelowEstimated: [],
  alerts: [],
  notDefined: [],
  unactived: [],
  offline: [],
  online: [],
  percentage: [],
  frequencyName: [],
  capacity: [],
  sendingEmail: [],
  passwordRecovery: [],
  selectedUser: [],
  userData: {},
  allDevicesFromUser: [],
  isDeletingUser: null,
  userDevicesIsReady: false,
};

export default function userReducer(state = initialState, action) {
  const { payload, brandListUser, profileLevel, result } = action;
  const { brand_login } = result?.info || [];
  const allBrands = result?.brands?.brand_login;

  switch (action.type) {
    // AUTENTICAÇÃO DE USUARIO
    case users.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        userData: [],
        brandListUser: [],
        profileLevel: [],
      };

    case users.AUTH_SUCCESS:
      console.log(result);
      return {
        ...state,
        loading: false,
        userData: result.use_data,
        userDevicesIsReady: localStorage.getItem("userDevicesIsReady"),
        brandListUser,
        profileLevel,
      };

    case users.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        userData: [],
        brandListUser: [],
        profileLevel: [],
      };

    case users.SELECT_USER:
      return {
        ...state,
        selectedUser: [result],
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
      const { use_email, use_name, use_code_pagar_me } = payload;
      return {
        ...state,
        loadingShow: false,
        useEmail: use_email,
        useName: use_name,
        useCodePagarMe: use_code_pagar_me,
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
        data: result.filter((data) => data.use_deleted == false),
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
              (item) =>
                item.gen_date ===
                moment().subtract(1, "day").format("YYYY-MM-DD")
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
              generationRealWeek: sumRealWeek,
              generationRealMonth: sumRealMonth,
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

    case users.GET_ALL_DEVICES_REQUEST:
      return {
        ...state,
        isAllDevicesDataLoading: true,
        brands: [],
        blUuids: [],
        generationBelowEstimated: [],
        alerts: [],
        offline: [],
        online: [],
      };

    case users.GET_ALL_DEVICES_SUCCESS:
      const daysPassedAllDevices = moment().date();
      const allDevices = brand_login
        .map((item) => {
          const devicesNotDeleted = item.devices.filter(
            (dev) => dev.dev_deleted !== true
          );
          const res = devicesNotDeleted.map((dev) => {
            const generationEstimatedDay =
              dev.generation.length !== 0 ? dev.generation[0].gen_estimated : 0;

            let sumRealWeek = 0;
            let sumEstimatedlWeek =
              generationEstimatedDay * Math.min(7, daysPassedAllDevices);

            let sumRealMonth = 0;
            let sumEstimatedMonth =
              generationEstimatedDay * daysPassedAllDevices;

            dev.generation.forEach((item) => {
              if (
                moment(item.gen_date) >= moment().subtract(7, "day").toDate() &&
                moment(item.gen_date) <= moment()
              ) {
                sumRealWeek += item.gen_real;
              }
            });
            dev.generation.forEach((item) => {
              sumRealMonth += item.gen_real;
            });

            const generationRealDay = dev.generation.filter(
              (item) => item.gen_date === moment().format("YYYY-MM-DD")
            );

            const alerts =
              dev.alerts.length !== 0
                ? dev.alerts.filter((item) => {
                    const alertDate = moment(item.alert_created_at).format(
                      "YYYY-MM-DD"
                    );
                    const today = moment().format("YYYY-MM-DD");
                    return alertDate === today;
                  })
                : [];

            return {
              brand: item.bl_name,
              blUuid: item.bl_uuid,
              name: dev.dev_name,
              email: dev.dev_email,
              capacity: parseFloat(
                dev.dev_capacity !== null ? dev.dev_capacity.toFixed(2) : 0
              ),
              address: dev.dev_address,
              uuid: dev.dev_uuid,
              generationRealDay:
                generationRealDay.length !== 0
                  ? parseFloat(generationRealDay[0].gen_real.toFixed(2))
                  : 0,
              generationRealWeek: parseFloat(sumRealWeek.toFixed(2)),
              generationRealMonth: parseFloat(sumRealMonth.toFixed(2)),
              generationEstimatedDay: parseFloat(
                generationEstimatedDay.toFixed(2)
              ),
              generationEstimatedlWeek: parseFloat(
                sumEstimatedlWeek.toFixed(2)
              ),
              generationEstimatedMonth: parseFloat(
                sumEstimatedMonth.toFixed(2)
              ),
              alert: alerts.length,
              staName: dev?.status ? dev?.status.sta_name : "Não informado!",
              staCode: dev?.status ? dev?.status.sta_code : "Não informado!",
            };
          });

          return res;
        })
        .flat();

      const brands = [...new Set(allBrands.map((item) => item.bl_name))];
      const blUuids = [...new Set(allBrands.map((item) => item.bl_uuid))];

      const generationBelowEstimated = allDevices.filter(
        (item) => item.generationRealWeek < item.generationEstimatedlWeek
      );

      const alerts = allDevices.filter((item) => item.alert !== 0);

      const offline = allDevices.filter((item) => item.staCode === "offline");
      const notDefined = allDevices.filter(
        (item) => item.staCode === "Não informado!"
      );
      const unactived = allDevices.filter((item) => item.staName === "Inativo");
      const online = allDevices.filter((item) => item.staCode === "online");

      return {
        ...state,
        isAllDevicesDataLoading: false,
        brands,
        blUuids,
        allDevices,
        generationBelowEstimated,
        alerts,
        notDefined,
        unactived,
        offline,
        online,
      };

    case users.GET_ALL_DEVICES_FAILURE:
      return {
        ...state,
        isAllDevicesDataLoading: false,
        brands: [],
        blUuids: [],
        allDevices: [],
        generationBelowEstimated: [],
        alerts: [],
        offline: [],
        online: [],
      };

    case users.GET_DASHBOARD_REQUEST:
      return {
        ...state,
        isDashboardDataLoading: true,
        dataDevices: [],
      };

    case users.GET_DASHBOARD_SUCCESS:
      const daysPassed = moment().date();
      const dataDevices = brand_login
        .map((item) => {
          const devicesNotDeleted = item.devices.filter(
            (dev) => dev.dev_deleted !== true
          );
          const res = devicesNotDeleted.map((dev) => {
            const generationEstimatedDay =
              dev.generation.length !== 0 && dev.generation[0].gen_real != 0
                ? dev.generation[0].gen_estimated
                : 0;

            let sumRealWeek = 0;
            let sumEstimatedlWeek =
              generationEstimatedDay * Math.min(7, daysPassed);

            let sumRealMonth = 0;
            let sumEstimatedMonth = generationEstimatedDay * daysPassed;

            dev.generation.forEach((item) => {
              if (
                moment(item.gen_date) >= moment().subtract(7, "day").toDate() &&
                moment(item.gen_date) <= moment()
              ) {
                sumRealWeek += item.gen_real;
              }
            });
            dev.generation.forEach((item) => {
              sumRealMonth += item.gen_real;
            });

            const generationRealDay = dev.generation.filter(
              (item) => item.gen_date === moment().format("YYYY-MM-DD")
            );

            const alerts =
              dev.alerts.length !== 0
                ? dev.alerts.filter((item) => {
                    const alertDate = moment(item.alert_created_at).format(
                      "YYYY-MM-DD"
                    );
                    const today = moment().format("YYYY-MM-DD");
                    return alertDate === today;
                  })
                : [];

            return {
              brand: dev.dev_brand,
              blUuid: item.bl_uuid,
              name: dev.dev_name,
              capacity: dev.dev_capacity,
              uuid: dev.dev_uuid,
              generationRealDay:
                generationRealDay.length !== 0
                  ? generationRealDay[0].gen_real
                  : 0,
              generationRealWeek: sumRealWeek,
              generationRealMonth: sumRealMonth,
              generationEstimatedDay: generationEstimatedDay
                ? generationEstimatedDay
                : 0,
              generationEstimatedlWeek: sumEstimatedlWeek,
              generationEstimatedMonth: sumEstimatedMonth,
              alert: alerts.length,
              staName: dev?.status ? dev?.status.sta_name : "Não informado!",
              staCode: dev?.status ? dev?.status.sta_code : "Não informado!",
            };
          });

          return res;
        })
        .flat();

      return {
        ...state,
        isDashboardDataLoading: false,
        dataDevices,
      };

    case users.GET_DASHBOARD_FAILURE:
      return {
        ...state,
        isDashboardDataLoading: false,
        dataDevices: [],
      };

    case users.GRAPH_REQUEST:
      return {
        ...state,
        isLoadingGraph: true,
        graphData: [],
      };

    case users.GRAPH_SUCCESS:
      return {
        ...state,
        isLoadingGraph: false,
        graphData: result,
      };

    case users.GRAPH_FAILURE:
      return {
        ...state,
        isLoadingGraph: false,
        graphData: [],
      };

    case users.GET_CAPACITY_REQUEST:
      return {
        ...state,
        isLoadingCapacity: true,
        capacity: [],
      };

    case users.GET_CAPACITY_SUCCESS:
      return {
        ...state,
        isLoadingCapacity: false,
        capacity: result,
      };

    case users.GET_CAPACITY_FAILURE:
      return {
        ...state,
        isLoadingCapacity: false,
        capacity: [],
      };

    case users.SEND_EMAIL_REQUEST:
      return {
        ...state,
        loadingSendingEmail: true,
        sendingEmail: false,
      };

    case users.SEND_EMAIL_REQUEST:
      return {
        ...state,
        loadingSendingEmail: false,
        sendingEmail: true,
      };

    case users.SEND_EMAIL_REQUEST:
      return {
        ...state,
        loadingSendingEmail: false,
        sendingEmail: false,
      };

    case users.RECOVER_PASSWORD_REQUEST:
      return {
        ...state,
        loadingPasswordRecovery: true,
        passwordRecovery: false,
      };

    case users.RECOVER_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingPasswordRecovery: false,
        passwordRecovery: true,
      };

    case users.RECOVER_PASSWORD_FAILURE:
      return {
        ...state,
        loadingPasswordRecovery: false,
        passwordRecovery: false,
      };

    case users.CANCEL_PLAN_REQUEST:
      return {
        ...state,
      };

    case users.CANCEL_PLAN_SUCCESS:
      return {
        ...state,
      };

    case users.CANCEL_PLAN_FAILURE:
      return {
        ...state,
      };

    case users.UPDATE_USER_REQUEST:
      return {
        ...state,
      };

    case users.UPDATE_USER_SUCCESS:
      return {
        ...state,
      };

    case users.UPDATE_USER_FAILURE:
      return {
        ...state,
      };

    case users.UPDATE_USER_EMAIL_REQUEST:
      return {
        ...state,
      };

    case users.UPDATE_USER_EMAIL_SUCCESS:
      return {
        ...state,
      };

    case users.UPDATE_USER_EMAIL_FAILURE:
      return {
        ...state,
      };

    case users.GET_ALL_DEVICES_FROM_USER_REQUEST:
      return {
        ...state,
        allDevicesFromUser: [],
      };

    case users.GET_ALL_DEVICES_FROM_USER_SUCCESS:
      console.log(result);
      return {
        ...state,
        allDevicesFromUser: result,
      };

    case users.GET_ALL_DEVICES_FROM_USER_FAILURE:
      return {
        ...state,
        allDevicesFromUser: [],
      };

    case users.UPDATE_EMAIL_CAPACITY_DEVICE:
      return {
        ...state,
      };

    case users.DELETE_USER_REQUEST:
      return {
        ...state,
        isDeletingUser: true,
      };

    case users.DELETE_USER_SUCCESS:
      return {
        ...state,
        isDeletingUser: false,
      };

    case users.DELETE_USER_FAILURE:
      return {
        ...state,

        isDeletingUser: false,
      };

    case users.UPDATE_BRAND:
      return {
        ...state,
      };

    default:
      return state;
  }
}
