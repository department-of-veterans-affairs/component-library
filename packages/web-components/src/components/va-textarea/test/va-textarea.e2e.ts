import { newE2EPage } from '@stencil/core/testing';

describe('va-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea></va-textarea>');

    const element = await page.find('va-textarea');
    expect(element).toHaveClass('hydrated');
  });
});
