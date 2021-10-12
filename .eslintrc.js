module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },

  settings: {
    react: {
      version: 'detect',
    },
    'import/core-modules': ['react-native-otp-inputs'],
  },

  plugins: ['simple-import-sort'],
  extends: ['satya164', 'plugin:react-native/all'],

  rules: {
    'babel/no-unused-expressions': 'off',

    'import/extensions': 'off',
    'import/named': 'off',
    'import/no-unresolved': 'error',
    'jest/consistent-test-it': ['error', { fn: 'test' }],
    'jest/no-truthy-falsy': 'off',
    'jest/expect-expect': ['error', { assertFunctionNames: ['expect', 'element'] }],

    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages.
          ['^@?\\w'],
          ['^../'],
          ['^./'],
        ],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        bracketSameLine: false,
        printWidth: 100,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
      },
    ],

    'react/jsx-sort-props': ['error', { shorthandFirst: true }],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-native/no-raw-text': 'off',
    'react-native/no-color-literals': 'off',
    'react/no-unused-prop-types': 'off',

    '@typescript-eslint/array-type': ['error', { default: 'generic', readonly: 'generic' }],
  },
  globals: {
    __DEV__: true,
    jasmine: true,
  },
};
