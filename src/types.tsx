type SetOtpTextForIndex = { type: 'setOtpTextForIndex'; payload: { index: number; text: string } };
type SetOtpCode = { type: 'setOtpCode'; payload: { numberOfInputs: number; code: string } };
type ClearOtp = { type: 'clearOtp'; payload: number };

export type ActionTypes = {
  setOtpTextForIndex: 'setOtpTextForIndex';
  setOtpCode: 'setOtpCode';
  clearOtp: 'clearOtp';
};

export type Actions = SetOtpTextForIndex | SetOtpCode | ClearOtp;

export type OtpInputsRef = {
  reset: () => void;
};
