import { newSpecPage } from '@stencil/core/testing';
import { VaMinimalHeader } from '../va-minimal-header';

describe('va-minimal-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VaMinimalHeader],
      html: `<va-minimal-header></va-minimal-header>`,
    });
    expect(page.root).toEqualHtml(`
      <va-minimal-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </va-minimal-header>
    `);
  });
});
