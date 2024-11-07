import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-pagination page="1" pages="3" />');

    const element = await page.find('va-pagination');

    expect(element).toEqualHtml(`
      <va-pagination page="1" pages="3" class="hydrated">
        <mock:shadow-root>
          <nav aria-label="Pagination" class="usa-pagination">
            <ul class="usa-pagination__list">
              <li class="usa-pagination__item usa-pagination__page-no va-pagination__item">
                <a aria-current="page" aria-label="page 1, first page" href="javascript:void(0)" class="usa-pagination__button usa-current">1</a>
              </li>
              <li class="usa-pagination__item usa-pagination__page-no va-pagination__item">
                <a aria-label="page 2" href="javascript:void(0)" class="usa-pagination__button">2</a>
              </li>
              <li class="usa-pagination__item usa-pagination__page-no va-pagination__item">
                <a aria-label="page 3, last page" href="javascript:void(0)" class="usa-pagination__button">3</a>
              </li>
              <li class="usa-pagination__item usa-pagination__arrow">
                <a aria-label="Next page" href="javascript:void(0)" class="usa-pagination__link usa-pagination__next-page">
                  <span class="usa-pagination__link-text">next</span>
                  <div id="next-arrow-icon">
                    <svg class="usa-icon" aria-hidden="true" role="img">
                      <use href="/img/sprite.svg#navigate_next"></use>
                    </svg>
                  </div>
                </a>
              </li>
            </ul>
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

  it('only selected "page" has selected class', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-pagination page="1" pages="24" max-page-list-length="7"/>`,
    );
    const firstPage = await page.findAll(
      'va-pagination >>> li.usa-pagination__page-no a.usa-pagination__button.usa-current',
    );
    expect(firstPage.length).toEqual(1);
    expect(firstPage[0].innerHTML).toEqual('1');
  });

  it('renders first and last page with ellipses when middle pages do not contain them', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-pagination page="10" pages="24" max-page-list-length="7"/>`,
    );
    const ellipses = await page.findAll(
      'va-pagination >>> li.usa-pagination__overflow',
    );
    expect(ellipses).toHaveLength(2);

    const pageNumbers = await page.findAll(
      'va-pagination >>> li.usa-pagination__page-no a.usa-pagination__button',
    );
    expect(pageNumbers[0].innerHTML).toEqual('1');
    expect(pageNumbers[pageNumbers.length - 1].innerHTML).toEqual('24');
  });

  it('does not render a "Next" button when on last page', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-pagination page="24" pages="24" max-page-list-length="7"/>`,
    );
    const next = await page.find(
      'va-pagination >>> a.usa-pagination__next-page',
    );
    expect(next).toBeNull();
  });

  it('does not show last page number if unbounded flag is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-pagination page="1" pages="24" max-page-list-length="7" unbounded/>`,
    );
    const pageNumbers = await page.findAll(
      'va-pagination >>> li.usa-pagination__page-no a.usa-pagination__button',
    );
    expect(pageNumbers[pageNumbers.length - 1].innerHTML).toEqual('6');
  });

  it('renders all page numbers if total pages is less than or equal to 7', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-pagination page="3" pages="7" max-page-list-length="7"/>`,
    );

    const pageNumbers = [1, 2, 3, 4, 5, 6, 7];

    const anchors = await page.findAll(
      'va-pagination >>> a.usa-pagination__button',
    );
    for (const number of pageNumbers) {
      expect(anchors[number - 1].innerHTML).toEqual(number.toString());
    }
  });

  it('renders an extra pagination item when the max-page-list-length is 6 and the page is 4', async () => {
    // this is an edge case where even though it is set to 6 items, 7 items is the minimum needed to display everything needed
    // [first page] [second page] [third/previous page] [fourth/current page] [fifth/next page] [ellipsis] [last page]
    const page = await newE2EPage();
    await page.setContent(
      `<va-pagination page="4" pages="24" max-page-list-length="6"/>`,
    );
    const paginationItems = await page.findAll(
      'va-pagination >>> li.usa-pagination__item',
    );

    // should be 9, the 6 page items, one ellipsis and 2 prev/next buttons
    expect(paginationItems).toHaveLength(9);
  });

  it('renders an does not render an extra pagination item when the max-page-list-length is 6', async () => {
    // a check to make sure the above edge case doesn't
    const page = await newE2EPage();
    await page.setContent(
      `<va-pagination page="3" pages="24" max-page-list-length="6"/>`,
    );
    const paginationItems = await page.findAll(
      'va-pagination >>> li.usa-pagination__item',
    );
    // should be 8, 6 as set by the max-page-list-length, and 2 prev/next buttons
    expect(paginationItems).toHaveLength(8);
  });
});
