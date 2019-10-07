module.exports = {
  extends: 'satya164',
  settings: {
    'import/core-modules': ['react-native-otp-inputs'],
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'jest/consistent-test-it': ['error', { fn: 'test' }],
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
};
