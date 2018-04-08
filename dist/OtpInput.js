import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
export default class OtpInput extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isFocused: false,
        };
        this._onFocus = () => this.setState({ isFocused: true });
        this._onBlur = () => this.setState({ isFocused: false });
    }
    render() {
        const { containerStyles, error, focusedBorderColor, handleBackspace, inputStyles, textErrorColor, unFocusedBorderColor, updateText, value, } = this.props;
        return (<View style={[
            defaultStyles.container,
            containerStyles,
            { borderColor: this.state.isFocused ? focusedBorderColor : unFocusedBorderColor },
        ]}>
        <TextInput clearTextOnFocus={true} keyboardType="phone-pad" maxLength={1} onBlur={this._onBlur} onChangeText={updateText} onFocus={this._onFocus} onKeyPress={handleBackspace} ref={input => (this.input = input)} selectTextOnFocus={true} style={[defaultStyles.otpInput, inputStyles, error && { color: textErrorColor }]} underlineColorAndroid="transparent" value={value}/>
      </View>);
    }
}
const defaultStyles = StyleSheet.create({
    container: {
        backgroundColor: '#a1a1a1',
        borderRadius: 6,
        borderWidth: 1,
        height: 53,
        margin: 10,
    },
    otpInput: {
        color: '#ffffff',
        fontSize: 24,
        paddingTop: 10,
        textAlign: 'center',
        width: 40,
    },
});
//# sourceMappingURL=OtpInput.js.map