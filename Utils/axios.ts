import axios, { AxiosResponse } from "axios";
import { currentUser } from "@/lib/auth";
import { logout } from "@/actions/authActions";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1607/api/v1'// process.env.API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let access_token: string = '';
    const isServer = typeof window === 'undefined'
    if (isServer) {
      const user = await currentUser();
      if (user) {
        const user = await currentUser();
        access_token = user?.accessToken || ''
      }
    } else {
      if (typeof localStorage !== 'undefined') {
        access_token = localStorage && localStorage.getItem('access_token') || ''
      }
    }
    if (access_token) {
      if (!config.headers["Authorization"]) {
        config.headers.Authorization = `Bearer ${access_token}`;
      } else {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
    }

    return config;
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async function (error) {
    console.debug('eerrrr',error)
    // if ([401, 403].includes(error.response.data?.statusCode)) {
    //   return await logout()
    // }
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;