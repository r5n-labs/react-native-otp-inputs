import React, { RefObject, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Button } from 'react-native';

// @ts-ignore
import OtpInputs from 'react-native-otp-inputs';

const App = () => {
  const otpRef: RefObject<OtpInputs> = useRef();
  const [s, setS] = useState(true);
  const [fourDigit, setFourDigit] = useState(false);

  const focusOTP = () => {
    otpRef.current.focus();
  };

  const resetOTP = () => {
    otpRef.current.reset();
  };

  const toggle = () => {
    setFourDigit((fourDigit) => !fourDigit);
  };

  const handleChange = (code: string) => {
    console.log('currentCodeReturned', code, s);
    setS((s) => !s);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button onPress={resetOTP} title="Reset" />
      <Button onPress={focusOTP} title="Focus" />
      <Button onPress={toggle} title="Toggle" />

      {fourDigit ? (
        <OtpInputs
          clearTextOnFocus
          handleChange={handleChange}
          keyboardType="phone-pad"
          numberOfInputs={4}
          ref={otpRef}
          selectTextOnFocus={false}
        />
      ) : (
        <OtpInputs keyboardType="phone-pad" numberOfInputs={6} ref={otpRef} />
      )}
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
});
