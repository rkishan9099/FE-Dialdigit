import axiosInstance from "@/Utils/axios";
import { AuthApiUrl } from "@/configs/apiUrlConstant";
import { LoginParams } from "@/types/authType";

class Auth{
  isError=false
  errorMessage=""
  async handleLogin(data:any){
    try {
      const response = await axiosInstance.post(AuthApiUrl.login,data);
      if(response?.data?.statusCode===200 && response?.data?.status==="success"){
        this.isError=false
        this.errorMessage="";
        return response?.data?.data
      }else{
        return null
      }
    } catch (error:any) {
      this.isError=true;
      this.errorMessage= error?.message;
      return null
    }

  }
}

export const AuthService = new Auth();