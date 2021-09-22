import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-featured-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-featured-content />');

    const element = await page.find('va-featured-content');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-featured-content />');

    await axeCheck(page);
  });
});
