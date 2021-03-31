# Changelog

## v7.0.0 (31/03/2021)

`@react-native-community/clipboard` has been changed to `@react-native-clipboard/clipboard`.

Now installation process should be:

```bash
$ yarn add react-native-otp-inputs @react-native-clipboard/clipboard
```

### BREAKING CHANGE

## v6.0.0 (04/07/2020)

### BREAKING CHANGE

- `Clipboard` has been extracted from `react-native` core as part of [Lean Core](https://github.com/facebook/react-native/issues/23313). Now this module uses [Clipboard](https://github.com/react-native-clipboard/clipboard). Additional steps needed are:

```bash
$ yarn add @react-native-community/clipboard
$ npx pod-install
```

For android, the package will be linked automatically on build.

<details>
  <summary>For React Native version 0.59 or older</summary>

### React Native <= 0.59

run the following command to link the package:

```
$ react-native link @react-native-community/clipboard
```

For iOS, make sure you install the pod file.

```
cd ios && pod install && cd ..
```

or you could follow the instructions to [manually link the project](https://reactnative.dev/docs/linking-libraries-ios#manual-linking)
