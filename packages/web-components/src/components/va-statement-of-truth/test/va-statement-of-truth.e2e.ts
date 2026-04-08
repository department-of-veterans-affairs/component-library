import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

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
    await page.setContent(
      '<va-statement-of-truth input-error="Please enter your full name" checkbox-error="Please certify"/>',
    );
    const inputElem = await page.find(
      'va-statement-of-truth >>> va-text-input',
    );
    const checkboxElem = await page.find(
      'va-statement-of-truth >>> va-checkbox',
    );
    expect(inputElem.getAttribute('error')).toEqual(
      'Please enter your full name',
    );
    expect(inputElem).toHaveAttribute('error-has-pii');
    expect(checkboxElem.getAttribute('error')).toEqual('Please certify');
  });

  it('renders errors when error props set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-statement-of-truth input-error="Please enter your full name" checkbox-error="Please certify"/>',
    );

    const inputSpanEl = await page.$('pierce/span#input-error-message');
    const inputErrorText = await page.evaluate(
      element => element.textContent,
      inputSpanEl,
    );
    expect(inputErrorText).toContain('Please enter your full name');

    const checkboxSpanEl = await page.$('pierce/span#checkbox-error-message');
    const checkboxErrorText = await page.evaluate(
      element => element.textContent,
      checkboxSpanEl,
    );
    expect(checkboxErrorText).toContain('Please certify');
  });

  it('emits vaInputBlur custom event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth />');
    const vaInputBlurSpy = await page.spyOnEvent('vaInputBlur');
    const inputEl = await page.find(
      'va-statement-of-truth >>> va-text-input >>> input',
    );
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
    await new Promise(resolve => setTimeout(resolve, 500));
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

  it('hides the legal note when flag is enabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth hide-legal-note/>');
    const note = await page.find('va-statement-of-truth >>> #legal-note');
    expect(note).toBeNull();
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

  it('renders h3 heading by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth />');
    const h3 = await page.find('va-statement-of-truth >>> h3');
    expect(h3).not.toBeNull();
    expect(h3.innerHTML).toEqual('Statement of truth');
  });

  it('renders h1 when headingLevel is 1', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth heading-level="1" />');
    const h1 = await page.find('va-statement-of-truth >>> h1');
    expect(h1).not.toBeNull();
    expect(h1.innerHTML).toEqual('Statement of truth');
  });

  it('renders h2 when headingLevel is 2', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth heading-level="2" />');
    const h2 = await page.find('va-statement-of-truth >>> h2');
    expect(h2).not.toBeNull();
    expect(h2.innerHTML).toEqual('Statement of truth');
  });

  it('renders h4 when headingLevel is 4', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth heading-level="4" />');
    const h4 = await page.find('va-statement-of-truth >>> h4');
    expect(h4).not.toBeNull();
    expect(h4.innerHTML).toEqual('Statement of truth');
  });

  it('renders h5 when headingLevel is 5', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth heading-level="5" />');
    const h5 = await page.find('va-statement-of-truth >>> h5');
    expect(h5).not.toBeNull();
    expect(h5.innerHTML).toEqual('Statement of truth');
  });

  it('renders h6 when headingLevel is 6', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth heading-level="6" />');
    const h6 = await page.find('va-statement-of-truth >>> h6');
    expect(h6).not.toBeNull();
    expect(h6.innerHTML).toEqual('Statement of truth');
  });

  it('renders correct heading level with custom heading text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-statement-of-truth heading-level="2" heading="Custom heading" />',
    );
    const h2 = await page.find('va-statement-of-truth >>> h2');
    expect(h2).not.toBeNull();
    expect(h2.innerHTML).toEqual('Custom heading');
  });

  it('falls back to h3 when headingLevel is invalid (7)', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth heading-level="7" />');
    const h3 = await page.find('va-statement-of-truth >>> h3');
    expect(h3).not.toBeNull();
    expect(h3.innerHTML).toEqual('Statement of truth');
  });

  it('falls back to h3 when headingLevel is invalid (0)', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth heading-level="0" />');
    const h3 = await page.find('va-statement-of-truth >>> h3');
    expect(h3).not.toBeNull();
    expect(h3.innerHTML).toEqual('Statement of truth');
  });

  it('falls back to h3 when headingLevel is invalid (negative)', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-statement-of-truth heading-level="-1" />');
    const h3 = await page.find('va-statement-of-truth >>> h3');
    expect(h3).not.toBeNull();
    expect(h3.innerHTML).toEqual('Statement of truth');
  });

  it('applies consistent font size (1.25rem) to all heading levels', async () => {
    const headingLevels = [1, 2, 3, 4, 5, 6];
    
    for (const level of headingLevels) {
      const page = await newE2EPage();
      await page.setContent(`<va-statement-of-truth heading-level="${level}" />`);
      
      const heading = await page.find(`va-statement-of-truth >>> h${level}`);
      const fontSize = await heading.getComputedStyle();
      
      expect(fontSize.fontSize).toBe('20px'); // 1.25rem = 20px (16px base)
    }
  });
});
