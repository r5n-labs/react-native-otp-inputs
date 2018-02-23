import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, View, StyleSheet, ViewPropTypes } from 'react-native'

export default class OtpInput extends Component {
  static propTypes = {
    containerStyles: ViewPropTypes.style,
    error: PropTypes.bool,
    focusedBorderColor: PropTypes.string,
    handleBackspace: PropTypes.func.isRequired,
    textErrorColor: PropTypes.string,
    updateText: PropTypes.func.isRequired,
    inputStyles: ViewPropTypes.style,
    value: PropTypes.string,
  }

  state = {
    isFocused: false,
  }

  _onFocus = () => this.setState({ isFocused: true })
  _onBlur = () => this.setState({ isFocused: false })

  render() {
    const {
      containerStyles,
      error,
      focusedBorderColor,
      handleBackspace,
      inputStyles,
      textErrorColor,
      updateText,
      value,
    } = this.props

    return (
      <View
        style={[
          defaultStyles.container,
          containerStyles,
          { borderColor: this.state.isFocused ? focusedBorderColor : 'transparent' },
        ]}
      >
        <TextInput
          allowFontScaling={false}
          clearTextOnFocus={true}
          keyboardType="phone-pad"
          maxLength={1}
          onBlur={this._onBlur}
          onChangeText={updateText}
          onFocus={this._onFocus}
          onKeyPress={handleBackspace}
          ref={input => (this.input = input)}
          selectTextOnFocus={true}
          style={[defaultStyles.otpInput, inputStyles, error && { color: textErrorColor }]}
          underlineColorAndroid="transparent"
          value={value}
        />
      </View>
    )
  }
}

const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: '#a1a1a1',
    borderRadius: 6,
    borderWidth: 1,
    height: 53,
    margin: 10,
  },
  otpInput: {
    color: '#ffffff',
    fontSize: 24,
    paddingTop: 10,
    textAlign: 'center',
    width: 40,
  },
})
