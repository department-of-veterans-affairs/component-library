import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-textarea label="Describe your situation"></va-textarea>',
    );

    const element = await page.find('va-textarea');
    expect(element).toEqualHtml(`
      <va-textarea class="hydrated" label="Describe your situation">
        <mock:shadow-root>
          <label for="textarea">
            Describe your situation
          </label>
          <span id="error-message" role="alert"></span>
          <textarea id="textarea" part="textarea" aria-invalid="false"></textarea>
        </mock:shadow-root>
      </va-textarea>
    `);
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-textarea >>> span#error-message');
    const textarea = await page.find('va-textarea >>> textarea');
    expect(error.innerText).toContain('This is a mistake');
    expect(textarea.getAttribute('aria-invalid')).toEqual('true');
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea hint="This is hint text" />');

    // Render the hint text
    const hintTextElement = await page.find('va-textarea >>> span.hint-text');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('adds new aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea error="This is a mistake" />');

    // Render the error message text
    const textareaEl = await page.find('va-textarea >>> textarea ');
    expect(textareaEl.getAttribute('aria-describedby')).toContain(
      'error-message',
    );
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea label="This is a field" required />');

    // Render the error message text
    const requiredSpan = await page.find('va-textarea >>> .required');
    // This is the key for i18next
    expect(requiredSpan).toEqualText('required');
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-textarea required label="This is a test" error="With an error message"/>',
    );

    await axeCheck(page);
  });

  it('fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-textarea label="Something" enable-analytics/>');

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
    await page.setContent('<va-textarea label="Something" />');

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

    await page.setContent('<va-textarea label="Input Field"/>');

    const textareaEl = await page.find('va-textarea >>> textarea');
    const blurSpy = await page.spyOnEvent('blur');
    await textareaEl.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('emits input event with value updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-textarea label="Input Field"/>');

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
    await page.setContent('<va-textarea maxlength="3" value="22"/>');

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
    await page.setContent('<va-textarea maxlength="-5"/>');

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
    await page.setContent('<va-textarea maxlength="0"/>');

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
      '<va-textarea label="Describe your situation" uswds></va-textarea>',
    );

    const element = await page.find('va-textarea');
    expect(element).toEqualHtml(`
      <va-textarea class="hydrated" label="Describe your situation" uswds="">
        <mock:shadow-root>
          <label class="usa-label" for="textarea" part="label">
            Describe your situation
          </label>
          <slot></slot>
          <span id="input-error-message" role="alert"></span>
          <textarea id="textarea" part="textarea" aria-invalid="false" class="usa-textarea"></textarea>
        </mock:shadow-root>
      </va-textarea>
    `);
  });

  it('uswds v3 renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea error="This is a mistake" uswds />');

    // Render the error message text
    const error = await page.find('va-textarea >>> span#input-error-message');
    const textarea = await page.find('va-textarea >>> textarea');
    expect(error.innerText).toContain('This is a mistake');
    expect(textarea.getAttribute('aria-invalid')).toEqual('true');
  });

  it('uswds v3 renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea hint="This is hint text" uswds />');

    // Render the hint text
    const hintTextElement = await page.find('va-textarea >>> span.usa-hint');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('uswds v3 adds new aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea error="This is a mistake" uswds />');

    // Render the error message text
    const textareaEl = await page.find('va-textarea >>> textarea ');
    expect(textareaEl.getAttribute('aria-describedby')).toContain(
      'error-message',
    );
  });

  it('uswds v3 renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea label="This is a field" required uswds />');

    // Render the error message text
    const requiredSpan = await page.find('va-textarea >>> .usa-label--required');
    // This is the key for i18next
    expect(requiredSpan).toEqualText('required');
  });

  it('uswds v3 passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-textarea required label="This is a test" error="With an error message" uswds />',
    );

    await axeCheck(page);
  });

  it('uswds v3 fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-textarea label="Something" enable-analytics uswds />');

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
    await page.setContent('<va-textarea label="Something" uswds />');

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

    await page.setContent('<va-textarea label="Input Field" uswds />');

    const textareaEl = await page.find('va-textarea >>> textarea');
    const blurSpy = await page.spyOnEvent('blur');
    await textareaEl.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('uswds v3 emits input event with value updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-textarea label="Input Field" uswds />');

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
    await page.setContent('<va-textarea maxlength="3" value="22" uswds />');

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

  it('uswds v3 ignores negative maxlength values', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea maxlength="-5" uswds />');

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

  it('uswds v3 ignores a maxlength of zero', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea maxlength="0" uswds />');

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
});
