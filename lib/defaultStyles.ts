import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  otpContainer: {
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
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 20,
  },
  errorMessageContainer: {
    marginHorizontal: 25,
  },
})
