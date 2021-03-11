import { newE2EPage } from '@stencil/core/testing';

describe('va-on-this-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-on-this-page></va-on-this-page>');

    const element = await page.find('va-on-this-page');
    expect(element).toHaveClass('hydrated');
  });
});
