import { TextInput, Platform } from 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import OtpInput from '../OtpInput'

jest.mock('Platform', () => ({
  OS: 'ios',
  Version: 12,
}))

describe('<OtpInput />', () => {
  defaultProps = {
    handleBackspace: jest.fn(),
    updateText: jest.fn(),
  }

  describe('render', () => {
    test('with default props', () => {
      const wrapper = renderer.create(<OtpInput {...defaultProps} />)

      expect(wrapper).toMatchSnapshot()
    })

    test('with error message', () => {
      const wrapper = renderer.create(
        <OtpInput {...defaultProps} error={true} errorMessage="Error" textErrorColor="#00ff00" />,
      )

      expect(wrapper).toMatchSnapshot()
    })

    test('with iOS version 12 or higher', () => {
      const wrapper = renderer.create(<OtpInput {...defaultProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('_onFocus', () => {
    test('should change state of `isFocused` to true', () => {
      const wrapperInstance = renderer.create(<OtpInput {...defaultProps} />).getInstance()
      wrapperInstance.setState({ isFocused: false })
      wrapperInstance._onFocus()

      expect(wrapperInstance.state.isFocused).toEqual(true)
    })
  })

  describe('_onBlur', () => {
    test('should change state of `isFocused` to false', () => {
      const wrapperInstance = renderer.create(<OtpInput {...defaultProps} />).getInstance()
      wrapperInstance.setState({ isFocused: true })
      wrapperInstance._onBlur()

      expect(wrapperInstance.state.isFocused).toEqual(false)
    })
  })
})
