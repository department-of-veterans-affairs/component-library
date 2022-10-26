import { newE2EPage } from '@stencil/core/testing';

describe('va-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-icon></va-icon>');

    const element = await page.find('va-icon');
    expect(element).toHaveClass('hydrated');
  });
});
