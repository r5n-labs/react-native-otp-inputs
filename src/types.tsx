type SetOtpTextForIndex = { type: 'setOtpTextForIndex'; payload: { index: number; text: string } };
type SetOtpCode = { type: 'setOtpCode'; payload: { numberOfInputs: number; code: string } };
type ClearOtp = { type: 'clearOtp'; payload: number };

export type ReducerState = {
  otpCode: { [key: string]: string };
  handleChange: (otpCode: string) => void;
};

export type ActionTypes = {
  setOtpTextForIndex: 'setOtpTextForIndex';
  setOtpCode: 'setOtpCode';
  clearOtp: 'clearOtp';
};

export type Actions = SetOtpTextForIndex | SetOtpCode | ClearOtp;

export type OtpInputsRef = {
  reset: () => void;
  focus: () => void;
};

export type KeyEventType = {
  action: number;
  pressedKey: string;
  keyCode: number;
};
