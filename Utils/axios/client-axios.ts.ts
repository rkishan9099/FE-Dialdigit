import axios, { AxiosInstance } from "axios";
const clientAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.HOST_API_URL,
  headers: {
    Authorization: `Bearer client side token `,
  },
});

export default clientAxiosInstance;
