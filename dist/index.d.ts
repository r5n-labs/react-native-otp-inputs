import { ReactElement, Component, ReactNode } from 'react';
import OtpInput from './OtpInput';
interface Props {
    autoCapitalize: 'none' | 'sentences' | 'words' | 'characters';
    clearTextOnFocus: boolean;
    containerStyles?: any;
    errorMessage?: string;
    errorMessageContainerStyles?: any;
    errorMessageTextStyles?: any;
    focusedBorderColor: string;
    handleChange: (otpCode: string) => void;
    inputContainerStyles?: any;
    inputStyles?: any;
    inputTextErrorColor?: string;
    inputsContainerStyles?: any;
    keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    numberOfInputs: number;
    secureTextEntry: boolean;
    selectTextOnFocus: boolean;
    unFocusedBorderColor?: string;
}
interface State {
    inputsArray: Array<ReactElement<OtpInput>>;
    loading: boolean;
    otpCode: Array<string>;
}
export default class OtpInputs extends Component<Props, State> {
    static defaultProps: {
        autoCapitalize: string;
        clearTextOnFocus: boolean;
        focusedBorderColor: string;
        handleChange: {
            (message?: any, ...optionalParams: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
        inputTextErrorColor: string;
        keyboardType: string;
        numberOfInputs: number;
        secureTextEntry: boolean;
        selectTextOnFocus: boolean;
        unFocusedBorderColor: string;
    };
    state: {
        inputsArray: any[];
        loading: boolean;
        otpCode: any[];
    };
    inputs: any[];
    componentDidMount(): void;
    _handleAfterOtpAction: (otpCode: string[], indexToFocus: number) => void;
    private _updateText;
    private _handleBackspace;
    private _focusInput;
    private _renderInputs;
    render(): ReactNode;
}
export {};
