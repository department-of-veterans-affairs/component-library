import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-number-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-number-input label="Hello, world" />');
    const element = await page.find('va-number-input');

    expect(element).toEqualHtml(`
      <va-number-input class="hydrated" label="Hello, world">
        <mock:shadow-root>
          <label for="inputField">
            Hello, world
          </label>
          <span id="error-message" role="alert"></span>
          <div>
            <input id="inputField" inputmode="numeric" pattern="[0-9]+(\\.[0-9]{1,})?" type="text" aria-invalid="false" />
          </div>
          </mock:shadow-root>
      </va-number-input>
    `);
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-number-input >>> span#error-message');
    const input = await page.find('va-number-input >>> input');
    expect(error.innerText).toContain('This is a mistake');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input hint="This is hint text" />');

    // Render the hint text
    const hintTextElement = await page.find('va-number-input >>> span.hint-text');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-number-input label="This is a field" required />',
    );

    const requiredSpan = await page.find(
      'va-number-input >>> label > span.required',
    );
    // The actual text value depends on the language of the document
    expect(requiredSpan).not.toBeNull();
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-number-input required label="This is a test" error="With an error message"/>',
    );

    await axeCheck(page);
  });

  it('fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-number-input label="Input Field" enable-analytics/>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const inputEl = await page.find('va-number-input >>> input');
    await inputEl.press('1');
    await inputEl.press('2');
    await inputEl.press('3');
    await inputEl.press('Tab');

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'blur',
      componentName: 'va-number-input',
      details: {
        label: 'Input Field',
        value: '123',
      },
    });
  });

  it('emits blur event', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-number-input label="Input Field"/>');

    const inputEl = await page.find('va-number-input >>> input');
    const blurSpy = await page.spyOnEvent('blur');
    await inputEl.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('emits input event with value updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-number-input label="Input Field"/>');

    const inputEl = await page.find('va-number-input >>> input');
    const inputSpy = await page.spyOnEvent('input');
    // Act
    await inputEl.press('1');
    const firstValue = await page.$eval(
      'va-number-input',
      (comp: HTMLInputElement) => comp.value,
    );
    await inputEl.press('2');
    const secondValue = await page.$eval(
      'va-number-input',
      (comp: HTMLInputElement) => comp.value,
    );

    // Assert
    expect(inputSpy).toHaveReceivedEventTimes(2);
    expect(firstValue).toEqual('1');
    expect(secondValue).toEqual('12');
  });

  it("doesn't fire analytics events", async () => {
    const page = await newE2EPage();

    await page.setContent('<va-number-input label="Input Field"/>');

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-number-input >>> input');
    await inputEl.press('1');
    await inputEl.press('Tab');

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('defaults to type of text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input />');

    // Level-setting expectations
    const inputEl = await page.find('va-number-input >>> input');
    expect(inputEl.getAttribute('type')).toBe('text');
  });

  it('sets a range based on min and max attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input min="0" max="4" />');

    const inputEl = await page.find('va-number-input >>> input');
    expect(inputEl.getAttribute('min')).toBe('0');
    expect(inputEl.getAttribute('max')).toBe('4');
  });

  it('allows manually setting the inputmode attribute', async () => {
    const inputModes = ['decimal', 'numeric'];
    for (const inputMode of inputModes) {
      const page = await newE2EPage();
      await page.setContent(`<va-number-input inputmode="${inputMode}" />`);
      const inputEl = await page.find('va-number-input >>> input');
      expect(inputEl.getAttribute('inputmode')).toBe(inputMode);
    }
  });

  it('renders a "$" if currency flag set to true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input currency />');
    const currencyTextElement = await page.find('va-number-input >>> div > span');
    expect(currencyTextElement.innerText).toContain('$');
  });

  it('adds aria-describedby input-message id', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input message-aria-describedby="example message" />');
    const el = await page.find('va-number-input');
    const inputEl = await page.find('va-number-input >>> input');

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

  it('should show validation message when error prop is undefined', async () => {
    const page = await newE2EPage();
    await page.setContent('<div><va-number-input label="test input" /></div>');
    const inputEl = await page.find('va-number-input >>> input');

    await inputEl.press('a');
    await inputEl.press('b');
    await inputEl.press('c');
    await inputEl.press('Tab');
    const errorEl = await page.find('va-number-input >>> #error-message');
    expect(errorEl.innerText.indexOf('number-error')).not.toBe(-1);
  })

  it('should not show default validation message when error prop is defined', async () => {
    const page = await newE2EPage();
    await page.setContent('<div><va-number-input label="test input" error="This is an error"/></div>');
    const inputEl = await page.find('va-number-input >>> input');
    await inputEl.press('a');
    await inputEl.press('b');
    await inputEl.press('c');
    await inputEl.press('Tab');
    const errorEl = await page.find('va-number-input >>> #error-message');
    expect(errorEl.innerText.indexOf('This is an error')).not.toBe(-1);
  })

  // Begin USWDS tests

  it('uswds renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-number-input label="Hello, world" uswds />');
    const element = await page.find('va-number-input');

    expect(element).toEqualHtml(`
      <va-number-input class="hydrated" label="Hello, world" uswds="">
        <mock:shadow-root>
          <div class="input-wrap">
            <label for="inputField" id="input-label" class="usa-label" part="label">
              Hello, world
            </label>
            <span id="input-error-message" role="alert"></span>
            <input aria-invalid="false" class="usa-input" id="inputField" inputmode="numeric" pattern="[0-9]+(\\.[0-9]{1,})?" type="text">
          </div>
        </mock:shadow-root>
      </va-number-input>
    `);
  });

  it('uswds renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input error="This is a mistake" uswds />');

    // Render the error message text
    const error = await page.find('va-number-input >>> .usa-error-message');
    const input = await page.find('va-number-input >>> input');
    expect(error.innerText).toContain('This is a mistake');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
  });

  it('uswds renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input label="Hello world" hint="This is hint text" uswds />');

    // Render the hint text
    const hintTextElement = await page.find('va-number-input >>> span.usa-hint');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('uswds renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-number-input label="This is a field" required uswds />',
    );

    const requiredSpan = await page.find(
      'va-number-input >>> label > span.usa-label--required',
    );
    // The actual text value depends on the language of the document
    expect(requiredSpan).not.toBeNull();
  });

  it('uswds passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-number-input required label="This is a test" error="With an error message" uswds />',
    );

    await axeCheck(page);
  });

  it('uswds fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-number-input label="Input Field" enable-analytics uswds />',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const inputEl = await page.find('va-number-input >>> input');
    await inputEl.press('1');
    await inputEl.press('2');
    await inputEl.press('3');
    await inputEl.press('Tab');

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'blur',
      componentName: 'va-number-input',
      details: {
        label: 'Input Field',
        value: '123',
      },
    });
  });

  it('uswds emits blur event', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-number-input label="Input Field" uswds />');

    const inputEl = await page.find('va-number-input >>> input');
    const blurSpy = await page.spyOnEvent('blur');
    await inputEl.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('uswds emits input event with value updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-number-input label="Input Field" uswds />');

    const inputEl = await page.find('va-number-input >>> input');
    const inputSpy = await page.spyOnEvent('input');
    // Act
    await inputEl.press('1');
    const firstValue = await page.$eval(
      'va-number-input',
      (comp: HTMLInputElement) => comp.value,
    );
    await inputEl.press('2');
    const secondValue = await page.$eval(
      'va-number-input',
      (comp: HTMLInputElement) => comp.value,
    );

    // Assert
    expect(inputSpy).toHaveReceivedEventTimes(2);
    expect(firstValue).toEqual('1');
    expect(secondValue).toEqual('12');
  });

  it("uswds doesn't fire analytics events", async () => {
    const page = await newE2EPage();

    await page.setContent('<va-number-input label="Input Field" uswds />');

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-number-input >>> input');
    await inputEl.press('1');
    await inputEl.press('Tab');

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('uswds defaults to type of text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input uswds />');

    // Level-setting expectations
    const inputEl = await page.find('va-number-input >>> input');
    expect(inputEl.getAttribute('type')).toBe('text');
  });

  it('uswds sets a range based on min and max attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input min="0" max="4" uswds />');

    const inputEl = await page.find('va-number-input >>> input');
    expect(inputEl.getAttribute('min')).toBe('0');
    expect(inputEl.getAttribute('max')).toBe('4');
  });

  it('uswds allows manually setting the inputmode attribute', async () => {
    const inputModes = ['decimal', 'numeric'];
    for (const inputMode of inputModes) {
      const page = await newE2EPage();
      await page.setContent(`<va-number-input inputmode="${inputMode}" uswds />`);
      const inputEl = await page.find('va-number-input >>> input');
      expect(inputEl.getAttribute('inputmode')).toBe(inputMode);
    }
  });

  it('uswds adds aria-describedby input-message id', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input message-aria-describedby="example message" uswds />');
    const el = await page.find('va-number-input');
    const inputEl = await page.find('va-number-input >>> input');

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
  
  it('uswds should show validation message when error prop is undefined', async () => {
    const page = await newE2EPage();
    await page.setContent('<div><va-number-input uswds label="test input" /></div>');
    const inputEl = await page.find('va-number-input >>> input');

    await inputEl.press('a');
    await inputEl.press('b');
    await inputEl.press('c');
    await inputEl.press('Tab');
    const errorEl = await page.find('va-number-input >>> span.usa-error-message');
    expect(errorEl).toEqualText('number-error');
  })

  it('uswds should not show default validation message when error prop is defined', async () => {
    const page = await newE2EPage();
    await page.setContent('<div><va-number-input uswds label="test input" error="This is an error"/></div>');
    const inputEl = await page.find('va-number-input >>> input');

    await inputEl.press('a');
    await inputEl.press('b');
    await inputEl.press('c');
    await inputEl.press('Tab');

    const errorEl = await page.find('va-number-input >>> span.usa-error-message');
    expect(errorEl.innerText).toBe('This is an error');
  })

  it('uswds useFormsPattern displays header and description for the single field pattern', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input label="This is a label" uswds use-forms-pattern="single" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    const formHeader = await page.find('va-number-input >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');

    const formDescription = await page.find('va-number-input >>> #form-description');
    expect(formDescription.innerText).toEqual('This is a form description');
  });

  it('uswds useFormsPattern displays header and description for the multiple fields pattern', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input label="This is a label" uswds use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    const formHeader = await page.find('va-number-input >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');

    const formDescription = await page.find('va-number-input >>> #form-description');
    expect(formDescription.innerText).toEqual('This is a form description');
  });

  it('uswds useFormsPattern does not display header and description if "single" or "multiple" is not indicated', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input label="This is a label" uswds use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    const formHeader = await page.find('va-number-input >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');

    const formDescription = await page.find('va-number-input >>> #form-description');
    expect(formDescription.innerText).toEqual('This is a form description');
  });

  it('uswds useFormsPattern passes an aXe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input label="This is a label" uswds use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description"/>');

    await axeCheck(page);
  });
});
