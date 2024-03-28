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
            <i aria-hidden=\"true\" class=\"fa fa-mobile-alt va-crisis-panel-icon\"></i>
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
});
