
function normalizeNumber(number: string): string {
  if (/^(sips?|tel):/i.test(number)) {
    return number;
  } else if (/@/i.test(number)) {
    return number;
  } else {
    return number.replace(/[()\-. ]*/g, "");
  }
}


export const formatPhoneNumber = (phoneNumberString: any) => {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{1,3}|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    const intlCode = match[1] ? `+${match[1]} ` : ''

    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }

  return phoneNumberString
}




function randomId(prefix: string): string {
  const id: string = [...Array(16)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
  if (prefix) {
    return `${prefix}-${id}`;
  } else {
    return id;
  }
}

const pad = (val: number) => (val > 9 ? val : "0" + val);

export { normalizeNumber, randomId, pad };
