import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

const sortSetup = async (opts = { ascending: true }) => {
  const page = await newE2EPage();
  await page.setContent(`
      <va-table sort-column="2" ${!opts.ascending ? 'descending' : ''}>
        <va-table-row slot="headers">
          <span>ID</span>
          <span>Name</span>
          <span>Cost</span>
        </va-table-row>

        <va-table-row>
          <span>1</span>
          <span>Turkey sandwich</span>
          <span>8.00</span>
        </va-table-row>
        <va-table-row>
          <span>2</span>
          <span>Banana</span>
          <span>0.50</span>
        </va-table-row>
      </va-table>
    `);

  return page;
};

describe('va-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-table></va-table>');

    const element = await page.find('va-table');
    expect(element).toHaveClass('hydrated');
  });

  it('includes a caption', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-table table-title="My table"></va-table>');

    const element = await page.find('va-table >>> caption');
    expect(element.innerText).toEqual('My table');
  });

  it('adds role and scope to header row children', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-table>
        <va-table-row slot="headers">
          <span>One</span>
          <span>Two</span>
          <span>Three</span>
        </va-table-row>

        <va-table-row>
          <span>Dog</span>
          <span>Cat</span>
          <span>Mouse</span>
        </va-table-row>
      </va-table>
    `);

    const element = await page.find('va-table > va-table-row');
    const cols = await element.findAll('span');
    expect(element.getAttribute('role')).toEqual('row');
    cols.forEach(col => {
      expect(col.getAttribute('role')).toEqual('columnheader');
      expect(col.getAttribute('scope')).toEqual('col');
    });
  });

  it('adds role to body row children', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-table>
        <va-table-row slot="headers">
          <span>One</span>
          <span>Two</span>
          <span>Three</span>
        </va-table-row>

        <va-table-row>
          <span>Dog</span>
          <span>Cat</span>
          <span>Mouse</span>
        </va-table-row>
      </va-table>
    `);

    const cells = await page.findAll(
      'va-table > va-table-row:last-child > span',
    );

    cells.forEach(cell => {
      expect(cell.getAttribute('role')).toEqual('cell');
    });
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-table>
          <va-table-row slot="headers">
            <span>One</span>
            <span>Two</span>
            <span>Three</span>
          </va-table-row>

          <va-table-row>
            <span>Dog</span>
            <span>Cat</span>
            <span>Mouse</span>
          </va-table-row>
        </va-table>
      `);

    await page.waitForChanges();
    await axeCheck(page);
  });

  it('right aligns columns with numeric data', async () => {
    const rightAlignClass = 'medium-screen:vads-u-text-align--right';
    const page = await newE2EPage();
    await page.setContent(`
      <va-table>
        <va-table-row slot="headers">
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </va-table-row>

        <va-table-row>
          <span>Strings</span>
          <span>1234</span>
          <span>More strings</span>
        </va-table-row>
      </va-table>
    `);

    await page.waitForChanges();
    const table = await page.findAll('va-table-row');
    const header = await table[0].findAll('span');
    const body = await table[1].findAll('span');

    expect(header[1].getAttribute('class')).toEqual(rightAlignClass);
    expect(body[1].getAttribute('class')).toEqual(rightAlignClass);
  });

  // TODO: add tests for the following (have been unable to get puppeteer to recognize DOM mutations):
  // - initial sort on load
  // - descending sort on button click
  describe('ascending sort', () => {
    it('adds a button with icon to the sortable column', async () => {
      const page = await sortSetup();
      // The `nth-child` index is 1-based
      const sortButton = await page.find(
        'va-table-row[slot] span:nth-child(3) > button',
      );
      const sortIcon = await sortButton.find('svg');
      // This describes the result of the click action
      expect(sortButton.getAttribute('aria-label')).toEqual(
        'sort data by descending',
      );
      // This describes the current state
      expect(sortIcon.getAttribute('aria-label')).toEqual('ascending');
    });
  });

  // TODO: add tests for the following (have been unable to get puppeteer to recognize DOM mutations):
  // - initial descending sort on load
  // - ascending sort on button click
  describe('descending sort', () => {
    it('adds a button with icon to the sortable column', async () => {
      const page = await sortSetup({ ascending: false });
      // The `nth-child` index is 1-based
      const sortButton = await page.find(
        'va-table-row[slot] span:nth-child(3) > button',
      );
      const sortIcon = await sortButton.find('svg');
      // This describes the result of the click action
      expect(sortButton.getAttribute('aria-label')).toEqual(
        'sort data by ascending',
      );
      // This describes the current state
      expect(sortIcon.getAttribute('aria-label')).toEqual('descending');
    });
  });
});
