import { newE2EPage } from '@stencil/core/testing';

describe('va-process-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-process-list></va-process-list>');

    const element = await page.find('va-process-list');
    expect(element).toHaveClass('hydrated');
  });
});
