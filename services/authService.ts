import axiosInstance from "@/Utils/axios";
import { AuthApiUrl } from "@/configs/apiUrlConstant";
import { LoginParams } from "@/types/authType";

class Auth{
  async handleLogin(data:any){
    try {
      const response = await axiosInstance.post(AuthApiUrl.login,data);
      if(response?.data?.statusCode===200 && response?.data?.status==="success"){
        return response?.data?.data
      }
    } catch (error:any) {
      return {status:'error',message:error?.message || "Internal Server Error"}
    }

  }
}

export const AuthService = new Auth();