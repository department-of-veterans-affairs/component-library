import { newE2EPage } from '@stencil/core/testing';

describe('va-crisis-line-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-crisis-line-modal />`);
    const element = await page.find('va-crisis-line-modal');

    expect(element).toEqualHtml(`<va-crisis-line-modal class=\"hydrated\">
    <mock:shadow-root>
      <div class=\"va-crisis-line-container\">
        <button class=\"va-crisis-line va-overlay-trigger\" data-show=\"#modal-crisisline\" part=\"button\">
          <div class=\"va-crisis-line-inner\">
            <span aria-hidden=\"true\" class=\"va-crisis-line-icon\"></span>
            <span class=\"va-crisis-line-text\">
              Talk to the
              <strong>
                Veterans Crisis Line
              </strong>
              now
            </span>
            <va-icon class="hydrated va-icon__right-arrow"></va-icon>
          </div>
        </button>
      </div>
      <va-modal class=\"hydrated\" large=\"\">
        <p>
          If you are a Veteran in crisis or concerned about one, connect with our caring, qualified responders for confidential help. Many of them are Veterans themselves.
        </p>
        <ul class=\"va-crisis-panel-list\">
          <li>
            <va-icon class="hydrated va-clm__icon"></va-icon>
            <span>
              Call
              <strong>
                <va-telephone class=\"hydrated\"></va-telephone>
                and select 1
              </strong>
            </span>
          </li>
          <li>
            <va-icon class="hydrated va-clm__icon"></va-icon>
            <span>
              Text
              <strong>
                <va-telephone class=\"hydrated\"></va-telephone>
              </strong>
            </span>
          </li>
          <li>
            <va-icon class="hydrated va-clm__icon"></va-icon>
            <a class=\"no-external-icon\" href=\"https://www.veteranscrisisline.net/get-help-now/chat/\">
              Start a confidential chat
            </a>
          </li>
          <li>
            <va-icon class="hydrated va-clm__icon"></va-icon>
            <p>
              Call TTY if you have hearing loss
              <strong>
                <va-telephone class=\"hydrated\"></va-telephone>
              </strong>
            </p>
          </li>
        </ul>
        <p>
          Get more resources at
          <a class=\"no-external-icon\" href=\"https://www.veteranscrisisline.net/\">
            VeteransCrisisLine.net
          </a>
        </p>
      </va-modal>
    </mock:shadow-root>
  </va-crisis-line-modal>`);
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

  it('respects phoneNumber, smsNumber, chatUrl, and ttyNumber props', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-crisis-line-modal phone-number="123" sms-number="456" chat-url="https://example.com/chat" tty-number="789" />`,
    );

    // Get all va telephone components and validate their contact props
    const vaTelephoneComponents = await page.findAll(
      'va-crisis-line-modal >>> va-telephone',
    );
    expect(vaTelephoneComponents.length).toBe(3);

    const phoneNumber = vaTelephoneComponents[0];
    expect(phoneNumber).not.toBeNull();
    expect(await phoneNumber.getProperty('contact')).toBe('123');

    const smsNumber = vaTelephoneComponents[1];
    expect(smsNumber).not.toBeNull();
    expect(await smsNumber.getProperty('contact')).toBe('456');

    const ttyNumber = vaTelephoneComponents[2];
    expect(ttyNumber).not.toBeNull();
    expect(await ttyNumber.getProperty('contact')).toBe('789');

    const chatLink = vaTelephoneComponents[2];
    expect(chatLink).not.toBeNull();

    // Get third list item to target chat link and validate href
    const listItems = await page.findAll(
      'va-crisis-line-modal >>> .va-crisis-panel-list li',
    );
    expect(listItems.length).toBe(4);

    const chatListItem = listItems[2];
    expect(chatListItem).not.toBeNull();

    const chatAnchor = await chatListItem.find('a');
    expect(chatAnchor).not.toBeNull();
    expect(chatAnchor.getAttribute('href')).toBe('https://example.com/chat');
  });
});
