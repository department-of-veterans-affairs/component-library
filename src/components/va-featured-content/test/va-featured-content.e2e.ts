import { newE2EPage } from '@stencil/core/testing';

describe('va-featured-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-featured-content></va-featured-content>');

    const element = await page.find('va-featured-content');
    expect(element).toHaveClass('hydrated');
  });
});
