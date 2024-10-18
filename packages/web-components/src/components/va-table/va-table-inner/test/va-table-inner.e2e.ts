import { E2EPage, newE2EPage } from '@stencil/core/testing';
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
});

describe('sorted va-table ', () => {
  function getTableMarkup() {
    return `
    <va-table
      sortable
      table-title="This is a sortable table"
    >
      <va-table-row id="sort-1">
        <span>
          Integer/Float
        </span>
        <span>
          Percent
        </span>
        <span>
          Currency
        </span>
        <span>
          Ordinal mixed
        </span>
        <span>
          Ordinal
        </span>
        <span>
          Month only
        </span>
        <span>
          Full date
        </span>
        <span>
          Alphabetical
        </span>
      </va-table-row>
      <va-table-row id="sort-2">
        <span>
          3
        </span>
        <span>
          60%
        </span>
        <span>
          $2,500
        </span>
        <span>
          4th
        </span>
        <span>
          Ninth
        </span>
        <span>
          August
        </span>
        <span>
          June 3, 1903
        </span>
        <span>
          Lorem ipsum dolor sit,
        </span>
      </va-table-row>
      <va-table-row id="sort-3">
        <span>
          8.9
        </span>
        <span>
          1%
        </span>
        <span>
          $17,000
        </span>
        <span>
          3rd
        </span>
        <span>
          Second
        </span>
        <span>
          February
        </span>
        <span>
          October 25, 1415
        </span>
        <span>
          amet consectetur adipisicing elit.
        </span>
      </va-table-row>
      <va-table-row id="sort-4">
        <span>
          -5
        </span>
        <span>
          60.01%
        </span>
        <span>
          $100,000
        </span>
        <span>
          8th
        </span>
        <span>
          Fifth
        </span>
        <span>
          November
        </span>
        <span>
          December 10, 1621
        </span>
        <span>
          Alias nam eum minima
        </span>
      </va-table-row>
      <va-table-row id="sort-5">
        <span>
          99
        </span>
        <span>
          44%
        </span>
        <span>
          $1,100
        </span>
        <span>
          5th
        </span>
        <span>
          First
        </span>
        <span>
          April
        </span>
        <span>
          September 30, 1885
        </span>
        <span>
          delectus explicabo
        </span>
      </va-table-row>
    </va-table>`
  };

  // due to content in slots being hard to access in tests, 
  // the va-table-rows are given ids (which don't change during sort),
  // then after each sort we check that the ids are in the correct order for the sort
  async function checkSorts(page: E2EPage, index: number, asc: string, desc: string) {
    // we need to update these variables after each sort
    let table = null;
    let rows = null;
    let buttons = null;

    buttons = await page.findAll('va-table-inner >>> thead >>> th >>> button');
    table = await page.find('va-table');
    rows = await table.findAll('va-table-row');
    // initial
    expect(rows[1].id).toEqual('sort-2');

    // sort ascending
    buttons = await page.findAll('va-table-inner >>> thead >>> th >>> button');
    await buttons[index].click();
    await page.waitForChanges();

    table = await page.find('va-table');
    rows = await table.findAll('va-table-row');
    expect(rows[1].id).toEqual(asc);

    //sort descending
    buttons = await page.findAll('va-table-inner >>> thead >>> th >>> button');
    await buttons[index].click();
    await page.waitForChanges();

    table = await page.find('va-table');
    rows = await table.findAll('va-table-row');
    expect(rows[1].id).toEqual(desc);
  }

  it('sorts simple numeric', async () => {
    const page = await newE2EPage();
    await page.setContent(getTableMarkup());
    await checkSorts(page, 0, 'sort-4', 'sort-5');
  });

  it('sorts percent', async () => {
    const page = await newE2EPage();
    await page.setContent(getTableMarkup());
    await checkSorts(page, 1, 'sort-3', 'sort-4');
  });

  it('sorts currency', async () => {
    const page = await newE2EPage();
    await page.setContent(getTableMarkup());
    await checkSorts(page, 2, 'sort-5', 'sort-4');
  });

  it('sorts ordinal mixed', async () => {
    const page = await newE2EPage();
    await page.setContent(getTableMarkup());
    await checkSorts(page, 3, 'sort-3', 'sort-4');
  });

  it('sorts ordinal', async () => {
    const page = await newE2EPage();
    await page.setContent(getTableMarkup());
    await checkSorts(page, 4, 'sort-5', 'sort-2');
  });

  it('sorts month only', async () => {
    const page = await newE2EPage();
    await page.setContent(getTableMarkup());
    await checkSorts(page, 5, 'sort-3', 'sort-4');
  });

  it('sorts full date', async () => {
    const page = await newE2EPage();
    await page.setContent(getTableMarkup());
    await checkSorts(page, 6, 'sort-3', 'sort-2');
  });

  it('sorts alphabetical', async () => {
    const page = await newE2EPage();
    await page.setContent(getTableMarkup());
    await checkSorts(page, 7, 'sort-4', 'sort-2');
  });


})