const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce((acc, rule) => {
  acc[`jsx-a11y/${rule}`] = 'off';
  return acc;
}, {});

module.exports = {
  plugins: ['react-hooks', 'prettier'],
  extends: ['react-app', 'airbnb', 'prettier'],
  ignorePatterns: ['config', 'scripts'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
    },
  },
  rules: {
    ...a11yOff,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        tabWidth: 2,
      },
    ],
    camelcase: 'off',
    'react/jsx-filename-extension': 'off',
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/forbid-prop-types': 'off',
    'no-nested-ternary': 'off',
    'import/no-unresolved': 'off',
    'no-throw-literal': 'off',
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/require-default-props': 'off',
    'import/extensions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    // 'react-hooks/exhaustive-deps': 'off',
  },
};
