import axiosInstance from "@/Utils/axios";
import { AuthApiUrl } from "@/configs/apiUrlConstant";
import { LoginParams, SignUpParams } from "@/types/authType";
import toast from "react-hot-toast";


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
      console.log('error RFTGHTJUIKOP;[]',error)
      this.isError=true;
      this.errorMessage= error?.message;
      return null
    }
  }
  async handleSignUp(data:SignUpParams){
     try {
       const response = await axiosInstance.post(AuthApiUrl.signup,data);
       if(response?.data?.status==="success" &&response?.data?.statusCode===201){
        return {status:"success",message:response?.data?.message}
       }else{
        return {status:"error",message:response?.data?.message}
       }
     } catch (error) {
      return {status:"error",message:"Something Went Wrong"}
     }
  }
}

export const AuthService = new Auth();