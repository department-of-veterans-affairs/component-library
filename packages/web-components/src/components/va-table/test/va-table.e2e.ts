import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-table></va-table>');

    const element = await page.find('va-table');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-table>
          <th slot="headers">One</th>
          <th slot="headers">Two</th>
          <th slot="headers">Three</th>
          <va-table-row>
            <td>Dog</td>
            <td>Cat</td>
            <td>Mouse</td>
          </va-table-row>
        </va-table>
      `);

    await page.waitForChanges();
    await axeCheck(page);
  });
});
