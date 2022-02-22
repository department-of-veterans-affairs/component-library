import { newE2EPage } from '@stencil/core/testing';

describe('va-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-modal></va-modal>');

    const element = await page.find('va-modal');
    expect(element).toHaveClass('hydrated');
  });
});
