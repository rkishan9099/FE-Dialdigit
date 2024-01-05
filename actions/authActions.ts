"use server"

import { signIn, signOut } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes/routes";
import email from "@/store/apps/email";
import { LoginParams, LoginSchema } from "@/types/authType"
import { AuthError } from "next-auth";
import * as yup from "yup";

export const login = async ( values:yup.InferType<typeof LoginSchema>) =>{
      if (!LoginSchema.isValid(values)) {
    return { error: "Invalid fields!" };
  }
     try {
    const  res = await signIn("credentials",values)
    console.debug("res ====> ",res)
  } catch (error) {
    if(error  instanceof Error){

    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
          break;
        case "CallbackRouteError":
            console.log('ddddddddd',error?.cause?.err)
            break;
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
}

export const logout = async ()=>{
    await signOut()
}
