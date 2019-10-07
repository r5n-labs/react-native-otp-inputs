import React, { ReactNode, RefObject, Component } from 'react';
import {
  Clipboard,
  Keyboard,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import OtpInput from './OtpInput';

interface Props {
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters';
  clearTextOnFocus: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  errorMessage?: string;
  errorMessageContainerStyles?: StyleProp<ViewStyle>;
  errorMessageTextStyles?: StyleProp<TextStyle>;
  focusStyles?: StyleProp<ViewStyle>;
  focusedBorderColor: string;
  handleChange: (otpCode: string) => void;
  inputContainerStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  inputTextErrorColor: string;
  inputsContainerStyles?: StyleProp<ViewStyle>;
  isRTL: boolean;
  keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  numberOfInputs: number;
  placeholder: string;
  secureTextEntry: boolean;
  selectTextOnFocus: boolean;
  testIDPrefix: string;
  unfocusedBorderColor: string;
}

interface State {
  loading: boolean;
  otpCode: Array<string>;
  previousCopiedText?: string;
}

const MINIMAL_INDEX = 0;

export default class OtpInputs extends Component<Props, State> {
  static defaultProps = {
    autoCapitalize: 'none',
    clearTextOnFocus: false,
    focusedBorderColor: '#0000ff',
    handleChange: console.log,
    inputTextErrorColor: '#ff0000',
    keyboardType: 'phone-pad',
    numberOfInputs: 4,
    secureTextEntry: false,
    selectTextOnFocus: true,
    unfocusedBorderColor: '#a0a0a0',
    testIDPrefix: 'otpInput',
    isRTL: false,
    placeholder: '',
  };

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
      errorMessage,
      focusedBorderColor,
      focusStyles,
      inputContainerStyles,
      inputStyles,
      inputTextErrorColor,
      keyboardType,
      numberOfInputs,
      secureTextEntry,
      selectTextOnFocus,
      testIDPrefix,
      unfocusedBorderColor,
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
          containerStyles={inputContainerStyles}
          error={!!errorMessage}
          firstInput={index === 0}
          focusStyles={focusStyles}
          focusedBorderColor={focusedBorderColor}
          inputStyles={inputStyles}
          key={inputIndex}
          keyboardType={keyboardType}
          numberOfInputs={numberOfInputs}
          placeholder={placeholder}
          ref={this.inputs[inputIndex]}
          secureTextEntry={secureTextEntry}
          selectTextOnFocus={selectTextOnFocus}
          textErrorColor={inputTextErrorColor}
          unfocusedBorderColor={unfocusedBorderColor}
          handleTextChange={(text: string) => this._handleTextChange(text, inputIndex)}
          value={otpCode[inputIndex]}
          testID={`${testIDPrefix}-${inputIndex}`}
        />
      );
    });
  };

  render(): ReactNode {
    const {
      containerStyles,
      errorMessage,
      errorMessageContainerStyles,
      errorMessageTextStyles,
      inputsContainerStyles,
    } = this.props;

    return (
      <View style={[styles.container, containerStyles]}>
        {errorMessage && (
          <View style={[styles.errorMessageContainer, errorMessageContainerStyles]}>
            <Text testID="errorText" style={errorMessageTextStyles}>
              {errorMessage}
            </Text>
          </View>
        )}
        <View style={[styles.inputsContainer, inputsContainerStyles]}>{this._renderInputs()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorMessageContainer: {
    marginHorizontal: 25,
  },
});
