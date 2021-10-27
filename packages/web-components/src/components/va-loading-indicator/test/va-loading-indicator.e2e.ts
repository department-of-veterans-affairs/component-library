import { newE2EPage } from '@stencil/core/testing';

describe('va-loading-indicator', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-loading-indicator></va-loading-indicator>');

    const element = await page.find('va-loading-indicator');
    expect(element).toHaveClass('hydrated');
  });
});
