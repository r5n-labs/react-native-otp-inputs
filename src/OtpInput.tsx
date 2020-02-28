import React, { useState, useEffect, forwardRef, RefObject } from 'react';
import {
  Platform,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

type Props = TextInputProps & {
  inputContainerStyles?: StyleProp<ViewStyle>;
  firstInput: boolean;
  focusStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  numberOfInputs: number;
  handleTextChange: (text: string) => void;
  inputValue: string;
  handleKeyPress: (
    keyPressEvent: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => void;
};

const majorVersionIOS: number = parseInt(`${Platform.Version}`, 10);
const isOTPSupported: boolean = Platform.OS === 'ios' && majorVersionIOS >= 12;

const OtpInput = forwardRef<TextInput, Props>(
  (
    {
      focusStyles,
      handleKeyPress,
      handleTextChange,
      inputContainerStyles,
      inputStyles,
      inputValue,
      placeholder,
      selectTextOnFocus,
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    useEffect(() => {
      (ref as RefObject<TextInput>)?.current?.setNativeProps({
        value: inputValue,
        text: inputValue,
      });
    }, [ref, inputValue]);

    return (
      <View style={[inputContainerStyles, focused && focusStyles]}>
        <TextInput
          onBlur={() => setFocused(false)}
          onChangeText={handleTextChange}
          onFocus={() => setFocused(true)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          ref={ref}
          // https://github.com/facebook/react-native/issues/18339
          selectTextOnFocus={Platform.select({
            ios: selectTextOnFocus,
            android: true,
          })}
          style={inputStyles}
          textContentType={isOTPSupported ? 'oneTimeCode' : 'none'}
          underlineColorAndroid="transparent"
          {...rest}
        />
      </View>
    );
  },
);

export default React.memo<Props>(OtpInput);
