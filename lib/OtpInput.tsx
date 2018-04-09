import React, { ReactElement, Component } from 'react'
import { TextInput, View } from 'react-native'

import defaultStyles from './defaultStyles'
interface Props {
  containerStyles?: any
  error?: boolean
  focusedBorderColor?: string
  handleBackspace: (event) => void
  inputStyles?: any
  textErrorColor?: string
  unFocusedBorderColor: string
  updateText: (text) => void
  value?: string
}

interface State {
  isFocused: boolean
}

export default class OtpInput extends Component<Props, State> {
  state = {
    isFocused: false,
  }

  private input: ReactElement<TextInput>

  public render() {
    const {
      containerStyles,
      error,
      focusedBorderColor,
      handleBackspace,
      inputStyles,
      textErrorColor,
      unFocusedBorderColor,
      updateText,
      value,
    } = this.props

    return (
      <View
        style={[
          defaultStyles.otpContainer,
          containerStyles,
          { borderColor: this.state.isFocused ? focusedBorderColor : unFocusedBorderColor },
        ]}
      >
        <TextInput
          clearTextOnFocus={true}
          keyboardType="phone-pad"
          maxLength={1}
          onBlur={this._onBlur}
          onChangeText={updateText}
          onFocus={this._onFocus}
          onKeyPress={handleBackspace}
          ref={input => (this.input = input as any)}
          selectTextOnFocus={true}
          style={[defaultStyles.otpInput, inputStyles, error && { color: textErrorColor }]}
          underlineColorAndroid="transparent"
          value={value}
        />
      </View>
    )
  }

  private _onFocus = () => this.setState({ isFocused: true })
  private _onBlur = () => this.setState({ isFocused: false })
}
