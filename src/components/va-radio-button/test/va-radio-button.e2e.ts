import { newE2EPage } from '@stencil/core/testing';

describe('va-radio-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio-button></va-radio-button>');

    const element = await page.find('va-radio-button');
    expect(element).toHaveClass('hydrated');
  });
});
