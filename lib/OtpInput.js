'use-strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Image, View, StyleSheet, ViewPropTypes } from 'react-native'

export default class OtpInput extends Component {
  static propTypes = {
    error: PropTypes.bool,
    value: PropTypes.string,
    focusedBorderColor: PropTypes.string,
    containerStyles: ViewPropTypes.style,
    textErrorColor: ViewPropTypes.style,
  }

  state = {
    isFocused: false,
  }

  _onFocus = () => this.setState({ isFocused: true })
  _onBlur = () => this.setState({ isFocused: false })

  render() {
    const { error, value, focusedBorderColor, containerStyles, textErrorColor } = this.props

    return (
      <View
        style={[
          defaultStyles.container,
          { borderColor: this.state.isFocused ? focusedBorderColor : 'transparent' },
          ...containerStyles,
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
          ref={input => (this.input = input)}
          selectTextOnFocus={true}
          style={[defaultStyles.otpInput, error && { color: textErrorColor }]}
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
    position: 'relative',
  },
  otpInput: {
    width: 40,
    marginTop: 4,
    paddingLeft: 12,
    fontFamily: 'bold',
    color: '#ffffff',
    fontSize: 24,
  },
})
