import { newSpecPage } from '@stencil/core/testing';
import { VAMinimalFooter } from '../va-minimal-footer';

describe('va-minimal-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VAMinimalFooter],
      html: `<va-minimal-footer />`,
    });
    expect(page.root).toEqualHtml(`
      <va-minimal-footer>
        <mock:shadow-root>
          <div class="va-footer">
            <a href="/">
              <img alt="VA.gov home" class="va-logo" src="[object Object]">
            </a>
          </div>
        </mock:shadow-root>
      </va-minimal-footer>
    `);
  });

});
