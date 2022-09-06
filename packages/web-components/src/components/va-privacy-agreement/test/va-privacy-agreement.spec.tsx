import { newSpecPage } from '@stencil/core/testing';
import { VaPrivacyAgreement } from '../va-privacy-agreement';

describe('va-privacy-agreement', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VaPrivacyAgreement],
      html: `<va-privacy-agreement></va-privacy-agreement>`,
    });
    expect(page.root).toEqualHtml(`
      <va-privacy-agreement>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </va-privacy-agreement>
    `);
  });
});
