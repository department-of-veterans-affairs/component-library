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
    <va-radio-option id="yes2" label="Yes - Any Veteran" name="yes" value="2" class="hydrated">
        <div class="usa-radio">
          <input class="va-radio-option__input" id="yes2input" type="radio" name="yes" value="2">
          <label class="usa-radio__label" for="yes2input">
            Yes - Any Veteran
          </label>
        </div>
    </va-radio-option>
    `);
  });

  it('sets the ID based on the name and value, if not passed as a prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option name="test" label="An option with spaces" value="1"></va-radio-option>',
    );

    const inputEl = await page.find('va-radio-option input');

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
    const inputEl = await page.find('va-radio-option label');
    await inputEl.click();

    expect(changeSpy).toHaveReceivedEvent();
  });

  it('displays description text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option checked aria-describedby="test" label="A label" value="something" description="Example description" />',
    );

    const description = await page.find('va-radio-option .usa-radio__label-description');
    expect(description.textContent).toEqual("Example description");
    expect(description.classList.contains('dd-privacy-hidden'));
    expect(description.getAttribute('data-dd-action-name')).toEqual('description');
  });

  it('institutes the tile class if the tile prop is provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio-option tile></va-radio-option>');

    const element = await page.find('va-radio-option .usa-radio');
    expect(element).toHaveClass('va-radio-option__container--tile');
  });
});
