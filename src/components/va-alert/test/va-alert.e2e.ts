import { newE2EPage } from '@stencil/core/testing';

describe('va-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert></va-alert>');

    const element = await page.find('va-alert');
    expect(element).toHaveClass('hydrated');
  });
});
