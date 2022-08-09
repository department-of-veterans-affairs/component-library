import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';
const path = require('path');

describe('va-file-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input label="This is the file upload label" buttontext="Upload a file" required="false" multiple="false" class="hydrated"></va-file-input>');

    const element = await page.find('va-file-input');
    expect(element).toEqualHtml(`
    <va-file-input label="This is the file upload label" buttontext="Upload a file" required="false" multiple="false" class="hydrated">
        <mock:shadow-root>
          <label for="fileInputButton">This is the file upload label</label>
          <slot></slot>
          <span id="error-message" role="alert"></span>
          <va-button id="fileInputButton" aria-label="This is the file upload label" secondary="" class="hydrated"></va-button>
          <input type="file" id="fileInputField" style="display: none;">
        </mock:shadow-root>
      </va-text-input>
    `);
  });

  it('displays an error message when `error` is defined', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input error="This is an error" buttontext="Upload a file" />`);

    const errorSpan = await page.find('va-file-input >>> #error-message');
    expect(errorSpan.innerText.includes('This is an error')).toBe(true);
  });

  it('no error message when `error` is not defined', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input />`);

    const errorSpan = await page.find('va-file-input >>> #error-message');
    expect(errorSpan.innerText).toBeNull;
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input required label="Example file input." buttontext="Upload a file"/>`);

    const requiredSpan = await page.find('va-file-input >>> .required');
    expect(requiredSpan).not.toBeNull();
  });

  it('the `multiple` attributes exists if set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttontext="Upload a file" multiple="true" buttontext="Upload a file"/>`);

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('multiple')).toBeTruthy;
  });

  it('the `multiple` attributes does not apply if omitted', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttontext="Upload a file" />`);

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('multiple')).toBeFalsy;
  });

  it('the `accept` attribute exists if set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttontext="Upload a file" accept=".png" />`);

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('accept')).toBeTruthy;
  });

  it('the `accept` attribute does not apply if omitted', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttontext="Upload a file" />`);

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('accept')).toBeFalsy;
  });

  it('emits the vaChange event only once', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttontext="Upload a file" />`);
    
    const fileUploadSpy = await page.spyOnEvent('vaChange');
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');
    const input = (
      await page.waitForFunction(() =>
        document.querySelector("va-file-input").shadowRoot.querySelector("input[type=file]")
      )
    ).asElement();

    await input.uploadFile(filePath);
    await page.waitForChanges();

    expect(fileUploadSpy).toHaveReceivedEventTimes(1);
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-file-input required label="This is a test" buttontext="Upload a file" error="With an error message"/>',
    );

    await axeCheck(page);
  });
});
