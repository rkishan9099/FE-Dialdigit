export type ApiResponseType={
    statusCode: number,
    status: "success" |'error',
    message:string,
    data?:any
}

export type createNumberPymenIntentType={
    amount?:string,
    phoneNumber:string,
    assignUser:string[]
}