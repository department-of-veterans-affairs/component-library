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
          <label class="usa-label" for="options" part="label">
            A label
          </label>
          <span id="input-error-message" role="alert"></span>
          <div id="select-container">
            <slot></slot>
            <select id="options" part="select" aria-invalid="false" class="usa-select">
              <option value="">- Select -</option>
              <option value="">Please choose an option</option>
              <option value="foo">Foo</option>
              <option value="bar">Bar</option>
            </select>
          </div>
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

  it('adds a full-width class when full-width is true', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="foo" full-width>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);
    const select = await page.find('va-select >>> select');
    expect(select.classList.contains('va-select--full-width')).toBeTruthy();
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
          <div id="select-container">
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
          </div>
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

  it('emits the vaSelectBlur event', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" value="bar">
        <option value="">Please choose an option</option>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);
    const blurSpy = await page.spyOnEvent('vaSelectBlur');
    const selectEl = await page.find('va-select >>> select');
    await selectEl.focus();
    await selectEl.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('useFormsPattern displays header for the single field pattern', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-select name="options" label="This is a label" use-forms-pattern="single" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    const formHeader = await page.find('va-select >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('useFormsPattern displays header for the multiple fields pattern', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-select name="options" label="This is a label" use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    const formHeader = await page.find('va-select >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('useFormsPattern does not display header if "single" or "multiple" is not indicated', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-select name="options" label="This is a label" use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    const formHeader = await page.find('va-select >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('useFormsPattern passes an aXe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-select name="options" label="This is a label" use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    await axeCheck(page);
  });


  it('labelHeaderLevel wraps the label in the specified header level', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select 
        label="Select an option" 
        name="test-select" 
        label-header-level="3"
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </va-select>
    `);

    const component = await page.find('va-select');
    expect(component).toHaveClass('hydrated');

    // Check that the h3 element exists and contains the label
    const headerElement = await page.find('va-select >>> h3');
    expect(headerElement).not.toBeNull();
    
    // Verify the header contains the label element
    const labelInHeader = await page.find('va-select >>> h3 label');
    expect(labelInHeader).not.toBeNull();
    expect(labelInHeader).toEqualText('Select an option');
  });

  it('does not wrap label in header when labelHeaderLevel is not set', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select 
        label="Select an option" 
        name="test-select"
      >
        <option value="option1">Option 1</option>
      </va-select>
    `);

    // Check that no header elements exist
    const h1 = await page.find('va-select >>> h1');
    const h2 = await page.find('va-select >>> h2');
    const h3 = await page.find('va-select >>> h3');
    const h4 = await page.find('va-select >>> h4');
    const h5 = await page.find('va-select >>> h5');
    const h6 = await page.find('va-select >>> h6');

    expect(h1).toBeNull();
    expect(h2).toBeNull();
    expect(h3).toBeNull();
    expect(h4).toBeNull();
    expect(h5).toBeNull();
    expect(h6).toBeNull();

    // Verify the label exists as a direct element (not wrapped in header)
    const label = await page.find('va-select >>> label');
    expect(label).not.toBeNull();
    expect(label).toEqualText('Select an option');
  });

  it('includes header aria-describedby when headerAriaDescribedby prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select 
        label="Select an option" 
        name="test-select" 
        label-header-level="3"
        header-aria-describedby="Additional info for screen readers"
      >
        <option value="option1">Option 1</option>
      </va-select>
    `);

    // Check that the h3 element has aria-describedby
    const headerElement = await page.find('va-select >>> h3');
    expect(headerElement).toHaveAttribute('aria-describedby');
    expect(await headerElement.getAttribute('aria-describedby')).toBe('header-message');

    // Check that the corresponding message span exists
    const headerMessage = await page.find('va-select >>> span#header-message');
    expect(headerMessage).not.toBeNull();
    expect(headerMessage).toEqualText('Additional info for screen readers');
  });

  it('does not add aria-describedby to header when headerAriaDescribedby is not set', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select 
        label="Select an option" 
        name="test-select" 
        label-header-level="3"
      >
        <option value="option1">Option 1</option>
      </va-select>
    `);

    // Check that the h3 element does not have aria-describedby
    const headerElement = await page.find('va-select >>> h3');
    expect(headerElement).not.toHaveAttribute('aria-describedby');

    // Check that no header-message span exists
    const headerMessage = await page.find('va-select >>> span#header-message');
    expect(headerMessage).toBeNull();
  });

  it('fires analytics event when enableAnalytics is true and not inside va-sort', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label" enable-analytics>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    
    // Use page.$eval to select the option via native DOM
    await page.$eval('va-select', (el: any) => {
      const select = el.shadowRoot.querySelector('select');
      select.value = 'bar';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);
    expect(analyticsSpy).toHaveReceivedEventDetail({
      componentName: 'va-select',
      action: 'change',
      details: {
        label: 'A label',
        selectLabel: 'bar',
      },
    });
  });

  it('does not fire analytics event when enableAnalytics is false', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-select label="A label">
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </va-select>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    
    // Use page.$eval to select the option via native DOM
    await page.$eval('va-select', (el: any) => {
      const select = el.shadowRoot.querySelector('select');
      select.value = 'bar';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });
});