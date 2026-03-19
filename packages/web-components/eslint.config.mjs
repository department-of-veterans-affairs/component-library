import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import i18nextPlugin from 'eslint-plugin-i18next';
import requireGuidanceHref from './eslint-rules/require-guidance-href.js';

const localPlugin = {
  rules: {
    'require-guidance-href': requireGuidanceHref,
  },
};

export default [
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        HTMLElement: 'readonly',
        Element: 'readonly',
        Node: 'readonly',
        NodeList: 'readonly',
        Event: 'readonly',
        CustomEvent: 'readonly',
        MouseEvent: 'readonly',
        KeyboardEvent: 'readonly',
        FocusEvent: 'readonly',
        InputEvent: 'readonly',
        SubmitEvent: 'readonly',
        MutationObserver: 'readonly',
        IntersectionObserver: 'readonly',
        ResizeObserver: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        FormData: 'readonly',
        Blob: 'readonly',
        File: 'readonly',
        FileReader: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        history: 'readonly',
        screen: 'readonly',
        performance: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      i18next: i18nextPlugin,
      local: localPlugin,
    },
    rules: {
      'local/require-guidance-href': 'error',
      'i18next/no-literal-string': [
        1,
        {
          mode: 'all',
          'jsx-attributes': { include: ['aria-label', 'text', 'label'] },
          'object-properties': {
            exclude: ['tag', 'styleUrl', 'componentName', 'eventName', 'action'],
          },
          words: {
            exclude: [
              '',
              ' ',
              '\\d',
              '-\\d',
              'tabindex.*',
              'vads.*',
              'aria-.*',
              'true',
              'false',
              'checked',
            ],
          },
          callees: {
            exclude: [
              'i18next.*',
              'Listen',
              'consoleDevError',
              'querySelector.*',
              'InputEvent',
              'Watch',
              'createElement',
              'removeAttribute',
              'getAttribute',
              'getElement.*',
              'NumberFormat',
              'CustomEvent',
              'SubmitEvent',
              'addEventListener',
              'getSlottedNodes',
              'add',
              'remove',
              'contains',
              'split',
              'classnames',
            ],
          },
          'should-validate-template': true,
          ignoreAttribute: ['aria-label', 'text', 'label'],
        },
      ],
    },
  },
  {
    files: [
      '**/*.spec.tsx',
      '**/*.spec.ts',
      'src/testing/**/*',
      '**/*.e2e.ts',
    ],
    rules: {
      'i18next/no-literal-string': 0,
    },
  },
];
