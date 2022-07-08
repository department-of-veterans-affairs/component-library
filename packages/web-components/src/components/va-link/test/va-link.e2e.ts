import { newE2EPage } from '@stencil/core/testing';

describe('va-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-link></va-link>');

    const element = await page.find('va-link');
    expect(element).toHaveClass('hydrated');
  });
});
