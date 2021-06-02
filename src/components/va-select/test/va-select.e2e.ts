import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="bar">
        <option value="">Please choose an option</option>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);
    const element = await page.find('va-select');

    expect(element).toEqualHtml(`
      <va-select label="A label" value="bar" class="hydrated">
        <mock:shadow-root>
          <label for="select">
            A label
          </label>
          <slot></slot>
          <select id="select">
            <option value="">Please choose an option</option>
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
          </select>
        </mock:shadow-root>
        <option value="">Please choose an option</option>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);
  });

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

  it('adds a span for an aria-live region', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="foo" aria-live-region-text="You selected">
        <option value="">Please select an option</option>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);
    const screenreaderElement = await page.find('va-select >>> .sr-only');
    const handle = await page.$('pierce/select');

    expect(screenreaderElement).toEqualHtml(`
      <span aria-live="assertive" role="region" class="sr-only">
        You selected foo
      </span>
    `);

    await handle.select('bar');
    await page.waitForChanges();

    expect(screenreaderElement.textContent).toEqual('You selected bar');
  });

  it('does not fire an analytics event without enable-enalytics prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="foo">
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const handle = await page.$('pierce/select');
    await handle.select('bar');
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('fires an analytics event when the selected value changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="foo" enable-analytics>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const handle = await page.$('pierce/select');
    await handle.select('bar');
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'Select',
      details: {
        label: 'A label',
        selectLabel: 'bar',
      },
    });
  });

  it('fires a custom event when the selected value changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="foo" enable-analytics>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);

    const selectSpy = await page.spyOnEvent('select');

    const handle = await page.$('pierce/select');
    await handle.select('bar');
    await page.waitForChanges();

    expect(selectSpy).toHaveReceivedEventDetail({ value: 'bar' });
  });
});
