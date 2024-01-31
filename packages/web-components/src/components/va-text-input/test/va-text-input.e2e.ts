import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-text-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Hello, world" uswds="false"/>');
    const element = await page.find('va-text-input');

    expect(element).toEqualHtml(`
      <va-text-input class="hydrated" label="Hello, world" uswds="false">
        <mock:shadow-root>
          <label for="inputField" part="label">
            Hello, world
          </label>
          <slot></slot>
          <span id="input-error-message" role="alert"></span>
          <input id="inputField" type="text" part="input" aria-invalid="false" />
        </mock:shadow-root>
      </va-text-input>
    `);
  });

  it('renders slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <va-text-input label="Name of issue" uswds="false">
      <p className="vads-u-font-weight--normal label-description">
        You can only add an issue that you've already received a VA decision
        notice for.
      </p>
    </va-text-input>`);
    const element = await page.find('va-text-input');
    expect(element).toEqualHtml(`
      <va-text-input class="hydrated" label="Name of issue" uswds="false">
        <mock:shadow-root>
          <label for="inputField" part="label">
            Name of issue
          </label>
          <slot></slot>
          <span id="input-error-message" role="alert"></span>
          <input id="inputField" type="text" part="input" aria-invalid="false" />
        </mock:shadow-root>
        <p className="vads-u-font-weight--normal label-description">
          You can only add an issue that you've already received a VA decision
          notice for.
        </p>
      </va-text-input>
    `);
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input error="This is a mistake" uswds="false"/>');

    // Render the error message text
    const error = await page.find('va-text-input >>> span#input-error-message');
    const input = await page.find('va-text-input >>> input');
    expect(error.innerText).toContain('This is a mistake');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
    expect(input.getAttribute('aria-describedby')).toContain('input-error-message');
  });

  it('sets aria-invalid based on invalid prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input invalid uswds="false"/>');

    const input = await page.find('va-text-input >>> input');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
  });

  it('adds aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input uswds="false"/>');
    // Check that error is empty
    const el = await page.find('va-text-input');
    const inputEl = await page.find('va-text-input >>> input');
    expect(inputEl.getAttribute('aria-describedby')).toBeNull();
    // Render the error message text as empty string
    el.setProperty('error', '');
    await page.waitForChanges();
    expect(inputEl.getAttribute('aria-describedby')).toBeNull();
    // Render the error message text as real value
    el.setProperty('error', 'Testing Error');
    await page.waitForChanges();
    expect(inputEl.getAttribute('aria-describedby')).not.toBeNull();
    expect(inputEl.getAttribute('aria-describedby')).toContain('error-message');
  });

  it('adds aria-describedby input-message id', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input message-aria-describedby="example message" uswds="false"/>');
    const el = await page.find('va-text-input');
    const inputEl = await page.find('va-text-input >>> input');

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

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input label="This is a field" required uswds="false"/>');

    const el = await page.find('va-text-input');
    // required="" is a weird thing that only happens in these tests
    expect(el).toEqualHtml(`
      <va-text-input class="hydrated" label="This is a field" required="" uswds="false">
        <mock:shadow-root>
          <label for="inputField" part="label">
            This is a field <span class="required">required</span>
          </label>
          <slot></slot>
          <span id="input-error-message" role="alert"></span>
          <input id="inputField" type="text" required="" part="input" aria-invalid="false" />
        </mock:shadow-root>
      </va-text-input>
    `);

    // Render the error message text
    const requiredSpan = await page.find('va-text-input >>> .required');
    expect(requiredSpan).not.toBeNull();
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input hint="This is hint text" label="Hello world" uswds="false"/>');

    // Render the hint text
    const hintTextElement = await page.find('va-text-input >>> span.hint-text');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-text-input required label="This is a test" error="With an error message" message-aria-describeby="with extra aria message" uswds="false"/>',
    );

    await axeCheck(page);
  });

  it('fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-text-input label="Input Field" enable-analytics uswds="false"/>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const inputEl = await page.find('va-text-input >>> input');
    await inputEl.press('1');
    await inputEl.press('2');
    await inputEl.press('3');
    await inputEl.press('Tab');

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'blur',
      componentName: 'va-text-input',
      details: {
        label: 'Input Field',
        value: '123',
      },
    });
  });

  it('emits blur event', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Input Field" uswds="false"/>');

    const inputEl = await page.find('va-text-input >>> input');
    const blurSpy = await page.spyOnEvent('blur');
    await inputEl.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('emits input event with value updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Input Field" uswds="false"/>');

    const inputEl = await page.find('va-text-input >>> input');
    const inputSpy = await page.spyOnEvent('input');

    // Act
    await inputEl.press('a');
    const firstValue = await page.$eval(
      'va-text-input',
      (comp: HTMLInputElement) => comp.value,
    );
    await inputEl.press('s');
    const secondValue = await page.$eval(
      'va-text-input',
      (comp: HTMLInputElement) => comp.value,
    );

    // Assert
    expect(inputSpy).toHaveReceivedEventTimes(2);
    expect(firstValue).toEqual('a');
    expect(secondValue).toEqual('as');
  });

  it("doesn't fire analytics events", async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Input Field" uswds="false"/>');

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-text-input >>> input');
    await inputEl.press('1');
    await inputEl.press('Tab');

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('adds a character limit with descriptive text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-text-input minlength="2" maxlength="3" value="22" uswds="false"/>',
    );

    // Level-setting expectations
    const inputEl = await page.find('va-text-input >>> input');
    expect(await inputEl.getProperty('value')).toBe('22');
    expect(await page.find('va-text-input >>> small')).toBeNull();

    // Test the functionality
    await inputEl.press('2');
    expect(await inputEl.getProperty('value')).toBe('222');
    expect((await page.find('va-text-input >>> small')).innerText).toContain(
      'max-chars',
    );

    // Click three times to select all text in input
    await inputEl.click({ clickCount: 3 });
    await inputEl.press('2');
    expect(await inputEl.getProperty('value')).toBe('2');
    expect((await page.find('va-text-input >>> small')).innerText).toContain(
      'min-chars',
    );
  });

  it('ignores negative maxlength values', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input maxlength="-5" uswds="false"/>');

    // Level-setting expectations
    const inputEl = await page.find('va-text-input >>> input');
    expect(await page.find('va-text-input >>> small')).toBeNull();

    // Test the functionality
    await inputEl.type('Hello, nice to meet you');
    expect(await inputEl.getProperty('value')).toBe('Hello, nice to meet you');
    expect(await page.find('va-text-input >>> small')).toBeNull();
  });

  it('ignores a maxlength of zero', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input maxlength="0" uswds="false"/>');

    // Level-setting expectations
    const inputEl = await page.find('va-text-input >>> input');
    expect(await page.find('va-text-input >>> small')).toBeNull();

    // Test the functionality
    await inputEl.type('Hello, nice to meet you');
    expect(await inputEl.getProperty('value')).toBe('Hello, nice to meet you');
    expect(await page.find('va-text-input >>> small')).toBeNull();
  });

  it('allows manually setting the type attribute', async () => {
    const allowedInputTypes = [
      'email',
      'number',
      'search',
      'tel',
      'text',
      'url',
    ];
    for (const inputType of allowedInputTypes) {
      const page = await newE2EPage();
      await page.setContent(`<va-text-input type="${inputType}" uswds="false"/>`);
      const inputEl = await page.find('va-text-input >>> input');
      expect(inputEl.getAttribute('type')).toBe(inputType);
    }
  });

  it('defaults to text when the type attribute is invalid or unsupported', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input type="textual" uswds="false"/>');

    // Level-setting expectations
    const inputEl = await page.find('va-text-input >>> input');
    expect(inputEl.getAttribute('type')).toBe('text');
  });

  it('allows manually setting the inputmode attribute', async () => {
    const inputModes = [
      'decimal',
      'email',
      'none',
      'numeric',
      'search',
      'tel',
      'text',
      'url',
    ];
    for (const inputMode of inputModes) {
      const page = await newE2EPage();
      await page.setContent(`<va-text-input inputmode="${inputMode}" uswds="false"/>`);
      const inputEl = await page.find('va-text-input >>> input');
      expect(inputEl.getAttribute('inputmode')).toBe(inputMode);
    }
  });

  it('displays a green border around input when success is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input success uswds="false"/>');

    const input = await page.find('va-text-input >>> input');
    // rgb(0, 136, 23) is equal to #008817 and --color-green CSS variable
    expect((await input.getComputedStyle()).borderBottomColor).toEqual(
      'rgb(0, 136, 23)',
    );
    expect((await input.getComputedStyle()).borderLeftColor).toEqual(
      'rgb(0, 136, 23)',
    );
    expect((await input.getComputedStyle()).borderRightColor).toEqual(
      'rgb(0, 136, 23)',
    );
    expect((await input.getComputedStyle()).borderTopColor).toEqual(
      'rgb(0, 136, 23)',
    );
  });

  it('checks for autocomplete attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-text-input autocomplete="email" uswds="false"/>',
    );

    // Level-setting expectations
    const inputEl = await page.find('va-text-input >>> input');
    expect(await inputEl.getProperty('autocomplete')).toBe('email');
  });

  it('charcount and maxlength text does not display on memorable date', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input class="memorable-date-input" label="This is a label" uswds="false"/>');

    const charcountMessageEl = await page.find('va-text-input >>> #charcount-message');
    expect(charcountMessageEl).toBeNull();

    const maxlengthMessageEl = await page.find('va-text-input >>> #maxlength-message');
    expect(maxlengthMessageEl).toBeNull();
  });

  // Begin USWDS tests
  it('uswds v3 renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Hello, world" />');
    const element = await page.find('va-text-input');

    expect(element).toEqualHtml(`
      <va-text-input class="hydrated" label="Hello, world" uswds="">
        <mock:shadow-root>
        <div class="input-wrap">
          <label for="inputField" class="usa-label" id="input-label" part="label">
            Hello, world
            </label>
            <slot></slot>
            <span id="input-error-message" role="alert"></span>
            <input class="usa-input" id="inputField" part="input" type="text" aria-invalid="false" />
          </div>
        </mock:shadow-root>
      </va-text-input>
    `);
  });

  it('uswds renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-text-input >>> .usa-error-message');
    const input = await page.find('va-text-input >>> input');
    expect(error.innerText).toContain('This is a mistake');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
    expect(input.getAttribute('aria-describedby')).toContain('input-error-message');
  });

  it('uswds sets aria-invalid based on invalid prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input invalid />');

    const input = await page.find('va-text-input >>> input');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
  });

  it('uswds adds aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input />');
    // Check that error is empty
    const el = await page.find('va-text-input');
    const inputEl = await page.find('va-text-input >>> input');
    expect(inputEl.getAttribute('aria-describedby')).toBeNull();
    // Render the error message text as empty string
    el.setProperty('error', '');
    await page.waitForChanges();
    expect(inputEl.getAttribute('aria-describedby')).toBeNull();
    // Render the error message text as real value
    el.setProperty('error', 'Testing Error');
    await page.waitForChanges();
    expect(inputEl.getAttribute('aria-describedby')).not.toBeNull();
    expect(inputEl.getAttribute('aria-describedby')).toContain('error-message');
  });

  it('uswds adds aria-describedby input-message id', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input message-aria-describedby="example message" />');
    const el = await page.find('va-text-input');
    const inputEl = await page.find('va-text-input >>> input');

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

  it('uswds renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-text-input label="This is a field" required />',
    );

    const requiredSpan = await page.find(
      'va-text-input >>> label > span.usa-label--required',
    );
    // The actual text value depends on the language of the document
    expect(requiredSpan).not.toBeNull();
  });

  it('uswds renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input hint="This is hint text" label="hello, world" />');

    // Render the hint text
    const hintTextElement = await page.find('va-text-input >>> .usa-hint');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('uswds passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-text-input required label="This is a test" error="With an error message" message-aria-describeby="with extra aria message" />',
    );

    await axeCheck(page);
  });

  it('uswds fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-text-input label="Input Field" enable-analytics />',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const inputEl = await page.find('va-text-input >>> input');
    await inputEl.press('1');
    await inputEl.press('2');
    await inputEl.press('3');
    await inputEl.press('Tab');

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'blur',
      componentName: 'va-text-input',
      details: {
        label: 'Input Field',
        value: '123',
      },
    });
  });

  it('uswds emits blur event uswds', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Input Field" />');

    const inputEl = await page.find('va-text-input >>> input');
    const blurSpy = await page.spyOnEvent('blur');
    await inputEl.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('uswds emits input event with value updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Input Field" />');

    const inputEl = await page.find('va-text-input >>> input');
    const inputSpy = await page.spyOnEvent('input');

    // Act
    await inputEl.press('a');
    const firstValue = await page.$eval(
      'va-text-input',
      (comp: HTMLInputElement) => comp.value,
    );
    await inputEl.press('s');
    const secondValue = await page.$eval(
      'va-text-input',
      (comp: HTMLInputElement) => comp.value,
    );

    // Assert
    expect(inputSpy).toHaveReceivedEventTimes(2);
    expect(firstValue).toEqual('a');
    expect(secondValue).toEqual('as');
  });

  it("uswds doesn't fire analytics events", async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Input Field" />');

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-text-input >>> input');
    await inputEl.press('1');
    await inputEl.press('Tab');

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('uswds adds a character limit with descriptive text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input maxlength="3" value="22" />');

    // Level-setting expectations
    const inputEl = await page.find('va-text-input >>> input');
    expect(await inputEl.getProperty('value')).toBe('22');
    const message = await page.find('va-text-input >>> span.usa-character-count__status')
    expect(message.innerText).toBe('1 character left');

    // Test the functionality
    await inputEl.press('2');
    expect(await inputEl.getProperty('value')).toBe('222');
    expect((await page.find('va-text-input >>> span.usa-character-count__status')).innerText).toContain(
      '0 characters left',
    );

    // Click three times to select all text in input
    await inputEl.click({ clickCount: 3 });
    await inputEl.press('2');
    expect(await inputEl.getProperty('value')).toBe('2');
    expect((await page.find('va-text-input >>> span.usa-character-count__status')).innerText).toContain(
      '2 characters left',
    );
  });

   it('uswds respects the maxlength character limit', async () => {
     const page = await newE2EPage();
     await page.setContent('<va-text-input maxlength="2" value="22" />');

     // Level-setting expectations
     const inputEl = await page.find('va-text-input >>> input');
     expect(await inputEl.getProperty('value')).toBe('22');
     const message = await page.find(
       'va-text-input >>> span.usa-character-count__status',
     );
     expect(message.innerText).toBe('0 characters left');

     // Test the functionality
     await inputEl.press('2');
     expect(await inputEl.getProperty('value')).toBe('22');
     expect(
       (await page.find('va-text-input >>> span.usa-character-count__status'))
         .innerText,
     ).toContain('0 characters left');
   });

  it('uswds ignores negative maxlength values', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input maxlength="-5" />');

    // Level-setting expectations
    const inputEl = await page.find('va-text-input >>> input');
    expect(await page.find('va-text-input >>> span.usa-character-count__status')).toBeNull();

    // Test the functionality
    await inputEl.type('Hello, nice to meet you');
    expect(await inputEl.getProperty('value')).toBe('Hello, nice to meet you');
    expect(await page.find('va-text-input >>> span.usa-character-count__status')).toBeNull();
  });

  it('uswds ignores a maxlength of zero', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input maxlength="0" />');

    // Level-setting expectations
    const inputEl = await page.find('va-text-input >>> input');
    expect(await page.find('va-text-input >>> span.usa-character-count__status')).toBeNull();

    // Test the functionality
    await inputEl.type('Hello, nice to meet you');
    expect(await inputEl.getProperty('value')).toBe('Hello, nice to meet you');
    expect(await page.find('va-text-input >>> span.usa-character-count__status')).toBeNull();
  });

  it('uswds allows manually setting the type attribute', async () => {
    const allowedInputTypes = [
      'email',
      'number',
      'search',
      'tel',
      'text',
      'url',
    ];
    for (const inputType of allowedInputTypes) {
      const page = await newE2EPage();
      await page.setContent(`<va-text-input type="${inputType}" />`);
      const inputEl = await page.find('va-text-input >>> input');
      expect(inputEl.getAttribute('type')).toBe(inputType);
    }
  });

  it('uswds defaults to text when the type attribute is invalid or unsupported', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input type="textual" />');

    // Level-setting expectations
    const inputEl = await page.find('va-text-input >>> input');
    expect(inputEl.getAttribute('type')).toBe('text');
  });

  it('uswds allows manually setting the inputmode attribute', async () => {
    const inputModes = [
      'decimal',
      'email',
      'none',
      'numeric',
      'search',
      'tel',
      'text',
      'url',
    ];
    for (const inputMode of inputModes) {
      const page = await newE2EPage();
      await page.setContent(`<va-text-input inputmode="${inputMode}" />`);
      const inputEl = await page.find('va-text-input >>> input');
      expect(inputEl.getAttribute('inputmode')).toBe(inputMode);
    }
  });

  it('uswds displays a green border around input when success is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input success />');

    const input = await page.find('va-text-input >>> input');
    // rgb(0, 169, 28) is equal to #00A91C from the USWDS v3 system.
    expect((await input.getComputedStyle()).borderBottomColor).toEqual(
      'rgb(0, 169, 28)',
    );
    expect((await input.getComputedStyle()).borderLeftColor).toEqual(
      'rgb(0, 169, 28)',
    );
    expect((await input.getComputedStyle()).borderRightColor).toEqual(
      'rgb(0, 169, 28)',
    );
    expect((await input.getComputedStyle()).borderTopColor).toEqual(
      'rgb(0, 169, 28)',
    );
  });

  it('uswds checks for autocomplete attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-text-input autocomplete="email" />',
    );

    // Level-setting expectations
    const inputEl = await page.find('va-text-input >>> input');
    expect(await inputEl.getProperty('autocomplete')).toBe('email');
  });

  it('uswds shows chars allowed on load if maxlength set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input maxlength="10" />');

    const span = await page.find(
      'va-text-input >>> span.usa-character-count__status',
    );
    expect(span.innerText).toEqual('10 characters allowed');
  });

  it('uswds shows chars left if maxlength set', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input maxlength="10"/>');

    const inputEl = await page.find('va-text-input >>> input');
    await inputEl.type('Hello');
    const span = await page.find('va-text-input >>> span.usa-character-count__status')

    expect(span.innerText).toEqual('5 characters left');

  });

  it('uswds charcount and maxlength text does not display on memorable date', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input class="memorable-date-input" label="This is a label" />');

    const charcountMessageEl = await page.find('va-text-input >>> #charcount-message');
    expect(charcountMessageEl).toBeNull();

    const maxlengthMessageEl = await page.find('va-text-input >>> #maxlength-message');
    expect(maxlengthMessageEl).toBeNull();
  });

  it('uswds useFormsPattern displays header for the single field pattern', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input label="This is a label" use-forms-pattern="single" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    const formHeader = await page.find('va-text-input >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('uswds useFormsPattern displays header for the multiple fields pattern', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input label="This is a label" use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    const formHeader = await page.find('va-text-input >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('uswds useFormsPattern does not display header if "single" or "multiple" is not indicated', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input label="This is a label" use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    const formHeader = await page.find('va-text-input >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('uswds useFormsPattern passes an aXe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input label="This is a label" use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    await axeCheck(page);
  });
});