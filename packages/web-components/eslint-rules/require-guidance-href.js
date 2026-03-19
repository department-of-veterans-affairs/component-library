'use strict';

/**
 * ESLint rule: require-guidance-href
 *
 * Every top-level Stencil component (@Component decorator) must declare a
 * @guidanceHref JSDoc tag so downstream tooling can link to the canonical
 * design.va.gov documentation page.
 *
 * Sub-components that intentionally have no standalone page are excluded.
 */

// Sub-components that intentionally have no standalone design.va.gov page.
const SUBCOMPONENT_PATTERNS = [
  'accordion-item',
  'process-list-item',
  'radio-option',
  'sidenav-item',
  'sidenav-submenu',
  'tab-item',
  'tab-panel',
  'table-inner',
  'table-row',
];

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require @guidanceHref JSDoc tag on top-level Stencil components ' +
        'to link to the canonical design.va.gov documentation page.',
    },
    messages: {
      missing:
        'Stencil component is missing a @guidanceHref JSDoc tag. ' +
        'Add "* @guidanceHref <path>" after @maturityLevel to link to ' +
        'https://design.va.gov/components/<path>.',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename();

    // Only applies inside the components directory.
    if (!filename.includes('/components/')) return {};

    // Skip known sub-components.
    if (SUBCOMPONENT_PATTERNS.some(p => filename.includes(p))) return {};

    return {
      ClassDeclaration(node) {
        // Must have a @Component({...}) decorator — this is a Stencil component.
        // Detect via tokens rather than node.decorators: @typescript-eslint/parser 5.x +
        // TypeScript 5 no longer exposes decorators on node.decorators in the ESTree output.
        const sourceCode = context.getSourceCode();
        const firstTokens = sourceCode.getFirstTokens(node, { count: 3 });
        const hasComponentDecorator =
          firstTokens.length >= 2 &&
          firstTokens[0].value === '@' &&
          firstTokens[1].value === 'Component';
        if (!hasComponentDecorator) return;

        const nodeStart = node.range[0];

        // Find the last block comment before this class (decorators are included
        // in the class node range, so nodeStart is the start of @Component).
        const blockComments = sourceCode
          .getAllComments()
          .filter(c => c.type === 'Block' && c.range[1] <= nodeStart);

        if (blockComments.length === 0) {
          context.report({ node, messageId: 'missing' });
          return;
        }

        const closestComment = blockComments[blockComments.length - 1];
        if (!closestComment.value.includes('@guidanceHref')) {
          context.report({ node, messageId: 'missing' });
        }
      },
    };
  },
};
