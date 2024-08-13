import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';
const path = require('path');

describe('va-file-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-file-input label="This is the file upload label" buttonText="Upload a file" required="false" class="hydrated" uswds></va-file-input>',
    );

    const element = await page.find('va-file-input');
    expect(element).not.toBeNull();
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input hint="This is hint text" uswds />');

    // Render the hint text
    const hintTextElement = await page.find('va-file-input >>> div.usa-hint');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input required label="Example file input." buttonText="Upload a file" uswds />`,
    );

    const requiredSpan = await page.find(
      'va-file-input >>> .required',
    );
    expect(requiredSpan).not.toBeNull();
  });

  it('the `accept` attribute exists if set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input buttonText="Upload a file" accept=".png" uswds />`,
    );

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('accept')).toBeTruthy();
  });

  it('the `accept` attribute does not apply if omitted', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" uswds />`);

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('accept')).toBeFalsy();
  });

  it('emits the vaChange event only once', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" uswds />`);

    const fileUploadSpy = await page.spyOnEvent('vaChange');
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = await page.$('pierce/#fileInputField');
    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    expect(fileUploadSpy).toHaveReceivedEventTimes(1);
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-file-input required label="This is a test" buttonText="Upload a file" error="With an error message" uswds />',
    );

    await axeCheck(page);
  });

  // this test usually passes but it is too flaky to enable
  it.skip('opens a modal when delete button clicked and lets user remove or keep file', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" uswds />`);

    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = (
      await page.waitForFunction(() =>
        document
          .querySelector('va-file-input')
          .shadowRoot.querySelector('input[type=file]'),
      )
    ).asElement();

    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    // get delete button
    const [_, deleteButton] = await page.findAll('va-file-input >>> va-button-icon');
    deleteButton.click();
    await page.waitForTimeout(100);

    // make sure modal opens
    const modalCheck = await page.find('va-file-input >>> va-modal[visible]');

    expect(modalCheck).not.toBeNull();

    const noButton = (
      await page.waitForFunction(() =>
        document.querySelector('va-file-input').shadowRoot.querySelector('va-modal').shadowRoot.querySelector('va-button[secondary]')
      )
    ).asElement();

    //don't delete
    noButton.click();

    await page.waitForTimeout(100);

    const modalCheck2 = await page.find('va-file-input >>> va-modal[visible]');

    //modal now closed
    expect(modalCheck2).toBeNull();

    // get buttons again
    const [__, deleteButton2] = await page.findAll('va-file-input >>> va-button-icon');

    // file not deleted because delete option still here
    expect(deleteButton2).not.toBeNull();
  });

  // this test usually passes but it is too flaky to enable
  it.skip('opens a modal when delete button clicked and lets user remove the file', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" uswds />`);

    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = (
      await page.waitForFunction(() =>
        document
          .querySelector('va-file-input')
          .shadowRoot.querySelector('input[type=file]'),
      )
    ).asElement();

    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    // get delete button
    const [_, deleteButton] = await page.findAll('va-file-input >>> va-button-icon');
    deleteButton.click();
    await page.waitForTimeout(100);

    // make sure modal opens
    const modalCheck = await page.find('va-file-input >>> va-modal[visible]');

    expect(modalCheck).not.toBeNull();

    const yesButton = (
      await page.waitForFunction(() =>
        document.querySelector('va-file-input').shadowRoot.querySelector('va-modal').shadowRoot.querySelector('va-button')
      )
    ).asElement();

    // yes we want to remove the file
    yesButton.click();
    await page.waitForTimeout(100);

    // get buttons again
    const btns = await page.findAll('va-file-input >>> va-button-icon');

    // buttons are gone because file has been deleted
    expect(btns).toHaveLength(0);
  });
});
