import { newE2EPage } from '@stencil/core/testing';

describe('va-official-gov-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-official-gov-banner></va-official-gov-banner>');

    const element = await page.find('va-official-gov-banner');
    expect(element).toHaveClass('hydrated');
  });
});
