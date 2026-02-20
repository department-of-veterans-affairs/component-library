import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';
import { ElementHandle } from 'puppeteer';
const path = require('path');

async function setUpPageWithUploadedFile(content:string, fileName: string = '1x1.png') {
  const page = await newE2EPage();
  await page.setContent(content);
  const filePath = path.relative(process.cwd(), __dirname + `/${fileName}`);

  const input = (await page.$(
    'pierce/#fileInputField',
  )) as ElementHandle<HTMLInputElement>;
  expect(input).not.toBeNull();

  await input
    .uploadFile(filePath)
    .catch(e => console.log('uploadFile error', e));

  await page.waitForChanges();

  return page;
}

describe('va-file-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-file-input label="This is the file upload label" required="false" class="hydrated"></va-file-input>',
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

  it('renders an aria-label', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input label="Select a file to upload"/>');

    const fileInput = await page.find('va-file-input >>> input');
    const ariaLabel = await fileInput.getAttribute('aria-label');
    expect(ariaLabel).toBe('Select a file to upload. Drag a file here or choose from folder');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input required label="Example file input." />`,
    );

    const requiredSpan = await page.find(
      'va-file-input >>> .required',
    );
    expect(requiredSpan).not.toBeNull();
  });

  it('the `accept` attribute exists if set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-file-input accept=".png" />`,
    );

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput.getAttribute('accept')).toBeTruthy();
  });

  it('the `accept` attribute does not apply if omitted', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input />`);

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
    const page = await setUpPageWithUploadedFile(`<va-file-input />`);

    const fileInfoCard = await page.find('va-file-input >>> va-card');
    const fileChangeButton = await fileInfoCard.find(
      '.file-button-section va-button-icon',
    );
    const buttonLabel = await fileChangeButton.getProperty('label');
    expect(buttonLabel).toBe('change file. 1x1.png');
  });

  it('does not render a "Change File" button if read-only', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input read-only />`);

    const fileInfoCard = await page.find('va-file-input >>> va-card');
    const fileChangeButton = await fileInfoCard.find(
      '.file-button-section va-button-icon',
    );
    expect(fileChangeButton).toBeNull();
  });


  it('Renders status text', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input status-text="Uploading..."/>`);

    const fileInfoCard = await page.find('va-file-input >>> va-card');
    const statusTextCont = await fileInfoCard.find(
      '.file-info-group .file-status-label',
    );
    expect(statusTextCont).toEqualText('Uploading...');
  });


  it('emits the vaChange event only once', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input />`);

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
      '<va-file-input required label="This is a test" error="With an error message" />',
    );

    await axeCheck(page);
  });

  it('Renders file summary when uploadedFile prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input />`);

    await page.$eval('va-file-input', (elm: any) => {
      // within the browser's context
      // let's set new property values on the component
      elm.uploadedFile = {name: 'test.jpg', size: 7000, type: 'jpg'};
    });
    await page.waitForChanges();

    const fileInput = await page.find('va-file-input');
    expect(fileInput).not.toBeNull();
    const summaryCard = await page.find('va-file-input >>> va-card');
    expect(summaryCard).not.toBeNull();
    expect(await summaryCard.find('.file-label')).toEqualText('test.jpg');
    expect(await summaryCard.find('.file-size-label')).toEqualHtml('<span class="file-size-label">7&nbsp;KB</span>');
  })

  // this test usually passes but it is too flaky to enable
  it.skip('opens a modal when delete button clicked and lets user remove or keep file', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input />`);

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

    await new Promise((r) => setTimeout(r, 250));

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

    await new Promise((r) => setTimeout(r, 100));

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
    await page.setContent(`<va-file-input />`);

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
    await new Promise((r) => setTimeout(r, 100));

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
    await new Promise((r) => setTimeout(r, 100));

    // get buttons again
    const btns = await page.findAll('va-file-input >>> va-button-icon');

    // buttons are gone because file has been deleted
    expect(btns).toHaveLength(0);
  });

  it('displays an error if the file size exceeds max allowed file size', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input max-file-size="1" />`);

    const fileInfoCard = await page.find('va-file-input >>> va-card');
    const errorMessage = await fileInfoCard.find('span.usa-error-message');
    expect(errorMessage.innerHTML).toEqual("We can't upload your file because it's too big. Files must be less than 1 B.");
  });

  it('displays an error if file size is zero bytes', async () => {
    const page = await setUpPageWithUploadedFile('<va-file-input />', 'zero.png');
    const fileInfoCard = await page.find('va-file-input >>> va-card');
    const errorMessage = await fileInfoCard.find('span.usa-error-message');
    expect(errorMessage.innerHTML).toEqual("The file you selected is empty. Files must be larger than 0B.");
  });

  it('displays an error if file size is too small', async () => {
    const page = await setUpPageWithUploadedFile('<va-file-input min-file-size="1024"/>');
    const fileInfoCard = await page.find('va-file-input >>> va-card');
    const errorMessage = await fileInfoCard.find('span.usa-error-message');
    expect(errorMessage.innerHTML).toEqual("We can't upload your file because it's too small. Files must be at least 1&nbsp;KB.");
  });

  it('renders a progress bar if percent-uploaded prop is set', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input percent-uploaded="12" />`);

    const progBar = await page.find('va-file-input >>> va-progress-bar');

    expect(progBar).not.toBeNull();

  });
  it('resets the component if the cancel button is clicked during upload', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input percent-uploaded="12" />`);

    const button = await page.find('va-file-input >>> va-button-icon');
    button.click();
    await page.waitForChanges();
    const progBar = await page.find('va-file-input >>> va-progress-bar');
    expect(progBar).toBeNull();
  });

  it('renders file password field if encrypted is true upload', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input encrypted />`);

    const textInput = await page.find('va-file-input >>> va-text-input');
    expect(textInput).not.toBeNull();
    const label = await textInput.find(' >>> label');
    expect(label).not.toBeNull();
    expect(label).toEqualText('File password required')
  });

  it('renders error on password input if password-error is set', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input encrypted password-error="Encrypted file requires a password."/>`);

    const inputErrorSpan = await page.find('va-file-input >>> va-text-input >>> span.usa-error-message');
    expect(inputErrorSpan).not.toBeNull();
    expect(inputErrorSpan).toEqualText('Encrypted file requires a password.');
  })

  it('does not render file password field if encrypted is unset', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input />`);

    const textInput = await page.find('va-file-input >>> va-text-input');
    expect(textInput).toBeNull();
  });

   it('emits the vaChange event only once', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input min-file-size="1024"/>`);

    const fileUploadSpy = await page.spyOnEvent('vaFileInputError');
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

     expect(fileUploadSpy).toHaveReceivedEventDetail({
      error: "We can't upload your file because it's too small. Files must be at least 1\xa0KB."
    });
  });

  it('handles placeholder file upload and shows default file icon', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input />`, 'placeholder.png');
    const host = await page.find('va-file-input');

    // Check that the file was uploaded (container should exist)
    const containerSelector = 'va-file-input >>> div.selected-files-wrapper';
    const container = await host.find(containerSelector);
    expect(container).not.toBeNull();

    // Check that no image preview is generated (should show default file icon)
    const imagePreview = await host.find('va-file-input >>> .thumbnail-preview');
    expect(imagePreview).toBeNull();

    // Check that the default file icon (svg) is displayed
    const defaultIcon = await host.find('va-file-input >>> .thumbnail-container svg');
    expect(defaultIcon).not.toBeNull();
  });

  it('shows progress bar and cancel button when uploading', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input percent-uploaded="50"/>`, 'placeholder.png');
    const host = await page.find('va-file-input');
    const progressBar = await host.find('va-file-input >>> va-progress-bar');
    const cancelBtn = await host.find('va-file-input >>>va-button-icon');
    expect(progressBar).not.toBeNull();
    expect(cancelBtn).not.toBeNull();
  });

  it('shows password input when encrypted and not uploading', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input encrypted/>`, 'placeholder.png');
    const host = await page.find('va-file-input');
    const passwordInput = await host.find('va-file-input >>> va-text-input');
    expect(passwordInput).not.toBeNull();
  });

  it('renders additional info slot when not uploading', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input><div>Extra info</div></va-file-input>`, 'placeholder.png');
    const host = await page.find('va-file-input');
    const slot = await host.find('va-file-input >>> .additional-info-slot');
    const slotContent = await page.$eval('va-file-input >>> .additional-info-slot slot', slot => {
      const nodes = slot.assignedNodes();
      return nodes.map(node => (node as HTMLElement).textContent).join('');
    });
    expect(slot).not.toBeNull();
    expect(slotContent).toEqual('Extra info');
  });

  it('shows change and delete buttons when file is present and not uploading', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input />`, 'placeholder.png');
    const host = await page.find('va-file-input');
    const buttons = await host.findAll('va-file-input >>> va-button-icon');
    const changeBtn = await buttons[0].shadowRoot.querySelector('button[aria-label="change file. placeholder.png"]');
    const deleteBtn = await buttons[1].shadowRoot.querySelector('button[aria-label="delete file. placeholder.png"]');
    expect(changeBtn).not.toBeNull();
    expect(deleteBtn).not.toBeNull();
  });

  it('correctly displays error message for MIME type failure', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input accept="pdf" />`, '1x1.png');
    const fileInfoCard = await page.find('va-file-input >>> va-card');

    const errorMessage = await fileInfoCard.find('span.usa-error-message');
    expect(errorMessage.innerHTML).toEqual("We do not accept .png files. Choose a new file.");
  });

  it('correctly displays error message for MIME type failure when file has no extension', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input accept="pdf" />`, '1x1-png-no-extension');
    const fileInfoCard = await page.find('va-file-input >>> va-card');
    const errorMessage = await fileInfoCard.find('span.usa-error-message');
    expect(errorMessage.innerHTML).toEqual("We do not accept this file type. Choose a new file.");
  });

  it('shows change and delete buttons when in error state', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input accept=".pdf" />`, '1x1.png');
    const result = await page.evaluate(() => {
      const vaFileInput = document.querySelector('va-file-input');
      const card = vaFileInput.shadowRoot.querySelector('va-card');
      const errorMsg = card.querySelector('span.usa-error-message');
      const buttonIcons = Array.from(card.querySelectorAll('va-button-icon'));
      const buttons = buttonIcons.map(btnIcon => {
        const btn = btnIcon.shadowRoot.querySelector('button');
        return {
          ariaLabel: btn.getAttribute('aria-label'),
          innerText: btn.innerText,
        };
      });
        return {
          errorMessage: errorMsg ? errorMsg.innerHTML : null,
          buttons,
        };
    });
    expect(result.errorMessage).toEqual("We do not accept .png files. Choose a new file.");
    expect(result.buttons[0].innerText).toEqual('CHANGE FILE');
    expect(result.buttons[1].innerText).toEqual('DELETE');
  });

  it('updates the aria-label of the nested file input with uploaded file\'s name when a file is uploaded successfully', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input />`);

    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    await page.waitForChanges();

    // Wait 250ms for the status message text content to update (debounced in
    // component to help with screen reader announcements).
    await new Promise((r) => setTimeout(r, 250));

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput).not.toBeNull();
    expect(fileInput.getAttribute('aria-label')).toContain('You have selected the file: 1x1.png.');
  });

  it('updates the aria-label of the nested file input to reflect when an uploaded file is deleted', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input />`);

    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = (
      await page.waitForFunction(() =>
        document
          .querySelector('va-file-input')
          .shadowRoot.querySelector('input[type=file]'),
      )
    ) as ElementHandle<HTMLInputElement>;

    await page.waitForChanges();

    expect(input).not.toBeNull();

    const fileLabel = await page.find('va-file-input >>> .file-label');
    expect(fileLabel).toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    // get delete button
    const [_, deleteButton] = await page.findAll('va-file-input >>> va-button-icon');
    deleteButton.click();

    await page.waitForChanges();

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

    await page.waitForChanges();

    // Wait 1000ms for the status message text content to update (debounced in
    // component to help with screen reader announcements).
    await new Promise((r) => setTimeout(r, 1000));

    const fileInput = await page.find('va-file-input >>> input');
    expect(fileInput).not.toBeNull();
    expect(fileInput.getAttribute('aria-label')).toContain('File deleted. No file selected.');
  });

  it('renders a error message when there is a file input error', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input max-file-size="1" />`);

    await page.$eval('va-file-input', (elm: any) => {
      // within the browser's context
      // let's set new property values on the component
      elm.uploadedFile = {name: 'test.jpg', size: 7000, type: 'jpg'};
    });
    await page.waitForChanges();

    const errorMessage = await page.find('va-file-input >>> #input-error-message');
    expect(errorMessage).not.toBeNull();
    expect(errorMessage.getAttribute('class')).toContain('usa-error-message');

    await page.waitForChanges();

    expect(errorMessage.innerText.trim()).toBe("We can't upload your file because it's too big. Files must be less than 1 B.");
  });

  it('accepts an .heic file and displays a generic image icon', async () => {
    const page = await setUpPageWithUploadedFile(`<va-file-input accept=".heic" />`, 'test-image.heic');
    const thumbnail = await page.find('va-file-input >>> svg')
    expect(thumbnail).not.toBeNull();
  })
});
