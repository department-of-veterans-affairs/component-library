import { newE2EPage } from '@stencil/core/testing';

describe('va-combo-box', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(`
          <va-combo-box label="A label" value="bar">
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
          </va-select>
        `);
    const element = await page.find('va-combo-box');
    await page.find('va-combo-box >>> input');
    expect(element).toEqualHtml(`
            <va-combo-box class="hydrated" label="A label" value="bar">
                <mock:shadow-root>
                    <label class="usa-label" for="options" id="options-label">
                    A label
                    </label>
                    <span id="input-error-message" role="alert"></span>
                    <slot></slot>
                    <div class="usa-combo-box usa-combo-box--pristine" data-default-value="bar" data-enhanced="true">
                    <select aria-hidden="true" class="usa-combo-box__select usa-select usa-sr-only" tabindex="-1">
                        <option value="foo">
                        Foo
                        </option>
                        <option value="bar">
                        Bar
                        </option>
                    </select>
                    <input aria-autocomplete="list" aria-controls="options--list" aria-describedby="options--assistiveHint" aria-expanded="false" aria-owns="options--list" autocapitalize="off" autocomplete="off" class="usa-combo-box__input" id="options" role="combobox" type="text">
                    <span class="usa-combo-box__clear-input__wrapper" tabindex="-1">
                        <button aria-label="Clear the select contents" class="usa-combo-box__clear-input" type="button"></button>
                    </span>
                    <span class="usa-combo-box__input-button-separator"></span>
                    <span class="usa-combo-box__toggle-list__wrapper" tabindex="-1">
                        <button aria-label="Toggle the dropdown list" class="usa-combo-box__toggle-list" tabindex="-1" type="button"></button>
                    </span>
                    <ul aria-labelledby="options-label" class="usa-combo-box__list" hidden="" id="options--list" role="listbox" tabindex="-1"></ul>
                    <div class="usa-combo-box__status usa-sr-only" role="status"></div>
                    <span class="usa-sr-only" id="options--assistiveHint">
                        When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.
                    </span>
                    </div>
                </mock:shadow-root>
                <option value="foo">
                    Foo
                </option>
                <option value="bar">
                    Bar
                </option>
            </va-combo-box>`);
  });

  it('renders default value', async () => {
    const page = await newE2EPage();

    await page.setContent(`
          <va-combo-box label="A label" value="bar">
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
          </va-select>
        `);

    await page.find('va-combo-box >>> input');
    const combobox = await page.find('va-combo-box >>> .usa-combo-box');
    expect(combobox).toEqualAttribute('data-default-value', 'bar');
  });

  it('renders opt groups', async () => {
    const page = await newE2EPage();

    await page.setContent(`
          <va-combo-box label="A label">
            <optgroup label="group 1">
              <option value="foo">Foo</option>
              <option value="bar">Bar</option>
            </optgroup>
          </va-select>
        `);
        const element = await page.find('va-combo-box');
        expect(element).toEqualHtml(`
          <va-combo-box class="hydrated" label="A label">
                <mock:shadow-root>
                    <label class="usa-label" for="options" id="options-label">
                    A label
                    </label>
                    <span id="input-error-message" role="alert"></span>
                    <slot></slot>
                    <div class="usa-combo-box" data-enhanced="true">
                    <select aria-hidden="true" class="usa-combo-box__select usa-select usa-sr-only" tabindex="-1">
                        <option data-optgroup="true" id="optgroup-0">
                        group 1
                        </option>
                        <option aria-describedby="optgroup-0" data-optgroup-option="true" value="foo">
                        Foo
                        </option>
                        <option aria-describedby="optgroup-0" data-optgroup-option="true" value="bar">
                        Bar
                        </option>
                    </select>
                    <input aria-autocomplete="list" aria-controls="options--list" aria-describedby="options--assistiveHint" aria-expanded="false" aria-owns="options--list" autocapitalize="off" autocomplete="off" class="usa-combo-box__input" id="options" role="combobox" type="text">
                    <span class="usa-combo-box__clear-input__wrapper" tabindex="-1">
                        <button aria-label="Clear the select contents" class="usa-combo-box__clear-input" type="button"></button>
                    </span>
                    <span class="usa-combo-box__input-button-separator"></span>
                    <span class="usa-combo-box__toggle-list__wrapper" tabindex="-1">
                        <button aria-label="Toggle the dropdown list" class="usa-combo-box__toggle-list" tabindex="-1" type="button"></button>
                    </span>
                    <ul aria-labelledby="options-label" class="usa-combo-box__list" hidden="" id="options--list" role="listbox" tabindex="-1"></ul>
                    <div class="usa-combo-box__status usa-sr-only" role="status"></div>
                    <span class="usa-sr-only" id="options--assistiveHint">
                        When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.
                    </span>
                    </div>
                </mock:shadow-root>
                <optgroup label="group 1">
                  <option value="foo">
                      Foo
                  </option>
                  <option value="bar">
                    Bar
                  </option>
                </optgroup>
            </va-combo-box>`);

      const input = await page.find('va-combo-box >>> input');
      await input.click();
      const listOptions = await page.findAll('va-combo-box >>> li');
      expect(listOptions.length).toBe(3);
      expect(listOptions[0].getAttribute('data-value')).toBe('group 1');
      expect(listOptions[0].innerText).toBe('group 1');
      expect(listOptions[0].getAttribute('class')).toContain('usa-combo-box__list-option--group');
      expect(listOptions[0].getAttribute('id')).toBe('optgroup-0');

      expect(listOptions[1].innerText).toBe('Foo');
      expect(listOptions[1].getAttribute('data-value')).toBe('foo');
      expect(listOptions[1].getAttribute('aria-describedby')).toBe('optgroup-0');
      expect(listOptions[1].getAttribute('aria-setsize')).toBe('2');
      expect(listOptions[1].getAttribute('aria-posinset')).toBe('1');
      expect(listOptions[1].getAttribute('aria-selected')).toBe('false');
      expect(listOptions[1].getAttribute('class')).toContain('usa-combo-box__list-option');
      expect(listOptions[1].getAttribute('class')).toContain('usa-combo-box__list-option--group-option');

      expect(listOptions[1].getAttribute('id')).toBe('options--list--option-1');
  });

  it('emits change event on selection', async () => {
    const page = await newE2EPage();

    await page.setContent(`
          <va-combo-box label="A label">
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
          </va-select>
        `);
    const input = await page.find('va-combo-box >>> input');
    const changeEvent = await page.spyOnEvent('vaSelect');

    await input.click();
    await page.keyboard.press('ArrowDown'); 
    await page.keyboard.press('Enter'); 
    const vaSelectEvent = changeEvent.events[0];
    expect(vaSelectEvent.detail.value).toEqual('foo');
    expect(vaSelectEvent.type).toEqual('vaSelect');
  });

  it('emits change event on selection with opt groups', async () => {
    const page = await newE2EPage();

    await page.setContent(`
          <va-combo-box label="A label">
            <optgroup label="group 1">
              <option value="foo">Foo</option>
              <option value="bar">Bar</option>
            </optgroup>
          </va-select>
        `);

    const input = await page.find('va-combo-box >>> input');
    const changeEvent = await page.spyOnEvent('vaSelect');

    await input.click();
    await page.keyboard.press('ArrowDown'); 
    await page.keyboard.press('Enter'); 
    const vaSelectEvent = changeEvent.events[0];
    expect(vaSelectEvent.detail.value).toEqual('foo');
    expect(vaSelectEvent.type).toEqual('vaSelect');
  });

  it('renders error message', async () => {
    const page = await newE2EPage();

    await page.setContent(`
          <va-combo-box label="A label" error="test error message">
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
          </va-select>
        `);
    const input = await page.find('va-combo-box >>> input');
    const element = await page.find('va-combo-box >>>  #input-error-message');
    expect(element).toEqualHtml(`<span id="input-error-message" role="alert">
            <span class="usa-sr-only">Error</span>
            <span class="usa-error-message">test error message</span>
            </span>`);
    expect(input).toEqualAttribute('aria-describedby', 'input-error-message  options--assistiveHint');
  });

  it('renders label with required', async () => {
    const page = await newE2EPage();

    await page.setContent(`
          <va-combo-box label="A label" required>
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
          </va-select>
        `);
    await page.find('va-combo-box >>> input');
    const element = await page.find('va-combo-box >>> label');
    expect(element)
      .toEqualHtml(`<label class="usa-label" for="options" id="options-label">
            A label
            <span class="usa-label--required">  (*Required)</span>
            </label>`);
  });

  it('renders placeholder text ', async () => {
    const page = await newE2EPage();

    await page.setContent(`
          <va-combo-box label="A label" placeholder="test placeholder">
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
          </va-select>
        `);
    await page.find('va-combo-box >>> input');
    const element = await page.find('va-combo-box >>> input');
    expect(element).toEqualAttribute('placeholder', 'test placeholder');
  });

  it('renders hint text ', async () => {
    const page = await newE2EPage();
    const hintText = 'test hint';
    const labelText = 'A label';

    await page.setContent(`
          <va-combo-box label="${labelText}" hint="${hintText}">
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
          </va-select>
        `);
    await page.find('va-combo-box >>> input');

    const hintElement = await page.find('va-combo-box >>> #input-hint');
    expect(hintElement).toEqualText('test hint');
    expect(hintElement).toEqualHtml(`<span class="usa-hint" id="input-hint">
            ${hintText}
            </span>`);
    const element = await page.find('va-combo-box');

    // validate that the label is followed by the hint
    expect(element.shadowRoot.innerHTML).toContain(
      `<label for="options" class="usa-label" id="options-label">${labelText}</label><span class="usa-hint" id="input-hint">${hintText}</span>`,
    );
  });

  it('renders disabled', async () => {
    const page = await newE2EPage();

    await page.setContent(`
          <va-combo-box label="A label" disabled>
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
          </va-select>
        `);
    await page.find('va-combo-box >>> input');
    const element = await page.find('va-combo-box >>> input');
    expect(element).toHaveAttribute('disabled');
  });

  it('renders name property', async () => {
    const page = await newE2EPage();

    await page.setContent(`
          <va-combo-box label="A label" name="test-name">
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
          </va-select>
        `);
    await page.find('va-combo-box >>> input');
    const element = await page.find('va-combo-box >>> select');
    expect(element).toEqualAttribute('name', 'test-name');
  });

  it('renders message-aria-describedby', async () => {
    const page = await newE2EPage();

    await page.setContent(`
          <va-combo-box label="A label" message-aria-describedby="test aria text">
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
          </va-select>
        `);
    const input = await page.find('va-combo-box >>> input');
    const element = await page.find('va-combo-box >>> #input-message');
    expect(element).toEqualHtml('<span id="input-message" class="usa-sr-only dd-privacy-hidden">test aria text</span>');
    expect(input).toEqualAttribute('aria-describedby', 'input-message   options--assistiveHint');
  });
});
