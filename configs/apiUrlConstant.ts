function path(root: string, sublink: string) {
  return `${root}${sublink}`
}

export const  AuthApiUrl ={
    login:'/auth/login',
    signup:'/auth/signup',
    logout:'/auth/logout',
    myAccount:'/auth/my-account'
}

const USER_PREFIX ='users';
export const  UserApiUrl ={
getUser:path(USER_PREFIX,''),
createUser:path(USER_PREFIX,'/')
}