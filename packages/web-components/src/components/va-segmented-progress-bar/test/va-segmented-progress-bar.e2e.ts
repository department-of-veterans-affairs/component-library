import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-segmented-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: '<va-segmented-progress-bar current="3" total="6"></va-segmented-progress-bar>',
    });
    const element = await page.find('va-segmented-progress-bar');
    expect(element).toEqualHtml(`
      <va-segmented-progress-bar class="hydrated" current="3" total="6">
        <mock:shadow-root>
          <div
            class="progress-bar-segmented"
            role="progressbar"
            aria-valuenow="3"
            aria-valuemin="0"
            aria-valuemax="6"
            aria-valuetext="Step 3 of 6"
            tabindex="0"
            aria-label="Step 3 of 6"
          >
            <div class="progress-segment progress-segment-complete"></div>
            <div class="progress-segment progress-segment-complete"></div>
            <div class="progress-segment progress-segment-complete"></div>
            <div class="progress-segment"></div>
            <div class="progress-segment"></div>
            <div class="progress-segment"></div>
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
