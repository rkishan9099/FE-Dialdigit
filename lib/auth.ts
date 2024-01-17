import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
 
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.roles;
};

export const sipExtension = async () => {
  const session = await auth();

  return session?.user?.sipExtension;
};


export const  sipPassword =async ()=>{
  const session =await auth();
  
  return session?.user?.sipPassword
}