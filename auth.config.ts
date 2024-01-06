import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthService } from "./services/authService";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
      const user = await  AuthService.handleLogin(credentials)
      return user;
      }
    })
  ],
} satisfies NextAuthConfig