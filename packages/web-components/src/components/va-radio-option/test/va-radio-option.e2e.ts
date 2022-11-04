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
    <va-radio-option id="yes2" label="Yes - Any Veteran" name="yes" value="2" aria-checked="false" role="radio" class="hydrated">
      <mock:shadow-root>
        <label part="label" for="yes2">
          Yes - Any Veteran
        </label>
      </mock:shadow-root>
    </va-radio-option>
  `);
  });

  it('sets the ID based on the name and value, if not passed as a prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option name="test" label="An option with spaces" value="1"></va-radio-option>',
    );

    const inputEl = await page.find('va-radio-option');

    expect(await inputEl.getProperty('id')).toEqual('test1');
  });

  it('renders description', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-radio-option
        id="opt1"
        name="opts"
        label="An option"
        description="This is an option description"
        value="option1"
      />
    `);
    const element = await page.find('va-radio-option');
    expect(element).toEqualHtml(`
    <va-radio-option id="opt1" name="opts" label="An option" description="This is an option description" name="opt1" value="option1" aria-checked="false" role="radio" class="hydrated">
      <mock:shadow-root>
        <label part="label" for="opt1">
          An option
          <div class="description" part="description">
            This is an option description
          </div>
        </label>
      </mock:shadow-root>
    </va-radio-option>
  `);
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
    const inputEl = await page.find('va-radio-option');
    await inputEl.click();

    expect(changeSpy).toHaveReceivedEvent();
  });

});
