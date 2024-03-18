export const encode = (values: any) => {
  return Buffer.from(JSON.stringify(values), "utf-8").toString("base64");
};

export const decode = (value: any) => {
  const planText = Buffer.from(value, "base64").toString("utf-8");
  return JSON.parse(planText);
};

export const getAccessToken = () => {
  const storedToken = localStorage.getItem("accessToken");
  console.log("getAccessToken", storedToken);
  return storedToken;
};
export const pad = (val: number) => (val > 9 ? val : "0" + val); // eslint-disable-line prefer-template

export const secondsToHms = (seconds: string | number) => {
  const d = Number(seconds);
  /* eslint-disable no-else-return */
  if (d <= 0) {
    return "00:00:00";
  } else {
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const hDisplay = h <= 9 ? "0" + h + ":" : h + ":";
    const mDisplay = m <= 9 ? "0" + m + ":" : m + ":";
    const sDisplay = s <= 9 ? "0" + s : s;

    return hDisplay + mDisplay + sDisplay;
  }
};

function getDateDifferenceInDays(date1: string, date2: string): number {
  // Create Date objects for the two dates
  const date1Obj = new Date(date1);
  const date2Obj = new Date(date2);
  
  // Calculate the difference in milliseconds between the two dates
  const differenceMs = date2Obj.getTime() - date1Obj.getTime();

  // Convert milliseconds to days
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const differenceDays = Math.ceil(differenceMs / millisecondsInDay);

  return differenceDays;
}
