import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';
import { ElementHandle } from 'puppeteer';

const path = require('path');

describe('va-file-input-multiple', () => {

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-file-input-multiple label="This is the file upload label" required="false" class="hydrated"></va-file-input-multiple>',
    );

    const multiElement = await page.find('va-file-input-multiple');
    expect(multiElement).not.toBeNull();

    const singleElement = await page.find('va-file-input-multiple >>> va-file-input');
    expect(singleElement).not.toBeNull();
  });

  it('renders the file input upload messages correctly', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input-multiple />`);

    const fileInput = await page.find('va-file-input-multiple >>> va-file-input >>> .file-input-instructions');
    expect(fileInput.innerHTML).toContain(`<span>Drag a file here or <span class="file-input-choose-text">choose from folder</span></span>`);

    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    await page.waitForChanges();

    const secondFileInput = await page.find('va-file-input-multiple >>> va-file-input:last-child >>> .file-input-instructions');
    expect(secondFileInput.innerHTML).toContain(`<span>Drag an additional file here or <span class="file-input-choose-text">choose from folder</span></span>`);
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple hint="This is hint text" />');

    // Render the hint text
    const hintTextElement = await page.find('va-file-input-multiple >>> div.usa-hint');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input-multiple required label="This is a label" />`,
    );

    const requiredSpan = await page.find(
      'va-file-input-multiple >>> .required',
    );
    expect(requiredSpan).not.toBeNull();
  });

  it('the `accept` attribute exists if set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input-multiple accept=".png" />`,
    );

    const fileInputComponent = await page.find('va-file-input-multiple >>> va-file-input');
    const fileInput = fileInputComponent.shadowRoot.querySelector('input');
    expect(fileInput.getAttribute('accept')).toBeTruthy();
  });

  it('the `accept` attribute does not apply if omitted', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input-multiple />`);

    const fileInputComponent = await page.find('va-file-input-multiple >>> va-file-input');
    const fileInput = fileInputComponent.shadowRoot.querySelector('input');
    expect(fileInput.getAttribute('accept')).toBeFalsy();
  });

  it('the `readOnly` attribute exists if set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input-multiple read-only />`);

    const fileInputComponent = await page.find(
      'va-file-input-multiple >>> va-file-input',
    );
    expect(fileInputComponent).not.toBeNull();
    const readOnlyProp = await fileInputComponent.getProperty('readOnly');
    expect(readOnlyProp).toBeTruthy();
  });

  it('emits the vaMultipleChange event only once', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input-multiple buttonText="Upload a file" />`);

    const fileUploadSpy = await page.spyOnEvent('vaMultipleChange');
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));
    
    await page.waitForChanges();

    expect(fileUploadSpy).toHaveReceivedEventTimes(1);
  });

  it.skip('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-file-input-multiple required label="This is a test" buttonText="Upload a file" error="With an error message" />',
    );

    await axeCheck(page);
  });
});
