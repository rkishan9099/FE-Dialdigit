export const encode =(values:any)=>{
 return Buffer.from(JSON.stringify(values), "utf-8").toString(
    "base64"
  );
}

export const decode = (value:any)=>{
 const planText = Buffer.from(value, "base64").toString("utf-8");
    return JSON.parse(planText);
}

export const getAccessToken =()=>{
    const storedToken = localStorage.getItem("accessToken");
      console.log('getAccessToken',storedToken)
      return storedToken
}
export const pad = (val: number) => (val > 9 ? val : '0' + val) // eslint-disable-line prefer-template


