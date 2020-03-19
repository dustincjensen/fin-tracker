module.exports = {
  // Specifies the ESLint parser
  parser: '@typescript-eslint/parser', 
  extends: [
    // Uses the recommended rules from @eslint-plugin-react
    'plugin:react/recommended', 

    // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  plugins: ['import'],
  parserOptions: {
    ecmaFeatures: {
      // Allows for the parsing of JSX
      jsx: true,
    },
  },
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/interface-name-prefix': ['error', { 'prefixWithI': 'always' }],
    '@typescript-eslint/no-use-before-define': ['error', {
      'functions': false,
      'classes': true,
      'variables': true
    }],
    '@typescript-eslint/no-var-requires': 'off',
    "import/order": ["error", {
      'groups': ["builtin", "external", "internal", "parent", "sibling", "index"],
      'alphabetize': { 'order': 'asc', 'caseInsensitive': true }
    }],
    'import/newline-after-import': ['error', { 'count': 1 }],
    'semi': 'error',
  },
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use
      version: 'detect', 
    },
  },
};
