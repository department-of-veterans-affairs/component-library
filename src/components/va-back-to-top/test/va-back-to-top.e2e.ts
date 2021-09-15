import { newE2EPage } from '@stencil/core/testing';

describe('va-back-to-top', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-back-to-top></va-back-to-top>');

    const element = await page.find('va-back-to-top');
    expect(element).toHaveClass('hydrated');
  });
});
