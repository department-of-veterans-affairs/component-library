import { newE2EPage } from '@stencil/core/testing';

describe('va-minimal-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-minimal-footer></va-minimal-footer>');

    const element = await page.find('va-minimal-footer');
    expect(element).toHaveClass('hydrated');

    expect(element).toEqualHtml(`
      <va-minimal-footer class="hydrated">
      <mock:shadow-root>
        <div class="va-footer">
          <a href="/">
            <img aria-hidden="true" class="va-logo" src="/assets/va-logo-white.png">
          </a>
        </div>
      </mock:shadow-root>
    </va-minimal-header>
    `);
  });
});