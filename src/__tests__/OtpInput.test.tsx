import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import OtpInput from '../OtpInput';

describe('<OtpInput />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<OtpInput {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
