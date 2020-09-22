type SetOtpTextForIndex = {
  type: 'setOtpTextForIndex';
  payload: { index: number; text: string };
};
type SetOtpCode = {
  type: 'setOtpCode';
  payload: { numberOfInputs: number; code: string };
};
type ClearOtp = { type: 'clearOtp'; payload: number };
type SetHandleChange = { type: 'setHandleChange'; payload: any };
type SetHasKeySupport = { type: 'setHasKeySupport'; payload: boolean };

export type ReducerState = {
  otpCode: { [key: string]: string };
  handleChange: (otpCode: string) => void;
  hasKeySupport: boolean;
};

export type ActionTypes = {
  setHandleChange: 'setHandleChange';
  setOtpTextForIndex: 'setOtpTextForIndex';
  setOtpCode: 'setOtpCode';
  clearOtp: 'clearOtp';
  setHasKeySupport: 'setHasKeySupport';
};

export type Actions =
  | SetOtpTextForIndex
  | SetOtpCode
  | ClearOtp
  | SetHandleChange
  | SetHasKeySupport;

export type OtpInputsRef = {
  reset: () => void;
  focus: () => void;
};

export type KeyEventType = {
  action: number;
  pressedKey: string;
  keyCode: number;
};

export type SupportedKeyboardType =
  | 'default'
  | 'email-address'
  | 'phone-pad'
  | 'visible-password'
  | 'ascii-capable'
  | 'numbers-and-punctuation'
  | 'url'
  | 'name-phone-pad'
  | 'twitter'
  | 'web-search'
  | undefined;
