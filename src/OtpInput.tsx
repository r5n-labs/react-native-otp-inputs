import React, { useState, useEffect, forwardRef } from 'react';
import {
  Platform,
  StyleProp,
  TextInput,
  TextStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  clearTextOnFocus?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  error?: boolean;
  firstInput: boolean;
  focusStyles?: StyleProp<ViewStyle>;
  focusedBorderColor?: string;
  inputStyles?: StyleProp<TextStyle>;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  numberOfInputs: number;
  placeholder?: string;
  secureTextEntry?: boolean;
  selectTextOnFocus?: boolean;
  testID: string;
  textErrorColor?: string;
  unfocusedBorderColor?: string;
  handleTextChange: (text: string) => void;
  value?: string;
}

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
