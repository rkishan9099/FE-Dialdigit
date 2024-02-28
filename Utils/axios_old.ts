import axios from "axios";
import { currentUser } from "@/lib/auth";

const axiosInstance = axios.create({
  baseURL: process.env.HOST_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const user = await currentUser();
    if (user) {
      const { accessToken } = user;
      if (!config.headers["Authorization"]) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if ([401, 403].includes(error.response.status) && !originalRequest._retry) {
      originalRequest._retry = true;
      const user = await currentUser();
      if (user) {
        const { refreshToken } = user;
        console.log('refreshToken',refreshToken)
        if (!error.config.headers["Authorization"]) {
          error.config.headers.Authorization = `Bearer ${refreshToken}`;
        } else {
          error.config.headers.Authorization = `Bearer ${refreshToken}`;
        }
        const res = axiosInstance(originalRequest);
        console.log("res reffress token", res);
      }
    }

    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;
