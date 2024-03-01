module.exports = {
    // Specifies the ESLint parser
    parser: '@typescript-eslint/parser',
    extends: [
        // Uses the recommended rules from @eslint-plugin-react
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',

        // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    plugins: ['import', 'prettier'],
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
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true,
                },
            },
        ],
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                functions: false,
                classes: true,
                variables: true,
            },
        ],
        '@typescript-eslint/no-var-requires': 'off',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
        'import/newline-after-import': ['error', { count: 1 }],
        'import/named': 'off',
        semi: 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'prettier/prettier': [
            'error',
            {
                printWidth: 120,
                trailingComma: 'es5',
                tabWidth: 4,
                semi: true,
                singleQuote: true,
                jsxSingleQuote: true,
                jsxBracketSameLine: false,
                arrowParens: 'avoid',
                endOfLine: 'auto',
            },
        ],
    },
    settings: {
        react: {
            // Tells eslint-plugin-react to automatically detect the version of React to use
            version: 'detect',
        },
    },
};
