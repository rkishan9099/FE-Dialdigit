import { useSession } from "next-auth/react"

export const useAuth =  ()=>{
    const session = useSession();
    return {user:session?.data?.user,roles:session?.data?.user?.roles}
}