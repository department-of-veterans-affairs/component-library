import { newE2EPage } from '@stencil/core/testing';

import { axeCheck } from '../../testing/test-helpers';

describe('va-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-pagination></va-pagination>');
    const element = await page.find('va-pagination');
    expect(element).toEqualHtml(`
      <va-pagination page="1" class="sc-va-pagination-h sc-va-pagination-s hydrated">
        <nav aria-label="pagination" class="sc-va-pagination">
          <ul class="sc-va-pagination">
            <li aria-hidden="true" class="sc-va-pagination">
              <span class="prev sc-va-pagination">
                <span class="vads-u-visibility--screen-reader sc-va-pagination">Previous</span>
                <span aria-hidden="true" class="sc-va-pagination">
                  ‹&nbsp;&nbsp;<span class="hide-narrow sc-va-pagination">Prev</span>
                </span>
              </span>
            </li>
            <li class="va-pagination-current sc-va-pagination">
              <a href="#" class="va-pagination-link va-pagination-active sc-va-pagination" data-page="1" aria-label="Load page 1" aria-current="page">
                1
              </a>
            </li>
            <li aria-hidden="true" class="sc-va-pagination">
              <span class="next sc-va-pagination">
                <span class="hide-narrow sc-va-pagination">Next</span>&nbsp;&nbsp;›
              </span>
            </li>
          </ul>
        </nav>
      </va-pagination>
    `);
  });
  it('passes an axe check', async () => {
    const page = await newE2EPage();
  
    await page.setContent('<va-pagination page="3" total="10"></va-pagination>');
    await axeCheck(page);
  });
});
