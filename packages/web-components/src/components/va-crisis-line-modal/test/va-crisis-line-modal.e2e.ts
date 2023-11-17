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
            <img aria-hidden=\"true\" class=\"va-crisis-line-arrow\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDQuODE5IDQ0NC44MTkiIHdpZHRoPSI0NDQuODE5IiBoZWlnaHQ9IjQ0NC44MTkiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zNTIuMDI1IDE5Ni43MTJMMTY1Ljg4NSAxMC44NDhDMTU5LjAyOCAzLjYxNSAxNTAuNDY4IDAgMTQwLjE4NSAwcy0xOC44NCAzLjYyLTI1LjY5NiAxMC44NDhsLTIxLjcgMjEuNDE2Yy03LjA0NSA3LjA0My0xMC41NjcgMTUuNjA0LTEwLjU2NyAyNS42OTIgMCA5Ljg5NyAzLjUyIDE4LjU2IDEwLjU2NiAyNS45OEwyMzEuNTQ0IDIyMi40MSA5Mi43ODUgMzYxLjE2OGMtNy4wNCA3LjA0My0xMC41NjMgMTUuNjA0LTEwLjU2MyAyNS42OTMgMCA5LjkgMy41MiAxOC41NjYgMTAuNTY0IDI1Ljk4bDIxLjcgMjEuNDE3YzcuMDQzIDcuMDQzIDE1LjYxMiAxMC41NjQgMjUuNjk3IDEwLjU2NCAxMC4wOSAwIDE4LjY1Ni0zLjUyIDI1LjY5Ny0xMC41NjRMMzUyLjAyNSAyNDguMzljNy4wNDYtNy40MjMgMTAuNTctMTYuMDg0IDEwLjU3LTI1Ljk4LjAwMi0xMC4wOS0zLjUyNC0xOC42NTUtMTAuNTctMjUuNjk4eiIvPjwvc3ZnPg==\">
          </div>
        </button>
      </div>
      <va-modal class=\"hydrated\" large=\"\">
        <p>
          If you are a Veteran in crisis or concerned about one, connect with our caring, qualified responders for confidential help. Many of them are Veterans themselves.
        </p>
        <ul class=\"va-crisis-panel-list\">
          <li>
            <i aria-hidden=\"true\" class=\"fa fa-phone va-crisis-panel-icon\"></i>
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
            <i aria-hidden=\"true\" class=\"fa fa-comments va-crisis-panel-icon\"></i>
            <a class=\"no-external-icon\" href=\"https://www.veteranscrisisline.net/get-help-now/chat/\">
              Start a confidential chat
            </a>
          </li>
          <li>
            <i aria-hidden=\"true\" class=\"fa fa-deaf va-crisis-panel-icon\"></i>
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
    await page.waitForChanges();

    // Check that the modal is visible
    expect(modal.getAttribute('visible')).not.toBe(null);
  });
});
