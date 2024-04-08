import { newE2EPage } from '@stencil/core/testing';

describe('va-header-minimal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-header-minimal></va-header-minimal>');

    const element = await page.find('va-header-minimal');
    expect(element).toHaveClass('hydrated');
  });
});
