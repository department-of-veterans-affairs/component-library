import { newE2EPage } from '@stencil/core/testing';

describe('va-on-this-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-on-this-page></va-on-this-page>');
    const element = await page.find('va-on-this-page');

    expect(element).toEqualHtml(`
      <va-on-this-page class="hydrated">
        <mock:shadow-root>
          <h2>On this page</h2>
          <ul></ul>
        </mock:shadow-root>
      </va-on-this-page>
    `);
  });
});
