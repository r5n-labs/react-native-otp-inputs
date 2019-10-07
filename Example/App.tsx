import React, { RefObject, Component } from 'react';
import { StyleSheet, Button, View } from 'react-native';

// @ts-ignore
import OtpInputs from 'react-native-otp-inputs';

export default class App extends Component {
  otpRef: RefObject<OtpInputs> = React.createRef();

  resetOTP = () => {
    this.otpRef.current.reset();
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Reset" onPress={this.resetOTP} />
        <OtpInputs ref={this.otpRef} numberOfInputs={4} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
