import { newE2EPage } from '@stencil/core/testing';

describe('va-radio-option', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio-option></va-radio-option>');

    const element = await page.find('va-radio-option');
    expect(element).toHaveClass('hydrated');
  });

  it('sets checked to true based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option checked label="An option"></va-radio-option>',
    );

    const inputEl = await page.find('va-radio-option >>> input');

    expect(await inputEl.getProperty('checked')).toBeTruthy();
  });

  it('adds aria-describedby to input when checked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option aria-describedby="test" label="A label" value="something" />',
    );

    const element = await page.find('va-radio-option');
    const inputEl = await page.find('va-radio-option >>> input');

    expect(inputEl.getAttribute('aria-describedby')).toEqual(null);

    element.setProperty('checked', true);
    await page.waitForChanges();

    expect(inputEl.getAttribute('aria-describedby')).toEqual('test');
  });

  it('fires event for parent when changed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-radio-option aria-describedby="test" label="A label" value="something" />',
    );

    const changeSpy = await page.spyOnEvent('radioOptionSelected');
    const inputEl = await page.find('va-radio-option >>> input');
    await inputEl.click();

    expect(changeSpy).toHaveReceivedEvent();
  });
});
