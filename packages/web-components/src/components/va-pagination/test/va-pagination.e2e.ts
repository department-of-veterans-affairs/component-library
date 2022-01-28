import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-pagination></va-pagination>');

    const element = await page.find('va-pagination');
    expect(element).toEqualHtml(`
      <va-pagination class="hydrated">
        <mock:shadow-root>
          <nav>
            <ul class="pagination-prev"></ul>
            <ul class="pagination-inner"></ul>
            <ul class="pagination-next"></ul>
          </nav>
        </mock:shadow-root>
      </va-pagination>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-pagination page="3" pages="50">
      </va-pagination>
    `);

    await axeCheck(page);
  });
});
