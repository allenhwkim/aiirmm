import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      'react/prop-types': 0,
      'indent': [
        'error',
        2, // 2-space indentation
        {
          SwitchCase: 1,
          flatTernaryExpressions: true
        }
      ],
      'linebreak-style': 1,
      'max-lines': ['error', 200],
      'no-trailing-spaces': 'error',
      'quotes': ['error', 'single'],
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-unused-vars': 0,
    }
  }
);
