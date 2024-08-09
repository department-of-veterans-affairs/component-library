import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-segmented-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    expect(element).toEqualHtml(`
      <va-segmented-progress-bar class=\"hydrated\" current=\"3\" total=\"6\">
        <mock:shadow-root>
          <div class=\"usa-step-indicator\">
            <ol aria-hidden=\"true\" class=\"usa-step-indicator__segments\">
              <li class=\"usa-step-indicator__segment usa-step-indicator__segment--complete\"></li>
              <li class=\"usa-step-indicator__segment usa-step-indicator__segment--complete\"></li>
              <li aria-current=\"step\" class=\"usa-step-indicator__segment usa-step-indicator__segment--current\"></li>
              <li class=\"usa-step-indicator__segment\"></li>
              <li class=\"usa-step-indicator__segment\"></li>
              <li class=\"usa-step-indicator__segment\"></li>
            </ol>
            <div class=\"usa-step-indicator__header\">
              <h4 class=\"usa-step-indicator__heading\">
                <span class=\"usa-step-indicator__heading-counter\">
                  <span class=\"usa-sr-only\">
                    Step
                  </span>
                  <span class=\"usa-step-indicator__current-step\">
                    3
                  </span>
                  <span class=\"usa-step-indicator__total-steps\">
                    of 6
                  </span>
                </span>
                <span class=\"usa-step-indicator__heading-text\"></span>
              </h4>
            </div>
          </div>
        </mock:shadow-root>
      </va-segmented-progress-bar>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-segmented-progress-bar current="3" total="6"></va-segmented-progress-bar>',
    );
    await axeCheck(page);
  });

  it('fires an analytics event when the component is mounted', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-segmented-progress-bar enable-analytics></va-segmented-progress-bar>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    await page.$eval('va-segmented-progress-bar', (element: any) => {
      element.current = 3;
      element.total = 6;
    });
    await page.waitForChanges();
    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-segmented-progress-bar',
      details: {
        current: 3,
        total: 6,
      },
    });
  });

  it("doesn't fire an analytics event when enable-analytics is false", async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-segmented-progress-bar current="3" total="6" aria-label="E2E Test"></va-segmented-progress-bar>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it("should render heading-text when labels are not provided", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" heading-text="My Header"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const headerElement = element.shadowRoot.querySelector('span.usa-step-indicator__heading-text');
    expect(headerElement.innerHTML).toEqual("My Header");
  })

  it("should render label text for header when labels are provided", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" heading-text="My Header" labels="Personal Information;Household Status;Supporting Documents;Signature;Review and Submit"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const headerElement = element.shadowRoot.querySelector('span.usa-step-indicator__heading-text');
    expect(headerElement.innerHTML).toEqual("Supporting Documents");
  })

  it("should render labels when labels are provided", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" heading-text="My Header" labels="Personal Information;Household Status;Supporting Documents;Signature;Review and Submit"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const segments = element.shadowRoot.querySelector('ol.usa-step-indicator__segments');
    expect(segments.querySelectorAll('.usa-step-indicator__segment-label').length).toBe(6);
  })

  it("should render counter numbers when counters = 'default'", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" labels="Personal Information;Household Status;Supporting Documents;Signature;Review and Submit" counters="default"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const indicator = element.shadowRoot.querySelector('.usa-step-indicator');
    expect(indicator.classList.contains('usa-step-indicator--counters')).toBe(true);
  })

  it("should render counter numbers when counters = 'small'", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" labels="Personal Information;Household Status;Supporting Documents;Signature;Review and Submit" counters="small"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const indicator = element.shadowRoot.querySelector('.usa-step-indicator');
    expect(indicator.classList.contains('usa-step-indicator--counters-sm')).toBe(true);
  })

  it("should render centered labels when 'centered-labels' is true", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" centered-labels="true" labels="Personal Information;Household Status;Supporting Documents;Signature;Review and Submit"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const indicator = element.shadowRoot.querySelector('.usa-step-indicator');
    expect(indicator.classList.contains('usa-step-indicator--center')).toBe(true);
  })

  it("should render correct header level when prop defined", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" centered-labels="true" labels="Personal Information;Household Status;Supporting Documents;Signature;Review and Submit" header-level="2"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const header = element.shadowRoot.querySelector('.usa-step-indicator__heading');
    expect(header.tagName).toBe('H2');
  })

  it("should render correct progress text", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" centered-labels="true" labels="Personal Information;Household Status;Supporting Documents;Signature;Review and Submit" progress-term="Chapter"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const counter = element.shadowRoot.querySelector('.usa-step-indicator__heading-counter .usa-sr-only');
    expect(counter.innerHTML).toBe('Chapter');
  })
});

