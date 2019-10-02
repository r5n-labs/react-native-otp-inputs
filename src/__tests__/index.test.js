import { Keyboard } from 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import OtpInputs from '../index'
import OtpInput from '../OtpInput'

Keyboard.dismiss = jest.fn()

describe('<OtpInputs />', () => {
  const wrapper = renderer.create(<OtpInputs />)

  test('render', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
    expect(wrapper.root.findAllByType(OtpInput).length).toEqual(4)
    const sixInputsWrapper = renderer.create(<OtpInputs numberOfInputs={6} />)
    expect(sixInputsWrapper.root.findAllByType(OtpInput).length).toEqual(6)
  })

  test('rendering with error', () => {
    const testWrapper = renderer.create(<OtpInputs errorMessage="ExampleErrorMessage" />)
    const errorTextElement = testWrapper.root.findByProps({ testID: 'errorText' })

    expect(testWrapper).toMatchSnapshot()
    expect(errorTextElement._fiber.stateNode.props.children).toEqual('ExampleErrorMessage')
  })

  describe('_updateText', () => {
    describe('when input is filled in', () => {
      test('should call _focusInput and not call `Keyboard.dismiss`', () => {
        const fakeEvent = { nativeEvent: { text: '1' } }
        const inputIndex = 0
        const wrapperInstance = wrapper.getInstance()
        wrapperInstance._focusInput = jest.fn()
        wrapperInstance._updateText(fakeEvent, inputIndex)

        expect(wrapperInstance._focusInput).toBeCalled()
        expect(Keyboard.dismiss).not.toBeCalled()
      })
    })

    describe('when no text is given', () => {
      test('should not any function', () => {
        const fakeEvent = { nativeEvent: { text: '' } }
        const inputIndex = 2
        const wrapperInstance = wrapper.getInstance()
        wrapperInstance._focusInput = jest.fn()
        wrapperInstance._updateText(fakeEvent, inputIndex)

        expect(wrapperInstance._focusInput).not.toBeCalled()
        expect(Keyboard.dismiss).not.toBeCalled()
      })
    })

    describe('when input that does not exist is filled in (fast typing)', () => {
      test('should not any function', () => {
        const fakeEvent = { nativeEvent: { text: '1' } }
        const inputIndex = 5
        const wrapperInstance = wrapper.getInstance()
        wrapperInstance._focusInput = jest.fn()
        wrapperInstance._updateText(fakeEvent, inputIndex)

        expect(wrapperInstance._focusInput).not.toBeCalled()
        expect(Keyboard.dismiss).not.toBeCalled()
      })
    })

    describe('when last input is filled in', () => {
      test('should not call _focusInput and call `Keyboard.dismiss`', () => {
        const fakeEvent = { nativeEvent: { text: '1' } }
        const inputIndex = 3
        const wrapperInstance = wrapper.getInstance()
        wrapperInstance._focusInput = jest.fn()
        wrapperInstance._updateText(fakeEvent, inputIndex)

        expect(wrapperInstance._focusInput).not.toBeCalled()
        expect(Keyboard.dismiss).toBeCalled()
      })
    })

    describe('when input with value is filled with new one', () => {
      test('should override first value', () => {
        const wrapper = renderer.create(<OtpInputs />)

        const fakeEvent = { nativeEvent: { text: '12' } }
        const inputIndex = 0
        const wrapperInstance = wrapper.getInstance()
        wrapperInstance._updateText(fakeEvent, inputIndex)

        expect(wrapperInstance.state.otpCode.join('')).toEqual('2')
        expect(Keyboard.dismiss).toBeCalled()
      })
    })
  })

  describe('_handleBackspace', () => {
    describe('when first input is cleared', () => {
      test('should not call _focusInput', () => {
        const fakeNativeEvent = { nativeEvent: { key: 'Backspace' } }
        const inputIndex = 0
        const wrapperInstance = wrapper.getInstance()
        wrapperInstance._focusInput = jest.fn()
        wrapperInstance._handleBackspace(fakeNativeEvent, inputIndex)

        expect(wrapperInstance._focusInput).not.toBeCalled()
      })
    })

    describe('when key is not backspace', () => {
      test('should not call _focusInput', () => {
        const fakeNativeEvent = { nativeEvent: { key: 'Enter' } }
        const inputIndex = 0
        const wrapperInstance = wrapper.getInstance()
        wrapperInstance._focusInput = jest.fn()
        wrapperInstance._handleBackspace(fakeNativeEvent, inputIndex)

        expect(wrapperInstance._focusInput).not.toBeCalled()
      })
    })

    describe('when index is equal last index', () => {
      test('should call _focusInput', () => {
        const fakeNativeEvent = { nativeEvent: { key: 'Backspace' } }
        const inputIndex = 3
        const wrapperInstance = wrapper.getInstance()
        wrapperInstance._focusInput = jest.fn()
        wrapperInstance._handleBackspace(fakeNativeEvent, inputIndex)

        expect(wrapperInstance._focusInput).toBeCalled()
      })
    })
  })
})

describe('OtpInput events', () => {
  const wrapper = renderer.create(<OtpInputs />)

  describe('_handleBackspace', () => {
    test('should call handleBaspace function when OtpInput calls it', () => {
      const wrapperInstance = wrapper.getInstance()
      wrapperInstance._handleBackspace = jest.fn()
      const OtpInputComponent = wrapper.root.findAllByType(OtpInput)[0]

      OtpInputComponent.props.handleBackspace()
      expect(wrapperInstance._handleBackspace).toBeCalled()
    })
  })

  describe('updateText', () => {
    test('should call updateText function when OtpInput calls it', () => {
      const wrapperInstance = wrapper.getInstance()
      wrapperInstance._updateText = jest.fn()
      const OtpInputComponent = wrapper.root.findAllByType(OtpInput)[0]

      OtpInputComponent.props.updateText()
      expect(wrapperInstance._updateText).toBeCalled()
    })
  })
})
