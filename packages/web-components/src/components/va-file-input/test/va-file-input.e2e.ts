import { newE2EPage } from '@stencil/core/testing';

describe('va-file-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input></va-file-input>');

    const element = await page.find('va-file-input');
    expect(element).toHaveClass('hydrated');
  });
});
