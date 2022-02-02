import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-pagination></va-pagination>');

    const element = await page.find('va-pagination');
    expect(element).toEqualHtml(`
      <va-pagination class="hydrated" role="navigation">
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
      <va-pagination class="hydrated" page="3" pages="5" role="navigation">
        <mock:shadow-root>
          <ul class="pagination-prev">
          <li>
            <button aria-label="Previous page " class="button-prev" type="button">
              Prev
            </button>
          </li>
          </ul>
          <ul class="pagination-inner">
            <li>
              <button aria-label="Page 1 " class="button-inner" type="button">
                1
              </button>
            </li>
            <li>
              <button aria-label="Page 2 " class="button-inner" type="button">
                2
              </button>
            </li>
            <li>
              <button aria-current="true" aria-label="Page 3 " class="button-active button-inner" type="button">
                3
              </button>
            </li>
            <li>
              <button aria-label="Page 4 " class="button-inner" type="button">
                4
              </button>
            </li>
            <li>
              <button aria-label="Page 5 " class="button-inner" type="button">
                5
              </button>
            </li>
          </ul>
          <ul class="pagination-next">
            <li>
              <button aria-label="Next page " class="button-next" type="button">
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
    const mockSelectPage = jest.fn();
    const page = await newE2EPage();
    await page.setContent(`
      <va-pagination page="3" pages="50" />
    `);
    await page.exposeFunction('mockFunction', mockSelectPage);
    await page.$eval('va-pagination', (elm: any) => {
      elm.pageSelect = this.mockFunction;
    });
    await page.waitForChanges();

    const prevButton = await page.find('va-pagination >>> .button-prev');
    await prevButton.click();
    expect(mockSelectPage.mock.calls.length).toEqual(1);
    expect(mockSelectPage.mock.calls[0][0]).toBe(2);
  });

  it('should select next page when next button is clicked', async () => {
    const mockSelectPage = jest.fn();
    const page = await newE2EPage();
    await page.setContent(`
      <va-pagination page="3" pages="50" />
    `);
    await page.exposeFunction('mockFunction', mockSelectPage);
    await page.$eval('va-pagination', (elm: any) => {
      elm.pageSelect = this.mockFunction;
    });
    await page.waitForChanges();

    const nextButton = await page.find('va-pagination >>> .button-next');
    await nextButton.click();
    expect(mockSelectPage.mock.calls.length).toEqual(1);
    expect(mockSelectPage.mock.calls[0][0]).toBe(4);
  });

  it('should select page 5 when page 5 button is clicked', async () => {
    const mockSelectPage = jest.fn();
    const page = await newE2EPage();
    await page.setContent(`
      <va-pagination page="3" pages="50" />
    `);
    await page.exposeFunction('mockFunction', mockSelectPage);
    await page.$eval('va-pagination', (elm: any) => {
      elm.pageSelect = this.mockFunction;
    });
    await page.waitForChanges();

    const page5Button = await page.find(
      'va-pagination >>> button[aria-label="Page 5 "]',
    );
    await page5Button.click();
    expect(mockSelectPage.mock.calls.length).toEqual(1);
    expect(mockSelectPage.mock.calls[0][0]).toBe(5);
  });

  it('should focus prev button when pressing tab inside component', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-pagination page="3" pages="50" />
    `);

    const component = await page.find('va-pagination');
    await component.press('Tab');

    const focused = await page.find('va-pagination >>> button:focus');
    expect(focused.textContent).toEqual('Prev');
  });

  it('should tab to prev button and select it using the enter key', async () => {
    const mockSelectPage = jest.fn();
    const page = await newE2EPage();
    await page.setContent(`
    <va-pagination page="3" pages="50" />
    `);
    await page.exposeFunction('mockFunction', mockSelectPage);
    await page.$eval('va-pagination', (elm: any) => {
      elm.pageSelect = this.mockFunction;
    });
    await page.waitForChanges();
    const component = await page.find('va-pagination');
    await component.press('Tab');

    await component.press('Enter');
    expect(mockSelectPage.mock.calls.length).toEqual(1);
    expect(mockSelectPage.mock.calls[0][0]).toBe(2);
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
      'va-pagination >>> button[aria-label*="Load last page"]',
    );

    expect(lastPageButton.textContent).toEqual('50');
  });
});
