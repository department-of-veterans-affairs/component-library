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

  it('renders the file input additional info slot when slot-field-indexes is null', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input-multiple><span class="additional_info">additional info</span></va-file-input-multiple>`);

    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    await page.waitForChanges();
    
    const additionalInfo = await page.find('va-file-input-multiple >>> va-file-input span.additional_info');
    expect(additionalInfo.textContent).toEqual('additional info');
  });

  it('renders the file input additional info slot only for indexes in slot-field-indexes', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-file-input-multiple slot-field-indexes="[1,2]"><span class="additional_info">additional info</span></va-file-input-multiple>`);

    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');

    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    expect(input).not.toBeNull();

    await input
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    await page.waitForChanges();

    const additionalInfo = await page.find('va-file-input-multiple >>> va-file-input span.additional_info');
    expect(additionalInfo).toBeNull;

    let inputs = await page.$$('pierce/#fileInputField');
    const input2 = inputs[1] as ElementHandle<HTMLInputElement>;
    expect(inputs).not.toBeNull();
    expect(input2).not.toBeNull();
    await input2
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    await page.waitForChanges();

    let inputEls= await page.findAll('va-file-input-multiple >>> va-file-input');
    const additionalInfo2 = await inputEls[1].find('span.additional_info');
    expect(additionalInfo2.textContent).toEqual('additional info');


    inputs = await page.$$('pierce/#fileInputField');
    const input3 = inputs[2] as ElementHandle<HTMLInputElement>;
    expect(inputs).not.toBeNull();
    expect(input3).not.toBeNull();
    await input3
      .uploadFile(filePath)
      .catch(e => console.log('uploadFile error', e));

    await page.waitForChanges();

    inputEls= await page.findAll('va-file-input-multiple >>> va-file-input');
    const additionalInfo3 = await inputEls[2].find('span.additional_info');
    expect(additionalInfo3.textContent).toEqual('additional info');
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

  it('resets a single file input to initial visual state when resetVisualState is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    // Set resetVisualState to true for the first input
    await page.$eval('va-file-input-multiple', (el: any) => {
      el.resetVisualState = [true];
    });
    await page.waitForChanges();
    
    // Verify the file input shows initial state (instructions visible)
    const fileInput = await page.find('va-file-input-multiple >>> va-file-input >>> .file-input-instructions');
    expect(fileInput).not.toBeNull();
    expect(fileInput.innerHTML).toContain('Drag a file here or');
    
    // Verify no selected files wrapper is present (indicating reset state)
    const selectedFiles = await page.find('va-file-input-multiple >>> va-file-input >>> .selected-files-wrapper');
    expect(selectedFiles).toBeNull();
  });

  it('passes resetVisualState prop to individual file input components', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    // Upload a file to create a second input
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');
    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    await input.uploadFile(filePath);
    await page.waitForChanges();
    
    // Set resetVisualState with mixed values
    await page.$eval('va-file-input-multiple', (el: any) => {
      el.resetVisualState = [true, false];
    });
    await page.waitForChanges();
    
    const fileInputs = await page.findAll('va-file-input-multiple >>> va-file-input');
    
    // Verify we have two file inputs
    expect(fileInputs.length).toBe(2);
    
    // Check that the resetVisualState prop is passed correctly
    const firstInputResetProp = await fileInputs[0].getProperty('resetVisualState');
    const secondInputResetProp = await fileInputs[1].getProperty('resetVisualState');
    
    expect(firstInputResetProp).toBe(true);
    expect(secondInputResetProp).toBe(false);
  });

  it('shows initial state when resetVisualState is applied with errors', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    // Set both error and resetVisualState
    await page.$eval('va-file-input-multiple', (el: any) => {
      el.errors = ['This file has an error'];
      el.resetVisualState = [true];
    });
    await page.waitForChanges();
    
    // When resetVisualState is true, should show initial instructions despite error
    const instructions = await page.find('va-file-input-multiple >>> va-file-input >>> .file-input-instructions');
    expect(instructions).not.toBeNull();
    expect(instructions.innerHTML).toContain('Drag a file here or');
    
    // Error should still be present but instructions should be visible due to reset
    const errorMessage = await page.find('va-file-input-multiple >>> va-file-input >>> .usa-error-message');
    expect(errorMessage).not.toBeNull();
  });

  it('shows initial state for encrypted file inputs when resetVisualState is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    // Set up encrypted file with resetVisualState
    await page.$eval('va-file-input-multiple', (el: any) => {
      el.encrypted = [true];
      el.resetVisualState = [true];
    });
    await page.waitForChanges();
    
    // Should show initial instructions despite encryption setting
    const instructions = await page.find('va-file-input-multiple >>> va-file-input >>> .file-input-instructions');
    expect(instructions).not.toBeNull();
    expect(instructions.innerHTML).toContain('Drag a file here or');
    
    // Should not show selected files wrapper when reset
    const selectedFiles = await page.find('va-file-input-multiple >>> va-file-input >>> .selected-files-wrapper');
    expect(selectedFiles).toBeNull();
  });

  it('handles resetVisualState array with fewer values than file inputs', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    // Upload files to create multiple inputs
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');
    const input1 = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    await input1.uploadFile(filePath);
    await page.waitForChanges();
    
    const inputs = await page.$$('pierce/#fileInputField');
    const input2 = inputs[1] as ElementHandle<HTMLInputElement>;
    await input2.uploadFile(filePath);
    await page.waitForChanges();
    
    // Set resetVisualState with only one value for two inputs
    await page.$eval('va-file-input-multiple', (el: any) => {
      el.resetVisualState = [true];
    });
    await page.waitForChanges();
    
    const fileInputs = await page.findAll('va-file-input-multiple >>> va-file-input');
    
    // First input should get the specified value
    const firstInputReset = await fileInputs[0].getProperty('resetVisualState');
    expect(firstInputReset).toBe(true);
    
    // Second input should get undefined (no value provided)
    const secondInputReset = await fileInputs[1].getProperty('resetVisualState');
    expect(secondInputReset).toBeUndefined();
  });

  it('passes percentUploaded prop to individual file input components', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    // Upload a file to create a second input
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');
    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    await input.uploadFile(filePath);
    await page.waitForChanges();
    
    // Set percentUploaded with different values for each input
    await page.$eval('va-file-input-multiple', (el: any) => {
      el.percentUploaded = [75, 25];
    });
    await page.waitForChanges();
    
    const fileInputs = await page.findAll('va-file-input-multiple >>> va-file-input');
    
    // Verify we have two file inputs
    expect(fileInputs.length).toBe(2);
    
    // Check that the percentUploaded prop is passed correctly
    const firstInputPercent = await fileInputs[0].getProperty('percentUploaded');
    const secondInputPercent = await fileInputs[1].getProperty('percentUploaded');
    
    expect(firstInputPercent).toBe(75);
    expect(secondInputPercent).toBe(25);
  });

  it('handles percentUploaded array with fewer values than file inputs', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    // Upload files to create multiple inputs
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');
    const input1 = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    await input1.uploadFile(filePath);
    await page.waitForChanges();
    
    const inputs = await page.$$('pierce/#fileInputField');
    const input2 = inputs[1] as ElementHandle<HTMLInputElement>;
    await input2.uploadFile(filePath);
    await page.waitForChanges();
    
    // Set percentUploaded with only one value for two inputs
    await page.$eval('va-file-input-multiple', (el: any) => {
      el.percentUploaded = [50];
    });
    await page.waitForChanges();
    
    const fileInputs = await page.findAll('va-file-input-multiple >>> va-file-input');
    
    // First input should get the specified value
    const firstInputPercent = await fileInputs[0].getProperty('percentUploaded');
    expect(firstInputPercent).toBe(50);
    
    // Second input should get null or undefined (no value provided)
    const secondInputPercent = await fileInputs[1].getProperty('percentUploaded');
    expect(secondInputPercent).toBeUndefined();
  });

  it('displays progress bar when percentUploaded is less than 100', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    // Upload a file first
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');
    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    await input.uploadFile(filePath);
    await page.waitForChanges();
    
    // Set percentUploaded to show progress
    await page.$eval('va-file-input-multiple', (el: any) => {
      el.percentUploaded = [60];
    });
    await page.waitForChanges();
    
    // Should show progress bar
    const progressBar = await page.find('va-file-input-multiple >>> va-file-input >>> va-progress-bar');
    expect(progressBar).not.toBeNull();
    
    // Should show uploading status
    const uploadingStatus = await page.find('va-file-input-multiple >>> va-file-input >>> .uploading-status');
    expect(uploadingStatus).not.toBeNull();
  });

  it('passes maxFileSize prop to all file input components', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    // Upload a file to create a second input
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');
    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    await input.uploadFile(filePath);
    await page.waitForChanges();
    
    // Set maxFileSize prop
    const maxSize = 5000000; // 5MB
    await page.$eval('va-file-input-multiple', (el: any) => {
      el.maxFileSize = 5000000;
    });
    await page.waitForChanges();
    
    const fileInputs = await page.findAll('va-file-input-multiple >>> va-file-input');
    
    // Verify we have two file inputs
    expect(fileInputs.length).toBe(2);
    
    // Check that maxFileSize prop is passed to all file inputs
    const firstInputMaxSize = await fileInputs[0].getProperty('maxFileSize');
    const secondInputMaxSize = await fileInputs[1].getProperty('maxFileSize');
    
    expect(firstInputMaxSize).toBe(maxSize);
    expect(secondInputMaxSize).toBe(maxSize);
  });

  it('applies default maxFileSize value when not specified', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    const fileInput = await page.find('va-file-input-multiple >>> va-file-input');
    
    // Check that default maxFileSize is Infinity
    const defaultMaxSize = await fileInput.getProperty('maxFileSize');
    expect(defaultMaxSize).toBe(Infinity);
  });

  it('passes minFileSize prop to all file input components', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    // Upload a file to create a second input
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');
    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    await input.uploadFile(filePath);
    await page.waitForChanges();
    
    // Set minFileSize prop
    const minSize = 1000; // 1KB
    await page.$eval('va-file-input-multiple', (el: any) => {
      el.minFileSize = 1000;
    });
    await page.waitForChanges();
    
    const fileInputs = await page.findAll('va-file-input-multiple >>> va-file-input');
    
    // Verify we have two file inputs
    expect(fileInputs.length).toBe(2);
    
    // Check that minFileSize prop is passed to all file inputs
    const firstInputMinSize = await fileInputs[0].getProperty('minFileSize');
    const secondInputMinSize = await fileInputs[1].getProperty('minFileSize');
    
    expect(firstInputMinSize).toBe(minSize);
    expect(secondInputMinSize).toBe(minSize);
  });

  it('applies default minFileSize value when not specified', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    const fileInput = await page.find('va-file-input-multiple >>> va-file-input');
    
    // Check that default minFileSize is 0
    const defaultMinSize = await fileInput.getProperty('minFileSize');
    expect(defaultMinSize).toBe(0);
  });

  it('passes statusText prop to all file input components', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    // Upload a file to create a second input
    const filePath = path.relative(process.cwd(), __dirname + '/1x1.png');
    const input = await page.$('pierce/#fileInputField') as ElementHandle<HTMLInputElement>;
    await input.uploadFile(filePath);
    await page.waitForChanges();
    
    // Set statusText prop
    const customStatus = 'Processing file...';
    await page.$eval('va-file-input-multiple', (el: any) => {
      el.statusText = 'Processing file...';
    });
    await page.waitForChanges();
    
    const fileInputs = await page.findAll('va-file-input-multiple >>> va-file-input');
    
    // Verify we have two file inputs
    expect(fileInputs.length).toBe(2);
    
    // Check that statusText prop is passed to all file inputs
    const firstInputStatus = await fileInputs[0].getProperty('statusText');
    const secondInputStatus = await fileInputs[1].getProperty('statusText');
    
    expect(firstInputStatus).toBe(customStatus);
    expect(secondInputStatus).toBe(customStatus);
  });

  it('applies undefined statusText when not specified', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-file-input-multiple />');
    
    const fileInput = await page.find('va-file-input-multiple >>> va-file-input');
    
    // Check that statusText is undefined when not set
    const defaultStatus = await fileInput.getProperty('statusText');
    expect(defaultStatus).toBeUndefined();
  });

  it.skip('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-file-input-multiple required label="This is a test" buttonText="Upload a file" error="With an error message" />',
    );

    await axeCheck(page);
  });
});
