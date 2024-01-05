import { string } from "yup"

export type LoginParams = {
    email: string
    password: string
    rememberMe?: boolean
  }
  
  export type LoginOTPParams = {
    phone: string
    otp: string
    rememberMe?: boolean
  }
  
  export type ResendOTPParams = {
    phone: string
  }
  export type UserRole ={
    _id?:string
    name:string
    role:string
  }
  
  export type UserDataType = {
    _id?: string
     id?:string
    name?: string
    firstName:string
    lastName: string
    email:string
    mobile: string
    roles: UserRole
    status: number
    createdAt?:string
    updatedAt?:string
    accessToken?:string
    refreshToken?:string
  }
  
  export type AuthServiceType = {
    loading: boolean
    logout: () => void
    user: UserDataType | null
    setLoading: (value: boolean) => void
    setUser: (value: UserDataType | null) => void
}
