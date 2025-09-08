import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-button-segmented', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-tag status="default" text="Test tag"></va-tag>');

    const element = await page.find('va-tag');
    expect(element).toHaveClass('hydrated');
  });

  it('passes accessibility tests', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-tag></va-tag>');

    await axeCheck(page);
  });

  it('respect the status prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-tag status="error" text="Test tag"></va-tag>');

    const element = await page.find('va-tag');
    expect(element).toHaveClass('va-tag--error');
  });

  it('sets default status if an invalid status is provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-tag status="invalid-status" text="Test tag"></va-tag>');

    const element = await page.find('va-tag');
    expect(element).toHaveClass('usa-label');
  });
});
