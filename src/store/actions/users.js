import { users } from "../typesActions/types";
import { setUserCookie } from "../../services/session";

import api, { configRequest } from "../../services/api";

import toast from "react-hot-toast";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    charset: "utf-8",
  },
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
        const { profile_level, use_name, use_uuid } = result;
        console.log('auth-data', data);
        setUserCookie({
          token,
          profileLevel: profile_level.pl_cod,
          useUuid: use_uuid,
          useName: use_name,
        });

        toast.success(message, {
          duration: 5000,
        });

        dispatch({
          type: users.AUTH_SUCCESS,
          profileLevel: profile_level.pl_cod,
        });

        resolve({
          profileLevel: profile_level.pl_cod,
          status: 200,
        });
      })
      .catch((error) => {
        const { response: err } = error;
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
      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.POST_REGISTER_FAILURE, message });
    });
};

// REGISTRAR DADOS DO USUARIO
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

// LISTAGEM DE USUARIO
export const getUsers = () => (dispatch) => {
  dispatch({ type: users.GET_USERS_REQUEST });

  api
    .get("/users", configRequest())
    .then((res) => {
      const { data } = res;
      console.log('getUsers-data', data);
      dispatch({
        type: users.GET_USERS_SUCCESS,
        result: data,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido";

      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.GET_USERS_FAILURE, message });
    });
};

// LISTAGEM DE USUARIO E SUAR BRAND
export const getUserBrands = (uuid) => (dispatch) => {
  dispatch({ type: users.GET_USER_BRANDS_REQUEST });

  api
    .get(`/dashboard/${uuid}`, configRequest())
    .then((res) => {
      const { data } = res;
      console.log("getUserBrands-data", data)
      dispatch({
        type: users.GET_USER_BRANDS_SUCCESS,
        result: data,
      });
    })
    .catch((error) => {
      const { response: err } = error;
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
      console.log("patchAlertFrequency-data", data)
      toast.success(data.message, {
        duration: 5000,
      });

      dispatch({
        type: users.PATH_ALERT_FREQUENCY_SUCCESS,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido";

      console.log("error: ", error);
      console.log("err: ", err);
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
      console.log("alertFrequency-data", data)
      dispatch({
        type: users.GET_ALERT_FREQUENCY_SUCCESS,
        result: data
      });
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido";

      console.log("err: ", err);
      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.GET_ALERT_FREQUENCY_FAILURE, message });
    });
};

// LISTAGEM DE USUARIO E SUAR BRAND
export const getDashboard = (uuid) => (dispatch) => {
  dispatch({ type: users.GET_DASHBOARD_REQUEST });

  api
    .get(`/dashboard/${uuid}`, configRequest())
    .then((res) => {
      const { data } = res;
      console.log('getDashboard-data', data);
      dispatch({
        type: users.GET_DASHBOARD_SUCCESS,
        result: data,
      });
    })
    .catch((error) => {
      const { response: err } = error;
      const message = err && err.data ? err.data.message : "Erro desconhecido";
      toast.error(message, {
        duration: 5000,
      });
      dispatch({ type: users.GET_DASHBOARD_FAILURE, message });
    });
};
