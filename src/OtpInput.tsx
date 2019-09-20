import React, { PureComponent, RefObject } from 'react'
import {
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  TextInput,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

import defaultStyles from './defaultStyles'

interface Props {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  clearTextOnFocus?: boolean
  containerStyles?: StyleProp<ViewStyle>
  error?: boolean
  firstInput: boolean
  focusStyles?: StyleProp<ViewStyle>
  focusedBorderColor?: string
  handleBackspace: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void
  inputStyles?: StyleProp<TextStyle>
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  numberOfInputs: number
  placeholder?: string
  secureTextEntry?: boolean
  selectTextOnFocus?: boolean
  testID: string
  textErrorColor?: string
  unfocusedBorderColor?: string
  updateText: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void
  value?: string
}

interface State {
  isFocused: boolean
}

const majorVersionIOS: number = parseInt(`${Platform.Version}`, 10)
const isOTPSupported: boolean = Platform.OS === 'ios' && majorVersionIOS >= 12

export default class OtpInput extends PureComponent<Props, State> {
  state = {
    isFocused: false,
  }
  private _onFocus = (): void => this.setState({ isFocused: true })
  private _onBlur = (): void => this.setState({ isFocused: false })

  public input: RefObject<TextInput> = React.createRef()
  public clear = (): void => {
    this.input.current!.clear()
  }

  public focus = (): void => {
    this.input.current!.focus()
  }

  public render() {
    const {
      clearTextOnFocus,
      containerStyles,
      error,
      firstInput,
      focusStyles,
      focusedBorderColor,
      handleBackspace,
      inputStyles,
      keyboardType,
      numberOfInputs,
      placeholder,
      secureTextEntry,
      selectTextOnFocus,
      testID,
      textErrorColor,
      unfocusedBorderColor,
      updateText,
      value,
    } = this.props

    return (
      <View
        style={[
          defaultStyles.otpContainer,
          containerStyles,
          this.state.isFocused && focusStyles,
          {
            borderColor: this.state.isFocused ? focusedBorderColor : unfocusedBorderColor,
          },
        ]}
      >
        <TextInput
          clearTextOnFocus={clearTextOnFocus}
          keyboardType={keyboardType}
          maxLength={firstInput ? numberOfInputs : 1}
          onBlur={this._onBlur}
          onChange={updateText}
          onFocus={this._onFocus}
          onKeyPress={handleBackspace}
          ref={this.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          selectTextOnFocus={selectTextOnFocus}
          style={[defaultStyles.otpInput, inputStyles, error && { color: textErrorColor }]}
          testID={testID}
          textContentType={isOTPSupported ? 'oneTimeCode' : 'none'}
          underlineColorAndroid="transparent"
          value={value}
        />
      </View>
    )
  }
}
