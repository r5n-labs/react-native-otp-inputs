import React, { RefObject, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Button, View } from "react-native";

// @ts-ignore
import OtpInputs from "react-native-otp-inputs";

const App = () => {
  const otpRef: RefObject<OtpInputs> = useRef();
  const [s, setS] = useState(true);
  const [fourDigit, setFourDigit] = useState(true);

  const focusOTP = () => {
    otpRef.current.focus();
  };

  const resetOTP = () => {
    otpRef.current.reset();
  };

  const toggle = () => {
    setFourDigit(fourDigit => !fourDigit);
  };

  const handleChange = (code: string) => {
    console.log("currentCodeReturned", code, s);
    setS(s => !s);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Reset" onPress={resetOTP} />
      <Button title="Focus" onPress={focusOTP} />
      <Button title="Toggle" onPress={toggle} />

      {fourDigit ? (
        <OtpInputs
          ref={otpRef}
          keyboardType="phone-pad"
          handleChange={handleChange}
          numberOfInputs={4}
          selectTextOnFocus={false}
          clearTextOnFocus
          defaultValue="1234"
        />
      ) : (
        <OtpInputs keyboardType="phone-pad" ref={otpRef} numberOfInputs={6} />
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
