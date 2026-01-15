import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-tag-status', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-tag-status status="info" text="Test tag"></va-tag-status>');

    const element = await page.find('va-tag-status');
    expect(element).toHaveClass('hydrated');
  });

  it('passes accessibility tests', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-tag-status></va-tag-status>');

    await axeCheck(page);
  });

  it('respect the status prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-tag-status status="error" text="Test tag"></va-tag-status>');

    const element = await page.find('va-tag-status');
    expect(element).toHaveClass('va-tag-status--error');
  });

  it('falls back to "info" status if an invalid status is provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-tag-status status="invalid-status" text="Test tag"></va-tag-status>');

    const element = await page.find('va-tag-status');
    expect(element).toHaveClass('va-tag-status--info');
  });

  it('respects the screenReaderText prop by setting text content for .usa-sr-only element', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-tag-status status="error" text="Test tag" screen-reader-text="Custom status:"></va-tag-status>');

    const srText = await page.find('va-tag-status >>> .usa-sr-only');
    expect(srText.textContent).toBe('Custom status:');
  });
});
