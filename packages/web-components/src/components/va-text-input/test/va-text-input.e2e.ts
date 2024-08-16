import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-text-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Hello, world" />');
    const element = await page.find('va-text-input');

    expect(element).toEqualHtml(`
      <va-text-input class="hydrated" label="Hello, world">
        <mock:shadow-root>
        <div class="input-wrap">
          <label for="inputField" class="usa-label" id="input-label" part="label">
            Hello, world
            </label>
            <slot></slot>
            <span id="input-error-message" role="alert"></span>
            <div>
              <input class="usa-input" id="inputField" part="input" type="text" aria-invalid="false" />
            </div>
            </div>
        </mock:shadow-root>
      </va-text-input>
    `);
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-text-input >>> .usa-error-message');
    const input = await page.find('va-text-input >>> input');
    expect(error.innerText).toContain('This is a mistake');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
    expect(input.getAttribute('aria-describedby')).toBe('input-error-message');
  });

  it('sets aria-invalid based on invalid prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input invalid />');

    const input = await page.find('va-text-input >>> input');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
  });

  it('adds aria-describedby for error message', async () => {
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
    expect(inputEl.getAttribute('aria-describedby')).toBe('input-error-message');
  });

  it('adds aria-describedby input-message id', async () => {
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
    expect(inputEl.getAttribute('aria-describedby')).not.toContain('charcount-message');
  });

  it('renders a required span', async () => {
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

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input hint="This is hint text" label="hello, world" />');

    // Render the hint text
    const hintTextElement = await page.find('va-text-input >>> .usa-hint');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-text-input required label="This is a test" error="With an error message" message-aria-describeby="with extra aria message" />',
    );

    await axeCheck(page);
  });

  it('fires an analytics event when enableAnalytics is true', async () => {
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

  it('emits blur event', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Input Field" />');

    const inputEl = await page.find('va-text-input >>> input');
    const blurSpy = await page.spyOnEvent('blur');
    await inputEl.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('emits input event with value updated', async () => {
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

  it("doesn't fire analytics events", async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Input Field" />');

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-text-input >>> input');
    await inputEl.press('1');
    await inputEl.press('Tab');

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('adds a character limit with descriptive text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input maxlength="3" charcount value="22" />');

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

    expect(inputEl.getAttribute('aria-describedby')).toBe('charcount-message');
  });

   it('respects the maxlength character limit', async () => {
     const page = await newE2EPage();
     await page.setContent('<va-text-input maxlength="2" charcount value="22" />');

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

     expect(inputEl.getAttribute('aria-describedby')).toBe('charcount-message');
   });

  it('ignores negative maxlength values', async () => {
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

  it('ignores a maxlength of zero', async () => {
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
      await page.setContent(`<va-text-input type="${inputType}" />`);
      const inputEl = await page.find('va-text-input >>> input');
      expect(inputEl.getAttribute('type')).toBe(inputType);
    }
  });

  it('defaults to text when the type attribute is invalid or unsupported', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input type="textual" />');

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
      await page.setContent(`<va-text-input inputmode="${inputMode}" />`);
      const inputEl = await page.find('va-text-input >>> input');
      expect(inputEl.getAttribute('inputmode')).toBe(inputMode);
    }
  });

  it('displays a green border around input when success is true', async () => {
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

  it('checks for autocomplete attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-text-input autocomplete="email" />',
    );

    // Level-setting expectations
    const inputEl = await page.find('va-text-input >>> input');
    expect(await inputEl.getProperty('autocomplete')).toBe('email');
  });

  it('shows chars allowed on load if maxlength and charcount set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input maxlength="10" charcount />');

    const span = await page.find(
      'va-text-input >>> span.usa-character-count__status',
    );
    expect(span.innerText).toEqual('10 characters allowed');
  });

  it('shows chars left if maxlength and charcount set', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input charcount maxlength="10"/>');

    const inputEl = await page.find('va-text-input >>> input');
    await inputEl.type('Hello');
    const span = await page.find('va-text-input >>> span.usa-character-count__status')

    expect(span.innerText).toEqual('5 characters left');

  });

  it('charcount and maxlength text does not display on memorable date', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input class="memorable-date-input" label="This is a label" />');

    const inputEl = await page.find('va-text-input >>> input');
    expect(inputEl.getAttribute('aria-describedby')).toBeNull();

    const charcountMessageEl = await page.find('va-text-input >>> #charcount-message');
    expect(charcountMessageEl).toBeNull();

    const maxlengthMessageEl = await page.find('va-text-input >>> #maxlength-message');
    expect(maxlengthMessageEl).toBeNull();
  });

  it('useFormsPattern displays header for the single field pattern', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input label="This is a label" use-forms-pattern="single" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    const formHeader = await page.find('va-text-input >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('useFormsPattern displays header for the multiple fields pattern', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input label="This is a label" use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    const formHeader = await page.find('va-text-input >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('useFormsPattern does not display header if "single" or "multiple" is not indicated', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input label="This is a label" use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    const formHeader = await page.find('va-text-input >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('useFormsPattern passes an aXe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input label="This is a label" use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    await axeCheck(page);
  });

  it('sets a range based on min and max attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input min="0" max="4"/>');

    const inputEl = await page.find('va-text-input >>> input');
    expect(inputEl.getAttribute('min')).toBe('0');
    expect(inputEl.getAttribute('max')).toBe('4');
  });

  it('renders a "$" if currency flag set to true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input currency />');
    const currencyTextElement = await page.find('va-text-input >>> div > div > div');
    expect(currencyTextElement.innerText).toContain('$');
  });

  it('renders an icon if inputIconPrefix is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input input-icon-prefix=\'credit_card\'></va-text-input>');
    const vaIconEl = await page.find('va-text-input >>> va-icon');
    expect(vaIconEl).toHaveClass('hydrated');
  });

  it('renders prefix text if inputPrefix is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input input-prefix=\'Pre\'></va-text-input>');
    const el = await page.find('va-text-input >>> div > div > div');
    expect(el).toHaveClass('usa-input-prefix');
  });

  it('renders suffix text if inputSufix is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input input-suffix=\'lbs.\'></va-text-input>');
    const el = await page.find('va-text-input >>> div > div> div');
    expect(el).toHaveClass('usa-input-suffix');
  });
  

  it('sets the input mode to a default pattern if inputmode is numerical or decimal', async () => {
    for (const inputMode of ['numeric', 'decimal']) {
      const page = await newE2EPage();
      await page.setContent(`<va-text-input inputmode="${inputMode}" />`);
      const inputEl = await page.find('va-text-input >>> input');
      expect(inputEl.getAttribute('pattern')).toEqual("[0-9]+(\.[0-9]{1,})?");
    }
  });

  it('sets a default pattern and inputmode if currency is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input currency />');
    const inputEl = await page.find('va-text-input >>> input');
    expect(inputEl.getAttribute('pattern')).toEqual("^[0-9]+(\.[0-9]{2})?$");
    expect(inputEl.getAttribute('inputmode')).toEqual("numeric");
  });

  it('sets type to be number if max or min set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input max="5" min="1" />');
    const inputEl = await page.find('va-text-input >>> input');
    expect(inputEl.getAttribute('type')).toEqual("number");
  });

  it('sets the step attribute to .01 if inputmode is decimal', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input type="number" inputmode="decimal"/>');
    const inputEl = await page.find('va-text-input >>> input');
    expect(inputEl.getAttribute('step')).toEqual(".01");
  });
  it('does not set the step attribute when step is defined', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input type="number" inputmode="decimal" step="any"/>');
    const inputEl = await page.find('va-text-input >>> input');
    expect(inputEl.getAttribute('step')).toEqual("any");
  });
});