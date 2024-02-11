import NextAuth, { NextAuthConfig } from "next-auth";
import { UserDataType } from "./types/authType";
import Credentials from "next-auth/providers/credentials";
import { AuthService } from "./services/authService";

declare module "@auth/core/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: UserDataType;
  }
}

const authConfig = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    newUser: "/auth/signup",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const user = await AuthService.handleLogin(credentials);
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async session({ token, session, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.user) {
        session.user = token.user;
        session.sipExtension = token?.user?.sipExtension;
        session.sipPassword = token?.user?.sipPassword;
      }
      if (token?.refreshToken) {
        session.refreshToken = token?.refreshToken;
      }
      if (token?.accessToken) {
        session.accessToken = token?.accessToken;
      }

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (!token.sub) return token;
      if (trigger === "update" && session) {
        token.user = session.user as UserDataType;
        token.accessToken = user?.accessToken;
        token.refreshToken = user?.refreshToken;
      }
      if (user) {
        token.user = user as UserDataType;
        token.accessToken = user?.accessToken;
        token.refreshToken = user?.refreshToken;
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth(authConfig);
