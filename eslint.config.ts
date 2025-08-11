import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        languageOptions: { globals: globals.browser },
    },
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
    },

    /* ESLint and Prettier Configuration */
    eslintConfigPrettier,
    {
        rules: {
            'vue/multi-word-component-names': 'off',
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
    },

    /* ESLint and Prettier Configuration */
    eslintConfigPrettier,
    {
        rules: {
            'vue/multi-word-component-names': 'off',
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },
);
