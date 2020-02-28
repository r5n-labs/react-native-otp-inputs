import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import OtpInputs from '../';

describe('<OtpInputs />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<OtpInputs {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
