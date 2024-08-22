import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../../testing/test-helpers';

describe('va-table', () => {
  function makeTable() {
    return `<va-table table-title="this is a caption">
        <va-table-row>
        <span>One</span>
        <span>Two</span>
        <span>Three</span>
      </va-table-row>

      <va-table-row>
        <span>Dog</span>
        <span>Cat</span>
        <span>Mouse</span>
      </va-table-row>
    </va-table>`;
  }

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());

    const element = await page.find('va-table');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());

    await page.waitForChanges();
    await axeCheck(page);
  });

  it('is borderless by default', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());
    const table = await page.find('va-table-inner >>> table');
    expect(table).toHaveClass('usa-table--borderless');
  });

  it('is not stacked by default', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());
    const table = await page.find('va-table-inner >>> table');
    expect(table).toHaveClass('usa-table--stacked');
  });

  it('is not stacked by when attribute is set to false', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-table stacked="false" table-title="this is a caption">
        <va-table-row>
        <span>One</span>
        <span>Two</span>
        <span>Three</span>
      </va-table-row>

      <va-table-row>
        <span>Dog</span>
        <span>Cat</span>
        <span>Mouse</span>
      </va-table-row>
    </va-table>`);
    const table = await page.find('va-table-inner >>> table');
    expect(table).not.toHaveClass('usa-table--stacked');
  });

  it('adds a caption', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());
    const caption = await page.find('va-table-inner >>> caption');
    expect(caption.innerHTML).toEqual('this is a caption');
  })

  it('renders a table with the proper number of rows and columns', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());

    const table = await page.find('va-table-inner');
    expect(table.getAttribute('rows')).toEqual("2");
    expect(table.getAttribute('cols',)).toEqual("3");
  });
})