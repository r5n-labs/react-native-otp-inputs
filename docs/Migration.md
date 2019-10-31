# Migrations

## v3 to v4

### Breaking:

- Minimal React-Native version is now 0.59.0
- Package now use [react-native-keyevent](https://github.com/kevinejohn/react-native-keyevent) for android. Check additional steps [here](https://github.com/dsznajder/react-native-otp-inputs#android-additional-steps).

### Renamed Props:

- `containerStyles` -> `style`
- `focusedBorderColor` -> `focusedStyles.borderColor`
- `unfocusedBorderColor` -> `focusedStyles.borderColor`

### Removed:

- `errorMessage`
- `errorMessageContainerStyles`
- `errorMessageTextStyles`
- `inputTextErrorColor`
- `inputsContainerStyles`
