jest.mock('@react-native-clipboard/clipboard', () => ({
  getString: jest.fn(
    () =>
      new Promise((resolve) => {
        resolve();
      }),
  ),
  setString: jest.fn(),
}));
