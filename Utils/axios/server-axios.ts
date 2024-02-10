// axios/server-axios.ts
import { currentUser } from "@/lib/auth";
import axios, { AxiosInstance } from "axios";

const serverAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.HOST_API_URL,
});

serverAxiosInstance.interceptors.request.use(
  async (config) => {
    console.log("users from ", await currentUser());
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default serverAxiosInstance;
