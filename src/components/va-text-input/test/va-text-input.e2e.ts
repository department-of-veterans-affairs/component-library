import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-text-input', () => {
  it('renders without a label', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input />');
    const element = await page.find('va-text-input');

    expect(element).toEqualHtml(`
      <va-text-input class="hydrated">
        <mock:shadow-root>
          <input id="inputField" type="text" />
        </mock:shadow-root>
      </va-text-input>
    `);
  });

  it('renders a label', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input label="Hello, world" />');
    const element = await page.find('va-text-input >>> label');
    expect(element).not.toBeNull();
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-text-input >>> span#error-message');
    expect(error.innerText).toContain('This is a mistake');
  });

  it('adds new aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input error="This is a mistake" />');

    // Render the error message text
    const inputEl = await page.find('va-text-input >>> input');
    expect(inputEl.getAttribute('aria-describedby')).toContain('error-message');
  });

  it('appends to an existing aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-text-input error="This is a mistake" aria-describedby="random-thing" />',
    );

    // Render the error message text
    const error = await page.find('va-text-input >>> input');
    expect(error.getAttribute('aria-describedby')).toContain('random-thing');
    expect(error.getAttribute('aria-describedby')).toContain('error-message');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input label="This is a field" required />');

    const el = await page.find('va-text-input');
    // required="" is a weird thing that only happens in these tests
    expect(el).toEqualHtml(`
      <va-text-input class="hydrated" label="This is a field" required="">
        <mock:shadow-root>
          <label for="inputField">This is a field <span class="required">(*Required)</span></label>
          <input id="inputField" type="text" required="" />
        </mock:shadow-root>
      </va-text-input>
    `);

    // Render the error message text
    const requiredSpan = await page.find('va-text-input >>> .required');
    expect(requiredSpan).not.toBeNull();
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-text-input required label="This is a test" error="With an error message"/>',
    );

    await axeCheck(page);
  });

  it('fires an analytics event', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-text-input label="Input Field" enable-analytics/>',
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

  it("doesn't squelch other blur events", async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Input Field"/>');

    const inputEl = await page.find('va-text-input >>> input');
    const blurSpy = await inputEl.spyOnEvent('blur');
    await inputEl.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it("doesn't fire analytics events", async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input label="Input Field"/>');

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-text-input >>> input');
    await inputEl.press('1');
    await inputEl.press('Tab');

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('adds placeholder text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-text-input placeholder="Enter your life story" />',
    );

    // Render the error message text
    const inputEl = await page.find('va-text-input >>> input');
    expect(inputEl.getAttribute('placeholder')).toContain(
      'Enter your life story',
    );
  });

  it('adds adds a character limit with descriptive text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input maxlength="3" value="22"/>');

    // Level-setting expectations
    const inputEl = await page.find('va-text-input >>> input');
    expect(await inputEl.getProperty('value')).toBe('22');
    expect(await page.find('va-text-input >>> small')).toBeNull();

    // Test the functionality
    await inputEl.press('2');
    expect(await inputEl.getProperty('value')).toBe('222');
    expect((await page.find('va-text-input >>> small')).innerText).toContain(
      '(Max. 3 characters)',
    );
  });

  it('passes unknown props to the input element in the shadow DOM', async () => {
    // This is primarily so we don't have to make a new prop for each aria-* attribute
    const page = await newE2EPage();

    await page.setContent(
      '<va-text-input label="Hello, world" unprop="Not a real prop" />',
    );
    const element = await page.find('va-text-input');

    // Filters out label, passes unprop
    expect(element).toEqualHtml(`
      <va-text-input class="hydrated" label="Hello, world" unprop="Not a real prop">
        <mock:shadow-root>
          <label for="inputField">Hello, world</label>
          <input id="inputField" type="text" unprop="Not a real prop"/>
        </mock:shadow-root>
      </va-text-input>
    `);
  });
});
