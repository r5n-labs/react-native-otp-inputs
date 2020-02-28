jest.mock('react-native/Libraries/Components/Clipboard/Clipboard', () => ({
  getString: jest.fn(
    () =>
      new Promise(resolve => {
        resolve();
      }),
  ),
  setString: jest.fn(),
}));
