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
  focusedBorderColor: string
  focusStyles?: StyleProp<ViewStyle>
  handleChange: (otpCode: string) => void
  inputContainerStyles?: StyleProp<ViewStyle>
  inputsContainerStyles?: StyleProp<ViewStyle>
  inputStyles?: StyleProp<TextStyle>
  inputTextErrorColor: string
  keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  numberOfInputs: number
  secureTextEntry: boolean
  selectTextOnFocus: boolean
  testIDPrefix: string
  unfocusedBorderColor: string
  forceLTR: boolean
  isLTR: boolean
  debug: boolean
  placeholder: string
}

interface State {
  loading: boolean
  otpCode: Array<string>
  previousCopiedText: string
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
    forceLTR: true,
    isLTR: true,
    debug: false,
    placeholder: ""
  }

  public inputs: RefObject<OtpInput>[]
  private _interval: any

  constructor(props: Props) {
    super(props)

    const inputs = []

    for (let index = 0; index < this.props.numberOfInputs; index++) {
      inputs[index] = React.createRef()
    }

    this._interval = null
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

  private _listenOnCopiedText = async (): Promise<void> => {
    const copiedText = await Clipboard.getString()

    if (
      copiedText &&
      copiedText.length === this.props.numberOfInputs &&
      copiedText !== this.state.otpCode.join('') &&
      copiedText !== this.state.previousCopiedText
    ) {
      this._handleAfterOtpAction(copiedText.split(''), this.props.numberOfInputs, true)
    }
  }

  private _handleAfterOtpAction = (
    otpCode: Array<string>,
    indexToFocus: number,
    fromClipboard?: boolean,
  ): void => {
    const { handleChange, numberOfInputs } = this.props
    handleChange(otpCode.join(''))

    this.setState({ otpCode, ...(fromClipboard && { previousCopiedText: otpCode.join('') }) })

    if (indexToFocus === numberOfInputs) {
      return Keyboard.dismiss()
    }

    if (indexToFocus >= MINIMAL_INDEX && indexToFocus < numberOfInputs) {
      this._focusInput(indexToFocus)
    }
  }

  private _updateText = (event: TextInputOnChangeEventData, index: number): void => {
    let { text } = event.nativeEvent

    if (text) {
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

      handleChange(otpCode.join(''))
      this.setState({ otpCode })

      if (index > MINIMAL_INDEX && index < numberOfInputs) {
        this._focusInput(index - 1)
      }
    }
  }

  private _focusInput = (index: number): void => {
    this.inputs[index].current.focus()
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
      forceLTR,
      isLTR,
      debug,
      placeholder,
    } = this.props
    const { otpCode } = this.state
    const iterationArray = Array<number>(numberOfInputs).fill(0)

    return iterationArray.map((_, index) => {
      if(forceLTR && !isLTR){
        index = (numberOfInputs - 1)  - index
      }
      return (
        <OtpInput
          autoCapitalize={autoCapitalize}
          clearTextOnFocus={clearTextOnFocus}
          containerStyles={inputContainerStyles}
          focusStyles={focusStyles}
          error={!!errorMessage}
          focusedBorderColor={focusedBorderColor}
          handleBackspace={(event: TextInputOnKeyPressEventData) =>
            this._handleBackspace(event, index)
          }
          placeholder={((debug) ? index.toString() : (placeholder.toString()))}
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
          testID={`${testIDPrefix}-${index}`}
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
