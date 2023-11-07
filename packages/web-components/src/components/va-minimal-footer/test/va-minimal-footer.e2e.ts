import { newE2EPage } from '@stencil/core/testing';

describe('va-minimal-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-minimal-footer></va-minimal-footer>');

    const element = await page.find('va-minimal-footer');
    expect(element).toHaveClass('hydrated');
  });
});