# react-native-otp-inputs

[![codecov](https://codecov.io/gh/dsznajder/react-native-otp-inputs/branch/master/graph/badge.svg)](https://codecov.io/gh/dsznajder/react-native-otp-inputs)

![npm](https://img.shields.io/npm/dw/react-native-otp-inputs.svg)
![npm](https://img.shields.io/npm/v/react-native-otp-inputs.svg)

### Demo

![Demo](https://user-images.githubusercontent.com/17621507/36565065-a03b98b0-181f-11e8-9a54-09d978bec892.gif)

## Description

`react-native-otp-inputs` is fully customizable, React-Native package, that provides solution for One-time password feature with user friendly events like moving to previous input with backspace or going to next when filled in. It supports pasting and otp code into inputs

## Installation

| React-Native version | version                                |
| -------------------- | -------------------------------------- |
| 0.53.0 - 0.56.1      | yarn add react-native-otp-inputs@1.1.0 |
| 0.57.0 - 0.58.6      | yarn add react-native-otp-inputs@3.2.2 |
| +0.59.0              | yarn add react-native-otp-inputs       |

### Android additional steps

Android setup requires [react-native-keyevent](https://github.com/kevinejohn/react-native-keyevent) package to work properly.

1. If you are using react-native < 0.60.0 then [follow these steps](https://github.com/kevinejohn/react-native-keyevent#linking-android)
1. If you are using react-native >= 0.60.0 then add this to your dependencies in `react-native.config.js`

```javascript
// react-native.config.js
module.exports = {
  dependencies: {
    'react-native-keyevent': {
      platforms: {
        ios: null,
      },
    },
  },
};
```

3. Add `react-native-keyevent` to your dependencies with

```bash
yarn add react-native-keyevent
```

4. Then follow configuration for Android [here](https://github.com/kevinejohn/react-native-keyevent#configuration) (If you have problems, check [Example App](./Example/android/app/src/main/java/com/example/MainActivity.java) configuration)

### [Migration to v4](./docs/Migration.md)

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

## [API](./docs/API.md)

### Contributors

Great thanks to :
[@kantorm](https://github.com/kantorm).
