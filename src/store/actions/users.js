import { users } from "../typesActions/types";
import { getUserCookie, setUserCookie } from "../../services/session";

import api, { configRequest } from "../../services/api";

import toast from "react-hot-toast";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    charset: "utf-8",
  },
};

export const reportCounting = (params) => (dispatch) => {
  api
    .post("/reportcounting", params, configRequest())
    .then((res) => {
      dispatch({
        type: users.GET_REPORT_COUNTING,
        result: res.data["Quantidade de relatórios distintos baixados:"],
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
    });
};

export const brandInfo = (params) => (dispatch) => {
  api
    .post("/brandinfo", params, configRequest())
    .then((res) => {
      dispatch({
        type: users.GET_BRAND_INFO,
        result: res.data.message,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data ? err.data.message : "Erro desconhecido - brandInfo";

      toast.error(message, {
        duration: 5000,
      });
    });
};

export const massEmail = (params) => (dispatch) => {
  dispatch({ type: users.MASS_EMAIL_REQUEST });

  api
    .get("/massemail", configRequest())
    .then((res) => {
      const { data } = res;
      dispatch({ type: users.MASS_EMAIL_SUCCESS });

      toast.success(data.message, {
        duration: 5000,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data ? err.data.message : "Erro desconhecido - brandInfo";

      toast.error(message, {
        duration: 5000,
      });
    });
};

export const invoiceValues = (params) => (dispatch) => {
  dispatch({ type: users.GET_INVOICE_VALUES_REQUEST });
  api
    .get("/invoicevalues", configRequest())
    .then((res) => {
      const { data } = res;
      dispatch({ type: users.GET_INVOICE_VALUES_SUCCESS, result: data });
    })
    .catch((error) => {
      const { response: err } = error;

      dispatch({ type: users.GET_INVOICE_VALUES_FAILURE });

      const message =
        err && err.data
          ? err.data.message
          : "Erro desconhecido - invoiceValues";

      toast.error(message, {
        duration: 5000,
      });
    });
};

export const storeReport = (params) => (dispatch) => {
  api
    .post("/storereport", params, configRequest())
    .then((res) => {
      const { data } = res;

      toast.success("report contado", {
        duration: 5000,
      });

      dispatch({
        type: users.POST_REPORT_COUNTING,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
    });
};

// AUTENTICAÇÃO DE USUARIO
export const auth = (params) => (dispatch) => {
  dispatch({ type: users.AUTH_REQUEST });
  return new Promise((resolve, reject) => {
    api
      .post("/login", params)
      .then((res) => {
        const { data } = res;
        const { message, token, result } = data;
        const {
          profile_level,
          use_name,
          use_uuid,
          use_email,
          use_type_member,
          use_city_state,
          use_telephone,
        } = result.use_data;
        localStorage.setItem(
          "userDevicesIsReady",
          result.use_devices_amount != 0 ? true : false
        );
        if (!getUserCookie()) {
          setUserCookie({
            token,
            profileLevel: profile_level.pl_cod,
            useUuid: use_uuid,
            useName: use_name,
            useEmail: use_email,
            useTypeMember: use_type_member,
            useCityState: use_city_state,
            useTelephone: use_telephone,
            firstTime: true,
          });
        } else {
          setUserCookie({
            token,
            profileLevel: profile_level.pl_cod,
            useUuid: use_uuid,
            useName: use_name,
            useEmail: use_email,
            useTypeMember: use_type_member,
            useCityState: use_city_state,
            useTelephone: use_telephone,
            firstTime: false,
          });
        }

        toast.success(message, {
          duration: 5000,
        });

        dispatch({
          type: users.AUTH_SUCCESS,
          result: {
            use_data: {
              token,
              profileLevel: profile_level.pl_cod,
              useUuid: use_uuid,
              useName: use_name,
              useEmail: use_email,
              useTypeMember: use_type_member,
            },
            use_devices_amount: result.use_devices_amount,
          },
          profileLevel: profile_level.pl_cod,
        });

        resolve({
          profileLevel: profile_level.pl_cod,
          status: 200,
        });
      })
      .catch((error) => {
        const { response: err } = error;
        console.log(error);

        const message =
          err && err.data ? err.data.message : "Erro desconhecido";

        toast.error(message, {
          duration: 5000,
        });

        dispatch({ type: users.AUTH_FAILURE, message });
        reject({ status: 404 });
      });
  });
};

export const selectedUser = (params) => (dispatch) => {
  dispatch({ type: users.SELECT_USER, result: params });
  toast.success("Usuário selecionado", {
    duration: 5000,
  });
};

// REGISTRAR DADOS DO USUARIO
export const registerUser = (params) => (dispatch) => {
  dispatch({ type: users.POST_REGISTER_REQUEST });

  const formatBrandLogin = JSON.stringify(params.brand_login);
  delete params.brand_login;
  const format = { ...params, brand_login: formatBrandLogin };

  api
    .post("/register", format, config)
    .then((res) => {
      const { data } = res;

      toast.success(data.message, {
        duration: 5000,
      });

      dispatch({
        type: users.POST_REGISTER_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.POST_REGISTER_FAILURE, message });
    });
};

// RETORNA DADOS DO USUARIO
export const show = (uuid) => (dispatch) => {
  dispatch({ type: users.GET_SHOW_REQUEST });
  api
    .get(`/user/${uuid}`)
    .then((res) => {
      const { data } = res;
      dispatch({
        type: users.GET_SHOW_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.GET_SHOW_FAILURE, message });
    });
};

// REGISTRAR DADOS DO USUARIO
export const checkBrnad = (params) => (dispatch) => {
  dispatch(registerUser(params));
  // dispatch({ type: users.CHECK_BRAND_REQUEST });
  // api
  //   .get('/brand_login', params.brand_login)
  //   .then((res) => {
  //     const { data } = res;
  //     console.log("res ", res)
  //     dispatch({
  //       type: users.CHECK_BRAND_SUCCESS,
  //       payload: {
  //         data: [],
  //       },
  //     });
  //   })
  //   .catch((error) => {
  //     const { response: err } = error;
  //     const message = err && err.data ? err.data.message : "Erro desconhecido";

  //     toast.error(message, {
  //       duration: 5000,
  //     });
  //     dispatch({ type: users.CHECK_BRAND_FAILURE, message });
  //   });
};

// LISTAGEM DE USUARIOS
export const getUsers = () => (dispatch) => {
  dispatch({ type: users.GET_USERS_REQUEST });

  api
    .get("/users", configRequest())
    .then((res) => {
      const { data } = res;
      dispatch({
        type: users.GET_USERS_SUCCESS,
        result: data,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.GET_USERS_FAILURE, message });
    });
};

// LISTAGEM DE USUARIOS E SUAS BRANDS
export const getUserBrands = (uuid) => (dispatch) => {
  dispatch({ type: users.GET_USER_BRANDS_REQUEST });

  api
    .get(`/dashboard/${uuid}`, configRequest())
    .then((res) => {
      const { data } = res;
      dispatch({
        type: users.GET_USER_BRANDS_SUCCESS,
        result: data,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";
      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.GET_USER_BRANDS_FAILURE, message });
    });
};

// ATUALIZAR PROJEÇÃO E FEREQUENCIA DE ALERTA DE GERAÇÃO
export const patchAlertFrequency = (params) => (dispatch) => {
  dispatch({ type: users.PATH_ALERT_FREQUENCY_REQUEST });

  api
    .patch("/alertFrequency", params)
    .then((res) => {
      const { data } = res;
      toast.success(data.message, {
        duration: 5000,
      });

      dispatch({
        type: users.PATH_ALERT_FREQUENCY_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";
      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.PATH_ALERT_FREQUENCY_FAILURE, message });
    });
};

export const alertFrequency = (uuid) => (dispatch) => {
  dispatch({ type: users.GET_ALERT_FREQUENCY_REQUEST });

  api
    .get(`/alertFrequency/${uuid}`)
    .then((res) => {
      const { data } = res;
      dispatch({
        type: users.GET_ALERT_FREQUENCY_SUCCESS,
        result: data,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.GET_ALERT_FREQUENCY_FAILURE, message });
    });
};

export const getAllDevices = (uuid, component) => (dispatch) => {
  dispatch({ type: users.GET_ALL_DEVICES_REQUEST });
  api
    .get(`/dashboard/${uuid}`, configRequest())
    .then((res) => {
      const { data } = res;
      dispatch({
        type: users.GET_ALL_DEVICES_SUCCESS,
        result: { devicesData: data.devicesData, brands: data.brand },
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);
      const message =
        err && err.data
          ? err.data.message
          : "Erro desconhecido - getAllDevices";
      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.GET_ALL_DEVICES_FAILURE, message });
    });
};

// RETORNA OS DADOS DA DASHBOARD
export const getDashboard = (uuid, component) => (dispatch) => {
  dispatch({ type: users.GET_DASHBOARD_REQUEST });
  api
    .get(`/dashboard/${uuid}/yes`, configRequest())
    .then((res) => {
      const { data } = res;
      dispatch({
        type: users.GET_DASHBOARD_SUCCESS,
        result: { devicesData: data.devicesData, brands: data.brand },
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);
      const message =
        err && err.data
          ? err.data.message
          : "Erro desconhecido - getDashboard" + component;
      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.GET_DASHBOARD_FAILURE, message });
    });
};

export const invoice = (params) => (dispatch) => {
  dispatch({ type: users.INVOICE_USER_REQUEST });

  api
    .post("/invoice", params, configRequest())
    .then((res) => {
      const { data } = res;
      toast.success(data.message, {
        duration: 5000,
      });
      dispatch({
        type: users.INVOICE_USER_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data ? err.data.message : "Erro desconhecido - invoice";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.INVOICE_USER_FAILURE, message });
    });
};

export const updateUser = (params) => (dispatch) => {
  dispatch({ type: users.UPDATE_USER_REQUEST });
  api
    .post("/updateuser", params, configRequest())
    .then((res) => {
      const { data } = res;
      const { use_name, use_uuid, use_email, use_city_state, use_telephone } =
        data["Informações"];
      setUserCookie({
        ...getUserCookie(),
        useUuid: use_uuid,
        useName: use_name,
        useEmail: use_email,
        useCityState: use_city_state,
        useTelephone: use_telephone,
      });
      toast.success(data.message, {
        duration: 5000,
      });

      dispatch({
        type: users.UPDATE_USER_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data ? err.data.message : "Erro desconhecido - updateUser";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.UPDATE_USER_FAILURE, message });
    });
};

export const updateEmailAndCapacity = (params) => (dispatch) => {
  api
    .post("/updateplants", params, configRequest())
    .then((res) => {
      const { data } = res;
      dispatch({ type: users.UPDATE_EMAIL_CAPACITY_DEVICE });
      toast.success(data.message, {
        duration: 3000,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.POST_REGISTER_FAILURE, message });
    });
};

export const getGraphData = (params) => (dispatch) => {
  dispatch({ type: users.GRAPH_REQUEST });
  api
    .post(
      "/genrealday",
      {
        startDate: params.startDate,
        endDate: params.endDate,
        use_uuid: params.uuid,
      },
      configRequest()
    )
    .then((res) => {
      const { data } = res;
      dispatch({
        type: users.GRAPH_SUCCESS,
        result: {
          data: data,
          dates: { startDate: params.startDate, endDate: params.endDate },
        },
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.POST_REGISTER_FAILURE, message });
    });
};

export const getCapacities = (blUuids) => (dispatch) => {
  let capacities = [];
  dispatch({ type: users.GET_CAPACITY_REQUEST });
  blUuids?.map((data) => {
    api
      .get(`/report/${data}`)
      .then((res) => {
        const { data } = res;
        capacities.push(data.sumOfDevCapacities);
      })
      .catch((error) => {
        const { response: err } = error;
        console.log(error);

        const message =
          err && err.data
            ? err.data.message
            : "Erro desconhecido - user-capacity";
        toast.error(message, {
          duration: 5000,
        });
        dispatch({
          type: users.GET_CAPACITY_FAILURE,
          message,
        });
      });
  });

  dispatch({
    type: users.GET_CAPACITY_SUCCESS,
    result: capacities,
  });
};

export const sendEmail = (data) => (dispatch) => {
  dispatch({ type: users.SEND_EMAIL_REQUEST });
  api
    .post("/sendingemail", { use_email: data.use_email }, configRequest())
    .then((res) => {
      const { data } = res;

      toast.success(data.message, {
        duration: 5000,
      });

      dispatch({
        type: users.SEND_EMAIL_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.SEND_EMAIL_FAILURE, message });
    });
};

export const helpCenter = (params) => (dispatch) => {
  dispatch({ type: users.HELP_CENTER_REQUEST });
  api
    .post("/helpcenter", params, configRequest())
    .then((res) => {
      const { data } = res;

      toast.success(data.message, {
        duration: 5000,
      });

      dispatch({
        type: users.HELP_CENTER_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data ? err.data.message : "Erro desconhecido - helpCenter";

      toast.error(message, {
        duration: 5000,
      });

      dispatch({ type: users.HELP_CENTER_FAILURE });
    });
};

export const xlsxPortal = (params, handleBrandInfoRequest) => (dispatch) => {
  dispatch({ type: users.XLSX_PORTAL_REQUEST });
  api
    .post("/xlsxportal", params, configRequest())
    .then((res) => {
      const { data } = res;
      toast.success(data.message, {
        duration: 5000,
      });

      handleBrandInfoRequest();

      dispatch({
        type: users.XLSX_PORTAL_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data ? err.data.message : "Erro desconhecido - xlsxPortal";

      toast.error(message, {
        duration: 5000,
      });

      dispatch({ type: users.XLSX_PORTAL_FAILURE });
    });
};

export const passwordRecovery = (params) => (dispatch) => {
  dispatch({ type: users.RECOVER_PASSWORD_REQUEST });
  const { new_password, use_token, use_email, navigate } = params;
  api
    .post(
      `/passrecover?use_token=${use_token}&use_email=${use_email}`,
      { use_password: new_password },
      configRequest()
    )
    .then((res) => {
      const { data } = res;

      toast.success(data.message, {
        duration: 5000,
      });
      navigate("/");
      dispatch({
        type: users.RECOVER_PASSWORD_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.RECOVER_PASSWORD_FAILURE, message });
    });
};

export const cancelUserPlan = (use_uuid) => (dispatch) => {
  dispatch({ type: users.CANCEL_PLAN_REQUEST });
  api
    .post("/cancelplan", { use_uuid }, configRequest())
    .then((res) => {
      const { data } = res;
      toast.success(data.message, {
        duration: 5000,
      });
      dispatch({
        type: users.CANCEL_PLAN_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data
          ? err.data.message
          : "Erro desconhecido - cancelUserPlan";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.CANCEL_PLAN_FAILURE, message });
    });
};

export const portalemailLogins = (params) => (dispatch) => {
  dispatch({ type: users.UPDATE_USER_EMAIL_REQUEST });
  api
    .post("/usealertemail", params, configRequest())
    .then((res) => {
      const { data } = res;
      toast.success(data.message, {
        duration: 5000,
      });
      dispatch({
        type: users.UPDATE_USER_EMAIL_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data
          ? err.data.message
          : "Erro desconhecido - portalemailLogins";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.UPDATE_USER_EMAIL_FAILURE, message });
    });
};

export const getAllDevicesFromUser = (params) => (dispatch) => {
  dispatch({ type: users.GET_ALL_DEVICES_FROM_USER_REQUEST });
  api
    .post(`/deviceinfo/yes`, params, configRequest())
    .then((res) => {
      const { data } = res;
      toast.success("Plantas carregadas com sucesso", {
        duration: 5000,
      });
      dispatch({
        type: users.GET_ALL_DEVICES_FROM_USER_SUCCESS,
        result: data,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      const message =
        err && err.data
          ? err.data.message
          : "Erro desconhecido - getAllDevicesFromUser";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.GET_ALL_DEVICES_FROM_USER_FAILURE, message });
    });
};

export const deleteUser = (params, getUsers) => (dispatch) => {
  dispatch({ type: users.DELETE_USER_REQUEST });
  api
    .post("/deleteuser", params, configRequest())
    .then((res) => {
      const { data } = res;
      dispatch(getUsers());
      dispatch({ type: users.DELETE_USER_SUCCESS });
      toast.success(data.message, {
        duration: 5000,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      console.log(error);

      dispatch({ type: users.DELETE_USER_FAILURE });
      const message =
        err && err.data
          ? err.data.message
          : "Erro desconhecido - getAllDevicesFromUser";

      toast.error(message, {
        duration: 5000,
      });
    });
};

export const updateBrands = (params) => (dispatch) => {
  dispatch({ type: users.UPDATE_BRAND });

  api
    .post("/updatebrands", params, configRequest())
    .then((res) => {
      const { data } = res;
      handleBrandInfoRequest();
      toast.success(data.message, {
        duration: 5000,
      });
    })
    .catch((error) => {
      const { response: err } = error;

      const message =
        err && err.data ? err.data.message : "Erro desconhecido - updateBrands";

      toast.error(message, {
        duration: 5000,
      });
    });
};
