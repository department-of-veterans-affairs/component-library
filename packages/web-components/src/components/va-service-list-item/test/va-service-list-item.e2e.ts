import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

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

  it('renders with all elements and the critical action component when an action prop is provided', async () => {
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
          <div class="header" tabindex="0">
            <va-icon class="icon school hydrated"></va-icon>
             <div class="name-and-chevron">
            <h3 class="service-name">Education</h3>
            <va-icon class="chevron-icon hydrated"></va-icon>
            </div>
          </div>
        </a>
      <va-critical-action class="hydrated"></va-critical-action>
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

  it('does NOT render the critical action component when action prop is not passed', async () => {
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
    expect(shadowInnerHTML).not.toContain('<va-critical-action');
  });

  it('does NOT render icon when icon prop is not passed', async () => {
    // Pass all props EXCEPT icon
    const { page, elementHandle } = await setupComponent({
      serviceDetails: {
        'Approved on': 'May 11, 2011',
        'Program': 'Post-9/11 GI Bill',
        'Eligibility': '70%',
      },
      serviceName: 'Education',
      serviceLink: 'https://www.va.gov/education',
      serviceStatus: 'Eligible',
      action: {
        href: 'https://www.va.gov/education',
        text: 'Take some urgent action',
      },
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
    expect(shadowInnerHTML).not.toContain(
      '<va-icon class="icon hydrated"></va-icon>',
    );
  });

  it('does NOT render optionalLink when optionalLink prop is not passed', async () => {
    // Pass all props EXCEPT optionalLink
    const { page, elementHandle } = await setupComponent({
      serviceDetails: {
        'Approved on': 'May 11, 2011',
        'Program': 'Post-9/11 GI Bill',
        'Eligibility': '70%',
      },
      serviceName: 'Education',
      serviceLink: 'https://www.va.gov/education',
      serviceStatus: 'Eligible',
      action: {
        href: 'https://www.va.gov/education',
        text: 'Take some urgent action',
      },
    });

    await page.waitForSelector('va-service-list-item');
    await page.waitForChanges();

    const shadowInnerHTML = await page.evaluate(
      el => el.shadowRoot.innerHTML,
      elementHandle,
    );
    expect(shadowInnerHTML).not.toContain(
      '<va-link class="hydrated optional-link"></va-link>',
    );
  });

  it('passes an axe check', async () => {
    const { page } = await setupComponent();
    await axeCheck(page);
  });
});
