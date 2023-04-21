import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox></va-checkbox>');

    const element = await page.find('va-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('renders with aria-invalid set to false by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox></va-checkbox>');

    const input = await page.find('va-checkbox >>> input');
    expect(input.getAttribute('aria-invalid')).toEqual('false');
  });

  it('renders a label', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox label="Cool label, right?" />');
    const element = await page.find('va-checkbox >>> label');
    expect(element).not.toBeNull();
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox error="Something went horribly wrong" />',
    );
    const element = await page.find('va-checkbox >>> #error-message');
    const input = await page.find('va-checkbox >>> input');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
    expect(element.textContent).toContain('Something went horribly wrong');
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox hint="This is hint text" />');

    // Render the hint text
    const hintTextElement = await page.find('va-checkbox >>> span.hint-text');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox label="I am Checkbox" required/>');
    const element = await page.find('va-checkbox >>> .required');
    expect(element.textContent).toContain('required');
  });

  it('renders a description', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox><p slot="description">This is a description!</p></va-checkbox',
    );
    const element = await page.find('va-checkbox');
    expect(element).toEqualText('This is a description!');
  });

  // This test fails, but is here as documentation. The unknown slot and unnamed
  // slot shouldn't show up in the browser, but the test still finds the text
  // because the elements are still in the light DOM.
  it.skip('does not render unknown content', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox><p slot="nope">Should not show up</p><p>Nor should unnamed slotted content</p></va-checkbox',
    );
    const element = await page.find('va-checkbox');
    expect(element).toEqualText('');
  });

  it('should prefer rendering the description prop over the slotted element', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox description="Description prop"><p slot="description">Slotted description</p></va-checkbox',
    );
    const element = await page.find('va-checkbox');
    expect(element.shadowRoot.textContent).toContain('Description prop');
    expect(
      await page.find('va-checkbox >>> slot[name="description"]'),
    ).toBeNull();
  });

  it('adds new aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox error="This is a mistake" />');

    // Render the error message text
    const inputEl = await page.find('va-checkbox >>> input');
    expect(inputEl.getAttribute('aria-describedby')).toContain('error-message');
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-checkbox required label="This is a test" error="With an error message"/>',
    );

    await axeCheck(page);
  });

  it('fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" enable-analytics required description="Description content"/>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-checkbox >>> input');
    await inputEl.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-checkbox',
      details: {
        label: 'Just another checkbox here',
        description: 'Description content',
        required: true, // This will be omitted if false, evidently,
        checked: true,
      },
    });
  });

  it('fires an analytics event with description slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-checkbox label="Just another checkbox here" enable-analytics>
        <div slot="description">Description content in a slot.<p>Testing nested nodes.</p></div>
        <p slot="description">And multiple slots.</p>
       </va-checkbox`,
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-checkbox >>> input');
    await inputEl.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-checkbox',
      details: {
        label: 'Just another checkbox here',
        description:
          'Description content in a slot.Testing nested nodes. And multiple slots.',
        checked: true,
        required: false,
      },
    });
  });

  it("doesn't fire an analytics event when enableAnalytics is false", async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" required description="Description content"/>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-checkbox >>> input');
    await inputEl.click();

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('emits the vaChange event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" required description="Description content"/>',
    );
    const changeSpy = await page.spyOnEvent('vaChange');
    const inputEl = await page.find('va-checkbox >>> input');
    await inputEl.click();

    expect(changeSpy).toHaveReceivedEventDetail({ checked: true });
  });

  it('emits blur event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" required description="Description content"/>',
    );
    const blurSpy = await page.spyOnEvent('blur');
    const inputEl = await page.find('va-checkbox >>> input');
    await inputEl.click(); // Focus on the element
    await inputEl.press('Tab'); // Blur the element

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('updates the checked prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" checked/>',
    );
    const inputEl = await page.find('va-checkbox >>> input');
    expect(await inputEl.getProperty('checked')).toBeTruthy();

    await inputEl.click();
    expect(await inputEl.getProperty('checked')).toBeFalsy();

    await inputEl.click();
    expect(await inputEl.getProperty('checked')).toBeTruthy();
  });

  // Begin USWDS v3 variation tests
  it('uswds v3 variation renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox uswds></va-checkbox>');

    const element = await page.find('va-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('uswds v3 displays checkbox description text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox uswds label="Example label" checkbox-description="Example checkbox description" />',
    );

    const hint = await page.find('va-checkbox >>> .usa-checkbox__label-description');
    expect(hint.textContent).toEqual("Example checkbox description");
  });

  it('uswds v3 has tile class added', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox uswds tile label="Example label" />',
    );

    const input = await page.find('va-checkbox >>> .usa-checkbox__input');
    expect(input).toHaveClass("usa-checkbox__input--tile");
  });

  it('uswds v3 renders with aria-invalid set to false by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox uswds></va-checkbox>');

    const input = await page.find('va-checkbox >>> input');
    expect(input.getAttribute('aria-invalid')).toEqual('false');
  });

  it('uswds v3 renders a label', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox uswds label="Cool label, right?" />');
    const element = await page.find('va-checkbox >>> label');
    expect(element).not.toBeNull();
  });

  it('uswds v3 renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox uswds error="Something went horribly wrong" />',
    );
    const element = await page.find('va-checkbox >>> #checkbox-error-message');
    const input = await page.find('va-checkbox >>> input');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
    expect(element.textContent).toContain('Something went horribly wrong');
  });

  it('uswds v3 renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox uswds hint="This is hint text" />');

    const hintTextElement = await page.find('va-checkbox >>> .usa-hint');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('uswds v3 renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox uswds label="I am Checkbox" required/>');
    const element = await page.find('va-checkbox >>> .usa-label--required');
    expect(element.textContent).toContain('required');
  });

  it('uswds v3 renders a description slot', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox uswds><p slot="description">This is a description!</p></va-checkbox',
    );
    const element = await page.find('va-checkbox');
    expect(element).toEqualText('This is a description!');
  });

  it('uswds v3 should prefer rendering the description prop over the slotted element', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox uswds description="Description prop"><p slot="description">Slotted description</p></va-checkbox',
    );
    const element = await page.find('va-checkbox');
    expect(element.shadowRoot.textContent).toContain('Description prop');
    expect(
      await page.find('va-checkbox >>> slot[name="description"]'),
    ).toBeNull();
  });

  it('uswds v3 adds new aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox uswds error="This is a mistake" />');

    const inputEl = await page.find('va-checkbox >>> input');
    expect(inputEl.getAttribute('aria-describedby')).toContain('checkbox-error-message');
  });

  it('uswds v3 passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-checkbox uswds required label="This is a test" error="With an error message"/>',
    );

    await axeCheck(page);
  });

  it('uswds v3 fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox uswds label="Just another checkbox here" enable-analytics required description="Description content"/>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const checkboxEl = await page.find('va-checkbox >>> .usa-checkbox__label');
    await checkboxEl.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-checkbox',
      details: {
        label: 'Just another checkbox here',
        description: 'Description content',
        required: true, // This will be omitted if false, evidently,
        checked: true,
      },
    });
  });

  it('uswds v3 fires an analytics event with description slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-checkbox uswds label="Just another checkbox here" enable-analytics>
        <div slot="description">Description content in a slot.<p>Testing nested nodes.</p></div>
        <p slot="description">And multiple slots.</p>
       </va-checkbox`,
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const checkboxEl = await page.find('va-checkbox >>> .usa-checkbox__label');
    await checkboxEl.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-checkbox',
      details: {
        label: 'Just another checkbox here',
        description:
          'Description content in a slot.Testing nested nodes. And multiple slots.',
        checked: true,
        required: false,
      },
    });
  });

  it("uswds v3 doesn't fire an analytics event when enableAnalytics is false", async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox uswds label="Just another checkbox here" required description="Description content"/>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const checkboxEl = await page.find('va-checkbox >>> .usa-checkbox__label');
    await checkboxEl.click();

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('uswds v3 emits the vaChange event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox uswds label="Just another checkbox here" required description="Description content"/>',
    );
    const changeSpy = await page.spyOnEvent('vaChange');
    const checkboxEl = await page.find('va-checkbox >>> .usa-checkbox__label');
    await checkboxEl.click();

    expect(changeSpy).toHaveReceivedEventDetail({ checked: true });
  });

  it('uswds v3 emits blur event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox uswds label="Just another checkbox here" required description="Description content"/>',
    );
    const blurSpy = await page.spyOnEvent('blur');
    const checkboxEl = await page.find('va-checkbox >>> .usa-checkbox__label');
    await checkboxEl.click(); // Focus on the element
    await checkboxEl.press('Tab'); // Blur the element

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('uswds v3 updates the checked prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox uswds label="Just another checkbox here" checked />',
    );
    const checkboxEl = await page.find('va-checkbox >>> input');
    expect(await checkboxEl.getProperty('checked')).toBeTruthy();

    const checkboxLabelEl = await page.find('va-checkbox >>> .usa-checkbox__label');
    await checkboxLabelEl.click();
    expect(await checkboxEl.getProperty('checked')).toBeFalsy();

    await checkboxLabelEl.click();
    expect(await checkboxEl.getProperty('checked')).toBeTruthy();
  });
});
