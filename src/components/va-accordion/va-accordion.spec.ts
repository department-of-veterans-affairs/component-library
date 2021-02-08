import { newSpecPage } from '@stencil/core/testing';
import { VaAccordion } from './va-accordion';

describe('va-accordion', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [VaAccordion],
      html: '<va-accordion></va-accordion>',
    });
    expect(root).toEqualHtml(`
      <va-accordion>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </va-accordion>
    `);
  });
});
