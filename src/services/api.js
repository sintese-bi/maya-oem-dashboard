import axios from "axios";
import { getUserCookie } from "./session";

console.log("--- ", `${process.env.REACT_APP_BASE_URL}v1`)
const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/v1`,
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
      url: `${process.env.REACT_APP_BASE_URL}/v1` + url,
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
