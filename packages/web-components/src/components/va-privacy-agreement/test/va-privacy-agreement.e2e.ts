import { newE2EPage } from '@stencil/core/testing';

describe('va-privacy-agreement', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-privacy-agreement></va-privacy-agreement>');

    const element = await page.find('va-privacy-agreement');
    expect(element).toHaveClass('hydrated');
  });
});
