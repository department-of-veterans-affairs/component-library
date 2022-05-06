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
          <input id="inputField" type="number" />
        </mock:shadow-root>
      </va-number-input>
    `);
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-number-input >>> span#error-message');
    expect(error.innerText).toContain('This is a mistake');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-number-input label="This is a field" required />',
    );

    const el = await page.find('va-number-input');
    // required="" is a weird thing that only happens in these tests
    expect(el).toEqualHtml(`
      <va-number-input class="hydrated" label="This is a field" required="">
        <mock:shadow-root>
          <label for="inputField">
            This is a field <span class="required">(*Required)</span>
          </label>
          <input id="inputField" type="number" />
        </mock:shadow-root>
      </va-number-input>
    `);

    // Render the error message text
    const requiredSpan = await page.find('va-number-input >>> .required');
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

  it('defaults to type of number', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-number-input />');

    // Level-setting expectations
    const inputEl = await page.find('va-number-input >>> input');
    expect(inputEl.getAttribute('type')).toBe('number');
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
});
