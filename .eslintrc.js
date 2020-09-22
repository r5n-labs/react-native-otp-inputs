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
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  extends: ['satya164', 'plugin:react-native/all'],

  rules: {
    'babel/no-unused-expressions': 'off',
    'import/extensions': 'off',
    'import/named': 'off',
    'jest/consistent-test-it': ['error', { fn: 'test' }],
    'jest/no-truthy-falsy': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/no-unused-prop-types': 'off',

    'import/no-unresolved': [
      'error',
      {
        caseSensitive: false,
        ignore: ['^(~|jest)/'],
      },
    ],

    'jest/expect-expect': [
      'error',
      { assertFunctionNames: ['expect', 'element'] },
    ],

    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        jsxBracketSameLine: false,
        parser: 'typescript',
        printWidth: 80,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
      },
    ],

    '@typescript-eslint/array-type': [
      'error',
      { default: 'generic', readonly: 'generic' },
    ],

    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        groups: [
          'internal',
          'external',
          'unknown',
          'index',
          'sibling',
          'parent',
          'builtin',
        ],
        alphabetize: { order: 'ignore' },
      },
    ],
  },
  globals: {
    __DEV__: true,
    jasmine: true,
  },
};
