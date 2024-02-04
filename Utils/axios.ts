import axios from "axios";
import { getAccessToken } from "./utils";

const API_END_POINT=process.env.HOST_API_URL 

const axiosInstance = axios.create({
  baseURL: API_END_POINT ||"http://localhost:1607/api/v1/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storedToken =getAccessToken()
    if (storedToken) {
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${storedToken}`
      }
    }

      console.log('ssssss',storedToken)
    // if (storedToken) {
    //   config.headers. = {
    //     Authorization: `Bearer ${storedToken}`,
    //   };
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
