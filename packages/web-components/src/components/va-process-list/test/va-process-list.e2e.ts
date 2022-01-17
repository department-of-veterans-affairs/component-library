import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-process-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-process-list></va-process-list>');

    const element = await page.find('va-process-list');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-process-list>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
        </va-process-list>
      `);

    await axeCheck(page);
  });
});
