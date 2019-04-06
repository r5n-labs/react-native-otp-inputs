import React, { Component, ReactNode, RefObject } from 'react'
import {
  Keyboard,
  Text,
  View,
  TextInputKeyPressEventData,
  TextInputChangeEventData,
} from 'react-native'
import flatten from 'lodash.flatten'

import OtpInput from './OtpInput'
import defaultStyles from './defaultStyles'

interface Props {
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters'
  clearTextOnFocus: boolean
  containerStyles?: any
  errorMessage?: string
  errorMessageContainerStyles?: any
  errorMessageTextStyles?: any
  focusedBorderColor: string
  handleChange: (otpCode: string) => void
  inputContainerStyles?: any
  inputStyles?: any
  inputTextErrorColor: string
  inputsContainerStyles?: any
  keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  numberOfInputs: number
  secureTextEntry: boolean
  selectTextOnFocus: boolean
  unfocusedBorderColor: string
}

interface State {
  loading: boolean
  otpCode: Array<string>
}

type TextInputOnChangeEventData = {
  nativeEvent: TextInputChangeEventData
}

type TextInputOnKeyPressEventData = {
  nativeEvent: TextInputKeyPressEventData
}

const MINIMAL_INDEX = 0

export default class OtpInputs extends Component<Props, State> {
  static defaultProps = {
    autoCapitalize: 'none',
    clearTextOnFocus: false,
    focusedBorderColor: '#0000ff',
    handleChange: console.log,
    inputTextErrorColor: '#ff0000',
    keyboardType: 'phone-pad',
    numberOfInputs: 4,
    secureTextEntry: false,
    selectTextOnFocus: true,
    unfocusedBorderColor: 'transparent',
  }
  public inputs: RefObject<OtpInput>[]

  constructor(props: Props) {
    super(props)

    const inputs = []

    for (let index = 0; index < this.props.numberOfInputs; index++) {
      inputs[index] = React.createRef()
    }

    this.inputs = inputs as Array<RefObject<OtpInput>>
    this.state = {
      loading: false,
      otpCode: [],
    }
  }

  public componentDidMount() {
    this._renderInputs()
  }

  private _handleAfterOtpAction = (otpCode: Array<string>, indexToFocus: number) => {
    const { handleChange, numberOfInputs } = this.props
    handleChange(otpCode.join(''))
    this.setState({ otpCode })

    if (indexToFocus === numberOfInputs) {
      return Keyboard.dismiss()
    }

    if (indexToFocus >= MINIMAL_INDEX && indexToFocus < numberOfInputs) {
      this._focusInput(indexToFocus)
    }
  }

  private _updateText = (event: TextInputOnChangeEventData, index: number) => {
    let { text } = event.nativeEvent
    const textLength = text.length

    if (text) {
      let otpArray = this.state.otpCode

      if (textLength > 2) {
        const { numberOfInputs } = this.props
        otpArray[index] = (textLength > numberOfInputs - index ? [text.slice(1)] : [text]).join('')

        this._handleAfterOtpAction(flatten(otpArray).slice(0, numberOfInputs), textLength)
      } else {
        otpArray[index] = text[text.length - 1]

        this._handleAfterOtpAction(otpArray, index + 1)
      }
    }
  }

  private _handleBackspace = (event: TextInputOnKeyPressEventData, index: number) => {
    if (event.nativeEvent.key === 'Backspace') {
      const { handleChange, numberOfInputs } = this.props
      const otpCode = this.state.otpCode
      otpCode[index] = ''

      handleChange(otpCode.join(''))
      this.setState({ otpCode })

      if (index > MINIMAL_INDEX && index < numberOfInputs) {
        this._focusInput(index - 1)
      }
    }
  }

  private _focusInput = (index: number) => {
    this.inputs[index].current.focus()
  }

  private _renderInputs = () => {
    const {
      autoCapitalize,
      clearTextOnFocus,
      errorMessage,
      focusedBorderColor,
      inputContainerStyles,
      inputStyles,
      inputTextErrorColor,
      keyboardType,
      numberOfInputs,
      secureTextEntry,
      selectTextOnFocus,
      unfocusedBorderColor,
    } = this.props
    const { otpCode } = this.state

    let inputArray = []
    for (let index = MINIMAL_INDEX; index < numberOfInputs; index++) {
      inputArray[index] = (
        <OtpInput
          autoCapitalize={autoCapitalize}
          clearTextOnFocus={clearTextOnFocus}
          containerStyles={inputContainerStyles}
          error={!!errorMessage}
          focusedBorderColor={focusedBorderColor}
          handleBackspace={(event: TextInputOnKeyPressEventData) =>
            this._handleBackspace(event, index)
          }
          inputStyles={inputStyles}
          key={index}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          ref={this.inputs[index]}
          selectTextOnFocus={selectTextOnFocus}
          textErrorColor={inputTextErrorColor}
          unfocusedBorderColor={unfocusedBorderColor}
          updateText={(event: TextInputOnChangeEventData) => this._updateText(event, index)}
          value={otpCode[index]}
        />
      )
    }

    return inputArray.map(input => input)
  }

  public render(): ReactNode {
    const {
      containerStyles,
      errorMessage,
      errorMessageContainerStyles,
      errorMessageTextStyles,
      inputsContainerStyles,
    } = this.props

    return (
      <View style={[defaultStyles.container, containerStyles]}>
        {errorMessage && (
          <View style={[defaultStyles.errorMessageContainer, errorMessageContainerStyles]}>
            <Text testID="errorText" style={errorMessageTextStyles}>
              {errorMessage}
            </Text>
          </View>
        )}
        <View style={[defaultStyles.inputsContainer, inputsContainerStyles]}>
          {this._renderInputs()}
        </View>
      </View>
    )
  }
}
