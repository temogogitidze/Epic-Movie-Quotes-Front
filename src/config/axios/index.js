import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(function (response) {
  return response;
});

export default axiosInstance;
