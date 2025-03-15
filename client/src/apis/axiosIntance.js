import axios from "axios";
import store from "../store/store";
import { refreshToken } from "../features/actions/authActions";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise = null;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = store.dispatch(refreshToken()).unwrap();

        try {
          const newToken = await refreshPromise;
          localStorage.setItem("accessToken", newToken);
          axiosInstance.defaults.headers["Authorization"] = `Bearer ${newToken}`;
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      } else {
        await refreshPromise;
      }

      originalRequest.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
