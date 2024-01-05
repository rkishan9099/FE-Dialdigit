import NextAuth, { type DefaultSession } from "next-auth";
import { UserDataType } from "./types/authType";


declare module "next-auth" {
  interface Session {
    user: UserDataType;
      accessToken?:string
    refreshToken?:string
  }
  interface User extends UserDataType{
  }
}


