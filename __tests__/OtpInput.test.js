import { TextInput } from 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import OtpInput from '../dist/OtpInput'

describe('<OtpInput />', () => {
  defaultProps = {
    handleBackspace: jest.fn(),
    updateText: jest.fn(),
  }

  const wrapper = renderer.create(<OtpInput {...defaultProps} />)

  test('render', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('rendering with error', () => {
    const testWrapper = renderer.create(
      <OtpInput {...defaultProps} error={true} textErrorColor="#00ff00" />,
    )

    expect(testWrapper.toJSON()).toMatchSnapshot()
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
