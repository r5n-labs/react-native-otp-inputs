import { fillOtpCode } from '../helpers';

describe('fillOtpCode', () => {
  test('with only number of inputs', () => {
    expect(fillOtpCode(6)).toEqual({
      '0': '',
      '1': '',
      '2': '',
      '3': '',
      '4': '',
      '5': '',
    });
  });

  test('with number and code', () => {
    expect(fillOtpCode(6, 'code')).toEqual({
      '0': 'c',
      '1': 'o',
      '2': 'd',
      '3': 'e',
      '4': '',
      '5': '',
    });
  });
});
