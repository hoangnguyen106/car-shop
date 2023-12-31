module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-no-target-blank': 0,
    'react/jsx-uses-vars': 2,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 'off',
    'jsx-a11y/label-has-associated-control': 0,
    'linebreak-style': 0,
    'no-underscore-dangle': 'off',
    'arrow-body-style': 'off',
    'import/prefer-default-export': 'off',
    quotes: 'off',
  },
};
