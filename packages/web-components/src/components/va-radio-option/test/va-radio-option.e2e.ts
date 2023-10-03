import { newE2EPage } from '@stencil/core/testing';

describe('va-radio-option', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio-option></va-radio-option>');

    const element = await page.find('va-radio-option');
    expect(element).toHaveClass('hydrated');
  });

  it('inserts and parses optional props and attributes correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio-option id="yes2" label="Yes - Any Veteran" name="yes" value="2"></va-radio-option>');

    const element = await page.find('va-radio-option');
    expect(element).toEqualHtml(`
    <va-radio-option id="yes2" label="Yes - Any Veteran" name="yes" value="2" aria-checked="false" class="hydrated">
      <input id="yes2input" name="yes" type="radio" value="2">
      <label for="yes2input">
        <span>Yes - Any Veteran</span>
      </label>
    </va-radio-option>
  `);
  });

  it('sets the ID based on the name and value, if not passed as a prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option name="test" label="An option with spaces" value="1"></va-radio-option>',
    );

    const option = await page.find('va-radio-option'),
          inputEl = await option.find('input');

    expect(await inputEl.getProperty('id')).toEqual('test1input');
  });

  it('sets checked to true based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option checked label="An option"></va-radio-option>',
    );

    const inputEl = await page.find('va-radio-option');

    expect(await inputEl.getProperty('checked')).toBeTruthy();
  });

  it('fires event for parent when changed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option checked aria-describedby="test" label="A label" value="something" />',
    );

    const changeSpy = await page.spyOnEvent('radioOptionSelected');
    await page.evaluate(() => {
      const radio = document.querySelector('va-radio-option input') as HTMLInputElement;
      radio.click();
    })

    expect(changeSpy).toHaveReceivedEvent();
  });

  it('displays an option description', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio-option description="Some description text"></va-radio-option>');

    const description = await page.find('va-radio-option .description');
    expect(description.textContent).toEqual("Some description text");
    expect(description.classList.contains('dd-privacy-hidden'))
  });

  // Begin USWDS version test

  it('uswds v3 renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio-option uswds></va-radio-option>');

    const element = await page.find('va-radio-option');
    expect(element).toHaveClass('hydrated');
  });

  it('uswds v3 inserts and parses optional props and attributes correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio-option uswds id="yes2" label="Yes - Any Veteran" name="yes" value="2"></va-radio-option>');

    const element = await page.find('va-radio-option');
    expect(element).toEqualHtml(`
    <va-radio-option uswds="" id="yes2" label="Yes - Any Veteran" name="yes" value="2" class="hydrated">
        <div class="usa-radio">
          <input class="usa-radio__input" id="yes2input" type="radio" name="yes" value="2">
          <label class="usa-radio__label" for="yes2input">
            Yes - Any Veteran
          </label>
        </div>
    </va-radio-option>
    `);
  });

  it('uswds v3 sets the ID based on the name and value, if not passed as a prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option uswds name="test" label="An option with spaces" value="1"></va-radio-option>',
    );

    const inputEl = await page.find('va-radio-option input');

    expect(await inputEl.getProperty('id')).toEqual('test1input');
  });

  it('uswds v3 sets checked to true based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option uswds checked label="An option"></va-radio-option>',
    );

    const inputEl = await page.find('va-radio-option');

    expect(await inputEl.getProperty('checked')).toBeTruthy();
  });

  it('uswds v3 fires event for parent when changed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option uswds checked aria-describedby="test" label="A label" value="something" />',
    );

    const changeSpy = await page.spyOnEvent('radioOptionSelected');
    const inputEl = await page.find('va-radio-option label');
    await inputEl.click();

    expect(changeSpy).toHaveReceivedEvent();
  });

  it('uswds v3 displays description text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option uswds checked aria-describedby="test" label="A label" value="something" description="Example description" />',
    );

    const description = await page.find('va-radio-option .usa-radio__label-description');
    expect(description.textContent).toEqual("Example description");
    expect(description.classList.contains('dd-privacy-hidden'))
  });

});
