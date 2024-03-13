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
  devices: [],
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
  reportsCounting: 0,
  brandInfoData: [],
  massEmailFinished: true,
  invoiceValuesData: [],
};

export default function userReducer(state = initialState, action) {
  const { payload, brandListUser, profileLevel, result } = action;
  const { devicesData } = result || { devicesData: [] };
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

    case users.GET_REPORT_COUNTING:
      return {
        ...state,
        reportsCounting: result,
      };

    case users.POST_REPORT_COUNTING:
      return {
        ...state,
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
      const dataResult = devicesData.map((device) => {
        return {
          brand: device.dev_brand,
          blUuid: device.brand_login.bl_uuid,
          name: device.dev_name,
          uuid: device.dev_uuid,
          generationRealDay: device.gen_real_day,
          generationRealWeek: device.weeklySum.gen_real,
          generationRealMonth: device.monthlySum.gen_real,
          generationEstimated: device.gen_estimated_day,
          alert: device.alerts.length,
          staName: device?.status ? device?.status.sta_name : "Não informado!",
          staCode: device?.status ? device?.status.sta_code : "Não informado!",
        };
      });

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
      const allDevices = devicesData.map((device) => {
        let deviceItem = {
          brand: device.dev_brand,
          blUuid: device.brand_login.bl_uuid,
          name: device.dev_name,
          uuid: device.dev_uuid,
          address: device.dev_address,
          generationRealDay: Number(device.gen_real_day),
          generationRealWeek: Number(device.weeklySum.gen_real),
          generationRealMonth: Number(device.monthlySum.gen_real),
          generationEstimated: Number(device.gen_estimated_day),
          generationEstimatedlWeek: Number(device.weeklySum.gen_estimated),
          generationEstimatedMonth: Number(device.monthlySum.gen_estimated),
          alert: device.alerts.length,
          staName: device?.status ? device?.status.sta_name : "Não informado!",
          staCode: device?.status ? device?.status.sta_code : "Não informado!",
          name: device.dev_name,
          dev_lat: device.dev_lat,
          dev_long: device.dev_long,
          dev_image: device.dev_image,
          email: device.dev_email,
          capacity: Number(device.dev_capacity),
        };
        return deviceItem;
      });

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

    case users.GET_BRAND_INFO:
      return {
        ...state,
        brandInfoData: result,
      };

    case users.GET_INVOICE_VALUES_REQUEST:
      return {
        ...state,
        invoiceValuesData: [],
      };

    case users.GET_INVOICE_VALUES_SUCCESS:
      return {
        ...state,
        invoiceValuesData: result.map((data) => {
          return {
            ...data,
            compensacao: Number(data.compensacao).toFixed(),
            pago: data.pago == "1" ? "Sim" : "Não",
            boleto_quitado: data.boleto_quitado == "1" ? "Sim" : "Não",
          };
        }),
      };

    case users.GET_INVOICE_VALUES_FAILURE:
      return {
        ...state,
        invoiceValuesData: [],
      };

    case users.GET_DASHBOARD_REQUEST:
      return {
        ...state,
        isDashboardDataLoading: true,
        devices: [],
      };

    case users.GET_DASHBOARD_SUCCESS:
      const devices = devicesData.map((device) => {
        return {
          brand: device.dev_brand,
          blUuid: device.brand_login.bl_uuid,
          name: device.dev_name,
          uuid: device.dev_uuid,
          address: device.dev_address,
          generationRealDay: Number(device.gen_real_day),
          generationRealWeek: Number(device.weeklySum.gen_real),
          generationRealMonth: Number(device.monthlySum.gen_real),
          generationEstimated: Number(device.gen_estimated_day),
          generationEstimatedlWeek: Number(device.weeklySum.gen_estimated),
          generationEstimatedMonth: Number(device.monthlySum.gen_estimated),
          alert: device.alerts.length,
          staName: device?.status ? device?.status.sta_name : "Não informado!",
          staCode: device?.status ? device?.status.sta_code : "Não informado!",
          name: device.dev_name,
          dev_lat: device.dev_lat,
          dev_long: device.dev_long,
          dev_image: device.dev_image,
          email: device.dev_email,
          capacity: Number(device.dev_capacity),
        };
      });

      return {
        ...state,
        isDashboardDataLoading: false,
        devices,
      };

    case users.GET_DASHBOARD_FAILURE:
      return {
        ...state,
        isDashboardDataLoading: false,
        devices: [],
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
      return {
        ...state,
        allDevicesFromUser: result.map((data) => {
          if (data.dev_address != null) {
            let ic_city = data.dev_address.split("-")[0];
            let ic_states = data.dev_address.split("-")[1]
              ? data.dev_address.split("-")[1]
              : "";
            return { ...data, ic_city, ic_states };
          } else {
            let ic_city = "";
            let ic_states = "";
            return { ...data, ic_city, ic_states };
          }
        }),
      };

    case users.GET_ALL_DEVICES_FROM_USER_FAILURE:
      return {
        ...state,
        allDevicesFromUser: [],
      };

    case users.MASS_EMAIL_REQUEST:
      return {
        ...state,
        massEmailFinished: false,
      };

    case users.MASS_EMAIL_SUCCESS:
      return {
        ...state,
        massEmailFinished: true,
      };

    case users.XLSX_PORTAL_REQUEST:
      return { ...state };

    case users.XLSX_PORTAL_SUCCESS:
      return { ...state };

    case users.XLSX_PORTAL_FAILURE:
      return { ...state };

    case users.HELP_CENTER_REQUEST:
      return { ...state };

    case users.HELP_CENTER_SUCCESS:
      return { ...state };

    case users.HELP_CENTER_FAILURE:
      return { ...state };

    case users.INVOICE_USER_REQUEST:
      return { ...state };

    case users.INVOICE_USER_SUCCESS:
      return { ...state };

    case users.INVOICE_USER_FAILURE:
      return { ...state };

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
