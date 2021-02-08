import { newE2EPage } from '@stencil/core/testing';

describe('va-accordion-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-accordion-item></va-accordion-item>');
    const element = await page.find('va-accordion-item');
    expect(element).toHaveClass('hydrated');
  });
});
