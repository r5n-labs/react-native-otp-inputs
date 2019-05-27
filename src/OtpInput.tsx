import React, { Component, RefObject } from 'react'
import {
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputChangeEventData,
  Platform,
} from 'react-native'

import defaultStyles from './defaultStyles'

interface Props {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  clearTextOnFocus?: boolean
  containerStyles?: any
  focusStyles?: any
  error?: boolean
  focusedBorderColor?: string
  handleBackspace: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void
  inputStyles?: any
  secureTextEntry?: boolean
  selectTextOnFocus?: boolean
  textErrorColor?: string
  unfocusedBorderColor?: string
  updateText: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  value?: string
}

interface State {
  isFocused: boolean
}

const majorVersionIOS: number = parseInt(`${Platform.Version}`, 10)
const isOTPSupported: boolean = Platform.OS === 'ios' && majorVersionIOS >= 12

export default class OtpInput extends Component<Props, State> {
  state = {
    isFocused: false,
  }
  private _onFocus = (): void => this.setState({ isFocused: true })
  private _onBlur = (): void => this.setState({ isFocused: false })

  public input: RefObject<TextInput> = React.createRef()
  public focus = (): void => {
    this.input.current.focus()
  }

  public render() {
    const {
      clearTextOnFocus,
      containerStyles,
      focusStyles,
      error,
      focusedBorderColor,
      handleBackspace,
      inputStyles,
      keyboardType,
      secureTextEntry,
      selectTextOnFocus,
      textErrorColor,
      unfocusedBorderColor,
      updateText,
      value,
    } = this.props

    console.log(focusStyles)

    return (
      <View
        style={[
          defaultStyles.otpContainer,
          containerStyles,
          this.state.isFocused && focusStyles,
          { borderColor: this.state.isFocused ? focusedBorderColor : unfocusedBorderColor },
        ]}
      >
        <TextInput
          clearTextOnFocus={clearTextOnFocus}
          keyboardType={keyboardType}
          onBlur={this._onBlur}
          onChange={updateText}
          onFocus={this._onFocus}
          onKeyPress={handleBackspace}
          ref={this.input}
          secureTextEntry={secureTextEntry}
          selectTextOnFocus={selectTextOnFocus}
          textContentType={isOTPSupported ? 'oneTimeCode' : 'none'}
          style={[defaultStyles.otpInput, inputStyles, error && { color: textErrorColor }]}
          underlineColorAndroid="transparent"
          value={value}
        />
      </View>
    )
  }
}
