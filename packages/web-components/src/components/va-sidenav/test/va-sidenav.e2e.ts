import { newE2EPage } from '@stencil/core/testing';

describe('va-sidenav', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-sidenav></va-sidenav>');

    const element = await page.find('va-sidenav');
    expect(element).toHaveClass('hydrated');
  });
});
