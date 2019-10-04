import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  otpContainer: {
    borderBottomWidth: 1,
    height: 53,
    margin: 10,
  },
  otpInput: {
    fontSize: 24,
    paddingTop: 10,
    textAlign: 'center',
    width: 40,
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
