import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox></va-checkbox>');

    const element = await page.find('va-checkbox');
    expect(element).toHaveClass('hydrated');
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
    expect(element.textContent).toContain('Something went horribly wrong');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox label="I am Checkbox" required/>');
    const element = await page.find('va-checkbox >>> .required');
    expect(element.textContent).toContain('(Required)');
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

  it('appends to an existing aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox error="This is a mistake" aria-describedby="random-thing" />',
    );

    // Render the error message text
    const error = await page.find('va-checkbox >>> input');
    expect(error.getAttribute('aria-describedby')).toContain('random-thing');
    expect(error.getAttribute('aria-describedby')).toContain('error-message');
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

  it('emits the vaBlur event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" required description="Description content"/>',
    );
    const analyticsSpy = await page.spyOnEvent('vaBlur');
    const inputEl = await page.find('va-checkbox >>> input');
    await inputEl.click(); // Focus on the element
    await inputEl.press('Tab'); // Blur the element

    expect(analyticsSpy).toHaveReceivedEvent();
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
});
