import React, { useState, useEffect, forwardRef } from 'react';
import {
  Platform,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  TextInputProps,
} from 'react-native';

type Props = TextInputProps & {
  inputContainerStyles?: StyleProp<ViewStyle>;
  firstInput: boolean;
  focusStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  numberOfInputs: number;
  handleTextChange: (text: string) => void;
};

const majorVersionIOS: number = parseInt(`${Platform.Version}`, 10);
const isOTPSupported: boolean = Platform.OS === 'ios' && majorVersionIOS >= 12;

const OtpInput = forwardRef<TextInput, Props>(
  (
    {
      firstInput,
      focusStyles,
      handleTextChange,
      inputContainerStyles,
      inputStyles,
      numberOfInputs,
      placeholder,
      selectTextOnFocus,
      value,
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    useEffect(() => {
      // @ts-ignore
      ref.current.setNativeProps({ value, text: value });
    }, [ref, value]);

    return (
      <View style={[inputContainerStyles, focused && focusStyles]}>
        <TextInput
          maxLength={firstInput ? numberOfInputs : 1}
          onBlur={() => setFocused(false)}
          onChangeText={handleTextChange}
          onFocus={() => setFocused(true)}
          ref={ref}
          placeholder={placeholder}
          // https://github.com/facebook/react-native/issues/18339
          selectTextOnFocus={Platform.select({ ios: selectTextOnFocus, android: true })}
          style={inputStyles}
          textContentType={isOTPSupported ? 'oneTimeCode' : 'none'}
          underlineColorAndroid="transparent"
          {...rest}
        />
      </View>
    );
  },
);

export default OtpInput;
