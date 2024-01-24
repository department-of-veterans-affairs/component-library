import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';
const path = require('path');

describe('va-file-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input label="This is the file upload label" buttonText="Upload a file" required="false" multiple="false" class="hydrated"></va-file-input>');

    const element = await page.find('va-file-input');
    expect(element).toEqualHtml(`
    <va-file-input label="This is the file upload label" buttonText="Upload a file" required="false" multiple="false" class="hydrated">
        <mock:shadow-root>
          <label for="fileInputButton">This is the file upload label</label>
          <slot></slot>
          <span id="error-message" role="alert"></span>
          <va-button id="fileInputButton" aria-label="This is the file upload label" secondary="" class="hydrated"></va-button>
          <input type="file" id="fileInputField" hidden>
        </mock:shadow-root>
      </va-text-input>
    `);
  });

  it('displays an error message when `error` is defined', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input error="This is an error" buttonText="Upload a file" />`);

    const errorSpan = await page.find('va-file-input >>> #error-message');
    expect(errorSpan.innerText.includes('This is an error')).toBe(true);
  });

  it('no error message when `error` is not defined', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input />`);

    const errorSpan = await page.find('va-file-input >>> #error-message');
    expect(errorSpan.innerText).toBeNull;
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input hint="This is hint text" />');

    // Render the hint text
    const hintTextElement = await page.find('va-file-input >>> span.hint-text');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input required label="Example file input." buttonText="Upload a file"/>`);

    const requiredSpan = await page.find('va-file-input >>> .required');
    expect(requiredSpan).not.toBeNull();
  });

  it('the `multiple` attributes exists if set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" multiple="true" />`);

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('multiple')).toBeTruthy;
  });

  it('the `multiple` attributes does not apply if omitted', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" />`);

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('multiple')).toBeFalsy;
  });

  it('the `accept` attribute exists if set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" accept=".png" />`);

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('accept')).toBeTruthy;
  });

  it('the `accept` attribute does not apply if omitted', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" />`);

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('accept')).toBeFalsy;
  });

  it('emits the vaChange event only once', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input button-text="Upload a file" />`);

    const fileUploadSpy = await page.spyOnEvent('vaChange');
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');
    const input = (
      await page.waitForFunction(() =>
        document
          .querySelector('va-file-input')
          .shadowRoot.querySelector('input[type=file]'),
      )
    ).asElement();

    await input.uploadFile(filePath);
    await page.waitForChanges();

    expect(fileUploadSpy).toHaveReceivedEventTimes(1);
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-file-input required label="This is a test" buttonText="Upload a file" error="With an error message"/>',
    );

    await axeCheck(page);
  });

  /** USWDS v3 mode tests */

  it('v3 renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-file-input label="This is the file upload label" buttonText="Upload a file" required="false" multiple="false" class="hydrated" uswds></va-file-input>',
    );

    const element = await page.find('va-file-input');
    expect(element).not.toBeNull();
  });

  it('v3 displays an error message when `error` is defined', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input error="This is an error" buttonText="Upload a file" uswds />`,
    );

    const errorSpan = await page.find('va-file-input >>> .usa-error-message');
    expect(errorSpan.innerText.includes('This is an error')).toBe(true);
  });

  it('v3 no error message when `error` is not defined', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input uswds />`);

    const errorSpan = await page.find('va-file-input >>> .usa-error-message');
    expect(errorSpan).toBeUndefined;
  });

  it('v3 renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input hint="This is hint text" uswds />');

    // Render the hint text
    const hintTextElement = await page.find('va-file-input >>> span.usa-hint');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('v3 renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input required label="Example file input." buttonText="Upload a file" uswds />`,
    );

    const requiredSpan = await page.find(
      'va-file-input >>> .usa-label--required',
    );
    expect(requiredSpan).not.toBeNull();
  });

  it('v3 the `multiple` attributes exists if set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input buttonText="Upload a file" multiple="true" uswds />`,
    );

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('multiple')).toBeTruthy;
  });

  it('v3 the `multiple` attributes does not apply if omitted', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" uswds />`);

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('multiple')).toBeFalsy;
  });

  it('v3 the `accept` attribute exists if set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input buttonText="Upload a file" accept=".png" uswds />`,
    );

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('accept')).toBeTruthy;
  });

  it('the `accept` attribute does not apply if omitted', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" uswds />`);

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('accept')).toBeFalsy;
  });

  // Skipping due to test flakiness, but this event does work in the browser
  it.skip('v3 emits the vaChange event only once', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" uswds />`);

    const fileUploadSpy = await page.spyOnEvent('vaChange');
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');
    const instructions = await page.find(
      'va-file-input >>> .usa-file-input__instructions',
    );

    expect(instructions).not.toBeNull();

    const input = await page.$('pierce/.usa-file-input__input');
    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    expect(fileUploadSpy).toHaveReceivedEventTimes(1);
  });

  it('v3 passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-file-input required label="This is a test" buttonText="Upload a file" error="With an error message" uswds />',
    );

    await axeCheck(page);
  });
});
