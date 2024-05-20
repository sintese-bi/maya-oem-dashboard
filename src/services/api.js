import axios from "axios";
import { getUserCookie } from "./session";

// CRIAÇÃO DA INSTANCIA DO AXIOS
const api = axios.create({
  baseURL: `https://app.mayaoem.com.br/v1`,
  //baseURL: `http://localhost:8080/v1`,
});

// CRIA O OBJETO DE HEADERS COM O TOKEN DO USUARIO
export const configRequest = () => {
  const { token } = getUserCookie() || {};

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// FUNÇÃO PARA FAZER CHAMADAS PARA A API USANDO O AXIOS
export const axiosBaseQuery = async ({ url, method, data, params }) => {
  try {
    const result = await axios({
      ...configRequest(),
      url: `https://app.mayaoem.com.br/v1` + url,
      //url: `http://localhost:8080/v1` + url,
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
