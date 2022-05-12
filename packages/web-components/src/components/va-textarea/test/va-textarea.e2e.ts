import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea label="Describe your situation"></va-textarea>');

    const element = await page.find('va-textarea');
    expect(element).toEqualHtml(`
      <va-textarea class="hydrated" label="Describe your situation">
        <mock:shadow-root>
          <label for="textarea" id="textarea-label">
            Describe your situation
          </label>
          <textarea aria-labelledby="textarea-label" id="textarea"></textarea>
        </mock:shadow-root>
      </va-textarea>
    `);
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-textarea >>> span#error-message');
    expect(error.innerText).toContain('This is a mistake');
  });

  it('adds new aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea error="This is a mistake" />');

    // Render the error message text
    const textareaEl = await page.find('va-textarea >>> textarea ');
    expect(textareaEl.getAttribute('aria-describedby')).toContain('error-message');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-textarea label="This is a field" required />');

    // Render the error message text
    const requiredSpan = await page.find('va-textarea >>> .required');
    expect(requiredSpan).not.toBeNull();
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-textarea required label="This is a test" error="With an error message"/>',
    );

    await axeCheck(page);
  });

  it('emits blur event', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-textarea label="Input Field"/>');

    const textareaEl = await page.find('va-textarea >>> textarea');
    const blurSpy = await page.spyOnEvent('blur');
    await textareaEl.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });


});
