"use server";
import axiosInstance from "@/Utils/axios";
import { auth, update } from "@/auth";
import { UserApiUrl } from "@/configs/apiUrlConstant";
import { UserDataType } from "@/context/types";
import { Session } from "next-auth";
export const getUser = async (data: any) => {
  //   // makeStore().dispatch(fetchUser())
  try {
    const res = await axiosInstance.get(UserApiUrl.getUser)
    console.log('res',res?.data)
    return res.data;
    
  } catch (error) {
    console.log('error',error)
  }

 
};
