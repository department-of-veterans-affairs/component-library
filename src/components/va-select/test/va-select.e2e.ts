import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-select', () => {
  it('changes its value prop when selected', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select value="bar">
        <option value="">Please choose an option</option>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);

    const element = await page.find('va-select');
    const handle = await page.$('pierce/select');

    expect(await element.getProperty('value')).toBe('bar');

    await handle.select('foo');
    await page.waitForChanges();

    expect(await element.getProperty('value')).toBe('foo');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-select label="A label">
          <option value="">Please select an option</option>
          <option value="foo">Foo</option>
          <option value="bar">Bar</option>
        </va-select>
      `);

    await axeCheck(page);
  });
});
