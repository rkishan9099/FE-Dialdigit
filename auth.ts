import NextAuth from "next-auth"
import authConfig from "@/auth.config";
import { UserDataType } from "./types/authType";

declare module "@auth/core/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
    accessToken?:string
    refreshToken?:string
    user?:UserDataType
  }
}



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async session({ token, session ,user}) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if(token.user){
        session.user = token.user
      }
      return session;
    },
    async jwt({ token,user }) {
      if (!token.sub) return token
      if(user){
        token.user =user as UserDataType
        token.accessToken =user?.accessToken
      }
      return token;
    }
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
