import React, { ReactElement, Component } from 'react'
import { TextInput, View } from 'react-native'

import defaultStyles from './defaultStyles'
interface Props {
  clearTextOnFocus: boolean
  containerStyles?: any
  error?: boolean
  focusedBorderColor?: string
  handleBackspace: (event) => void
  inputStyles?: any
  selectTextOnFocus: boolean
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
  private _onFocus = (): void => this.setState({ isFocused: true })
  private _onBlur = (): void => this.setState({ isFocused: false })

  public render() {
    const {
      clearTextOnFocus,
      containerStyles,
      error,
      focusedBorderColor,
      handleBackspace,
      inputStyles,
      selectTextOnFocus,
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
          clearTextOnFocus={clearTextOnFocus}
          keyboardType="phone-pad"
          maxLength={1}
          onBlur={this._onBlur}
          onChangeText={updateText}
          onFocus={this._onFocus}
          onKeyPress={handleBackspace}
          ref={input => (this.input = input as any)}
          selectTextOnFocus={selectTextOnFocus}
          style={[defaultStyles.otpInput, inputStyles, error && { color: textErrorColor }]}
          underlineColorAndroid="transparent"
          value={value}
        />
      </View>
    )
  }
}
