import { newE2EPage } from '@stencil/core/testing';

describe('va-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-footer></va-footer>');

    const element = await page.find('va-footer');
    expect(element).toHaveClass('hydrated');
  });
});
