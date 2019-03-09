import { ReactElement, Component } from 'react';
import { TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, TextInputChangeEventData } from 'react-native';
interface Props {
    autoCapitalize: 'none' | 'sentences' | 'words' | 'characters';
    clearTextOnFocus: boolean;
    containerStyles?: any;
    error?: boolean;
    focusedBorderColor?: string;
    handleBackspace: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
    inputStyles?: any;
    secureTextEntry: boolean;
    selectTextOnFocus: boolean;
    textErrorColor?: string;
    unFocusedBorderColor: string;
    updateText: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    value?: string;
}
interface State {
    isFocused: boolean;
}
export default class OtpInput extends Component<Props, State> {
    state: {
        isFocused: boolean;
    };
    private _onFocus;
    private _onBlur;
    input: ReactElement<TextInput>;
    render(): JSX.Element;
}
export {};
