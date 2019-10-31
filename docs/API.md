# API

| Method                | Type           | Required    | Default                                 | Description                                                         |
| --------------------- | -------------- | ----------- | --------------------------------------- | ------------------------------------------------------------------- |
| autoCapitalize        | string         | false       | 'none'                                  |                                                                     |
| clearTextOnFocus      | boolean        | false       | false                                   |                                                                     |
| defaultValue          | string         | false       |                                         | Sets default value for otp inputs                                   |
| handleChange          | function       | true        | console.log                             | Returns otp code.                                                   |
| keyboardType          | string         | true        | 'phone-pad'                             |                                                                     |
| numberOfInputs        | number         | true (1..6) | 4                                       | Inputs count to render.                                             |
| secureTextEntry       | boolean        | false       | false                                   |                                                                     |
| selectTextOnFocus     | boolean        | false       | true [iOS Only](./src/OtpInput.tsx#L56) |                                                                     |
| testIDPrefix          | string         | false       | otpInput-\${inputIndex}                 | Prefix for testID.                                                  |
| isRTL                 | boolean        | false       | false                                   | Preferably I18nManager.isRTL.                                       |
| placeholder           | string         | false       |                                         | Placeholder for the input boxes.                                    |
| style                 | style (object) | false       | [default](./src/index.tsx#L275)         | Applied to whole container.                                         |
| focusStyles           | style (object) | false       | [default](./src/index.tsx#L275)         | Applied to the input on focus.                                      |
| inputStyles           | style(object)  | false       | [default](./src/index.tsx#L275)         | Applied to single input.                                            |
| inputContainerStyles  | style (object) | false       | [default](./src/index.tsx#L275)         | Applied to each input container.                                    |
| ...restTextInputProps |                |             |                                         | [TextInput](https://facebook.github.io/react-native/docs/textinput) |

# Methods

Those can be called on ref:

| Method | Description                                                    |
| ------ | -------------------------------------------------------------- |
| reset  | Reset inputs and returns to `handleChange` method empty string |
| focus  | Focuses first input in OTP                                     |

## Example

```js
import React, { Component } from 'react';
import { Button, View } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';

export default class App extends Component {
  otpRef = React.createRef();

  focusOTP = () => {
    this.otpRef.current.focus();
  };

  resetOTP = () => {
    this.otpRef.current.reset();
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Reset" onPress={this.resetOTP} />
        <Button title="Focus" onPress={this.focusOTP} />
        <OtpInputs ref={this.otpRef} handleChange={code => console.log(code)} numberOfInputs={6} />
      </View>
    );
  }
}
```
