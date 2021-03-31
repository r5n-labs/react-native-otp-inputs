# react-native-otp-inputs

![npm](https://img.shields.io/npm/dw/react-native-otp-inputs.svg)
![npm](https://img.shields.io/npm/v/react-native-otp-inputs.svg)

### Demo

![Demo](https://user-images.githubusercontent.com/17621507/36565065-a03b98b0-181f-11e8-9a54-09d978bec892.gif)

## Description

`react-native-otp-inputs` is fully customizable, React-Native package, that provides solution for One-time password feature with user friendly events like moving to previous input with backspace or going to next when filled in. It supports pasting and otp code into inputs

## Installation

Supported version: `react-native >= 0.59.0`

### Expo is currently not supported as `Clipboard` is not included in Expo SDK

```bash
$ yarn add react-native-otp-inputs @react-native-clipboard/clipboard
```

### After installation run:

```bash
$ npx pod-install
```

Clipboard module has been extracted from react-native core, so it needs to be installed separately.
Package uses it for autofill feature

<details>
  <summary>For React Native version 0.59</summary>

### React Native <= 0.59

run the following command to link the package:

```
$ react-native link @react-native-clipboard/clipboard
```

For iOS, make sure you install the pod file.

```
cd ios && pod install && cd ..
```

or you could follow the instructions to [manually link the project](https://reactnative.dev/docs/linking-libraries-ios#manual-linking)

</details>

| React-Native version | version                                |
| -------------------- | -------------------------------------- |
| 0.53.0 - 0.56.1      | yarn add react-native-otp-inputs@1.1.0 |
| 0.57.0 - 0.58.6      | yarn add react-native-otp-inputs@3.2.2 |
| +0.59.0              | yarn add react-native-otp-inputs       |

## Basic usage

```js
import React, { Component } from 'react';
import { View } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <OtpInputs
          handleChange={(code) => console.log(code)}
          numberOfInputs={6}
        />
      </View>
    );
  }
}
```

## [API](./docs/API.md)

### Contributors

Great thanks to :
[@kantorm](https://github.com/kantorm).
