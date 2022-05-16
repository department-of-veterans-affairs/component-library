import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea label="Describe your situation"></va-textarea>');

    const element = await page.find('va-textarea');
    expect(element).toEqualHtml(`
      <va-textarea class="hydrated" label="Describe your situation">
        <mock:shadow-root>
          <label for="textarea" id="textarea-label">
            Describe your situation
          </label>
          <textarea aria-labelledby="textarea-label" id="textarea"></textarea>
        </mock:shadow-root>
      </va-textarea>
    `);
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-textarea >>> span#error-message');
    expect(error.innerText).toContain('This is a mistake');
  });

  it('adds new aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea error="This is a mistake" />');

    // Render the error message text
    const textareaEl = await page.find('va-textarea >>> textarea ');
    expect(textareaEl.getAttribute('aria-describedby')).toContain('error-message');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea label="This is a field" required />');

    // Render the error message text
    const requiredSpan = await page.find('va-textarea >>> .required');
    // This is the key for i18next
    expect(requiredSpan).toEqualText('(*required)');
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

    await page.setContent(
      '<va-textarea label="Something" enable-analytics/>',
    );

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
    const firstValue = await page.$eval("va-textarea", (comp : HTMLTextAreaElement) => comp.value)
    await textareaEl.press('s');
    const secondValue = await page.$eval("va-textarea", (comp : HTMLTextAreaElement) => comp.value)

    // Assert
    expect(inputSpy).toHaveReceivedEventTimes(2);
    expect(firstValue).toEqual('a');
    expect(secondValue).toEqual('as');
  });

  it('adds a max character limit with descriptive text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-textarea maxlength="3" value="22"/>',
    );

    // Level-setting expectations
    const textareaEl = await page.find('va-textarea >>> textarea');
    expect(await textareaEl.getProperty('value')).toBe('22');
    expect(await page.find('va-textarea >>> small')).toBeNull();

    // Test the functionality
    await textareaEl.press('2');
    expect(await textareaEl.getProperty('value')).toBe('222');
    // This is the i18next key surrounded by parentheses
    expect((await page.find('va-textarea >>> small')).innerText).toContain(
      '(max-chars)',
    );
  });

});
