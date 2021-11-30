import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: '<va-progress-bar label="Progress!" percent="35"></va-progress-bar>',
    });
    const element = await page.find('va-progress-bar');
    expect(element).toEqualHtml(`
      <va-progress-bar class="hydrated" label="Progress!" percent="35">
        <mock:shadow-root>
          <div
            aria-label="Progress!"
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow="35"
            class="progress-bar"
            tabindex="0"
            role="progressbar"
          >
            <div
              class="progress-bar-inner"
              style="width: 35%;"
            />
          </div>
        </mock:shadow-root>
      </va-progress-bar>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-progress-bar percent="35"></va-progress-bar>');
    await axeCheck(page);
  });

  it('fires an analytics event when enable-analytics is set and percent is set to 0', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-progress-bar enable-analytics></va-progress-bar>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    await page.$eval('va-progress-bar', (element: any) => {
      element.percent = 0;
    });
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-progress-bar',
      details: {
        label: 'Working',
        percent: 0,
      },
    });
  });

  it('fires an analytics event when enable-analytics is set and percent is set to 100', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-progress-bar enable-analytics percent="90"></va-progress-bar>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    await page.$eval(
      'va-progress-bar',
      (element: any) => (element.percent = 100),
    );
    await page.waitForChanges();
    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-progress-bar',
      details: {
        label: 'Working',
        percent: 100,
      },
    });
  });

  it("doesn't fire an analytics event when enable-analytics is false", async () => {
    const page = await newE2EPage();
    await page.setContent('<va-progress-bar percent="80"></va-progress-bar>');
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    await page.$eval('va-progress-bar', (element: any) => {
      element.percent = 100;
    });
    await page.waitForChanges();
    expect(analyticsSpy).not.toHaveReceivedEvent();
  });
});
