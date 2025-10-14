import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-tag text="Test tag"></va-tag>');

    const element = await page.find('va-tag');
    expect(element).toHaveClass('hydrated');
  });

  it('passes accessibility tests', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-tag></va-tag>');

    await axeCheck(page);
  });

  it('respect the text prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-tag text="Test tag"></va-tag>');

    const element = await page.find('va-tag');
    expect(element.shadowRoot.querySelector('span').innerHTML).toBe('Test tag');
  });
});
