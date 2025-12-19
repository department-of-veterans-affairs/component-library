import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../../testing/test-helpers';
import { alphaSort } from '../../sort/alpha';
import { numSort } from '../../sort/numerical';
import { dateSort } from '../../sort/date';
import { _getCompareFunc } from '../../sort/utils';

describe('va-table-inner', () => {
  function makeTable(props = {}) {
    const defaultProps = { ...props, 'table-title': 'this is a caption' };
    return `<va-table ${Object.entries(defaultProps)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')}>
        <va-table-row>
        <span>One</span>
        <span>Two</span>
        <span>Three</span>
      </va-table-row>

      <va-table-row>
        <span>Dog</span>
        <span>Cat</span>
        <span></span>
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

  it('is not scrollable by default', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());
    const table = await page.find('va-table-inner');
    expect(table).not.toHaveClass('usa-table-container--scrollable');
  });

  it('is scrollable when attribute is set to true', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable({ scrollable: 'true' }));
    const table = await page.find('va-table-inner >>> div');
    expect(table.getAttribute('tabindex')).toEqual('0');
    expect(table).toHaveClass('usa-table-container--scrollable');
  });

  it('is not stacked by when attribute is set to false', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable({ stacked: 'false' }));
    const table = await page.find('va-table-inner >>> table');
    expect(table).not.toHaveClass('usa-table--stacked');
  });

  it('adds a caption', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());
    const visibleText = await page.find('va-table-inner >>> caption > span[aria-hidden="true"]');
    expect(visibleText.textContent).toEqual('this is a caption');
  });

  it('sets tabindex on caption when set-caption-focus is true on initial render', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable({ 'set-caption-focus': 'true' }));
    await page.waitForChanges();

    const caption = await page.find('va-table-inner >>> caption');
    expect(caption.getAttribute('tabindex')).toEqual('-1');
  });

  it('sets tabindex on caption when set-caption-focus attribute is set dynamically', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());
    await page.waitForChanges();

    // Set the attribute dynamically
    await page.evaluate(() => {
      const vaTable = document.querySelector('va-table');
      vaTable?.setAttribute('set-caption-focus', 'true');
    });
    await page.waitForChanges();

    const caption = await page.find('va-table-inner >>> caption');
    expect(caption.getAttribute('tabindex')).toEqual('-1');
  });

  it('removes tabindex from caption after blur', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <button id="other-element">Other</button>
      ${makeTable({ 'set-caption-focus': 'true' })}
    `);
    await page.waitForChanges();

    const caption = await page.find('va-table-inner >>> caption');
    expect(caption.getAttribute('tabindex')).toEqual('-1');

    // Trigger blur by dispatching blur event on the caption
    await page.evaluate(() => {
      const vaTableInner = document.querySelector('va-table-inner');
      const caption = vaTableInner?.shadowRoot?.querySelector('caption');
      caption?.dispatchEvent(new FocusEvent('blur'));
    });
    await page.waitForChanges();

    const tabindexAfterBlur = await caption.getAttribute('tabindex');
    expect(tabindexAfterBlur).toBeNull();
  });

  it('renders a table with the proper number of rows and columns', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());

    const table = await page.find('va-table-inner');
    expect(table.getAttribute('rows')).toEqual('2');
    expect(table.getAttribute('cols')).toEqual('3');
  });

  it('sets the proper scope attributes for rows and columns', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());

    const columnHeader = await page.find('va-table-inner >>> thead >>> th');
    const rowHeader = await page.find('va-table-inner >>> tbody >>> th');
    expect(columnHeader.getAttribute('scope')).toEqual('col');
    expect(rowHeader.getAttribute('scope')).toEqual('row');
  });

  it('sets the proper text for empty cells', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());
    const rowSpans = await page.findAll('span');
    expect(rowSpans[5].innerHTML).toEqual('Not available');
  });

  it('is not striped by default', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());
    const table = await page.find('va-table-inner >>> .usa-table');
    expect(table).not.toHaveClass('usa-table--striped');
  });

  it('has the USWDS striped class when striped is true', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable({ striped: 'true' }));
    const table = await page.find('va-table-inner >>> .usa-table');
    expect(table).toHaveClass('usa-table--striped');
  });

  it('is not full-width by default', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());
    const divEl = await page.find('va-table-inner >>> div');
    expect(divEl).not.toHaveClass('va-table--full-width');
  });

  it('has the full-width class when full-width is true', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable({ 'full-width': true }));
    const divEl = await page.find('va-table-inner >>> div');
    expect(divEl).toHaveClass('va-table--full-width');
  });

  it('does not have any right-aligned columns by default', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());
    const rightEl = await page.find(
      'va-table-inner >>> .vads-u-text-align--right',
    );
    expect(rightEl).toBeNull();
  });

  it('has the text-right-align class when right-align-cols is set', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable({ 'right-align-cols': '2' }));
    const rightEl = await page.find(
      'va-table-inner >>> .vads-u-text-align--right',
    );
    expect(rightEl).toBeDefined();
  });
  it('does not have any font-monospace columns by default', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable());
    const rightEl = await page.find(
      'va-table-inner >>> .vads-u-font-size--mono-sm',
    );
    expect(rightEl).toBeNull();
  });

  it('has the font-size--mono-sm class when mono-font-cols is set', async () => {
    const page = await newE2EPage();
    await page.setContent(makeTable({ 'mono-font-cols': '2' }));
    const rightEl = await page.find(
      'va-table-inner >>> .vads-u-font-size--mono-sm',
    );
    expect(rightEl).toBeDefined();
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
    </va-table>`;
  }

  // due to content in slots being hard to access in tests,
  // the va-table-rows are given ids (which don't change during sort),
  // then after each sort we check that the ids are in the correct order for the sort
  async function checkSorts(
    page: E2EPage,
    index: number,
    asc: string,
    desc: string,
  ) {
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

  it('screen reader text on sort buttons is correct', async () => {
    const page = await newE2EPage();
    await page.setContent(getTableMarkup());
    // we need to update these variables after each sort

    let buttons = null;

    buttons = await page.findAll('va-table-inner >>> thead >>> th >>> button');
    // sort ascending
    buttons = await page.findAll('va-table-inner >>> thead >>> th >>> button');

    // screen reader should say ascending initially
    expect(buttons[1].getAttribute('title')).toEqual(
      `Click to sort by Percent in ascending order`,
    );
    expect(buttons[0].getAttribute('title')).toEqual(
      `Click to sort by Integer/Float in ascending order`,
    );

    await buttons[1].click();
    await page.waitForChanges();

    buttons = await page.findAll('va-table-inner >>> thead >>> th >>> button');
    // screen reader should say descending for clicked button
    expect(buttons[1].getAttribute('title')).toEqual(
      `Click to sort by Percent in descending order`,
    );
    // screen reader should say ascending for non-clicked button
    expect(buttons[0].getAttribute('title')).toEqual(
      `Click to sort by Integer/Float in ascending order`,
    );

    // sort descending
    await buttons[1].click();
    await page.waitForChanges();

    buttons = await page.findAll('va-table-inner >>> thead >>> th >>> button');
    // screen reader should say ascending for twice clicked button
    expect(buttons[1].getAttribute('title')).toEqual(
      `Click to sort by Percent in ascending order`,
    );
    // screen reader should say ascending for non-clicked button
    expect(buttons[0].getAttribute('title')).toEqual(
      `Click to sort by Integer/Float in ascending order`,
    );
  });

  it('correctly uses data-sort-value attribute for sorting', async () => {
    const dataSortTableMarkup = `<va-table sortable="true" table-title="Sort with data-sort-value">
      <va-table-row>
        <span>Numbers</span>
      </va-table-row>
      <va-table-row id="row1">
        <span data-sort-value="3"><strong>12,345</strong></span>
      </va-table-row>
      <va-table-row id="row2">
        <span data-sort-value="1">5,290</span>
      </va-table-row>
      <va-table-row id="row3">
        <span data-sort-value="2">290</span>
      </va-table-row>
    </va-table>`;
    
    const page = await newE2EPage();
    await page.setContent(dataSortTableMarkup);
    await page.waitForChanges();
    
    // Verify initial order of rows
    let rowOrder = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('va-table-row')).slice(1);
      return rows.map(row => row.id);
    });
    expect(rowOrder).toEqual(['row1', 'row2', 'row3']);
    
    // Click the header to sort
    let button = await page.find('va-table-inner >>> thead >>> th >>> button');
    await button.click();
    await page.waitForChanges();
    
    // Verify sorted order (ascending by data-sort-value)
    rowOrder = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('va-table-row')).slice(1);
      return rows.map(row => row.id);
    });
    expect(rowOrder).toEqual(['row2', 'row3', 'row1']);
    
    // Re-fetch the button and click again to sort in descending order
    button = await page.find('va-table-inner >>> thead >>> th >>> button');
    await button.click();
    await page.waitForChanges();
    
    // Verify sorted order (descending by data-sort-value)
    rowOrder = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('va-table-row')).slice(1);
      return rows.map(row => row.id);
    });
    expect(rowOrder).toEqual(['row1', 'row3', 'row2']);
  });

  it('correctly handles mixed data-sort-value and innerHTML for sorting', async () => {
    // Create a test table with clearer numeric values to avoid parsing issues
    const mixedSortTableMarkup = `<va-table sortable="true" table-title="Mixed sort values">
      <va-table-row>
        <span>Numbers</span>
      </va-table-row>
      <va-table-row id="row1">
        <span data-sort-value="30">30 (with attribute)</span>
      </va-table-row>
      <va-table-row id="row2">
        <span>20</span>
      </va-table-row>
      <va-table-row id="row3">
        <span data-sort-value="10">10 (with attribute)</span>
      </va-table-row>
      <va-table-row id="row4">
        <span>40</span>
      </va-table-row>
    </va-table>`;
    
    const page = await newE2EPage();
    await page.setContent(mixedSortTableMarkup);
    await page.waitForChanges();
    
    // Verify initial order of rows
    let rowOrder = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('va-table-row')).slice(1);
      return rows.map(row => row.id);
    });
    expect(rowOrder).toEqual(['row1', 'row2', 'row3', 'row4']);
    
    // Click the header to sort
    let button = await page.find('va-table-inner >>> thead >>> th >>> button');
    await button.click();
    await page.waitForChanges();
    
    // Verify sorted order (ascending by data-sort-value or innerHTML)
    rowOrder = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('va-table-row')).slice(1);
      return rows.map(row => row.id);
    });
    
    // Expected ascending order: 10, 20, 30, 40
    expect(rowOrder).toEqual(['row3', 'row2', 'row1', 'row4']);
    
    // Re-fetch the button and click again to sort in descending order
    button = await page.find('va-table-inner >>> thead >>> th >>> button');
    await button.click();
    await page.waitForChanges();
    
    // Verify sorted order (descending by data-sort-value or innerHTML)
    rowOrder = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('va-table-row')).slice(1);
      return rows.map(row => row.id);
    });
    
    // Expected descending order: 40, 30, 20, 10
    expect(rowOrder).toEqual(['row4', 'row1', 'row2', 'row3']);
  });
});

describe('sort utilities', () => {
  it('correctly sorts alphabetically - ascending', () => {
    const data = ['dog', 'cat', 'mouse'];
    data.sort(alphaSort('ascending'));
    expect(data[0]).toEqual('cat');
  });

  it('correctly sorts alphabetically - descending', () => {
    const data = ['dog', 'cat', 'mouse'];
    data.sort(alphaSort('descending'));
    expect(data[0]).toEqual('mouse');
  });

  it('correctly sorts by date - ascending', () => {
    const data1 = ['October 1, 1900', 'November 1, 1900', 'December 1, 1900'];
    const data2 = ['October', 'November', 'December'];
    const data3 = ['10/01/1900', '11/01/1900', '12/01/1900'];
    const sortFunc = dateSort('ascending');

    data1.sort(sortFunc);
    expect(data1[0]).toContain('October');

    data2.sort(sortFunc);
    expect(data2[0]).toContain('October');

    data3.sort(sortFunc);
    expect(data3[0]).toEqual('10/01/1900');
  });

  it('correctly sorts by date - descending', () => {
    const data1 = ['October 1, 1900', 'November 1, 1900', 'December 1, 1900'];
    const data2 = ['October', 'November', 'December'];
    const data3 = ['10/01/1900', '11/01/1900', '12/01/1900'];
    const sortFunc = dateSort('descending');

    data1.sort(sortFunc);
    expect(data1[0]).toContain('December');

    data2.sort(sortFunc);
    expect(data2[0]).toContain('December');

    data3.sort(sortFunc);
    expect(data3[0]).toEqual('12/01/1900');
  });

  it('correctly sorts numerically - ascending', () => {
    const data = ['100', '3', '56', '11', '99'];
    data.sort(numSort('ascending'));
    expect(data[0]).toEqual('3');
  });

  it('correctly sorts numerically - descending', () => {
    const data = ['100', '3', '56', '11', '99'];
    data.sort(numSort('descending'));
    expect(data[0]).toEqual('100');
  });

  it('finds the correct sort function for a datatype', () => {
    const func = _getCompareFunc('123', '');
    expect(func.name).toEqual('numberSort');
    const func2 = _getCompareFunc('abc', '');
    expect(func2.name).toEqual('alphabeticalSort');
    const func3 = _getCompareFunc('October 31, 1899', '');
    expect(func3.name).toEqual('datesSort');
  });
});
