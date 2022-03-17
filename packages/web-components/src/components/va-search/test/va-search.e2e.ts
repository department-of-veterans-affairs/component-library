import { newE2EPage } from '@stencil/core/testing';

describe('va-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const element = await page.find('va-search');
    expect(element).toHaveClass('hydrated');
  });
});
