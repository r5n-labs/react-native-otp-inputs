import { fillOtpCode } from './helpers';
import { Actions, ActionTypes, ReducerState } from './types';

const ACTION_TYPES: ActionTypes = {
  setHandleChange: 'setHandleChange',
  setOtpTextForIndex: 'setOtpTextForIndex',
  setOtpCode: 'setOtpCode',
  clearOtp: 'clearOtp',
  setHasKeySupport: 'setHasKeySupport',
};

export default (state: ReducerState, { type, payload }: Actions) => {
  switch (type) {
    case ACTION_TYPES.setOtpTextForIndex: {
      const otpCode = {
        ...state.otpCode,
        [`${payload.index}`]: payload.text,
      };
      state.handleChange(Object.values(otpCode).join(''));

      return {
        ...state,
        otpCode,
      };
    }

    case ACTION_TYPES.setOtpCode: {
      const otpCode = fillOtpCode(payload.numberOfInputs, payload.code);

      state.handleChange(Object.values(otpCode).join(''));

      return {
        ...state,
        otpCode,
      };
    }

    case ACTION_TYPES.clearOtp: {
      const otpCode = fillOtpCode(payload);
      state.handleChange(Object.values(otpCode).join(''));

      return { ...state, otpCode };
    }

    case ACTION_TYPES.setHandleChange: {
      return { ...state, handleChange: payload };
    }

    case ACTION_TYPES.setHasKeySupport: {
      return { ...state, hasKeySupport: payload };
    }

    default:
      return state;
  }
};
