"use server";

import axiosInstance from "@/Utils/axios";
import { UserApiUrl } from "@/configs/apiUrlConstant";
export const getUser = async () => {
  try {
    const response = await axiosInstance.get(UserApiUrl.getUser);
    console.log("response user", response);
    return response.data;
  } catch (error) {
    return error;
  }
};
