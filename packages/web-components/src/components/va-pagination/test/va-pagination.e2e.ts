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
                <a aria-current="page" aria-label="1 of 3 pages, first page" href="javascript:void(0)" class="usa-pagination__button usa-current">1</a>
              </li>
              <li class="usa-pagination__item usa-pagination__page-no va-pagination__item">
                <a aria-label="2 of 3 pages" href="javascript:void(0)" class="usa-pagination__button">2</a>
              </li>
              <li class="usa-pagination__item usa-pagination__page-no va-pagination__item">
                <a aria-label="3 of 3 pages, last page" href="javascript:void(0)" class="usa-pagination__button">3</a >
              </li>
              <li class="usa-pagination__item usa-pagination__arrow">
                <a aria-label="Next page" href="javascript:void(0)" class="usa-pagination__link usa-pagination__next-page">
                  <span class="usa-pagination__link-text">next</span>
                  <va-icon class="hydrated"></va-icon>
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
    await page.setContent(`<va-pagination page="1" pages="24" />`);
    const firstPage = await page.findAll(
      'va-pagination >>> li.usa-pagination__page-no a.usa-pagination__button.usa-current',
    );
    expect(firstPage.length).toEqual(1);
    expect(firstPage[0].innerHTML).toEqual('1');
  });

  it('does not render a "Next" button when on last page', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="24" pages="24" />`);
    const next = await page.find(
      'va-pagination >>> a.usa-pagination__next-page',
    );
    expect(next).toBeNull();
  });

  it('does not render a "Previous" button when on first page', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="1" pages="24" />`);
    const previous = await page.find(
      'va-pagination >>> a.usa-pagination__previous-page',
    );
    expect(previous).toBeNull();
  });

  it('does not show last page number if unbounded flag is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="1" pages="24" unbounded/>`);
    const pageNumbers = await page.findAll(
      'va-pagination >>> li.usa-pagination__page-no a.usa-pagination__button',
    );
    expect(pageNumbers[pageNumbers.length - 1].innerHTML).toEqual('6');
  });

  it('renders all page numbers if total pages is less than or equal to 7', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="3" pages="7" />`);

    const pageNumbers = [1, 2, 3, 4, 5, 6, 7];

    const anchors = await page.findAll(
      'va-pagination >>> a.usa-pagination__button',
    );
    for (const number of pageNumbers) {
      expect(anchors[number - 1].innerHTML).toEqual(number.toString());
    }
  });

  it('renders the next pagination item when the current page is four from the beginning', async () => {
    // Want to make sure [7] is showing when [6] is the current page and total page
    // count is greater than 7.
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="5" pages="24" />`);
    const pageNumbers = await page.findAll(
      'va-pagination >>> li.usa-pagination__page-no a.usa-pagination__button',
    );
    expect(pageNumbers[0].innerHTML).toEqual('1');
    expect(pageNumbers[pageNumbers.length - 2].innerHTML).toEqual('6');
    expect(pageNumbers[pageNumbers.length - 1].innerHTML).toEqual('24');
  });

  it('renders the previous pagination item when the current page is three from the end', async () => {
    // Want to make sure [20] is showing when [21] is the current page and total page
    // count is 24.
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="21" pages="24" />`);
    const pageNumbers = await page.findAll(
      'va-pagination >>> li.usa-pagination__page-no a.usa-pagination__button',
    );
    expect(pageNumbers[0].innerHTML).toEqual('1');
    expect(pageNumbers[1].innerHTML).toEqual('20');
    expect(pageNumbers[pageNumbers.length - 1].innerHTML).toEqual('24');
  });

  it('renders the first, last, and middle pagination items when the current page is in the middle', async () => {
    // Want to make sure [1, ... 14, 15, 16, ... 24] are shown
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="15" pages="24" />`);
    const pageNumbers = await page.findAll(
      'va-pagination >>> li.usa-pagination__page-no a.usa-pagination__button',
    );
    expect(pageNumbers[0].innerHTML).toEqual('1');
    expect(pageNumbers[1].innerHTML).toEqual('14');
    expect(pageNumbers[3].innerHTML).toEqual('16');
    expect(pageNumbers[pageNumbers.length - 1].innerHTML).toEqual('24');
  });

  it('renders the correct number of items when current page is greater than 1 and total pages is more than 7', async () => {
    // a check to make sure the above edge case doesn't
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="3" pages="24" />`);
    const paginationItems = await page.findAll(
      'va-pagination >>> li.usa-pagination__item',
    );
    // should be 9, 7 pagination buttons, and 2 prev/next buttons
    expect(paginationItems).toHaveLength(9);
  });

  it('renders the correct number of links on small screens', async () => {
    const page = await newE2EPage();
    await page.setViewport({
      // iPhone first gen
      width: 320,
      height: 480,
      deviceScaleFactor: 1,
    });
    await page.setContent(`<va-pagination page="1" pages="24" />`);
    const paginationItems = await page.findAll(
      'va-pagination >>> li.usa-pagination__item',
    );
    expect(paginationItems).toHaveLength(8);
  });

  it('renders the correct number of links on tablet screens below 640px width', async () => {
    const page = await newE2EPage();
    await page.setViewport({
      // Storybook small screen mode
      width: 481,
      height: 896,
      deviceScaleFactor: 1,
    });
    await page.setContent(`<va-pagination page="1" pages="24" />`);
    const paginationItems = await page.findAll(
      'va-pagination >>> li.usa-pagination__item',
    );
    expect(paginationItems).toHaveLength(8);
  });

  it('renders one ellipse correctly on small screens', async () => {
    const page = await newE2EPage();
    await page.setViewport({
      // iPhone first gen
      width: 320,
      height: 480,
      deviceScaleFactor: 1,
    });
    await page.setContent(`<va-pagination page="2" pages="24" unbounded/>`);
    const paginationOverflowItems = await page.findAll(
      'va-pagination >>> li.usa-pagination__overflow',
    );
    expect(paginationOverflowItems).toHaveLength(1);
  });

  it('renders two ellipses correctly on small screens', async () => {
    const page = await newE2EPage();
    await page.setViewport({
      // iPhone first gen
      width: 320,
      height: 480,
      deviceScaleFactor: 1,
    });
    await page.setContent(`<va-pagination page="9" pages="24" />`);
    const paginationOverflowItems = await page.findAll(
      'va-pagination >>> li.usa-pagination__overflow',
    );
    expect(paginationOverflowItems).toHaveLength(2);
  });

  it('renders two ellipses correctly on tablet screens below 640px width', async () => {
    const page = await newE2EPage();
    await page.setViewport({
      // Storybook small screen mode
      width: 481,
      height: 896,
      deviceScaleFactor: 1,
    });
    await page.setContent(`<va-pagination page="10" pages="24" />`);
    const paginationOverflowItems = await page.findAll(
      'va-pagination >>> li.usa-pagination__overflow',
    );
    expect(paginationOverflowItems).toHaveLength(2);
  });

  it('passes an axe check on small screens', async () => {
    const page = await newE2EPage();
    await page.setViewport({
      // iPhone first gen
      width: 320,
      height: 480,
      deviceScaleFactor: 1,
    });
    await page.setContent(`<va-pagination page="1" pages="24" />`);
    await axeCheck(page);
  });
});
