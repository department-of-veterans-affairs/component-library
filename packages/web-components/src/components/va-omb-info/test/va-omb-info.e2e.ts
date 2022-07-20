import { newE2EPage } from '@stencil/core/testing';

describe('va-omb-info', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-omb-info></va-omb-info>');

    const element = await page.find('va-omb-info');
    expect(element).toHaveClass('hydrated');
  });
});
