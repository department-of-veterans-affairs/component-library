import { newE2EPage } from '@stencil/core/testing';

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
          <label class="usa-label" for="options" part="label">
            A label
          </label>
          <span id="input-error-message" role="alert"></span>
          <slot></slot>
          <select id="options" part="select" aria-invalid="false" class="usa-select">
            <option value="">- Select -</option>
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

  it('sets the width of the select element if the width prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="foo" width="md">
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);
    const select = await page.find('va-select >>> select');
    expect(select.classList.contains('usa-input--md')).toBeTruthy();
  });

  it('does not render the error if showError is false', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="foo" error="month-range" show-error="false">
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);
    const span = await page.find('span.usa-error-message');
    expect(span).toBeNull()
  });

  it('renders options within optgroup', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="bar">
        <optgroup label="Group 1">
          <option value="foo">Foo</option>
        </optgroup>
        <optgroup label="Group 2">
          <option value="bar">Bar</option>
        </optgroup>
      </va-select>
    `);
    const element = await page.find('va-select');

    expect(element).toEqualHtml(`
      <va-select label="A label" value="bar" class="hydrated">
        <mock:shadow-root>
          <label class="usa-label" for="options" part="label">
            A label
          </label>
          <span id="input-error-message" role="alert"></span>
          <slot></slot>
          <select id="options" part="select" aria-invalid="false" class="usa-select">
            <option value="">- Select -</option>
            <optgroup label="Group 1">
              <option value="foo">Foo</option>
            </optgroup>
            <optgroup label="Group 2">
              <option value="bar">Bar</option>
            </optgroup>
          </select>
        </mock:shadow-root>
        <optgroup label="Group 1">
          <option value="foo">Foo</option>
        </optgroup>
        <optgroup label="Group 2">
          <option value="bar">Bar</option>
        </optgroup>
      </va-select>
    `);
  });

  it('selects the correct option within optgroup', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="bar">
        <optgroup label="Group 1">
          <option value="foo">Foo</option>
        </optgroup>
        <optgroup label="Group 2">
          <option value="bar">Bar</option>
        </optgroup>
      </va-select>
    `);
    const select = await page.find('va-select >>> select');
    const selectValue = await select.getProperty('value');
    expect(selectValue).toBe('bar');
  });
});
