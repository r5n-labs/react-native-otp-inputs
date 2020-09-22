# API

| Method                | Type           | Required    | Default                                 | Description                                                           |
| --------------------- | -------------- | ----------- | --------------------------------------- | --------------------------------------------------------------------- |
| autoCapitalize        | string         | false       | 'none'                                  |                                                                       |
| autofillFromClipboard | boolean        | false       | true for android & iOS < 14             | You can set it to `false` if want to disable autofill from clipboard. |
| autofillListenerIntervalMS | number        | false       | number of milliseconds for `setInterval` listener on Clipboard |
| clearTextOnFocus      | boolean        | false       | false                                   |                                                                       |
| defaultValue          | string         | false       |                                         | Sets default value for otp inputs                                     |
| handleChange          | function       | true        | console.log                             | Returns otp code.                                                     |
| keyboardType          | string         | true        | 'phone-pad'                             |                                                                       |
| numberOfInputs        | number         | true (1..6) | 4                                       | Inputs count to render.                                               |
| secureTextEntry       | boolean        | false       | false                                   |                                                                       |
| selectTextOnFocus     | boolean        | false       | true [iOS Only](./src/OtpInput.tsx#L56) |                                                                       |
| testIDPrefix          | string         | false       | otpInput-\${inputIndex}                 | Prefix for testID.                                                    |
| isRTL                 | boolean        | false       | false                                   | Preferably I18nManager.isRTL.                                         |
| placeholder           | string         | false       |                                         | Placeholder for the input boxes.                                      |
| style                 | style (object) | false       |                                         | Applied to whole container.                                           |
| focusStyles           | style (object) | false       |                                         | Applied to the input on focus.                                        |
| inputStyles           | style(object)  | false       |                                         | Applied to single input.                                              |
| inputContainerStyles  | style (object) | false       |                                         | Applied to each input container.                                      |
| ...restTextInputProps |                |             |                                         | [TextInput](https://facebook.github.io/react-native/docs/textinput)   |

# Methods

Those can be called on ref:

| Method | Description                                                    |
| ------ | -------------------------------------------------------------- |
| reset  | Reset inputs and returns to `handleChange` method empty string |
| focus  | Focuses first input in OTP                                     |

## Example

```tsx
import React, { useRef } from 'react';
import { Button, View } from 'react-native';
import OtpInputs, { OtpInputsRef } from 'react-native-otp-inputs';

const App = () => {
  const otpRef = useRef<OtpInputsRef>()

  const focusOTP = useCallback(() => {
    otpRef.current.focus();
  }, [])

  const resetOTP = useCallback(() => {
    otpRef.current.reset();
  }, [])

  return (
    <View style={styles.container}>
      <Button title="Reset" onPress={resetOTP} />
      <Button title="Focus" onPress={focusOTP} />
      <OtpInputs
        ref={otpRef}
        handleChange={(code) => console.log(code)}
        numberOfInputs={6}
      />
    </View>
  );
}
```
