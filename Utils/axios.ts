import axios from "axios";
import { getAccessToken } from "./utils";
import { getSession } from "next-auth/react";
import { auth } from "@/auth";


const API_END_POINT=process.env.HOST_API_URL 

const axiosInstance = axios.create({
  baseURL:"http://localhost:1607/api/v1/",
});

axiosInstance.interceptors.request.use(
  (config) => {
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
