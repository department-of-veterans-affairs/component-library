import { newE2EPage } from "@stencil/core/testing";
import { axeCheck } from "../../../testing/test-helpers";

describe('va-statement-of-truth', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth />');
    const element = await page.find('va-statement-of-truth');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth />');
    await axeCheck(page, ['aria-allowed-role']);
  });

  it('correctly sets the error props as attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth input-error="Please enter your full name" checkbox-error="Please certify"/>');
    const inputElem = await page.find('va-statement-of-truth >>> va-text-input');
    const checkboxElem = await page.find('va-statement-of-truth >>> va-checkbox');
    expect(inputElem.getAttribute('error')).toEqual('Please enter your full name');
    expect(checkboxElem.getAttribute('error')).toEqual('Please certify');
  });

  it('renders errors when error props set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth input-error="Please enter your full name" checkbox-error="Please certify"/>');

    const inputSpanEl = await page.$('pierce/span#input-error-message');
    const inputErrorText = await page.evaluate(element => element.textContent, inputSpanEl);
    expect(inputErrorText).toContain('Please enter your full name');

    const checkboxSpanEl = await page.$('pierce/span#checkbox-error-message');
    const checkboxErrorText = await page.evaluate(element => element.textContent, checkboxSpanEl);
    expect(checkboxErrorText).toContain('Please certify');
  });

  it('emits vaInputBlur custom event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth />');
    const vaInputBlurSpy = await page.spyOnEvent('vaInputBlur');
    const inputEl = await page.find('va-statement-of-truth >>> va-text-input >>> input');
    await inputEl.click();
    await page.keyboard.press('Tab');
    expect(vaInputBlurSpy).toHaveReceivedEvent();
  });

  it('emits vaInputChange custom event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth />');
    const vaInputChangeSpy = await page.spyOnEvent('vaInputChange');
    const inputEl = await page.$('pierce/[name="veteran-signature"]');
    await inputEl.type('test');
    // wait for last event
    await page.waitForTimeout(500);
    expect(vaInputChangeSpy).toHaveReceivedEventDetail({ value: 'test' });
  });

  it('emits vaCheckboxChange custom event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth />');
    const vaCheckboxChangeSpy = await page.spyOnEvent('vaCheckboxChange');
    const checkboxEl = await page.find(
      'va-statement-of-truth >>> va-checkbox >>> label',
    );
    await checkboxEl.click();
    expect(vaCheckboxChangeSpy).toHaveReceivedEvent();
  });

  it('allows for a custom header', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth heading="Custom header" />');
    const header = await page.find('va-statement-of-truth >>> h3');
    expect(header.innerHTML).toEqual('Custom header');
  });

  it('sets an input aria described by message', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-statement-of-truth input-message-aria-describedby="testing one two three"/>',
    );
    const span = await page.$('pierce/span#input-message');
    const text = await page.evaluate(element => element.textContent, span);
    expect(text).toContain('testing one two three');
  });

  it('permits prefilling the form', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-statement-of-truth input-value="John Doe" checked/>',
    );

    const value = await page.$eval(
      'va-statement-of-truth >>> va-text-input >>> input',
      (comp: HTMLInputElement) => comp.value,
    );
    expect(value).toBe('John Doe');

    const checked = await page.$eval(
      'va-statement-of-truth >>> va-checkbox >>> input',
      (comp: HTMLInputElement) => comp.checked,
    );
    expect(checked).toBeTruthy();
  });

  it('adds custom label to va-text-input', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth input-label="test label" />');
    const textInputEl = await page.find(
      'va-statement-of-truth >>> va-text-input',
    );
    const textInputLabel = await textInputEl.getProperty('label');
    expect(textInputLabel).toBe('test label');
  });

  it('adds custom label to va-checkbox', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-statement-of-truth checkbox-label="test label" />',
    );
    const checkboxEl = await page.find('va-statement-of-truth >>> va-checkbox');
    const checkboxLabel = await checkboxEl.getProperty('label');
    expect(checkboxLabel).toBe('test label');
  });
})
