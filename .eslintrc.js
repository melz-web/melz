module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'google'
  ],
  rules: {
    'comma-dangle': ['error', 'never'],
    'curly': ['error', 'multi-or-nest'],
    'indent': ['error', 2, { 'MemberExpression': 1, 'SwitchCase': 1 }],
    'max-len': ['error', { 'code': 120 }],
    'object-curly-spacing': ['error', 'always'],
    'require-jsdoc': 'off'
  },
  overrides: [
    {
      files: './src',
      env: {
        browser: true,
        es6: true,
        es2021: false,
        node: false
      }
    }
  ],
  ignorePatterns: [
    '/dist'
  ]
};

