import { newSpecPage } from '@stencil/core/testing';
import { VaHeaderMinimal } from '../va-header-minimal';

describe('va-header-minimal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VaHeaderMinimal],
      html: `<va-header-minimal header='Header'></va-header-minimal>`,
    });
    expect(page.root).toEqualHtml(`
      <va-header-minimal header='Header' role="banner">
        <mock:shadow-root>
          <va-official-gov-banner></va-official-gov-banner>
          <va-crisis-line-modal></va-crisis-line-modal>
          <div class="va-header">
            <a title="Go to VA.gov" class="va-logo-link" href="/">
              <img alt="VA logo and Seal, U.S. Department of Veterans Affairs" class="va-logo" src="[object Object]">
            </a>
            <div class="header-container">
              <h1>Header</h1>
            </div>
          </div>
        </mock:shadow-root>
      </va-header-minimal>
    `);
  });

  it('renders with a subheader', async () => {
    const page = await newSpecPage({
      components: [VaHeaderMinimal],
      html: `<va-header-minimal header='Header' subheader='Subheader'></va-header-minimal>`,
    });
    expect(page.root).toEqualHtml(`
      <va-header-minimal header='Header' role="banner" subheader='Subheader'>
        <mock:shadow-root>
          <va-official-gov-banner></va-official-gov-banner>
          <va-crisis-line-modal></va-crisis-line-modal>
          <div class="va-header">
            <a title="Go to VA.gov" class="va-logo-link" href="/">
              <img alt="VA logo and Seal, U.S. Department of Veterans Affairs" class="va-logo" src="[object Object]">
            </a>
            <div class="header-container">
              <h1>Header</h1>
              <h2>Subheader</h2>
            </div>
          </div>
        </mock:shadow-root>
      </va-header-minimal>
    `);
  });
});
