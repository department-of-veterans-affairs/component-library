import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-pagination></va-pagination>');

    const element = await page.find('va-pagination');
    expect(element).toEqualHtml(`
      <va-pagination class="hydrated" role="navigation" aria-label="Pagination">
        <mock:shadow-root>
          <ul class="pagination-prev"></ul>
          <ul class="pagination-inner"></ul>
          <ul class="pagination-next"></ul>
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

  it('should show both "Prev" and "Next" if in a middle page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <va-pagination page="3" pages="5" />
    `);

    const element = await page.find('va-pagination');
    expect(element).toEqualHtml(`
      <va-pagination class="hydrated" page="3" pages="5" role="navigation" aria-label="Pagination">
        <mock:shadow-root>
          <ul class="pagination-prev">
          <li>
            <button aria-label="Previous page" class="button-prev" type="button">
              Previous
            </button>
          </li>
          </ul>
          <ul class="pagination-inner">
            <li>
              <button aria-label="Page 1, first page" class="button-inner" type="button">
                1
              </button>
            </li>
            <li>
              <button aria-label="Page 2" class="button-inner" type="button">
                2
              </button>
            </li>
            <li>
              <button aria-current="true" aria-label="Page 3" class="button-active button-inner" type="button">
                3
              </button>
            </li>
            <li>
              <button aria-label="Page 4" class="button-inner" type="button">
                4
              </button>
            </li>
            <li>
              <button aria-label="Page 5, last page" class="button-inner" type="button">
                5
              </button>
            </li>
          </ul>
          <ul class="pagination-next">
            <li>
              <button aria-label="Next page" class="button-next" type="button">
                Next
              </button>
            </li>
          </ul>
        </mock:shadow-root>
      </va-pagination>
    `);
  });

  it('should show prev button but not next button if on the last page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <va-pagination page="5" pages="5" />
    `);

    const prevButton = await page.findAll('va-pagination >>> .button-prev');
    const nextButton = await page.findAll('va-pagination >>> .button-next');
    expect(prevButton.length).toEqual(1);
    expect(nextButton.length).toEqual(0);
  });

  it('should select previous page when prev button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-pagination page="3" pages="50" />
    `);
    const onPageSelectSpy = await page.spyOnEvent('pageSelect');
    const prevButton = await page.find('va-pagination >>> .button-prev');
    await prevButton.click();
    expect(onPageSelectSpy).toHaveReceivedEventDetail({ page: 2 });
  });

  it('should select next page when next button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-pagination page="3" pages="50" />
    `);
    const onPageSelectSpy = await page.spyOnEvent('pageSelect');
    const nextButton = await page.find('va-pagination >>> .button-next');
    await nextButton.click();
    expect(onPageSelectSpy).toHaveReceivedEventDetail({ page: 4 });
  });

  it('should select page 5 when page 5 button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-pagination page="3" pages="50" />
    `);
    const onPageSelectSpy = await page.spyOnEvent('pageSelect');
    const page5Button = await page.find(
      'va-pagination >>> button[aria-label="Page 5"]',
    );
    await page5Button.click();
    expect(onPageSelectSpy).toHaveReceivedEventDetail({ page: 5 });
  });

  it('should focus prev button when pressing tab inside component', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-pagination page="3" pages="50" />
    `);

    const component = await page.find('va-pagination');
    await component.press('Tab');

    const focused = await page.find('va-pagination >>> button:focus');
    expect(focused.textContent).toEqual('Previous');
  });

  it('should tab to prev button and select it using the enter key', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <va-pagination page="3" pages="50" />
    `);
    const onPageSelectSpy = await page.spyOnEvent('pageSelect');
    const component = await page.find('va-pagination');
    await component.press('Tab');
    await component.press('Enter');
    expect(onPageSelectSpy).toHaveReceivedEventDetail({ page: 2 });
  });

  it('should set aria-current to selected page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <va-pagination page="3" pages="50" />
    `);

    const activeButton = await page.find(
      'va-pagination >>> button[aria-current="true"]',
    );

    expect(activeButton.textContent).toEqual('3');
  });

  it('show the last page if enabled and there are more pages than max', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <va-pagination page="3" pages="50" show-last-page />
    `);

    const lastPageButton = await page.find(
      'va-pagination >>> button[aria-label*="Page 50"]',
    );

    expect(lastPageButton.textContent).toEqual('50');
  });

  it('fires an analytics event when a page number is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-pagination page="2" pages="5" />',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const buttonInner = await page.find('va-pagination >>> button.button-inner.button-active');
    await buttonInner.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'linkClick',
      componentName: 'va-pagination',
      details: {
        event: 'nav-paginate-number',
        'page-number': 2,
      },
    });
  });

  it('fires an analytics event the previous button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-pagination page="2" pages="5" />',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const buttonPrev = await page.find('va-pagination >>> button.button-prev');
    await buttonPrev.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'linkClick',
      componentName: 'va-pagination',
      details: {
        event: 'nav-paginate-previous',
        'page-number': 1,
      },
    });
  });

  it('fires an analytics event the next button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-pagination page="2" pages="5" />',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const buttonNext = await page.find('va-pagination >>> button.button-next');
    await buttonNext.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'linkClick',
      componentName: 'va-pagination',
      details: {
        event: 'nav-paginate-next',
        'page-number': 3,
      },
    });
  });

});

describe('uswds - va-pagination', () => {
  it('uswds renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-pagination page="1" pages="3" uswds />');

    const element = await page.find('va-pagination');

    expect(element).toEqualHtml(`
      <va-pagination page="1" pages="3" uswds class="hydrated">
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
              <li class="usa-pagination__item usa-pagination__arrow" aria-label="Next page">
                <a href="javascript:void(0)" class="usa-pagination__link usa-pagination__next-page">
                  <span class="usa-pagination__link-text">next</span>
                  <div id="next-arrow-icon">
                    <svg class="usa-icon" aria-hidden="true" role="img">
                      <use href="/assets/sprite.svg#navigate_next"></use>
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

  it('uswds v3 only selected "page" has selected class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="1" pages="24" max-page-list-length="7" uswds/>`);
    const firstPage = await page.findAll('va-pagination >>> li.usa-pagination__page-no a.usa-pagination__button.usa-current');
    expect(firstPage.length).toEqual(1);
    expect(firstPage[0].innerHTML).toEqual("1");
  });

  it('uswds v3 renders first and last page with ellipses when middle pages do not contain them', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="10" pages="24" max-page-list-length="7" uswds/>`);
    const ellipses = await page.findAll('va-pagination >>> li.usa-pagination__overflow');
    expect(ellipses).toHaveLength(2);

    const pageNumbers = await page.findAll('va-pagination >>> li.usa-pagination__page-no a.usa-pagination__button');
    expect(pageNumbers[0].innerHTML).toEqual("1");
    expect(pageNumbers[pageNumbers.length - 1].innerHTML).toEqual("24");
  });

  it('uswds v3 does not render a "Next" button when on last page', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="24" pages="24" max-page-list-length="7" uswds/>`);
    const next = await page.find('va-pagination >>> a.usa-pagination__next-page');
    expect(next).toBeNull();
  });

  it('uswds v3 does not show last page number if unbounded flag is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="1" pages="24" max-page-list-length="7" unbounded uswds/>`);
    const pageNumbers = await page.findAll('va-pagination >>> li.usa-pagination__page-no a.usa-pagination__button');
    expect(pageNumbers[pageNumbers.length - 1].innerHTML).toEqual("6");
  });

  it('uswds v3 renders all page numbers if total pages is less than or equal to 7', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="3" pages="7" max-page-list-length="7" uswds/>`);

    const pageNumbers = [1, 2, 3, 4, 5, 6, 7];

    const anchors = await page.findAll('va-pagination >>> a.usa-pagination__button');
    for (const number of pageNumbers) {
      expect(anchors[number - 1].innerHTML).toEqual(number.toString());
    }
  });

  it('uswds v3 renders an extra pagination item when the max-page-list-length is 6 and the page is 4', async () => {
    // this is an edge case where even though it is set to 6 items, 7 items is the minimum needed to display everything needed
    // [first page] [second page] [third/previous page] [fourth/current page] [fifth/next page] [ellipsis] [last page]
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="4" pages="24" max-page-list-length="6" uswds/>`);
    const paginationItems = await page.findAll('va-pagination >>> li.usa-pagination__item');

    // should be 9, the 6 page items, one ellipsis and 2 prev/next buttons
    expect(paginationItems).toHaveLength(9);
  });

  it('uswds v3 renders an does not render an extra pagination item when the max-page-list-length is 6', async () => {
    // a check to make sure the above edge case doesn't 
    const page = await newE2EPage();
    await page.setContent(`<va-pagination page="3" pages="24" max-page-list-length="6" uswds/>`);
    const paginationItems = await page.findAll('va-pagination >>> li.usa-pagination__item');
    // should be 8, 6 as set by the max-page-list-length, and 2 prev/next buttons
    expect(paginationItems).toHaveLength(8);
  });
});