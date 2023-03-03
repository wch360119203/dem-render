module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
    'prettier',
    'plugin:vue/vue3-essential',
    'plugin:vue/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    // project: ['./tsconfig.json'],
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: './',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
  },
}
