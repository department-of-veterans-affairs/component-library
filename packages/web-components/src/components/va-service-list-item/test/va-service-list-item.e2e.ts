import { newE2EPage } from '@stencil/core/testing';

describe('va-service-list-item', () => {
  /**
   * Helper function to set up the component with dynamic props
   */
  async function setupComponent({
    serviceDetails = {
      'Approved on': 'May 11, 2011',
      'Program': 'Post-9/11 GI Bill',
      'Eligibility': '70%',
    },
    action = undefined,
    icon = 'school',
    serviceName = 'Education',
    serviceLink = 'https://www.va.gov/education',
    serviceStatus = 'Eligible',
    optionalLink = {
      href: 'https://www.va.gov',
      text: 'Optional link (to a page other than the detail page)',
    },
  } = {}) {
    const page = await newE2EPage();

    await page.setContent(`<va-service-list-item></va-service-list-item>`);

    const elementHandle = await page.$('va-service-list-item');

    const assignedProps = {
      serviceDetails,
      optionalLink,
      icon,
      serviceName,
      serviceLink,
      serviceStatus,
      action,
    };

    await page.evaluate(
      (el, props) => {
        el.serviceDetails = JSON.stringify(props.serviceDetails);
        el.action = JSON.stringify(props.action);
        el.optionalLink = JSON.stringify(props.optionalLink);
        el.icon = props.icon;
        el.serviceName = props.serviceName;
        el.serviceLink = props.serviceLink;
        el.serviceStatus = props.serviceStatus;
      },
      elementHandle,
      assignedProps,
    );

    await page.waitForChanges();
    await page.evaluate(
      () => new Promise(resolve => setTimeout(resolve, 2000)),
    );

    const shadowRootExists = await page.evaluate(
      el => !!el.shadowRoot,
      elementHandle,
    );
    expect(shadowRootExists).toBe(true);
    return { page, elementHandle };
  }

  it('renders correctly with action bar when an action is needed and exists', async () => {
    const { page, elementHandle } = await setupComponent({
      action: {
        href: 'https://www.va.gov/education',
        text: 'Take some urgent action',
      },
    });

    await page.waitForSelector('va-service-list-item');
    await page.waitForChanges();

    const isHydrated = await page.evaluate(
      el => el.classList.contains('hydrated'),
      elementHandle,
    );
    expect(isHydrated).toBe(true);

    const shadowInnerHTML = await page.evaluate(
      el => el.shadowRoot.innerHTML,
      elementHandle,
    );

    expect(shadowInnerHTML.replace(/\s+/g, ' ')).toEqualHtml(`
      <div class="service-list-item">
        <a href="https://www.va.gov/education" class="service-title-row">
          <div class="header">
            <va-icon class="icon school hydrated"></va-icon>
            <h3 class="service-name">Education</h3>
            <va-icon class="chevron-icon hydrated"></va-icon>
          </div>
        </a>
        <div class="action-bar">
           <a class="action-link" href="https://www.va.gov/education">
          <va-icon class="hydrated link-icon"></va-icon>
        Take some urgent action
         </a>
        </div>
        <div class="status">
          <span class="usa-label">Eligible</span>
        </div>
        <ul class="service-details-list">
          <li>
            <div>
              <strong>Approved on:</strong> May 11, 2011
            </div>
          </li>
          <li>
            <div>
              <strong>Program:</strong> Post-9/11 GI Bill
            </div>
          </li>
          <li>
            <div>
              <strong>Eligibility:</strong> 70%
            </div>
          </li>
        </ul>
        <va-link class="hydrated optional-link"></va-link>
      </div>
    `);
  });

  it('does NOT render action bar when action prop is completely missing', async () => {
    // Pass all props EXCEPT action
    const { page, elementHandle } = await setupComponent({
      serviceDetails: {
        'Approved on': 'May 11, 2011',
        'Program': 'Post-9/11 GI Bill',
        'Eligibility': '70%',
      },
      icon: 'school',
      serviceName: 'Education',
      serviceLink: 'https://www.va.gov/education',
      serviceStatus: 'Eligible',
      optionalLink: {
        href: 'https://www.va.gov',
        text: 'Optional link (to a page other than the detail page)',
      },
    });

    await page.waitForSelector('va-service-list-item');
    await page.waitForChanges();

    const shadowInnerHTML = await page.evaluate(
      el => el.shadowRoot.innerHTML,
      elementHandle,
    );
    expect(shadowInnerHTML).not.toContain('<div class="action-bar">');
  });
});
