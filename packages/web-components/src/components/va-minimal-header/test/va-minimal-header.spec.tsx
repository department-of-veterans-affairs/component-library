import { newSpecPage } from '@stencil/core/testing';
import { VaMinimalHeader } from '../va-minimal-header';

describe('va-minimal-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VaMinimalHeader],
      html: `<va-minimal-header header='Header'></va-minimal-header>`,
    });
    expect(page.root).toEqualHtml(`
      <va-minimal-header header='Header' role="banner">
        <mock:shadow-root>
          <va-official-gov-banner></va-official-gov-banner>
          <va-crisis-line-modal></va-crisis-line-modal>
          <div class="va-header">
            <a aria-label="Link to Homepage" class="va-logo-link" href="/">
              <img aria-hidden="true" class="va-logo" src="[object Object]">
            </a>
            <div class="header-container">
              <h1>Header</h1>
            </div>
          </div>
        </mock:shadow-root>
      </va-minimal-header>
    `);
  });

  it('renders with a subheader', async () => {
    const page = await newSpecPage({
      components: [VaMinimalHeader],
      html: `<va-minimal-header header='Header' subheader='Subheader'></va-minimal-header>`,
    });
    expect(page.root).toEqualHtml(`
      <va-minimal-header header='Header' role="banner" subheader='Subheader'>
        <mock:shadow-root>
          <va-official-gov-banner></va-official-gov-banner>
          <va-crisis-line-modal></va-crisis-line-modal>
          <div class="va-header">
            <a aria-label="Link to Homepage" class="va-logo-link" href="/">
              <img aria-hidden="true" class="va-logo" src="[object Object]">
            </a>
            <div class="header-container">
              <h1>Header</h1>
              <h2>Subheader</h2>
            </div>
          </div>
        </mock:shadow-root>
      </va-minimal-header>
    `);
  });
});
