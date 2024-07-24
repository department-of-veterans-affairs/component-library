import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-textarea label="Describe your situation" uswds="false"></va-textarea>',
    );

    const element = await page.find('va-textarea');
    expect(element).toEqualHtml(`
      <va-textarea class="hydrated" label="Describe your situation" uswds="false">
        <mock:shadow-root>
          <label for="textarea">
            Describe your situation
          </label>
          <span id="input-error-message" role="alert"></span>
          <textarea id="textarea" part="textarea" aria-invalid="false"></textarea>
        </mock:shadow-root>
      </va-textarea>
    `);
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea error="This is a mistake" uswds="false"/>');

    // Render the error message text
    const error = await page.find('va-textarea >>> span#input-error-message');
    const textarea = await page.find('va-textarea >>> textarea');
    expect(error.innerText).toContain('This is a mistake');
    expect(textarea.getAttribute('aria-invalid')).toEqual('true');
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea hint="This is hint text" uswds="false"/>');

    // Render the hint text
    const hintTextElement = await page.find('va-textarea >>> span.hint-text');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('adds new aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea error="This is a mistake" uswds="false"/>');

    // Render the error message text
    const textareaEl = await page.find('va-textarea >>> textarea ');
    expect(textareaEl.getAttribute('aria-invalid')).toEqual('true');
    expect(textareaEl.getAttribute('aria-describedby')).toContain(
      'input-error-message',
    );
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea label="This is a field" required uswds="false"/>');

    // Render the error message text
    const requiredSpan = await page.find('va-textarea >>> .required');
    // This is the key for i18next
    expect(requiredSpan).toEqualText('required');
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-textarea required label="This is a test" error="With an error message" uswds="false"/>',
    );

    await axeCheck(page);
  });

  it('fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-textarea label="Something" enable-analytics uswds="false"/>');

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const textareaEl = await page.find('va-textarea >>> textarea');
    await textareaEl.press('1');
    await textareaEl.press('2');
    await textareaEl.press('3');
    await textareaEl.press('Tab');

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'blur',
      componentName: 'va-textarea',
      details: {
        label: 'Something',
        value: '123',
      },
    });
  });

  it('does not fire an analytics event when enableAnalytics is not truthy', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea label="Something" uswds="false"/>');

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const textareaEl = await page.find('va-textarea >>> textarea');
    await textareaEl.press('1');
    await textareaEl.press('2');
    await textareaEl.press('3');
    await textareaEl.press('Tab');

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('emits blur event', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-textarea label="Input Field" uswds="false"/>');

    const textareaEl = await page.find('va-textarea >>> textarea');
    const blurSpy = await page.spyOnEvent('blur');
    await textareaEl.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('emits input event with value updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-textarea label="Input Field" uswds="false"/>');

    const textareaEl = await page.find('va-textarea >>> textarea');
    const inputSpy = await page.spyOnEvent('input');

    // Act
    await textareaEl.press('a');
    const firstValue = await page.$eval(
      'va-textarea',
      (comp: HTMLTextAreaElement) => comp.value,
    );
    await textareaEl.press('s');
    const secondValue = await page.$eval(
      'va-textarea',
      (comp: HTMLTextAreaElement) => comp.value,
    );

    // Assert
    expect(inputSpy).toHaveReceivedEventTimes(2);
    expect(firstValue).toEqual('a');
    expect(secondValue).toEqual('as');
  });

  it('adds a max character limit with descriptive text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea maxlength="3" value="22" uswds="false"/>');

    // Level-setting expectations
    const textareaEl = await page.find('va-textarea >>> textarea');
    expect(await textareaEl.getProperty('value')).toBe('22');
    expect(await page.find('va-textarea >>> small')).toBeNull();

    // Test the functionality
    await textareaEl.press('2');
    expect(await textareaEl.getProperty('value')).toBe('222');
    // This is the i18next key surrounded by parentheses
    expect((await page.find('va-textarea >>> small')).innerText).toContain(
      'max-chars',
    );
  });

  it('ignores negative maxlength values', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea maxlength="-5" uswds="false"/>');

    // Level-setting expectations
    const textareaEl = await page.find('va-textarea >>> textarea');
    expect(await page.find('va-textarea >>> small')).toBeNull();

    // Test the functionality
    await textareaEl.type('Hello, nice to meet you');
    expect(await textareaEl.getProperty('value')).toBe(
      'Hello, nice to meet you',
    );
    expect(await page.find('va-textarea >>> small')).toBeNull();
  });

  it('ignores a maxlength of zero', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea maxlength="0" uswds="false"/>');

    // Level-setting expectations
    const textareaEl = await page.find('va-textarea >>> textarea');
    expect(await page.find('va-textarea >>> small')).toBeNull();

    // Test the functionality
    await textareaEl.type('Hello, nice to meet you');
    expect(await textareaEl.getProperty('value')).toBe(
      'Hello, nice to meet you',
    );
    expect(await page.find('va-textarea >>> small')).toBeNull();
  });

  // Begin USWDS v3 test
  it('uswds v3 renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-textarea label="Describe your situation"></va-textarea>',
    );

    const element = await page.find('va-textarea');
    expect(element).toEqualHtml(`
      <va-textarea class="hydrated" label="Describe your situation">
        <mock:shadow-root>
          <div class="input-wrap">
            <label class="usa-label" for="input-type-textarea" id="input-label" part="label">
              Describe your situation
            </label>
            <slot></slot>
            <span id="input-error-message" role="alert"></span>
            <textarea id="input-type-textarea" part="input-type-textarea" aria-invalid="false" class="usa-textarea"></textarea>
          </div?
        </mock:shadow-root>
      </va-textarea>
    `);
  });

  it('uswds v3 renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-textarea >>> span#input-error-message');
    const textarea = await page.find('va-textarea >>> textarea');
    expect(error.innerText).toContain('This is a mistake');
    expect(textarea.getAttribute('aria-invalid')).toEqual('true');
    expect(textarea.getAttribute('aria-describedby')).toContain(
      'input-error-message',
    );
  });

  it('uswds v3 renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea hint="This is hint text" label="Hello world" />');

    // Render the hint text
    const hintTextElement = await page.find('va-textarea >>> div.usa-hint');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('uswds v3 adds new aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea error="This is a mistake" />');

    // Render the error message text
    const textareaEl = await page.find('va-textarea >>> textarea ');
    expect(textareaEl.getAttribute('aria-describedby')).toContain(
      'input-error-message',
    );
  });

  it('uswds v3 renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea label="This is a field" required />');

    // Render the error message text
    const requiredSpan = await page.find('va-textarea >>> .usa-label--required');
    // This is the key for i18next
    expect(requiredSpan).toEqualText('required');
  });

  it('uswds v3 passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-textarea required label="This is a test" error="With an error message" />',
    );

    await axeCheck(page);
  });

  it('uswds v3 fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-textarea label="Something" enable-analytics />');

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const textareaEl = await page.find('va-textarea >>> textarea');
    await textareaEl.press('1');
    await textareaEl.press('2');
    await textareaEl.press('3');
    await textareaEl.press('Tab');

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'blur',
      componentName: 'va-textarea',
      details: {
        label: 'Something',
        value: '123',
      },
    });
  });

  it('uswds v3 does not fire an analytics event when enableAnalytics is not truthy', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea label="Something" />');

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const textareaEl = await page.find('va-textarea >>> textarea');
    await textareaEl.press('1');
    await textareaEl.press('2');
    await textareaEl.press('3');
    await textareaEl.press('Tab');

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('uswds v3 demits blur event', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-textarea label="Input Field" />');

    const textareaEl = await page.find('va-textarea >>> textarea');
    const blurSpy = await page.spyOnEvent('blur');
    await textareaEl.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('uswds v3 emits input event with value updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-textarea label="Input Field" />');

    const textareaEl = await page.find('va-textarea >>> textarea');
    const inputSpy = await page.spyOnEvent('input');

    // Act
    await textareaEl.press('a');
    const firstValue = await page.$eval(
      'va-textarea',
      (comp: HTMLTextAreaElement) => comp.value,
    );
    await textareaEl.press('s');
    const secondValue = await page.$eval(
      'va-textarea',
      (comp: HTMLTextAreaElement) => comp.value,
    );

    // Assert
    expect(inputSpy).toHaveReceivedEventTimes(2);
    expect(firstValue).toEqual('a');
    expect(secondValue).toEqual('as');
  });

  it('uswds v3 adds a max character limit with descriptive text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea maxlength="3" value="22" />');

    // Level-setting expectations
    const textareaEl = await page.find('va-textarea >>> textarea');
    expect(await textareaEl.getProperty('value')).toBe('22');
    expect(await page.find('va-textarea >>> div.usa-hint')).toBeNull();

    // Test the functionality
    await textareaEl.press('2');
    expect(await textareaEl.getProperty('value')).toBe('222');
    // This is the i18next key surrounded by parentheses
    expect((await page.find('va-textarea >>> span.usa-hint')).innerText).toContain(
      'max-chars',
    );
  });

  it('uswds v3 ignores negative maxlength values', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea maxlength="-5" />');

    // Level-setting expectations
    const textareaEl = await page.find('va-textarea >>> textarea');
    expect(await page.find('va-textarea >>> div.usa-hint')).toBeNull();

    // Test the functionality
    await textareaEl.type('Hello, nice to meet you');
    expect(await textareaEl.getProperty('value')).toBe(
      'Hello, nice to meet you',
    );
    expect(await page.find('va-textarea >>> div.usa-hint')).toBeNull();
  });

  it('uswds v3 ignores a maxlength of zero', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea maxlength="0" />');

    // Level-setting expectations
    const textareaEl = await page.find('va-textarea >>> textarea');
    expect(await page.find('va-textarea >>> div.usa-hint')).toBeNull();

    // Test the functionality
    await textareaEl.type('Hello, nice to meet you');
    expect(await textareaEl.getProperty('value')).toBe(
      'Hello, nice to meet you',
    );
    expect(await page.find('va-textarea >>> div.usa-hint')).toBeNull();
  });

  it('uswds shows chars allowed on load if maxlength and charcount set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-textarea charcount maxlength="10" />'
    );

    const span = await page.find('va-textarea >>> span.usa-character-count__status')
    expect(span.innerText).toEqual('10 characters allowed');
  });

  it('uswds shows chars left if maxlength set', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-textarea charcount maxlength="10"/>'
    );

    const inputEl = await page.find('va-textarea >>> textarea');
    await inputEl.type('Hello');
    const span = await page.find('va-textarea >>> span.usa-character-count__status')

    expect(span.innerText).toEqual('5 characters left');

  });

  it('uswds shows chars over limit as error and sets aria-invalid attribute', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-textarea charcount maxlength="10"/>'
    );

    const inputEl = await page.find('va-textarea >>> textarea');
    await inputEl.type('This is too long');

    const messageSpan = await page.find('va-textarea >>> span.usa-character-count__status');
    expect(messageSpan.innerText).toEqual('6 characters over limit');

    const {color} = await messageSpan.getComputedStyle()
    expect(color).toEqual(
      'rgb(181, 9, 9)',
    );

    expect(inputEl.getAttribute('aria-invalid')).toBe("true");
  });
  
  it('uswds useFormsPattern displays header for the single field pattern', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-textarea use-forms-pattern="single" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description" label="Describe your situation"></va-textarea>',
    );

    const formHeader = await page.find('va-textarea >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('uswds useFormsPattern displays header for the multiple field pattern', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-textarea use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description" label="Describe your situation"></va-textarea>',
    );

    const formHeader = await page.find('va-textarea >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('uswds useFormsPattern does not display header if "single" or "multiple" is not indicated', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-textarea form-heading-level="1" form-heading="This is a form header" form-description="This is a form description" label="Describe your situation"></va-textarea>',
    );

    const formHeader = await page.find('va-textarea >>> h1');
    expect(formHeader).toBeNull();
  });

  it('uswds useFormsPattern passes an aXe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea use-forms-pattern="single" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description" label="Describe your situation"></va-textarea>',);

    await axeCheck(page);
  });

});
