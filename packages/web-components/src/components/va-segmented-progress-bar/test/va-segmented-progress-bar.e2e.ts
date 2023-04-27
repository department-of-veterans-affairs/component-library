import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('v1 va-segmented-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    expect(element).toEqualHtml(`
      <va-segmented-progress-bar class="hydrated" current="3" total="6">
        <mock:shadow-root>
          <div>
            <div
              class="progress-bar-segmented"
              role="progressbar"
              aria-valuenow="3"
              aria-valuemin="0"
              aria-valuemax="6"
              aria-valuetext="Step 3 of 6"
              aria-label="Step 3 of 6"
            >
              <div class="progress-segment progress-segment-complete"></div>
              <div class="progress-segment progress-segment-complete"></div>
              <div class="progress-segment progress-segment-complete"></div>
              <div class="progress-segment"></div>
              <div class="progress-segment"></div>
              <div class="progress-segment"></div>
            </div>
            <span aria-atomic="true" aria-live="polite" class="sr-only">
              Step 3 of 6
            </span>
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

  it('it should update the aria label based on changed ariaLabel prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-segmented-progress-bar current="3" total="6" label="E2E Test"></va-segmented-progress-bar>',
    );
    const label = await page.find(
      'va-segmented-progress-bar >>> div.progress-bar-segmented',
    );
    expect(label.getAttribute('aria-label')).toContain('E2E Test');
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
});



describe('v3 va-segmented-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" uswds></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    expect(element).toEqualHtml(`
      <va-segmented-progress-bar class=\"hydrated\" current=\"3\" total=\"6\" uswds=\"\">
        <mock:shadow-root>
          <div aria-label=\"progress\" class=\"usa-step-indicator\">
            <ol class=\"usa-step-indicator__segments\">
              <li class=\"usa-step-indicator__segment usa-step-indicator__segment--complete\"></li>
              <li class=\"usa-step-indicator__segment usa-step-indicator__segment--complete\"></li>
              <li class=\"usa-step-indicator__segment usa-step-indicator__segment--current\"></li>
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
      '<va-segmented-progress-bar current="3" total="6" uswds></va-segmented-progress-bar>',
    );
    await axeCheck(page);
  });

  it('fires an analytics event when the component is mounted', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-segmented-progress-bar enable-analytics uswds></va-segmented-progress-bar>',
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
      '<va-segmented-progress-bar current="3" total="6" aria-label="E2E Test" uswds></va-segmented-progress-bar>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    expect(analyticsSpy).not.toHaveReceivedEvent();
  });
  
  it("should render heading-text when labels are not provided", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" uswds heading-text="My Header"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const headerElement = element.shadowRoot.querySelector('span.usa-step-indicator__heading-text');
    expect(headerElement.innerHTML).toEqual("My Header");
  })

  it("should render label text for header when labels are provided", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" uswds heading-text="My Header" labels="step1,step2,step3,step4,step5,step6"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const headerElement = element.shadowRoot.querySelector('span.usa-step-indicator__heading-text');
    expect(headerElement.innerHTML).toEqual("step3");
  })

  it("should render labels when labels are provided", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" uswds heading-text="My Header" labels="step1,step2,step3,step4,step5,step6"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const segments = element.shadowRoot.querySelector('ol.usa-step-indicator__segments');
    expect(segments.querySelectorAll('.usa-step-indicator__segment-label').length).toBe(6);
  })

  it("should render counter numbers when counters = 'default'", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" uswds labels="step1,step2,step3,step4,step5,step6" counters="default"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const indicator = element.shadowRoot.querySelector('.usa-step-indicator');
    expect(indicator.classList.contains('usa-step-indicator--counters')).toBe(true);
  })

  it("should render counter numbers when counters = 'small'", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" uswds labels="step1,step2,step3,step4,step5,step6" counters="small"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const indicator = element.shadowRoot.querySelector('.usa-step-indicator');
    expect(indicator.classList.contains('usa-step-indicator--counters-sm')).toBe(true);
  })

  it("should render centered labels when 'centered-labels' is true", async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6" uswds labels="step1,step2,step3,step4,step5,step6" centered-labels></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    const indicator = element.shadowRoot.querySelector('.usa-step-indicator');
    expect(indicator.classList.contains('usa-step-indicator--center')).toBe(true);
  })
});

