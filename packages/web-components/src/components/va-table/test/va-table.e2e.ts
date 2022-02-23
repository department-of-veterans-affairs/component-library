import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-table></va-table>');

    const element = await page.find('va-table');
    expect(element).toHaveClass('hydrated');
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
});
