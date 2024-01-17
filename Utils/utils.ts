export const encode =(values:any)=>{
 return Buffer.from(JSON.stringify(values), "utf-8").toString(
    "base64"
  );
}

export const decode = (value:any)=>{
 const planText = Buffer.from(value, "base64").toString("utf-8");
    return JSON.parse(planText);
}