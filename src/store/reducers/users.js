import { users } from "../typesActions/types";

import moment from "moment-timezone";

const initialState = {
  message: "",
  isLoading: false,
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
  graphData: [],
  generationBelowEstimated: [],
  alerts: [],
  offline: [],
  online: [],
  percentage: [],
  frequencyName: [],
  capacity: [],
  sendingEmail: [],
  passwordRecovery: [],
  selectedUser: [],
  userData: {}
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
        userData: [],
        brandListUser: [],
        profileLevel: [],
      };

    case users.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: result,
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
        selectedUser: [result]
      }

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
        useCodePagarMe: use_code_pagar_me
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
              (item) => item.gen_date === moment().subtract(1, 'day').format('YYYY-MM-DD')
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
        blUuids: [],
        dataDevices: [],
        generationBelowEstimated: [],
        alerts: [],
        offline: [],
        online: [],
      };


    case users.GET_DASHBOARD_SUCCESS:
      const daysPassed = moment().date();
      const dataDevices = brand_login
        .map((item) => {
          const devicesNotDeleted = item.devices.filter((dev) => dev.dev_deleted !== true)
          const res = devicesNotDeleted.map((dev) => {
            const generationEstimatedDay = dev.generation.length !== 0
              ? dev.generation[0].gen_estimated
              : 0

            let sumRealWeek = 0;
            let sumEstimatedlWeek = generationEstimatedDay * Math.min(7, daysPassed);

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
              sumRealMonth += item.gen_real
            });

            const generationRealDay = dev.generation.filter(
              (item) => item.gen_date === moment().format("YYYY-MM-DD")
            );

            const alerts = dev.alerts.length !== 0 ? dev.alerts.filter(item => {
              const alertDate = moment(item.alert_created_at).format('YYYY-MM-DD');
              const today = moment().format('YYYY-MM-DD');
              return alertDate === today;
            }) : []

            return {
              brand: dev.dev_brand,
              blUuid: item.bl_uuid,
              name: dev.dev_name,
              capacity: `${(dev.dev_capacity / 1000).toFixed(2)}MWp`,
              uuid: dev.dev_uuid,
              generationRealDay:
                generationRealDay.length !== 0
                  ? generationRealDay[0].gen_real + "Kwh"
                  : 0 + "Kwh",
              generationRealWeek: sumRealWeek.toFixed(2) + "Kwh",
              generationRealMonth: sumRealMonth.toFixed(2) + "Kwh",
              generationEstimatedDay: generationEstimatedDay ? generationEstimatedDay + "Kwh" : 0 + "Kwh",
              generationEstimatedlWeek: sumEstimatedlWeek.toFixed(2) + "Kwh",
              generationEstimatedMonth: sumEstimatedMonth.toFixed(2) + "Kwh",
              alert: alerts.length,
              staName: dev?.status ? dev?.status.sta_name : "Não informado!",
              staCode: dev?.status ? dev?.status.sta_code : "Não informado!",
            };
          });

          return res;
        })
        .flat();

      const brands = [...new Set(dataDevices.map((item) => item.brand))];
      const blUuids = [...new Set(dataDevices.map((item) => item.blUuid))]

      const generationBelowEstimated = dataDevices.filter(
        (item) => item.generationRealWeek < item.generationEstimatedlWeek
      );
      const alerts = dataDevices.filter((item) => item.alert !== 0);

      const offline = dataDevices.filter((item) => item.staCode === "offline");
      const online = dataDevices.filter((item) => item.staCode === "online");

      return {
        ...state,
        isLoading: false,
        brands,
        blUuids,
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
        blUuids: [],
        dataDevices: [],
        generationBelowEstimated: [],
        alerts: [],
        offline: [],
        online: [],
      };

    case users.GRAPH_REQUEST:
      return {
        ...state,
        isLoadingGraph: true,
        graphData: []
      }

    case users.GRAPH_SUCCESS:
      return {
        ...state,
        isLoadingGraph: false,
        graphData: result
      }

    case users.GRAPH_FAILURE:
      return {
        ...state,
        isLoadingGraph: false,
        graphData: []
      }


    case users.GET_CAPACITY_REQUEST:
      return {
        ...state,
        isLoadingCapacity: true,
        capacity: [],
      }

    case users.GET_CAPACITY_SUCCESS:
      return {
        ...state,
        isLoadingCapacity: false,
        capacity: result
      }

    case users.GET_CAPACITY_FAILURE:
      return {
        ...state,
        isLoadingCapacity: false,
        capacity: [],
      }

    case users.SEND_EMAIL_REQUEST:
      return {
        ...state,
        loadingSendingEmail: true,
        sendingEmail: false,
      }

    case users.SEND_EMAIL_REQUEST:
      return {
        ...state,
        loadingSendingEmail: false,
        sendingEmail: true,
      }

    case users.SEND_EMAIL_REQUEST:
      return {
        ...state,
        loadingSendingEmail: false,
        sendingEmail: false,
      }

    case users.RECOVER_PASSWORD_REQUEST:
      return {
        ...state,
        loadingPasswordRecovery: true,
        passwordRecovery: false,
      }

    case users.RECOVER_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingPasswordRecovery: false,
        passwordRecovery: true,
      }

    case users.RECOVER_PASSWORD_FAILURE:
      return {
        ...state,
        loadingPasswordRecovery: false,
        passwordRecovery: false,
      }

    default:
      return state;
  }
}
