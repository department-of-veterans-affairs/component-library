'use strict';

const { RuleTester } = require('eslint');
const rule = require('../require-guidance-href');

const ruleTester = new RuleTester({
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
  },
});

const COMPONENT_FILENAME = 'src/components/va-button/va-button.tsx';

ruleTester.run('require-guidance-href', rule, {
  valid: [
    // Has @Component decorator and @guidanceHref in the JSDoc comment
    {
      filename: COMPONENT_FILENAME,
      code: `
        /**
         * @componentName Button
         * @maturityCategory use
         * @maturityLevel deployed
         * @guidanceHref button
         */
        @Component({ tag: 'va-button', styleUrl: 'va-button.scss', shadow: true })
        class VaButton {}
      `,
    },
    // File is not inside a /components/ directory — rule does not apply
    {
      filename: 'src/utils/helpers.tsx',
      code: `
        @Component({ tag: 'va-button' })
        class VaButton {}
      `,
    },
    // File matches a known sub-component pattern — rule skips it
    {
      filename: 'src/components/va-accordion/va-accordion-item/va-accordion-item.tsx',
      code: `
        @Component({ tag: 'va-accordion-item' })
        class VaAccordionItem {}
      `,
    },
    // Class has no @Component decorator — not a Stencil component, rule does not apply
    {
      filename: COMPONENT_FILENAME,
      code: `
        class VaButton {}
      `,
    },
  ],

  invalid: [
    // Has @Component decorator but no JSDoc comment at all — error points at @Component
    {
      filename: COMPONENT_FILENAME,
      code: `
        @Component({ tag: 'va-button', styleUrl: 'va-button.scss', shadow: true })
        class VaButton {}
      `,
      errors: [{ messageId: 'missing', line: 2 }],
    },
    // Has @Component decorator and JSDoc but @guidanceHref is missing — error points at @maturityLevel
    {
      filename: COMPONENT_FILENAME,
      code: `
        /**
         * @componentName Button
         * @maturityCategory use
         * @maturityLevel deployed
         */
        @Component({ tag: 'va-button', styleUrl: 'va-button.scss', shadow: true })
        class VaButton {}
      `,
      errors: [{ messageId: 'missing', line: 5 }],
    },
  ],
});

console.log('All require-guidance-href tests passed.');
