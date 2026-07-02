import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
    {
        ignores: ['dist/', 'coverage/', 'node_modules/']
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            '@stylistic/indent': ['error', 4],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single']
        }
    }
);
