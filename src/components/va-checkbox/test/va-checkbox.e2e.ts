import { newE2EPage } from '@stencil/core/testing';

describe('va-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox></va-checkbox>');

    const element = await page.find('va-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
