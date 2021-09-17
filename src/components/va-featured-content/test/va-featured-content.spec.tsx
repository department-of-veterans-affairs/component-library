import { newSpecPage } from '@stencil/core/testing';
import { VaFeaturedContent } from '../va-featured-content';

describe('va-featured-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VaFeaturedContent],
      html: `<va-featured-content></va-featured-content>`,
    });
    expect(page.root).toEqualHtml(`
      <va-featured-content>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </va-featured-content>
    `);
  });
});
