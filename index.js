import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native'

import OtpInput from './OtpInput'

export default class OtpInputs extends Component {
  static propTypes = {
    containerStyles: ViewPropTypes.style,
    errorMessage: PropTypes.string,
    errorMessageContainerStyles: ViewPropTypes.style,
    errorMessageTextStyles: ViewPropTypes.style,
    focusedBorderColor: PropTypes.string,
    inputContainerStyles: ViewPropTypes.style,
    inputTextErrorColor: PropTypes.string,
    numberOfInputs: PropTypes.number,
  }

  static defaultProps = {
    focusedBorderColor: '#0000ff',
    inputTextErrorColor: '#ff0000',
    numberOfInputs: 4,
  }

  state = {
    inputsArray: [],
    loading: false,
    otpCode: [],
  }

  maxIndex = this.props.numberOfInputs - 1
  minIndex = 0
  inputs = []

  _updateText = (text, index) => {
    if (text) {
      const otpCode = this.state.otpCode

      otpCode[index] = text

      this.setState({ otpCode, error: null })
      if (index === this.maxIndex) {
        return Keyboard.dismiss()
      }

      if (index > this.minIndex || index < this.maxIndex) {
        this._focusNextInput(index + 1)
      }
    }
  }

  _handleBackspace = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace') {
      const otpCode = this.state.otpCode
      otpCode[index] = ''
      this.setState({ otpCode, error: null })

      if (index > this.minIndex && index <= this.maxIndex) {
        this._focusNextInput(index - 1)
      }
    }
  }

  componentDidMount = () => {
    this._renderInputs()
  }

  _focusNextInput = index => {
    this.inputs[index].input.focus()
  }

  _handleSubmitError = () => {
    this.inputs.forEach(input => input && input._onFocus())
  }

  _renderInputs = () => {
    const {
      errorMessage,
      focusedBorderColor,
      numberOfInputs,
      inputContainerStyles,
      inputTextErrorColor,
    } = this.props
    const { otpCode } = this.state

    let inputArray = []
    for (let index = 0; index < numberOfInputs; index++) {
      inputArray[index] = (
        <OtpInput
          containerStyles={inputContainerStyles}
          focusedBorderColor={focusedBorderColor}
          textErrorColor={inputTextErrorColor}
          error={errorMessage}
          handleBackspace={event => this._handleBackspace(event, index)}
          ref={input => (this.inputs[index] = input)}
          updateText={text => this._updateText(text, index)}
          value={otpCode[index]}
        />
      )
    }

    return inputArray.map(input => input)
  }

  render() {
    const {
      containerStyles,
      errorMessage,
      errorMessageContainerStyles,
      errorMessageTextStyles,
    } = this.props
    const { otpCode } = this.state

    return (
      <View style={[defaultStyles.container, containerStyles]}>
        {errorMessage && (
          <View style={[defaultStyles.errorMessageContainer, errorMessageContainerStyles]}>
            <Text style={errorMessageTextStyles}>{errorMessage}</Text>
          </View>
        )}
        <View style={defaultStyles.inputsContainer}>{this._renderInputs()}</View>
      </View>
    )
  }
}

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 20,
  },
  errorMessageContainer: {
    marginHorizontal: 25,
  },
})
