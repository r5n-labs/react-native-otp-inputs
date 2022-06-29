import Clipboard from '@react-native-clipboard/clipboard';
import React, {
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
} from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { fillOtpCode } from './helpers';
import OtpInput from './OtpInput';
import reducer from './reducer';
import { OtpInputsRef, SupportedKeyboardType } from './types';

const supportAutofillFromClipboard =
  Platform.OS === 'android' || parseInt(Platform.Version as string, 10) < 14;

type Props = TextInputProps & {
  autofillFromClipboard: boolean;
  autofillListenerIntervalMS?: number;
  keyboardType?: SupportedKeyboardType;
  style?: StyleProp<ViewStyle>;
  focusStyles?: StyleProp<ViewStyle>;
  defaultValue?: string;
  handleChange: (otpCode: string) => void;
  inputContainerStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  isRTL?: boolean;
  numberOfInputs: number;
  testIDPrefix?: string;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const OtpInputs = forwardRef<OtpInputsRef, Props>(
  (
    {
      autoFocus,
      autofillFromClipboard = supportAutofillFromClipboard,
      autofillListenerIntervalMS = 1000,
      autoCapitalize = 'none',
      clearTextOnFocus = false,
      defaultValue,
      focusStyles,
      handleChange = console.log,
      inputContainerStyles,
      inputStyles,
      isRTL = false,
      keyboardType = 'phone-pad',
      numberOfInputs = 4,
      placeholder = '',
      secureTextEntry = false,
      selectTextOnFocus = true,
      style,
      testIDPrefix = 'otpInput',
      ...restProps
    },
    ref,
  ) => {
    const previousCopiedText = useRef<string>('');
    const inputs = useRef<Array<RefObject<TextInput>>>([]);
    const [{ otpCode, hasKeySupport }, dispatch] = useReducer(reducer, {}, () => ({
      otpCode: fillOtpCode(numberOfInputs, defaultValue),
      handleChange,
      hasKeySupport: Platform.OS === 'ios',
    }));

    useEffect(() => {
      if (defaultValue) {
        dispatch({
          type: 'setOtpCode',
          payload: { numberOfInputs, code: defaultValue },
        });
      }
    }, [defaultValue, numberOfInputs]);

    useEffect(() => {
      dispatch({ type: 'setHandleChange', payload: handleChange });
    }, [handleChange]);

    useImperativeHandle(
      ref,
      () => ({
        reset: (): void => {
          dispatch({ type: 'clearOtp', payload: numberOfInputs });
          inputs.current.forEach((input) => input?.current?.clear());
          previousCopiedText.current = '';
          Clipboard.setString('');
        },
        focus: (): void => {
          const firstInput = inputs.current[0];
          firstInput?.current?.focus();
        },
      }),
      [numberOfInputs],
    );

    const handleInputTextChange = (text: string, index: number): void => {
      if (!text.length) {
        handleClearInput(index);
      }

      if (text.length > 1) {
        handleClearInput(index);
        Keyboard.dismiss();
        return fillInputs(text);
      }

      if (text) {
        dispatch({
          type: 'setOtpTextForIndex',
          payload: {
            text,
            index,
          },
        });
        focusInput(index + 1);
      }

      if (index === numberOfInputs - 1 && text) {
        Keyboard.dismiss();
      }
    };

    const handleTextChange = (text: string, index: number) => {
      if (
        (Platform.OS === 'android' && !hasKeySupport) ||
        // Pasted from input accessory
        (Platform.OS === 'ios' && text.length > 1)
      ) {
        handleInputTextChange(text, index);
      }
    };

    const handleKeyPress = (
      { nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>,
      index: number,
    ) => {
      const text = key === 'Backspace' || key.length > 1 ? '' : key;
      handleInputTextChange(text, index);

      if (Platform.OS === 'android' && !hasKeySupport && !isNaN(parseInt(key)))
        dispatch({ type: 'setHasKeySupport', payload: true });
    };

    const focusInput = useCallback(
      (index: number): void => {
        if (index >= 0 && index < numberOfInputs) {
          const input = inputs.current[index];
          input?.current?.focus();
        }
      },
      [numberOfInputs],
    );

    const handleClearInput = useCallback(
      (inputIndex: number) => {
        const input = inputs.current[inputIndex];
        input?.current?.clear();
        dispatch({
          type: 'setOtpTextForIndex',
          payload: {
            index: inputIndex,
            text: '',
          },
        });
        focusInput(inputIndex - 1);
      },
      [focusInput],
    );

    const fillInputs = useCallback(
      (code: string) => {
        dispatch({
          type: 'setOtpCode',
          payload: { numberOfInputs, code },
        });
      },
      [numberOfInputs],
    );

    const listenOnCopiedText = useCallback(async (): Promise<void> => {
      const copiedText = await Clipboard.getString();
      const otpCodeValue = Object.values(otpCode).join('');

      if (
        copiedText?.length === numberOfInputs &&
        copiedText !== otpCodeValue &&
        copiedText !== previousCopiedText.current
      ) {
        previousCopiedText.current = copiedText;
        fillInputs(copiedText);
      }
    }, [fillInputs, numberOfInputs, otpCode]);

    useEffect(() => {
      let interval: NodeJS.Timeout;

      if (autofillFromClipboard) {
        interval = setInterval(() => {
          listenOnCopiedText();
        }, autofillListenerIntervalMS);
      }

      return () => {
        clearInterval(interval);
      };
    }, [autofillFromClipboard, autofillListenerIntervalMS, listenOnCopiedText, numberOfInputs]);

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
            accessible
            accessibilityLabel={`${testIDPrefix}-${inputIndex}`}
            autoCapitalize={autoCapitalize}
            autoFocus={index === 0 && autoFocus}
            clearTextOnFocus={clearTextOnFocus}
            firstInput={index === 0}
            focusStyles={focusStyles}
            handleKeyPress={(keyPressEvent: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
              handleKeyPress(keyPressEvent, inputIndex)
            }
            handleTextChange={(text: string) => handleTextChange(text, inputIndex)}
            inputContainerStyles={inputContainerStyles}
            inputStyles={inputStyles}
            inputValue={inputValue}
            key={inputIndex}
            keyboardType={keyboardType}
            maxLength={Platform.select({
              android: 1,
              ios: index === 0 ? numberOfInputs : 1,
            })}
            numberOfInputs={numberOfInputs}
            placeholder={placeholder}
            ref={inputs.current[inputIndex]}
            secureTextEntry={secureTextEntry}
            selectTextOnFocus={selectTextOnFocus}
            testID={`${testIDPrefix}-${inputIndex}`}
            {...restProps}
          />
        );
      });
    };

    // @ts-expect-error
    return <View style={style || styles.container}>{renderInputs()}</View>;
  },
);

export { OtpInputsRef };
export default OtpInputs;
