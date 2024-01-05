import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  console.debug('session',session)
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  return session?.user?.roles;
};

export const getAccessToken = async ()=>{
  const session = await auth();
  return session?.accessToken;
}

export const getRefreshToken = async ()=>{
  const  session = await auth();
  return session?.refreshToken;
}