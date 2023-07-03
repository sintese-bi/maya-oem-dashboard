import axios from "axios";
import { getUserCookie } from "./session";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
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
      url: `${process.env.REACT_APP_BASE_URL}` + url,
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
