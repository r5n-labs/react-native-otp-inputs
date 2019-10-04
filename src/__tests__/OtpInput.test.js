import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import OtpInput from '../OtpInput';

describe('<OtpInput />', () => {
  const defaultProps = {
    handleBackspace: ({ nativeEvent: {} }) => {},
    updateText: ({ nativeEvent: {} }) => {},
  };

  describe('render', () => {
    it('with default props', () => {
      const wrapper = renderer.create(<OtpInput {...defaultProps} />);

      expect(wrapper).toMatchSnapshot();
    });

    it('with error message', () => {
      const wrapper = renderer.create(
        <OtpInput {...defaultProps} error textErrorColor="#00ff00" />,
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('with iOS version 12 or higher', () => {
      const wrapper = renderer.create(<OtpInput {...defaultProps} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('_onFocus', () => {
    it('should change state of `isFocused` to true', () => {
      const wrapperInstance = renderer.create(<OtpInput {...defaultProps} />).getInstance();
      wrapperInstance.setState({ isFocused: false });
      wrapperInstance._onFocus();

      expect(wrapperInstance.state.isFocused).toEqual(true);
    });
  });

  describe('_onBlur', () => {
    it('should change state of `isFocused` to false', () => {
      const wrapperInstance = renderer.create(<OtpInput {...defaultProps} />).getInstance();
      wrapperInstance.setState({ isFocused: true });
      wrapperInstance._onBlur();

      expect(wrapperInstance.state.isFocused).toEqual(false);
    });
  });
});
