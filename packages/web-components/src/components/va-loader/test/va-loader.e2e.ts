import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-loader', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-loader></va-loader>');

    const element = await page.find('va-loader');
    expect(element).not.toBeNull();

    const loaderDiv = await page.find('va-loader >>> .vacds-loader');
    expect(loaderDiv).not.toBeNull();
    expect(await loaderDiv.getAttribute('role')).toBe('status');

    const textDiv = await page.find('va-loader >>> .vacds-loader-text');
    const text = await textDiv.getProperty('textContent');
    expect(text).toBe('Loading');
  });

  it('renders with custom label', async () => {
    const customLabel = 'Loading spinner';
    const page = await newE2EPage();
    await page.setContent(
      `<va-loader center-label="${customLabel}"></va-loader>`,
    );

    const textDiv = await page.find('va-loader >>> .vacds-loader-text');
    const text = await textDiv.getProperty('textContent');
    expect(text).toBe(customLabel);
  });

  it('updates text based on rotation state', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-loader></va-loader>');

    // Initial state
    let textDiv = await page.find('va-loader >>> .vacds-loader-text');
    let text = await textDiv.getProperty('textContent');
    expect(text).toBe('Loading');

    // Wait for first rotation (250ms)
    await page.waitForTimeout(250);
    textDiv = await page.find('va-loader >>> .vacds-loader-text');
    text = await textDiv.getProperty('textContent');
    expect(text).toBe('Loading.');

    // Wait for second rotation (250ms)
    await page.waitForTimeout(250);
    textDiv = await page.find('va-loader >>> .vacds-loader-text');
    text = await textDiv.getProperty('textContent');
    expect(text).toBe('Loading..');

    // Wait for third rotation (250ms)
    await page.waitForTimeout(250);
    textDiv = await page.find('va-loader >>> .vacds-loader-text');
    text = await textDiv.getProperty('textContent');
    expect(text).toBe('Loading...');

    // Wait for fourth rotation (250ms) - back to initial state
    await page.waitForTimeout(250);
    textDiv = await page.find('va-loader >>> .vacds-loader-text');
    text = await textDiv.getProperty('textContent');
    expect(text).toBe('Loading');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-loader></va-loader>');

    await axeCheck(page);
  });
});
