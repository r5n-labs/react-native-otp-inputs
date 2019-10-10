# react-native-otp-inputs

[![CircleCI](https://circleci.com/gh/dsznajder/react-native-otp-inputs/tree/master.svg?style=svg)](https://circleci.com/gh/dsznajder/react-native-otp-inputs/tree/master)

[![codecov](https://codecov.io/gh/dsznajder/react-native-otp-inputs/branch/master/graph/badge.svg)](https://codecov.io/gh/dsznajder/react-native-otp-inputs)

![npm](https://img.shields.io/npm/dw/react-native-otp-inputs.svg)
![npm](https://img.shields.io/npm/v/react-native-otp-inputs.svg)

### Demo

![Demo](https://user-images.githubusercontent.com/17621507/36565065-a03b98b0-181f-11e8-9a54-09d978bec892.gif)

## Description

`react-native-otp-inputs` is fully customizable, pure JavaScript package, that provides solution for One-time password feature with user friendly events like moving to previous input with backspace or going to next when filled in. It supports pasting and otp code into inputs

## Installation

| React-Native version | installation                           |
| -------------------- | -------------------------------------- |
| >= 0.53.0 < 0.57.0   | yarn add react-native-otp-inputs@1.1.0 |
| <= 0.57.0            | yarn add react-native-otp-inputs@3.2.2 |
| <= 0.59.0            | yarn add react-native-otp-inputs       |

### Android additional steps

Android setup requires [react-native-keyevent](https://github.com/kevinejohn/react-native-keyevent) package to work properly.

1. Add `react-native-keyevent` to your dependencies with

```bash
yarn add react-native-keyevent
```

2. If you are using react-native < 0.60.0 then [follow these steps](https://github.com/kevinejohn/react-native-keyevent#linking-android)
3. If you are using react-natice >= 0.60.0 then add this to your dependencies in `react-native.config.js`

```javascript
'react-native-keyevent': {
      platforms: {
        ios: null,
      },
    },
```

4. Then follow configuration for Android [here](https://github.com/kevinejohn/react-native-keyevent#configuration)

### [Migration to v4](https://github.com/dsznajder/react-native-otp-inputs/releases/tag/v4.0.0-alpha.0)

## Basic usage

```js
import React, { Component } from 'react';
import { View } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <OtpInputs handleChange={code => console.log(code)} numberOfInputs={6} />
      </View>
    );
  }
}
```

## API

| Method                | Type           | Required    | Default                                 | Description                                                         |
| --------------------- | -------------- | ----------- | --------------------------------------- | ------------------------------------------------------------------- |
| autoCapitalize        | string         | false       | 'none'                                  |                                                                     |
| clearTextOnFocus      | boolean        | false       | false                                   |                                                                     |
| handleChange          | function       | true        | console.log                             | Returns otp code.                                                   |
| keyboardType          | string         | true        | 'phone-pad'                             |                                                                     |
| numberOfInputs        | number         | true (1..6) | 4                                       | Inputs count to render.                                             |
| secureTextEntry       | boolean        | false       | false                                   |                                                                     |
| selectTextOnFocus     | boolean        | false       | true [iOS Only](./src/OtpInput.tsx#L90) |                                                                     |
| testIDPrefix          | string         | false       | otpInput-\${inputIndex}                 | Prefix for testID.                                                  |
| isRTL                 | boolean        | false       | false                                   | Preferably I18nManager.isRTL.                                       |
| placeholder           | string         | false       | none                                    | Placeholder for the input boxes.                                    |
| styles                | style (object) | false       | [default](./src/index.tsx#L51)          | Applied to whole container.                                         |
| focusStyles           | style (object) | false       | [default](./src/index.tsx#L51)          | Applied to the input on focus.                                      |
| inputStyles           | style(object)  | false       | [default](./src/index.tsx#L51)          | Applied to single input.                                            |
| inputContainerStyles  | style (object) | false       | [default](./src/index.tsx#L51)          | Applied to each input container.                                    |
| ...restTextInputProps |                |             |                                         | [TextInput](https://facebook.github.io/react-native/docs/textinput) |

## Methods

Those can be called on ref:

| Method | Description                                                    |
| ------ | -------------------------------------------------------------- |
| reset  | Reset inputs and returns to `handleChange` method empty string |

### Example

```js
import React, { Component } from 'react';
import { Button, View } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';

export default class App extends Component {
  otpRef = React.createRef();

  resetOTP = () => {
    this.otpRef.current.reset();
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Reset" onPress={this.resetOTP} />
        <OtpInputs ref={this.otpRef} handleChange={code => console.log(code)} numberOfInputs={6} />
      </View>
    );
  }
}
```

### Contributors

Great thanks to :
[@kantorm](https://github.com/kantorm).
