import { newE2EPage } from '@stencil/core/testing';

describe('va-crisis-line-modal', () => {
  it('renders with default values when no props are provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-crisis-line-modal></va-crisis-line-modal>');

    const component = await page.find('va-crisis-line-modal');
    expect(component).toHaveClass('hydrated');

    // Click the trigger button to open modal
    const triggerButton = await page.find('va-crisis-line-modal >>> .va-crisis-line');
    await triggerButton.click();

    // Wait for modal to be visible
    await page.waitForChanges();

    const modal = await page.find('va-crisis-line-modal');

    // Check default phone number (988)
    const phoneElement = await modal.find('>>> va-telephone');
    const defaultPhoneLink = await phoneElement.shadowRoot.querySelector('a[href="tel:988"]');
    expect(defaultPhoneLink).toBeTruthy();

    // Check default text number (838255)
    const textElement = (await page.findAll('va-crisis-line-modal >>> va-telephone'))[1];
    const defaultTextLink = await textElement.shadowRoot.querySelector('a[href="sms:838255"]');
    expect(defaultTextLink).toBeTruthy();

    // Check default chat URL
    const chatLink = await page.find('va-crisis-line-modal >>> a[href="https://www.veteranscrisisline.net/get-help-now/chat/"]');
    expect(chatLink).toBeTruthy();

    // Check default TTY number
    const ttyElement = (await page.findAll('va-crisis-line-modal >>> va-telephone'))[2];
    const defaultTtyLink = await ttyElement.shadowRoot.querySelector('a[href="tel:711"]');
    expect(defaultTtyLink).toBeTruthy();
  });

  it('displays custom phoneNumber prop correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-crisis-line-modal phone-number="555-123-4567"></va-crisis-line-modal>');

    // Open modal
    const triggerButton = await page.find('va-crisis-line-modal >>> .va-crisis-line');
    await triggerButton.click();
    await page.waitForChanges();

    const modal = await page.find('va-crisis-line-modal');

    // Check custom phone number is displayed
    const phoneElement = await modal.find('>>> va-telephone');
    const customPhoneLink = await phoneElement.shadowRoot.querySelector('a[href="tel:+15551234567"]');
    expect(customPhoneLink).toBeTruthy();

    // Ensure default phone number is not present
    const defaultPhoneLink = await phoneElement.shadowRoot.querySelector('a[href="tel:988"]');
    expect(defaultPhoneLink).toBeFalsy();
  });

  it('displays custom textNumber prop correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-crisis-line-modal text-number="123456"></va-crisis-line-modal>');

    // Open modal
    const triggerButton = await page.find('va-crisis-line-modal >>> .va-crisis-line');
    await triggerButton.click();
    await page.waitForChanges();

    // Check custom text number is displayed
    const textElement = (await page.findAll('va-crisis-line-modal >>> va-telephone'))[1];
    const textLink = await textElement.shadowRoot.querySelector('a[href="sms:123456"]');
    expect(textLink).toBeTruthy();

    // Ensure default text number is not present
    const defaultTextLink = await textElement.shadowRoot.querySelector('a[href="sms:838255"]');
    expect(defaultTextLink).toBeFalsy();
  });

  it('displays custom chatUrl prop correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-crisis-line-modal chat-url="https://custom-chat-url.com"></va-crisis-line-modal>');

    // Open modal
    const triggerButton = await page.find('va-crisis-line-modal >>> .va-crisis-line');
    await triggerButton.click();
    await page.waitForChanges();

    // Check custom chat URL is displayed
    const chatLink = await page.find('va-crisis-line-modal >>> a[href="https://custom-chat-url.com"]');
    expect(chatLink).toBeTruthy();

    // Ensure default chat URL is not present
    const defaultChatLink = await page.find('va-crisis-line-modal >>> a[href="https://www.veteranscrisisline.net/get-help-now/chat/"]');
    expect(defaultChatLink).toBeFalsy();
  });

  it('displays custom ttyNumber prop correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-crisis-line-modal tty-number="555-999-8888"></va-crisis-line-modal>');

    // Open modal
    const triggerButton = await page.find('va-crisis-line-modal >>> .va-crisis-line');
    await triggerButton.click();
    await page.waitForChanges();

    // Check custom TTY number is displayed
    const ttyElement = (await page.findAll('va-crisis-line-modal >>> va-telephone'))[2];
    const customTtyLink = await ttyElement.shadowRoot.querySelector('a[href="tel:+15559998888"]');
    expect(customTtyLink).toBeTruthy();
  });

  it('displays all custom props together correctly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-crisis-line-modal 
        phone-number="555-111-2222"
        text-number="999888"
        chat-url="https://custom-chat.example.com"
        tty-number="555-777-6666">
      </va-crisis-line-modal>
    `);

    // Open modal
    const triggerButton = await page.find('va-crisis-line-modal >>> .va-crisis-line');
    await triggerButton.click();
    await page.waitForChanges();

    const modal = await page.find('va-crisis-line-modal');

    // Check custom phone number (555-111-2222)
    const phoneElement = await modal.find('>>> va-telephone');
    const customPhoneLink = await phoneElement.shadowRoot.querySelector('a[href="tel:+15551112222"]');
    expect(customPhoneLink).toBeTruthy();

    // Check custom text number (999888)
    const textElement = (await page.findAll('va-crisis-line-modal >>> va-telephone'))[1];
    const customTextLink = await textElement.shadowRoot.querySelector('a[href="sms:999888"]');
    expect(customTextLink).toBeTruthy();

    // Check custom chat URL
    const chatLink = await page.find('va-crisis-line-modal >>> a[href="https://custom-chat.example.com"]');
    expect(chatLink).toBeTruthy();

    // Check custom TTY number
    const ttyElement = (await page.findAll('va-crisis-line-modal >>> va-telephone'))[2];
    const customTtyLink = await ttyElement.shadowRoot.querySelector('a[href="tel:+15557776666"]');
    expect(customTtyLink).toBeTruthy();
  });

  it('opens and closes modal correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-crisis-line-modal></va-crisis-line-modal>');

    // Initially modal should not be visible
    let modal = await page.find('va-crisis-line-modal >>> va-modal');
    let isVisible = await modal.getProperty('visible');
    expect(isVisible).toBe(false);

    // Click trigger button to open modal
    const triggerButton = await page.find('va-crisis-line-modal >>> .va-crisis-line');
    await triggerButton.click();
    await page.waitForChanges();

    // Modal should now be visible
    modal = await page.find('va-crisis-line-modal >>> va-modal');
    isVisible = await modal.getProperty('visible');
    expect(isVisible).toBe(true);

    // Close modal by triggering close event
    const closeBtn = await modal.find('>>> button.va-modal-close');
    await closeBtn.click();
    await page.waitForChanges();

    // Modal should be hidden again
    modal = await page.find('va-crisis-line-modal >>> va-modal');
    isVisible = await modal.getProperty('visible');
    expect(isVisible).toBe(false);
  });

  it('has proper accessibility attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-crisis-line-modal></va-crisis-line-modal>');

    // Check trigger button has proper attributes
    const triggerButton = await page.find('va-crisis-line-modal >>> .va-crisis-line');
    expect(triggerButton).toBeTruthy();

    // Check that modal has proper title
    await triggerButton.click();
    await page.waitForChanges();

    const modal = await page.find('va-crisis-line-modal >>> va-modal');
    const modalTitle = await modal.getProperty('modalTitle');
    expect(modalTitle).toBe("We’re here anytime, day or night – 24/7");

    // Check that icons have aria-hidden
    const crisisLineIcon = await page.find('va-crisis-line-modal >>> .va-crisis-line-icon');
    const ariaHidden = await crisisLineIcon.getAttribute('aria-hidden');
    expect(ariaHidden).toBe('true');
  });

  it('opens modal via document event when rendered without trigger button (modal-only)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <button id="external-trigger" type="button" onclick="document.dispatchEvent(new CustomEvent('va-crisis-line-modal:open'))">Launch Crisis Line</button>
      <va-crisis-line-modal modal-only></va-crisis-line-modal>
    `);

    // Internal trigger button should NOT exist
    const internalTrigger = await page.find('va-crisis-line-modal >>> .va-crisis-line');
    expect(internalTrigger).toBeNull();

    // Click external button to dispatch event
    const externalTrigger = await page.find('#external-trigger');
    await externalTrigger.click();
    await page.waitForChanges();

    // Modal should become visible
    const modal = await page.find('va-crisis-line-modal >>> va-modal');
    const isVisible = await modal.getProperty('visible');
    expect(isVisible).toBe(true);
  });
  it('only renders a single modal when multiple instances are on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-crisis-line-modal></va-crisis-line-modal>
      <va-crisis-line-modal></va-crisis-line-modal>
    `);

    // Check that only one modal is in the DOM
    const modals = await page.findAll('va-crisis-line-modal >>> va-modal');
    expect(modals.length).toBe(1);
  });
});
