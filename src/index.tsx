import React, {
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
} from 'react';
import {
  Clipboard,
  Keyboard,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import OtpInput from './OtpInput';
import { ActionTypes, OtpInputsRef, Actions } from './types';
import { fillOtpCode } from './helpers';

type Props = TextInputProps & {
  styles?: StyleProp<ViewStyle>;
  focusStyles?: StyleProp<ViewStyle>;
  handleChange: (otpCode: string) => void;
  inputContainerStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  isRTL: boolean;
  numberOfInputs: number;
  testIDPrefix: string;
};

const ACTION_TYPES: ActionTypes = {
  setOtpTextForIndex: 'setOtpTextForIndex',
  setOtpCode: 'setOtpCode',
  clearOtp: 'clearOtp',
};

const reducer = (state: { [key: string]: string }, action: Actions) => {
  switch (action.type) {
    case ACTION_TYPES.setOtpTextForIndex: {
      return {
        [`${action.payload.index}`]: action.payload.text,
      };
    }

    case ACTION_TYPES.setOtpCode: {
      return fillOtpCode(action.payload.numberOfInputs, action.payload.code);
    }

    case ACTION_TYPES.clearOtp: {
      return fillOtpCode(action.payload);
    }

    default:
      return state;
  }
};

const OtpInputs = forwardRef<OtpInputsRef, Props>(
  (
    {
      autoCapitalize,
      clearTextOnFocus,
      focusStyles,
      inputContainerStyles,
      inputStyles,
      isRTL,
      keyboardType,
      numberOfInputs,
      placeholder,
      secureTextEntry,
      selectTextOnFocus,
      styles,
      testIDPrefix,
    },
    ref,
  ) => {
    const [otpCode, dispatch] = useReducer(reducer, numberOfInputs, fillOtpCode);
    const previousCopiedText: { current: string } = useRef('');
    const inputs: { current: Array<RefObject<TextInput>> } = useRef([]);

    const handleInputTextChange = ({ text, index }: { text: string; index: number }) => {
      dispatch({
        type: ACTION_TYPES.setOtpTextForIndex,
        payload: {
          text,
          index,
        },
      });
      focusInput(index + 1);
    };

    const handleTextChange = (text: string, index: number): void => {
      if (!text.length) {
        handleClearInput(index);
      }

      if (text) {
        handleInputTextChange({ text, index });
      }

      if (index === numberOfInputs - 1 && text) {
        Keyboard.dismiss();
      }
    };

    const focusInput = useCallback(
      (index: number): void => {
        if (index >= 0 && index < numberOfInputs) {
          const input = inputs.current[index];
          input && input.current && input.current.focus();
        }
      },
      [numberOfInputs],
    );

    const handleClearInput = useCallback(
      (inputIndex: number) => {
        const input = inputs.current[inputIndex];
        input && input.current && input.current.clear();
        focusInput(inputIndex - 1);
      },
      [focusInput],
    );

    const fillInputs = useCallback(
      (code: string) => {
        dispatch({ type: ACTION_TYPES.setOtpCode, payload: { numberOfInputs, code } });
      },
      [numberOfInputs],
    );

    useImperativeHandle(
      ref,
      () => ({
        reset: (): void => {
          dispatch({ type: ACTION_TYPES.clearOtp, payload: numberOfInputs });
          inputs.current.forEach(input => input && input.current && input.current.clear());
          previousCopiedText.current = '';
        },
      }),
      [numberOfInputs],
    );

    const listenOnCopiedText = useCallback(async (): Promise<void> => {
      const copiedText = await Clipboard.getString();
      const otpCodeValue = Object.values(otpCode).join('');

      if (
        copiedText &&
        copiedText.length === numberOfInputs &&
        copiedText !== otpCodeValue &&
        copiedText !== previousCopiedText.current
      ) {
        previousCopiedText.current = otpCodeValue;
        fillInputs(copiedText);
      }
    }, [fillInputs, numberOfInputs, otpCode]);

    useEffect(() => {
      const interval = setInterval(() => {
        listenOnCopiedText();
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }, [listenOnCopiedText, numberOfInputs]);

    const renderInputs = (): Array<JSX.Element> => {
      const iterationArray = Array<number>(numberOfInputs).fill(0);

      return iterationArray.map((_, index) => {
        let inputIndex = index;
        if (isRTL) {
          inputIndex = numberOfInputs - 1 - index;
        }
        const inputValue = otpCode[`${inputIndex}`];

        if (!inputs.current[inputIndex]) {
          inputs.current[inputIndex] = React.createRef<TextInput>();
        }

        return (
          <OtpInput
            autoCapitalize={autoCapitalize}
            clearTextOnFocus={clearTextOnFocus}
            firstInput={index === 0}
            focusStyles={focusStyles}
            handleTextChange={(text: string) => handleTextChange(text, inputIndex)}
            inputContainerStyles={inputContainerStyles}
            inputStyles={inputStyles}
            key={inputIndex}
            keyboardType={keyboardType}
            numberOfInputs={numberOfInputs}
            placeholder={placeholder}
            ref={inputs.current[inputIndex]}
            secureTextEntry={secureTextEntry}
            selectTextOnFocus={selectTextOnFocus}
            testID={`${testIDPrefix}-${inputIndex}`}
            inputValue={inputValue}
          />
        );
      });
    };

    return <View style={styles}>{renderInputs()}</View>;
  },
);

export default OtpInputs;

// @ts-ignore
OtpInputs.defaultProps = {
  autoCapitalize: 'none',
  clearTextOnFocus: false,
  handleChange: console.log,
  keyboardType: 'phone-pad',
  numberOfInputs: 4,
  secureTextEntry: false,
  selectTextOnFocus: true,
  testIDPrefix: 'otpInput',
  isRTL: false,
  placeholder: '',
  styles: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  focusStyles: {
    borderColor: '#00f',
  },
  inputStyles: {
    fontSize: 24,
    paddingTop: 10,
    textAlign: 'center',
    width: 40,
  },
  inputContainerStyles: {
    borderBottomWidth: 1,
    height: 53,
    margin: 10,
  },
};
