import React, { Component } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import OtpInput from './OtpInput';
export default class OtpInputs extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputsArray: [],
            loading: false,
            otpCode: [],
        };
        this.maxIndex = this.props.numberOfInputs - 1;
        this.minIndex = 0;
        this.inputs = [];
        this._updateText = (text, index) => {
            if (text) {
                const otpCode = this.state.otpCode;
                otpCode[index] = text;
                this.props.handleChange && this.props.handleChange(otpCode.join(''));
                this.setState({ otpCode });
                if (index === this.maxIndex) {
                    return Keyboard.dismiss();
                }
                if (index >= this.minIndex && index < this.maxIndex) {
                    this._focusInput(index + 1);
                }
            }
        };
        this._handleBackspace = ({ nativeEvent }, index) => {
            if (nativeEvent.key === 'Backspace') {
                const otpCode = this.state.otpCode;
                otpCode[index] = '';
                this.props.handleChange && this.props.handleChange(otpCode.join(''));
                this.setState({ otpCode });
                if (index > this.minIndex && index <= this.maxIndex) {
                    this._focusInput(index - 1);
                }
            }
        };
        this._focusInput = index => {
            this.inputs[index].input.focus();
        };
        this._renderInputs = () => {
            const { errorMessage, focusedBorderColor, inputContainerStyles, inputStyles, inputTextErrorColor, numberOfInputs, unFocusedBorderColor, } = this.props;
            const { otpCode } = this.state;
            let inputArray = [];
            for (let index = 0; index < numberOfInputs; index++) {
                inputArray[index] = (<OtpInput containerStyles={inputContainerStyles} error={!!errorMessage} focusedBorderColor={focusedBorderColor} handleBackspace={event => this._handleBackspace(event, index)} inputStyles={inputStyles} key={index} ref={input => (this.inputs[index] = input)} textErrorColor={inputTextErrorColor} unFocusedBorderColor={unFocusedBorderColor} updateText={text => this._updateText(text, index)} value={otpCode[index]}/>);
            }
            return inputArray.map(input => input);
        };
    }
    componentDidMount() {
        this._renderInputs();
    }
    render() {
        const { containerStyles, errorMessage, errorMessageContainerStyles, errorMessageTextStyles, } = this.props;
        return (<View style={[defaultStyles.container, containerStyles]}>
        {errorMessage && (<View style={[defaultStyles.errorMessageContainer, errorMessageContainerStyles]}>
            <Text testID="errorText" style={errorMessageTextStyles}>
              {errorMessage}
            </Text>
          </View>)}
        <View style={defaultStyles.inputsContainer}>{this._renderInputs()}</View>
      </View>);
    }
}
OtpInputs.defaultProps = {
    handleChange: console.log,
    focusedBorderColor: '#0000ff',
    unFocusedBorderColor: 'transparent',
    inputTextErrorColor: '#ff0000',
    numberOfInputs: 4,
};
const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        marginVertical: 20,
    },
    errorMessageContainer: {
        marginHorizontal: 25,
    },
});
//# sourceMappingURL=index.js.map