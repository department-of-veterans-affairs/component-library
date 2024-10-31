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
                    <select aria-hidden="true" aria-invalid="false" class="usa-combo-box__select usa-select usa-sr-only" tabindex="-1">
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

  it('renders error message', async () => {
    const page = await newE2EPage();

    await page.setContent(`
          <va-combo-box label="A label" error="test error message">
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
          </va-select>
        `);
    await page.find('va-combo-box >>> input');
    const element = await page.find('va-combo-box >>>  #input-error-message');
    expect(element).toEqualHtml(`<span id="input-error-message" role="alert">
            <span class="usa-sr-only">Error</span>
            <span class="usa-error-message">test error message</span>
            </span>`);
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
});
