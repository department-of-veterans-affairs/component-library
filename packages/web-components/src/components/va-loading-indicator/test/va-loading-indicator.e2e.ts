import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-loading-indicator', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-loading-indicator></va-loading-indicator>');

    const element = await page.find('va-loading-indicator');
    expect(element).toHaveClass('hydrated');
  });

  it('should not focus if setFocus is not set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-loading-indicator></va-loading-indicator>');

    const focusedHandle = await page.evaluateHandle(
      () => document.activeElement,
    );
    const focusedTag = await focusedHandle.evaluate((domElement: Element) => {
      return domElement.tagName.toLowerCase();
    });

    expect(focusedTag).toEqual('body');
  });

  it('should focus if setFocus is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-loading-indicator set-focus="true"</va-loading-indicator>',
    );

    const focusedHandle = await page.evaluateHandle(
      () => document.activeElement,
    );
    const focusedTag = await focusedHandle.evaluate((domElement: Element) => {
      return domElement.tagName.toLowerCase();
    });

    expect(focusedTag).toEqual('va-loading-indicator');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-loading-indicator message="Loading" label="aria label here"</va-loading-indicator>',
    );

    await axeCheck(page);
  });
});
