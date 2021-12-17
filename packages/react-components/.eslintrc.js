const commonExtends = ['eslint:recommended', 'prettier'];
const commonPlugins = ['react', 'prettier'];

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', ...commonExtends],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    babelOptions: {
      configFile: './config/babel.config.js',
    },
  },
  plugins: ['jsx-a11y', ...commonPlugins],
  rules: {
    'prettier/prettier': ['error'],
  },
  globals: {
    global: 'writable',
  },
  overrides: [
    {
      files: ['scripts/*.js', 'testing/*.js', 'config/*.js', '.eslintrc.js'],
      env: {
        node: true,
        mocha: true,
      },
      extends: ['plugin:node/recommended', ...commonExtends],
      plugins: ['mocha', ...commonPlugins],
    },
    {
      files: [
        'src/components/**/*.unit.spec.jsx',
        'src/helpers/*.unit.spec.js',
      ],
      env: {
        node: true,
        mocha: true,
      },
      extends: [...commonExtends],
      plugins: ['mocha', ...commonPlugins],
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          configFile: './config/babel.config.js',
        },
      },
    },
  ],
};
