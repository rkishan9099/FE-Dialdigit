import NextAuth, { type DefaultSession } from "next-auth";
import { UserDataType } from "./types/authType";


declare module "next-auth" {
  interface Session {
    user: UserDataType;
  }
  interface User extends UserDataType{
  }
}


