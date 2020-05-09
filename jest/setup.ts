jest.mock('@react-native-community/clipboard', () => ({
  getString: jest.fn(
    () =>
      new Promise((resolve) => {
        resolve();
      }),
  ),
  setString: jest.fn(),
}));
