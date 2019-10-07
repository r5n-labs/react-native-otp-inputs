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
      clearTextOnFocus,
      containerStyles,
      error,
      firstInput,
      focusStyles,
      focusedBorderColor,
      inputStyles,
      keyboardType,
      numberOfInputs,
      placeholder,
      secureTextEntry,
      selectTextOnFocus,
      testID,
      textErrorColor,
      unfocusedBorderColor,
      handleTextChange,
      value,
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    useEffect(() => {
      // @ts-ignore
      ref.current.setNativeProps({ text: value });
    }, [ref, value]);

    return (
      <View
        style={[
          styles.container,
          containerStyles,
          focused && focusStyles,
          {
            borderColor: focused ? focusedBorderColor : unfocusedBorderColor,
          },
        ]}
      >
        <TextInput
          clearTextOnFocus={clearTextOnFocus}
          keyboardType={keyboardType}
          maxLength={firstInput ? numberOfInputs : 1}
          onBlur={() => setFocused(false)}
          onChangeText={handleTextChange}
          onFocus={() => setFocused(true)}
          ref={ref}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          // https://github.com/facebook/react-native/issues/18339
          selectTextOnFocus={Platform.select({ ios: selectTextOnFocus, android: true })}
          style={[styles.input, inputStyles, error && { color: textErrorColor }]}
          testID={testID}
          textContentType={isOTPSupported ? 'oneTimeCode' : 'none'}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  },
);

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    height: 53,
    margin: 10,
  },
  input: {
    fontSize: 24,
    paddingTop: 10,
    textAlign: 'center',
    width: 40,
  },
});
