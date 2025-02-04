import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';
import { ElementHandle } from 'puppeteer';
const path = require('path');

describe('va-file-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-file-input label="This is the file upload label" buttonText="Upload a file" required="false" class="hydrated"></va-file-input>',
    );

    const element = await page.find('va-file-input');
    expect(element).not.toBeNull();
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input hint="This is hint text" />');

    // Render the hint text
    const hintTextElement = await page.find('va-file-input >>> div.usa-hint');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input required label="Example file input." buttonText="Upload a file" />`,
    );

    const requiredSpan = await page.find(
      'va-file-input >>> .required',
    );
    expect(requiredSpan).not.toBeNull();
  });

  it('the `accept` attribute exists if set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input buttonText="Upload a file" accept=".png" />`,
    );

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('accept')).toBeTruthy();
  });

  it('the `accept` attribute does not apply if omitted', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" />`);

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('accept')).toBeFalsy();
  });

  it('the `uploadMessage` attribute changes the text in file input', async () => {
    const page = await newE2EPage();

    await page.setContent(`<va-file-input />`);

    await page.$eval('va-file-input', (elm: any) => {
      // within the browser's context
      // let's set new property values on the component
      elm.uploadMessage = 'Test text';
    });
    await page.waitForChanges();

    const fileInput = await page.find(
      'va-file-input >>> .file-input-instructions',
    );
    expect(fileInput.innerHTML).toContain(`Test text`);
  });

  it('the component shows default text when `uploadMessage` is not set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input />`);

    const fileInput = await page.find(
      'va-file-input >>> .file-input-instructions',
    );
    expect(fileInput.innerHTML).toContain(
      `<span>Drag a file here or <span class="file-input-choose-text">choose from folder</span></span>`,
    );
  });

  it('renders a "Change File" button if there is a file', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" />`);
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = (await page.$(
      'pierce/#fileInputField',
    )) as ElementHandle<HTMLInputElement>;
    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    await page.waitForChanges();

    const fileInfoCard = await page.find('va-file-input >>> va-card');
    const fileChangeButton = await fileInfoCard.find(
      '.file-button-section va-button-icon',
    );
    const buttonLabel = await fileChangeButton.getProperty('label');
    expect(buttonLabel).toBe('Change file');
  });

  it('does not render a "Change File" button if read-only', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input buttonText="Upload a file" read-only />`,
    );
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = (await page.$(
      'pierce/#fileInputField',
    )) as ElementHandle<HTMLInputElement>;
    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    await page.waitForChanges();

    const fileInfoCard = await page.find('va-file-input >>> va-card');
    const fileChangeButton = await fileInfoCard.find(
      '.file-button-section va-button-icon',
    );
    expect(fileChangeButton).toBeNull();
  });


  it('Renders status text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input status-text="Uploading..."/>`,
    );
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = (await page.$(
      'pierce/#fileInputField',
    )) as ElementHandle<HTMLInputElement>;
    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    await page.waitForChanges();

    const fileInfoCard = await page.find('va-file-input >>> va-card');
    const statusTextCont = await fileInfoCard.find(
      '.file-info-group .file-status-label',
    );
    expect(statusTextCont).toEqualText('Uploading...');
  });


  it('emits the vaChange event only once', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" />`);

    const fileUploadSpy = await page.spyOnEvent('vaChange');
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    expect(fileUploadSpy).toHaveReceivedEventTimes(1);
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-file-input required label="This is a test" buttonText="Upload a file" error="With an error message" />',
    );

    await axeCheck(page);
  });

  it('Renders file summary when uploadedFile prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file"/>`);

    await page.$eval('va-file-input', (elm: any) => {
      // within the browser's context
      // let's set new property values on the component
      elm.uploadedFile = {name: 'test.jpg', size: 7000, type: 'jpg'};
    });
    await page.waitForChanges();

    const fileInput = await page.find('va-file-input');
    expect(fileInput).not.toBeNull();
    const input = await fileInput.shadowRoot.querySelector('input[type=file]');
    expect(input.getAttribute('style')).toEqual('visibility: hidden;');
    const summaryCard = await page.find('va-file-input >>> va-card');
    expect(summaryCard).not.toBeNull();
    expect(await summaryCard.find('.file-label')).toEqualText('test.jpg');
    expect(await summaryCard.find('.file-size-label')).toEqualHtml('<span class="file-size-label">7&nbsp;KB</span>');
  })

  // this test usually passes but it is too flaky to enable
  it.skip('opens a modal when delete button clicked and lets user remove or keep file', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input buttonText="Upload a file" />`);

    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = (
      await page.waitForFunction(() =>
        document
          .querySelector('va-file-input')
          .shadowRoot.querySelector('input[type=file]'),
      )
    ) as ElementHandle<HTMLInputElement>;

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
    );

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
    await page.setContent(`<va-file-input buttonText="Upload a file" />`);

    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = (
      await page.waitForFunction(() =>
        document
          .querySelector('va-file-input')
          .shadowRoot.querySelector('input[type=file]'),
      )
    ) as ElementHandle<HTMLInputElement>;

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
    );

    // yes we want to remove the file
    yesButton.click();
    await page.waitForTimeout(100);

    // get buttons again
    const btns = await page.findAll('va-file-input >>> va-button-icon');

    // buttons are gone because file has been deleted
    expect(btns).toHaveLength(0);
  });
});
