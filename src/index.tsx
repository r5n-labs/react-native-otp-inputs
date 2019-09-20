import React, { PureComponent, ReactNode, RefObject } from 'react'
import {
  Clipboard,
  Keyboard,
  StyleProp,
  Text,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

import OtpInput from './OtpInput'
import defaultStyles from './defaultStyles'

interface Props {
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters'
  clearTextOnFocus: boolean
  containerStyles?: StyleProp<ViewStyle>
  errorMessage?: string
  errorMessageContainerStyles?: StyleProp<ViewStyle>
  errorMessageTextStyles?: StyleProp<TextStyle>
  focusStyles?: StyleProp<ViewStyle>
  focusedBorderColor: string
  handleChange: (otpCode: string) => void
  inputContainerStyles?: StyleProp<ViewStyle>
  inputStyles?: StyleProp<TextStyle>
  inputTextErrorColor: string
  inputsContainerStyles?: StyleProp<ViewStyle>
  isRTL: boolean
  keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  numberOfInputs: number
  placeholder: string
  secureTextEntry: boolean
  selectTextOnFocus: boolean
  testIDPrefix: string
  unfocusedBorderColor: string
}

interface State {
  loading: boolean
  otpCode: Array<string>
  previousCopiedText?: string
}

type TextInputOnChangeEventData = {
  nativeEvent: TextInputChangeEventData
}

type TextInputOnKeyPressEventData = {
  nativeEvent: TextInputKeyPressEventData
}

const MINIMAL_INDEX = 0

export default class OtpInputs extends PureComponent<Props, State> {
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
    unfocusedBorderColor: '#a0a0a0',
    testIDPrefix: 'otpInput',
    isRTL: false,
    placeholder: '',
  }

  public inputs: Array<RefObject<OtpInput>>
  private _interval: any

  constructor(props: Props) {
    super(props)

    const inputs = []

    for (let index = 0; index < this.props.numberOfInputs; index++) {
      inputs[index] = React.createRef<OtpInput>()
    }

    this._interval = undefined
    this.inputs = inputs as Array<RefObject<OtpInput>>
    this.state = {
      loading: false,
      previousCopiedText: '',
      otpCode: [],
    }
  }

  public componentDidMount(): void {
    this._listenOnCopiedText()

    this._interval = setInterval(() => {
      this._listenOnCopiedText()
    }, 1000)
  }

  public componentWillUnmount(): void {
    clearInterval(this._interval)
  }

  public reset = (): void => {
    this.setState({ otpCode: [] })
    this.props.handleChange('')
    this.inputs.forEach(i => i.current!.clear())
  }

  private _listenOnCopiedText = async (): Promise<void> => {
    const { numberOfInputs } = this.props
    const { otpCode, previousCopiedText } = this.state
    const copiedText = await Clipboard.getString()

    if (
      copiedText &&
      copiedText.length === numberOfInputs &&
      copiedText !== otpCode.join('') &&
      copiedText !== previousCopiedText
    ) {
      this._handleAfterOtpAction(copiedText.split(''), numberOfInputs, true)
    }
  }

  private _handleAfterOtpAction = (
    otpCode: Array<string>,
    indexToFocus: number,
    fromClipboard?: boolean,
  ): void => {
    const { handleChange, numberOfInputs } = this.props
    handleChange(otpCode.join(''))

    this.setState({
      otpCode,
      ...(fromClipboard && { previousCopiedText: otpCode.join('') }),
    })

    if (indexToFocus === numberOfInputs) {
      return Keyboard.dismiss()
    }

    if (indexToFocus >= MINIMAL_INDEX && indexToFocus < numberOfInputs) {
      this._focusInput(indexToFocus)
    }
  }

  private _updateText = (event: TextInputOnChangeEventData, index: number): void => {
    const { numberOfInputs } = this.props
    const { text } = event.nativeEvent

    if (text.length === numberOfInputs) {
      this._handleAfterOtpAction(text.split(''), numberOfInputs, true)
    } else if (text) {
      let otpArray = this.state.otpCode
      otpArray[index] = text[text.length - 1]
      this._handleAfterOtpAction(otpArray, index + 1)
    }
  }

  private _handleBackspace = (event: TextInputOnKeyPressEventData, index: number): void => {
    if (event.nativeEvent.key === 'Backspace') {
      const { handleChange, numberOfInputs } = this.props
      const otpCode = this.state.otpCode
      otpCode[index] = ''
      this.inputs[index].current!.clear()

      handleChange(otpCode.join(''))
      this.setState({ otpCode })

      if (index > MINIMAL_INDEX && index < numberOfInputs) {
        this._focusInput(index - 1)
      }
    }
  }

  private _focusInput = (index: number): void => {
    this.inputs[index].current!.focus()
  }

  private _renderInputs = (): Array<JSX.Element> => {
    const {
      autoCapitalize,
      clearTextOnFocus,
      errorMessage,
      focusedBorderColor,
      focusStyles,
      inputContainerStyles,
      inputStyles,
      inputTextErrorColor,
      keyboardType,
      numberOfInputs,
      secureTextEntry,
      selectTextOnFocus,
      testIDPrefix,
      unfocusedBorderColor,
      isRTL,
      placeholder,
    } = this.props
    const { otpCode } = this.state
    const iterationArray = Array<number>(numberOfInputs).fill(0)

    return iterationArray.map((_, index) => {
      let inputIndex = index
      if (isRTL) {
        inputIndex = numberOfInputs - 1 - index
      }

      return (
        <OtpInput
          autoCapitalize={autoCapitalize}
          clearTextOnFocus={clearTextOnFocus}
          containerStyles={inputContainerStyles}
          error={!!errorMessage}
          firstInput={index === 0}
          focusStyles={focusStyles}
          focusedBorderColor={focusedBorderColor}
          handleBackspace={(event: TextInputOnKeyPressEventData) =>
            this._handleBackspace(event, inputIndex)
          }
          inputStyles={inputStyles}
          key={inputIndex}
          keyboardType={keyboardType}
          numberOfInputs={numberOfInputs}
          placeholder={placeholder}
          ref={this.inputs[inputIndex]}
          secureTextEntry={secureTextEntry}
          selectTextOnFocus={selectTextOnFocus}
          textErrorColor={inputTextErrorColor}
          unfocusedBorderColor={unfocusedBorderColor}
          updateText={(event: TextInputOnChangeEventData) => this._updateText(event, inputIndex)}
          value={otpCode[inputIndex]}
          testID={`${testIDPrefix}-${inputIndex}`}
        />
      )
    })
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
