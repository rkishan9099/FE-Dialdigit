import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthService } from "./services/authService";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
      const res = await  AuthService.handleLogin(credentials)
      console.log('res',res)
      throw new Error('Invalid  Email')
      return null;
      }
    })
  ],
} satisfies NextAuthConfig