import React, { RefObject, Component } from 'react';
import { SafeAreaView, StyleSheet, Button, View } from 'react-native';

// @ts-ignore
import OtpInputs from 'react-native-otp-inputs';

export default class App extends Component<{}, { isFourDigit: boolean }> {
  otpRef: RefObject<OtpInputs> = React.createRef();

  state = {
    isFourDigit: true,
  };

  toggle = () => {
    this.setState(({ isFourDigit }) => {
      return { isFourDigit: !isFourDigit };
    });
  };

  focusOTP = () => {
    this.otpRef.current.focus();
  };

  resetOTP = () => {
    this.otpRef.current.reset();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button title="Reset" onPress={this.resetOTP} />
        <Button title="Focus" onPress={this.focusOTP} />
        <Button title="Toggle" onPress={this.toggle} />

        {this.state.isFourDigit ? (
          <OtpInputs
            ref={this.otpRef}
            selectTextOnFocus={false}
            keyboardType="number-pad"
            numberOfInputs={4}
          />
        ) : (
          <OtpInputs keyboardType="number-pad" ref={this.otpRef} numberOfInputs={6} />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
