# react-native-otp-inputs

## Basic usage

## API

| Method                      | Type           | Required | Default     | Description                                                  |
| --------------------------- | -------------- | -------- | ----------- | ------------------------------------------------------------ |
| numberOfInputs              | number         | true     | 4           | How many inputs should be rendered                           |
| handleChange                | function       | true     | console.log | returns otp code which is typed in inputs                    |
| focusedBorderColor          | string         | false    | #0000ff     | borderColor of input when focused                            |
| inputTextErrorColor         | string         | false    | #ff0000     | Color of text inside input container when error is passed in |
| errorMessage                | string         | false    | none        | Error message that is displayed above inputs                 |
| containerStyles             | style (object) | false    | none        | Styles applied to whole container                            |
| inputContainerStyles        | style (object) | false    | none        | Styles applied to each input container                       |
| errorMessageContainerStyles | style (object) | false    | none        | Styles applied to error message container                    |
| errorMessageTextStyles      | style (object) | false    | none        | Styles applied to error message text                         |
