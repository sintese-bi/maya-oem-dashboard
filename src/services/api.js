import axios from "axios";
import { getUserCookie } from "./session";

const api = axios.create({
  baseURL: `https://app.mayaoem.com.br/v1`,
  // baseURL: `http://localhost:8080/v1`,
});

export const configRequest = () => {
  const { token } = getUserCookie() || {};

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const axiosBaseQuery = async ({ url, method, data, params }) => {
  try {
    const result = await axios({
      ...configRequest(),
      url: `https://app.mayaoem.com.br/v1` + url,
      // url: `http://localhost:8080/v1` + url,
      method,
      data,
      params,
    });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export default api;
