import { newE2EPage } from '@stencil/core/testing';

describe('va-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-select></va-select>');

    const element = await page.find('va-select');
    expect(element).toHaveClass('hydrated');
  });
});
