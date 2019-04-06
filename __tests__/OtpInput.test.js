import { TextInput } from 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import OtpInput from '../lib/OtpInput'

describe('<OtpInput />', () => {
  defaultProps = {
    handleBackspace: jest.fn(),
    updateText: jest.fn(),
  }

  const wrapper = renderer.create(<OtpInput {...defaultProps} />)

  describe('render', () => {
    test('with default props', () => {
      expect(wrapper.toJSON()).toMatchSnapshot()
    })

    test('with error message', () => {
      const testWrapper = renderer.create(
        <OtpInput {...defaultProps} error={true} errorMessage="Error" textErrorColor="#00ff00" />,
      )

      expect(testWrapper.toJSON()).toMatchSnapshot()
    })
  })

  describe('_onFocus', () => {
    test('should change state of `isFocused` to true', () => {
      const wrapperInstance = wrapper.getInstance()
      wrapperInstance.setState({ isFocused: false })
      wrapperInstance._onFocus()

      expect(wrapperInstance.state.isFocused).toEqual(true)
    })
  })

  describe('_onBlur', () => {
    test('should change state of `isFocused` to false', () => {
      const wrapperInstance = wrapper.getInstance()
      wrapperInstance.setState({ isFocused: true })
      wrapperInstance._onBlur()

      expect(wrapperInstance.state.isFocused).toEqual(false)
    })
  })
})
