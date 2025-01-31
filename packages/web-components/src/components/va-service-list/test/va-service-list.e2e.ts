import { newE2EPage } from '@stencil/core/testing';

describe('va-service-list', () => {
  /**
   * Helper function to set up the component with dynamic props
   */
  async function setupComponent({
    serviceDetails = `{
      "Approved on": "May 11, 2011",
      "Program": "Post-9/11 GI Bill",
      "Eligibility": "70%"
    }`,
    action = `{
      "href": "https://www.va.gov/education",
      "text": "Verify income"
    }`,
    icon = "school",
    serviceName = "Education",
    serviceStatus = "Eligible",
    optionalLink = "https://va.gov",
  } = {}) {
    const page = await newE2EPage();
    await page.setContent(`<va-service-list></va-service-list>`);

    const elementHandle = await page.$('va-service-list');

    await page.evaluate(
      (el, props) => {
        el.serviceDetails = props.serviceDetails;
        el.action = props.action;
        el.icon = props.icon;
        el.serviceName = props.serviceName;
        el.serviceStatus = props.serviceStatus;
        el.optionalLink = props.optionalLink;
      },
      elementHandle,
      { serviceDetails, action, icon, serviceName, serviceStatus, optionalLink }
    );

    await page.waitForChanges();
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 5000)));

    return { page, elementHandle };
  }

  it('renders correctly with action bar when serviceStatus is Eligible', async () => {
    const { page, elementHandle } = await setupComponent({ serviceStatus: "Eligible" });

    const shadowRootExists = await page.evaluate((el) => !!el.shadowRoot, elementHandle);
    expect(shadowRootExists).toBe(true);

    const shadowInnerHTML = await page.evaluate((el) => el.shadowRoot.innerHTML, elementHandle);
    expect(shadowInnerHTML.replace(/\s+/g, ' ')).toEqualHtml(`
      <div class="service-list">
        <a href="/">
          <div class="header">
            <slot name="icon">
              <va-icon class="icon hydrated"></va-icon>
            </slot>
            <slot name="service-name">
              <h3 class="service-name">Education</h3>
            </slot>
            <va-icon class="chevron-icon hydrated"></va-icon>
          </div>
        </a>
        <div class="action-bar">
          <va-link-action class="hydrated"></va-link-action>
        </div>
        <div class="status">
          <span class="usa-label">Eligible</span>
        </div>
        <ul class="service-list-items">
          <li>
            <div>
              <strong>APPROVED ON:</strong> May 11, 2011
            </div>
          </li>
          <li>
            <div>
              <strong>PROGRAM:</strong> Post-9/11 GI Bill
            </div>
          </li>
          <li>
            <div>
              <strong>ELIGIBILITY:</strong> 70%
            </div>
          </li>
        </ul>
        <slot name="optional-link">
          <va-link class="hydrated"></va-link>
        </slot>
      </div>
    `);
  });

  it('does NOT render action bar when serviceStatus is NOT Eligible"', async () => {
    const { page, elementHandle } = await setupComponent({ serviceStatus: "Ineligible" });

    const shadowInnerHTML = await page.evaluate((el) => el.shadowRoot.innerHTML, elementHandle);

    expect(shadowInnerHTML).not.toContain('<div class="action-bar">');
  });

});














