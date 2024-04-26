import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="bar" uswds="false">
        <option value="">Please choose an option</option>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);
    const element = await page.find('va-select');

    expect(element).toEqualHtml(`
      <va-select label="A label" value="bar" class="hydrated" uswds="false">
        <mock:shadow-root>
          <label for="select" part="label">
            A label
          </label>
          <span id="error-message" role="alert"></span>
          <slot></slot>
          <select id="select" part="select" aria-invalid="false">
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

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-select error="This is a mistake" uswds="false" />');

    // Render the error message text
    const error = await page.find('va-select >>> span#error-message');
    const input = await page.find('va-select >>> select');
    expect(error.innerText).toContain('This is a mistake');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-select hint="This is hint text" uswds="false"/>');

    // Render the hint text
    const hintTextElement = await page.find('va-select >>> span.hint-text');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('sets aria-invalid based on invalid prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-select invalid uswds="false"/>');

    const input = await page.find('va-select >>> select');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
  });

  it('changes its value prop when selected', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select value="bar" uswds="false">
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
        <va-select label="A label" uswds="false">
          <option value="">Please select an option</option>
          <option value="foo">Foo</option>
          <option value="bar">Bar</option>
        </va-select>
      `);

    await axeCheck(page);
  });

  it('does not fire an analytics event without enable-enalytics prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="foo" uswds="false">
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
      <va-select label="A label" value="foo" enable-analytics uswds="false">
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
      componentName: 'va-select',
      details: {
        label: 'A label',
        selectLabel: 'bar',
      },
    });
  });

  it('fires a custom event when the selected value changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="foo" enable-analytics uswds="false">
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);

    const selectSpy = await page.spyOnEvent('vaSelect');

    const handle = await page.$('pierce/select');
    await handle.select('bar');
    await page.waitForChanges();

    expect(selectSpy).toHaveReceivedEventDetail({ value: 'bar' });
  });

  it('fires a custom event when a keydown happens in the select element', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="foo" enable-analytics uswds="false">
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);

    const keyDownSpy = await page.spyOnEvent('vaKeyDown');

    const handle = await page.$('pierce/select');
    await handle.press('ArrowDown');
    await handle.press('ArrowDown');
    await page.waitForChanges();

    expect(keyDownSpy).toHaveReceivedEventTimes(2);
  });

  it('renders disabled select', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-select disabled />');

    // Render a disabled select
    const selectElement = await page.find('va-select >>> select');
    expect(selectElement.disabled).toBe.true;
  });

  // Begin USWDS v3 test
  it('uswds v3 renders', async () => {
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
      <va-select label="A label" value="bar" uswds="" class="hydrated">
        <mock:shadow-root>
          <label class="usa-label" for="options" part="label">
            A label
          </label>
          <span id="input-error-message" role="alert"></span>
          <slot></slot>
          <select id="options" part="select" aria-invalid="false" class="usa-select">
            <option value=""></option>
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

  it('adds aria-describedby input-message id', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="foo" enable-analytics message-aria-describedby="example message">
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);
    const el = await page.find('va-select');
    const inputEl = await page.find('va-select >>> select');

    // Render the example message aria-describedby id.
    expect(inputEl.getAttribute('aria-describedby')).not.toBeNull();
    expect(inputEl.getAttribute('aria-describedby')).toContain('input-message');

    // If an error and aria-describedby-message is set, id's exist in aria-describedby.
    el.setProperty('error', 'Testing Error');
    await page.waitForChanges();
    expect(inputEl.getAttribute('aria-describedby')).not.toBeNull();
    expect(inputEl.getAttribute('aria-describedby')).toContain('error-message');
    expect(inputEl.getAttribute('aria-describedby')).toContain('input-message');
  });

  it('renders disabled select', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-select disabled />');

    // Render a disabled select
    const selectElement = await page.find('va-select >>> select');
    expect(selectElement.disabled).toBe.true;
  });
});
