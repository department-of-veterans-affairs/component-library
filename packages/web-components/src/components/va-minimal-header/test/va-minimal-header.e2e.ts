import { newE2EPage } from '@stencil/core/testing';

describe('va-minimal-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-minimal-header></va-minimal-header>');

    const element = await page.find('va-minimal-header');
    expect(element).toHaveClass('hydrated');
  });
});
