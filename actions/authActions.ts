"use server";

import { auth, signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes/routes";
import { AuthService } from "@/services/authService";
import { LoginParams, LoginSchema, SignUpParams } from "@/types/authType";
import { AuthError } from "next-auth";
import toast from "react-hot-toast";
import * as yup from "yup";

export const login = async (
  values: yup.InferType<typeof LoginSchema>,
  callbackUrl: string | null = null
) => {
  if (!LoginSchema.isValid(values)) {
    return { error: "Invalid fields!" };
  }
  try {
    const res = await signIn("credentials", {
      ...values,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    return { status: "success", message: "User Login Successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          if (AuthService.isError) {
            return {
              status: "error",
              message: AuthService.errorMessage || "Something Went Wrong",
            };
          } else {
            return { status: "error", message: "Internal Server Error" };
          }
        default:
          if (AuthService.isError) {
            return {
              status: "error",
              message: AuthService.errorMessage || "Something Went Wrong",
            };
          } else {
            return { status: "error", message: "Internal Server Error" };
          }
      }
    }

    throw error;
  }
};

export const logout = async () => {
  await signOut();
};

export const signUp = async (data: SignUpParams) => {
  try {
    return AuthService.handleSignUp(data);
  } catch (error) {
    return { status: "error", message: "Something Went Wrong" };
  }
};
