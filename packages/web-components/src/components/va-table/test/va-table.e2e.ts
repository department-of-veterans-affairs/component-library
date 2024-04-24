import { newE2EPage } from '@stencil/core/testing';

describe('V1 table', () => {
  function getTableMarkup(uswds: boolean): string {
    return `<va-table
    table-title="My table"
    uswds=${uswds}
  >
    <va-table-row slot="headers">
      <span>
        Document title
      </span>
      <span>
        Description
      </span>
      <span>
        Year
      </span>
    </va-table-row>
    <va-table-row>
      <span>
        Declaration of Independence
      </span>
      <span>
        Statement adopted by the Continental Congress declaring independence from the British Empire
      </span>
      <span>
        1776
      </span>
    </va-table-row>
    <va-table-row>
      <span>
        Bill of Rights
      </span>
      <span>
        The first ten ammendements of the U.S. Constitution guaranteeing rights and freedoms
      </span>
      <span>
        1791
      </span>
    </va-table-row>
    <va-table-row>
      <span>
        Declaration of Sentiments
      </span>
      <span>
        A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.
      </span>
      <span>
        1848
      </span>
    </va-table-row>
    <va-table-row>
      <span>
        Emancipation Proclamation
      </span>
      <span>
        An executive order granting freedom to slaves in designated southern states.
      </span>
      <span>
        1863
      </span>
    </va-table-row>
  </va-table>`;
  }

  it('renders a V1 va-table-inner with va-table-rows inside', async () => {
    const page = await newE2EPage();
    await page.setContent(getTableMarkup(false));

    const headerRow = await page.find('va-table-inner >>> va-table-row');
    expect(headerRow).toBeDefined();
  });

  it('renders a V3 va-table-inner with an HTML table inside', async () => {
    const page = await newE2EPage();
    await page.setContent(getTableMarkup(true));
    const element = await page.find('va-table-inner >>> table');

    expect(element).toBeDefined();
  });
});
