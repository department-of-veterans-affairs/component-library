import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox></va-checkbox>');

    const element = await page.find('va-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('displays checkbox description text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Example label" checkbox-description="Example checkbox description" />',
    );

    const hint = await page.find(
      'va-checkbox >>> .usa-checkbox__label-description',
    );
    expect(hint.textContent).toEqual('Example checkbox description');
  });

  it('has tile class added', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox tile label="Example label" />');

    const input = await page.find('va-checkbox >>> .va-checkbox__container');
    expect(input).toHaveClass('va-checkbox__container--tile');
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
    const element = await page.find('va-checkbox >>> #checkbox-error-message');
    const input = await page.find('va-checkbox >>> input');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
    expect(input.getAttribute('aria-describedby')).toEqual(
      'checkbox-error-message',
    );
    expect(element.textContent).toContain('Something went horribly wrong');
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox hint="This is hint text" />');

    const hintTextElement = await page.find('va-checkbox >>> .usa-hint');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox label="I am Checkbox" required/>');
    const element = await page.find('va-checkbox >>> .usa-label--required');
    expect(element.textContent).toContain('required');
  });

  it('renders description prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox description="Description prop"></va-checkbox>',
    );
    const element = await page.find('va-checkbox');
    const inputEl = await page.find('va-checkbox >>> input');
    expect(element.shadowRoot.textContent).toContain('Description prop');
    expect(
      await page.find('va-checkbox >>> slot[name="description"]'),
    ).toBeNull();
    expect(inputEl.getAttribute('aria-describedby')).toEqual('description');
  });

  it('renders a description slot (and an empty one)', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox><p slot="description">This is a description!</p><p slot="description"></p></va-checkbox>',
    );
    const element = await page.find('va-checkbox');
    const inputEl = await page.find('va-checkbox >>> input');
    const descriptionDiv = await page.find('va-checkbox >>> div#description');
    expect(element).toEqualText('This is a description!');
    expect(descriptionDiv).not.toBeNull();
    // should still add the description aria-describedby with one empty slot
    expect(inputEl.getAttribute('aria-describedby')).toEqual('description');
  });

  it('should prefer rendering the description prop over the slotted element', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox description="Description prop"><p slot="description">Slotted description</p></va-checkbox>',
    );
    const element = await page.find('va-checkbox');
    const inputEl = await page.find('va-checkbox >>> input');
    expect(element.shadowRoot.textContent).toContain('Description prop');
    expect(
      await page.find('va-checkbox >>> slot[name="description"]'),
    ).toBeNull();
    expect(inputEl.getAttribute('aria-describedby')).toEqual('description');
  });

  it('should not add aria-describedby for empty description slots', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox><p slot="description"></p><p slot="description"></p></va-checkbox>',
    );
    const element = await page.find('va-checkbox');
    const inputEl = await page.find('va-checkbox >>> input');
    expect(element).toEqualText('');
    expect(
      await page.find('va-checkbox >>> slot[name="description"]'),
    ).toBeNull();
    expect(inputEl.getAttribute('aria-describedby')).toBeNull();
  });

  it('adds new aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox error="This is a mistake" />');

    const inputEl = await page.find('va-checkbox >>> input');
    expect(inputEl.getAttribute('aria-describedby')).toContain(
      'checkbox-error-message',
    );
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-checkbox required label="This is a test" error="With an error message"/>',
    );

    await axeCheck(page, ['aria-allowed-role']);
  });

  it('adds aria-describedby input-message, checkbox-error-message and description ids', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-checkbox error="Something went horribly wrong" message-aria-describedby="This is a message">
         <p slot="description">Slotted description</p>
      </va-checkbox>`,
    );

    // Render the error message text
    const inputEl = await page.find('va-checkbox >>> input');
    expect(inputEl.getAttribute('aria-describedby')).toEqual(
      'input-message checkbox-error-message description',
    );
  });

  it('fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" enable-analytics required description="Description content"/>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const checkboxEl = await page.find('va-checkbox >>> .va-checkbox__label');
    await checkboxEl.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);

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

  it('fires an analytics event with multiple description slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-checkbox label="Just another checkbox here" enable-analytics>
        <div slot="description">Description content in a slot.<p>Testing nested nodes.</p></div>
        <p slot="description">And multiple slots.</p>
       </va-checkbox`,
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const checkboxEl = await page.find('va-checkbox >>> .va-checkbox__label');
    await checkboxEl.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);

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
    const checkboxEl = await page.find('va-checkbox >>> .va-checkbox__label');
    await checkboxEl.click();

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it("fires analytics when a description slot is used", async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" required enable-analytics="true"><p slot="description">Description content in a slot.</p></va-checkbox>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const checkboxEl = await page.find('va-checkbox >>> .va-checkbox__label');
    await checkboxEl.click();
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-checkbox',
      details: {
        label: 'Just another checkbox here',
        description: 'Description content in a slot.',
        checked: true,
        required: true,
      },
    });
  });

  it("fires analytics with the description prop if both prop and slot are set", async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" required enable-analytics="true" description="Description content"><p slot="description">Description content in a slot.</p></va-checkbox>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const checkboxEl = await page.find('va-checkbox >>> .va-checkbox__label');
    await checkboxEl.click();
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-checkbox',
      details: {
        label: 'Just another checkbox here',
        description: 'Description content',
        checked: true,
        required: true,
      },
    });
  });

  it("fires analytics when no description is used", async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" required enable-analytics="true"/>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const checkboxEl = await page.find('va-checkbox >>> .va-checkbox__label');
    await checkboxEl.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-checkbox',
      details: {
        label: 'Just another checkbox here',
        description: '',
        checked: true,
        required: true,
      },
    });
  });

  it('emits the vaChange event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" required description="Description content"/>',
    );
    const changeSpy = await page.spyOnEvent('vaChange');
    const checkboxEl = await page.find('va-checkbox >>> .va-checkbox__label');
    await checkboxEl.click();

    expect(changeSpy).toHaveReceivedEventDetail({ checked: true });
  });

  it('emits the vaChange event when checkbox is directly clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" required description="Description content"/>',
    );
    const changeSpy = await page.spyOnEvent('vaChange');
    const checkboxEl = await page.find('va-checkbox >>> #checkbox-element');
    await checkboxEl.click();

    expect(changeSpy).toHaveReceivedEventDetail({ checked: true });
  });

  it('emits blur event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" required description="Description content"/>',
    );
    const blurSpy = await page.spyOnEvent('blur');
    const checkboxEl = await page.find('va-checkbox >>> .va-checkbox__label');
    await checkboxEl.click(); // Focus on the element
    await checkboxEl.press('Tab'); // Blur the element

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('updates the checked prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox label="Just another checkbox here" checked />',
    );
    const checkboxEl = await page.find('va-checkbox >>> input');
    expect(await checkboxEl.getProperty('checked')).toBeTruthy();

    const checkboxLabelEl = await page.find(
      'va-checkbox >>> .va-checkbox__label',
    );
    await checkboxLabelEl.click();
    expect(await checkboxEl.getProperty('checked')).toBeFalsy();

    await checkboxLabelEl.click();
    expect(await checkboxEl.getProperty('checked')).toBeTruthy();
  });

  it('sets the data-indeterminate attribute on the input element', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox indeterminate label="Just another checkbox here" />',
    );
    const checkboxEl = await page.find('va-checkbox >>> input');
    expect(checkboxEl).toHaveAttribute('data-indeterminate');
  });

  it('sets aria-checked mixed for indeterminate state', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox indeterminate label="Just another checkbox here" />',
    );
    const checkboxEl = await page.find('va-checkbox >>> input');
    expect(checkboxEl).toEqualAttribute('aria-checked', 'mixed');
  });

  it('does not set aria-checked when toggled off', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox label="Just another checkbox here" />');
    const checkboxEl = await page.find('va-checkbox >>> input');

    expect(checkboxEl).not.toHaveAttribute('aria-checked');
  });

  it('does not set the data-indeterminate attribute if checked is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox indeterminate checked label="Just another checkbox here" />',
    );
    const checkboxEl = await page.find('va-checkbox >>> input');
    expect(checkboxEl).not.toHaveAttribute('data-indeterminate');
  });

  it('passes aXe check when indeterminate prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox indeterminate label="Just another checkbox here" />',
    );
    await axeCheck(page, ['aria-allowed-role']);
  });

  it('renders internal-description slot', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-checkbox label="test">
        <p slot="internal-description">Internal description</p>
      </va-checkbox>`,
    );

    // Check that the internal description slot is rendered
    const element = await page.find('va-checkbox');
    expect(element).toEqualHtml(`
      <va-checkbox class="hydrated" label="test">
        <mock:shadow-root>
          <span id="checkbox-error-message" role="alert"></span>
          <div class="va-checkbox__container" part="checkbox">
            <input aria-invalid="false" class="va-checkbox__input" id="checkbox-element" type="checkbox">
            <label class="va-checkbox__label" for="checkbox-element">
              <span part="label">test</span>
              <slot name="internal-description"></slot>
            </label>
          </div>
        </mock:shadow-root>
        <p slot="internal-description">
          Internal description
        </p>
      </va-checkbox>`);
  });
});
