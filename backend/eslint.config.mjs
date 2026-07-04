import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist/', 'node_modules/', 'jest.config.js'] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts'],
        rules: {
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },
    {
        // Express request augmentation requires the global namespace pattern
        files: ['src/types.ts'],
        rules: {
            '@typescript-eslint/no-namespace': 'off',
        },
    }
);
