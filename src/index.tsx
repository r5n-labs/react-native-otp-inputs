import React, { ReactNode, RefObject, Component } from 'react';
import {
  Clipboard,
  Keyboard,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  TextInputProps,
} from 'react-native';

import OtpInput from './OtpInput';

type Props = TextInputProps & {
  styles?: StyleProp<ViewStyle>;
  focusStyles?: StyleProp<ViewStyle>;
  handleChange: (otpCode: string) => void;
  inputContainerStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  isRTL: boolean;
  numberOfInputs: number;
  testIDPrefix: string;
};

type State = {
  loading: boolean;
  otpCode: Array<string>;
  previousCopiedText?: string;
};

const MINIMAL_INDEX = 0;

class OtpInputs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const inputs = [];

    for (let index = 0; index < this.props.numberOfInputs; index++) {
      inputs[index] = React.createRef<TextInput>();
    }

    this._interval = undefined;
    this.inputs = inputs as Array<RefObject<TextInput>>;
    this.state = {
      loading: false,
      previousCopiedText: '',
      otpCode: [],
    };
  }

  componentDidMount(): void {
    this._listenOnCopiedText();

    this._interval = setInterval(() => {
      this._listenOnCopiedText();
    }, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this._interval);
  }

  inputs: Array<RefObject<TextInput>>;
  _interval: any;

  reset = (): void => {
    this.setState({ otpCode: [] });
    this.props.handleChange('');
    this.inputs.forEach(i => i.current!.clear());
  };

  _listenOnCopiedText = async (): Promise<void> => {
    const { numberOfInputs } = this.props;
    const { otpCode, previousCopiedText } = this.state;
    const copiedText = await Clipboard.getString();

    if (
      copiedText &&
      copiedText.length === numberOfInputs &&
      copiedText !== otpCode.join('') &&
      copiedText !== previousCopiedText
    ) {
      this._handleAfterOtpAction(copiedText.split(''), numberOfInputs, true);
    }
  };

  _handleAfterOtpAction = (
    otpCode: Array<string>,
    indexToFocus: number,
    fromClipboard?: boolean,
  ): void => {
    const { handleChange, numberOfInputs } = this.props;
    handleChange(otpCode.join(''));

    this.setState({
      otpCode,
      ...(fromClipboard && { previousCopiedText: otpCode.join('') }),
    });

    if (indexToFocus === numberOfInputs) {
      return Keyboard.dismiss();
    }

    if (indexToFocus >= MINIMAL_INDEX && indexToFocus < numberOfInputs) {
      this._focusInput(indexToFocus);
    }
  };

  _handleTextChange = (text: string, index: number): void => {
    const { numberOfInputs } = this.props;

    if (!text.length) {
      this.inputs[index].current!.clear();
      return this._focusInput(index - 1);
    }

    if (text.length === numberOfInputs) {
      this._handleAfterOtpAction(text.split(''), numberOfInputs, true);
    } else if (text) {
      let otpArray = this.state.otpCode;
      otpArray[index] = text[text.length - 1];
      this._handleAfterOtpAction(otpArray, index + 1);
    }
  };

  _focusInput = (index: number): void => {
    if (index >= 0 && index < this.props.numberOfInputs) {
      this.inputs[index].current!.focus();
    }
  };

  _renderInputs = (): Array<JSX.Element> => {
    const {
      autoCapitalize,
      clearTextOnFocus,
      focusStyles,
      inputContainerStyles,
      inputStyles,
      keyboardType,
      numberOfInputs,
      secureTextEntry,
      selectTextOnFocus,
      testIDPrefix,
      isRTL,
      placeholder,
    } = this.props;
    const { otpCode } = this.state;
    const iterationArray = Array<number>(numberOfInputs).fill(0);

    return iterationArray.map((_, index) => {
      let inputIndex = index;
      if (isRTL) {
        inputIndex = numberOfInputs - 1 - index;
      }

      return (
        <OtpInput
          autoCapitalize={autoCapitalize}
          clearTextOnFocus={clearTextOnFocus}
          firstInput={index === 0}
          focusStyles={focusStyles}
          handleTextChange={(text: string) => this._handleTextChange(text, inputIndex)}
          inputContainerStyles={inputContainerStyles}
          inputStyles={inputStyles}
          key={inputIndex}
          keyboardType={keyboardType}
          numberOfInputs={numberOfInputs}
          placeholder={placeholder}
          ref={this.inputs[inputIndex]}
          secureTextEntry={secureTextEntry}
          selectTextOnFocus={selectTextOnFocus}
          testID={`${testIDPrefix}-${inputIndex}`}
          value={otpCode[inputIndex]}
        />
      );
    });
  };

  render(): ReactNode {
    return <View style={this.props.styles}>{this._renderInputs()}</View>;
  }
}

export default OtpInputs;

// @ts-ignore
OtpInputs.defaultProps = {
  autoCapitalize: 'none',
  clearTextOnFocus: false,
  handleChange: console.log,
  keyboardType: 'phone-pad',
  numberOfInputs: 4,
  secureTextEntry: false,
  selectTextOnFocus: true,
  testIDPrefix: 'otpInput',
  isRTL: false,
  placeholder: '',
  styles: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  focusStyles: {
    borderColor: '#00f',
  },
  inputStyles: {
    fontSize: 24,
    paddingTop: 10,
    textAlign: 'center',
    width: 40,
  },
  inputContainerStyles: {
    borderBottomWidth: 1,
    height: 53,
    margin: 10,
  },
};
