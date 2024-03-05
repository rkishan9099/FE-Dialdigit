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


const ROLE_PRIFIX ='roles';
export const RolesApiUrl ={
  role:{
    create:path(ROLE_PRIFIX,''),
    get:path(ROLE_PRIFIX,'')
  }
}

const REPORTS_PRIFIX ='reports';
export const ReportsApiUrl={
  call:{
    callReports:path(REPORTS_PRIFIX,'/call-reports'),
  }
}