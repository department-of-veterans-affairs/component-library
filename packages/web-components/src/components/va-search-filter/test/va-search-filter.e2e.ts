import { newE2EPage } from '@stencil/core/testing';

describe('va-search-filter', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-filter></va-search-filter>');

    const element = await page.find('va-search-filter');
    expect(element).toHaveClass('hydrated');
  });
});
