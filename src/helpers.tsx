export const fillOtpCode = (numberOfInputs: number, value?: string) => {
  const otpCode: { [key: string]: string } = {};
  for (let i = 0; i < numberOfInputs; i++) {
    otpCode[`${i}`] = value?.[i] || '';
  }
  return otpCode;
};
