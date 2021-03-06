module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-typescript/base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: './tsconfig.dev.json'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    'max-len': ["error", 
      { 
        "code": 150,
        "ignoreComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      }
    }
  }
};
