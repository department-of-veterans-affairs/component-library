import { newE2EPage } from '@stencil/core/testing';

describe('va-crisis-line-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-crisis-line-modal />`);
  });
  
  it('shows modal when triggered', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-crisis-line-modal />`);

    // Check that the modal is not visible
    const modal = await page.find('va-crisis-line-modal >>> va-modal');
    expect(modal.getAttribute('visible')).toBe(null);

    // Trigger the modal to become visible
    const triggerButton = await page.find(
      'va-crisis-line-modal >>> button.va-overlay-trigger',
    );
    await triggerButton.click();

    // Check that the modal is visible
    expect(modal.getAttribute('visible')).not.toBe(null);
  });
});
