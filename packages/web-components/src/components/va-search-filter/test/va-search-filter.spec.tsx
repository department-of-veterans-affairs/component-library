import { newSpecPage } from '@stencil/core/testing';
import { VaSearchFilter } from '../va-search-filter';

describe('va-search-filter', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VaSearchFilter],
      html: `<va-search-filter></va-search-filter>`,
    });
    expect(page.root).toEqualHtml(`
      <va-search-filter>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </va-search-filter>
    `);
  });
});
