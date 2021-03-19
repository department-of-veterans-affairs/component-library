import { newE2EPage } from '@stencil/core/testing';

describe('va-additional-info', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-additional-info></va-additional-info>');

    const element = await page.find('va-additional-info');
    expect(element).toHaveClass('hydrated');
  });
});
