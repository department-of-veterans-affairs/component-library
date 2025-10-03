import { newE2EPage } from '@stencil/core/testing';

describe('va-header-minimal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-header-minimal></va-header-minimal>');

    const element = await page.find('va-header-minimal');
    expect(element).toHaveClass('hydrated');
  });

  it('overrides crisis line modal props', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-header-minimal header="Authorization To Disclose Personal Information To A Third Party"></va-header-minimal>`,
    );

    // Create component
    const element = await page.find('va-header-minimal');

    // Set crisis line modal prop overrides
    const overrides = JSON.stringify({
      chatUrl: 'https://example.com/chat',
      phoneNumber: '123',
      smsNumber: '0987654321',
      ttyNumber: '5555555555',
    });
    element.setProperty('crisisLineModalPropOverrides', JSON.parse(overrides));
    await page.waitForChanges();

    // Verify that the props were set correctly
    const vaCrisisLineChild = await page.find('va-header-minimal >>> va-crisis-line-modal');
    expect(await vaCrisisLineChild.getProperty('phoneNumber')).toBe('123');
    expect(await vaCrisisLineChild.getProperty('smsNumber')).toBe('0987654321');
    expect(await vaCrisisLineChild.getProperty('chatUrl')).toBe('https://example.com/chat');
    expect(await vaCrisisLineChild.getProperty('ttyNumber')).toBe('5555555555');
  });
});
