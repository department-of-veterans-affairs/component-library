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
});
