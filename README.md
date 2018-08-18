# react-native-otp-inputs

### Demo

![Demo](https://user-images.githubusercontent.com/17621507/36565065-a03b98b0-181f-11e8-9a54-09d978bec892.gif)

## Description

`react-native-otp-inputs` is fully customizable, pure JavaScript package, that provides solution for One-time password feature with user friendly events like moving to previous input with backspace or going to next when filled in.

#### Supported version of React Native >= 0.53.0

**_It's because of `onKeyPress` event implementation on android._**

## Basic usage

```js
import React, { Component } from 'react'
import { View } from 'react-native'
import OtpInputs from 'react-native-otp-inputs'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <OtpInputs handleChange={code => console.log(code)} numberOfInputs={6} />
      </View>
    )
  }
}
```

## API

| Method                      | Type           | Required    | Default     | Description                                                  |
| --------------------------- | -------------- | ----------- | ----------- | ------------------------------------------------------------ |
| numberOfInputs              | number         | true (1..6) | 4           | How many inputs should be rendered                           |
| handleChange                | function       | true        | console.log | Returns otp code which is typed in inputs                    |
| selectTextOnFocus           | boolean        | false       | true        | prop for input                                               |
| clearTextOnFocus            | boolean        | false       | false       | prop for input                                               |
| focusedBorderColor          | string         | false       | #0000ff     | borderColor of input when focused                            |
| unfocusedBorderColor        | string         | false       | transparent | borderColor of input when not focused                        |
| inputTextErrorColor         | string         | false       | #ff0000     | Color of text inside input container when error is passed in |
| errorMessage                | string         | false       | none        | Error message that is displayed above inputs                 |
| containerStyles             | style (object) | false       | none        | Styles applied to whole container                            |
| inputContainerStyles        | style (object) | false       | none        | Styles applied to each input container                       |
| errorMessageContainerStyles | style (object) | false       | none        | Styles applied to error message container                    |
| errorMessageTextStyles      | style (object) | false       | none        | Styles applied to error message text                         |

### Contributions

Great thanks to [@kantorm](https://github.com/kantorm).

### Licence MIT
