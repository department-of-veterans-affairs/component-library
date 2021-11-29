import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: '<va-progress-bar percent="35"></va-progress-bar>',
    });
    const element = await page.find('va-progress-bar');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-progress-bar percent="35"></va-progress-bar>');
    await axeCheck(page);
  });

  it(`doesn't fire an analytics event when enable-analytics is not set`, async () => {
    const page = await newE2EPage();
    await page.setContent('<va-progress-bar percent="80"></va-progress-bar>');
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    await page.$eval('va-progress-bar', (element: any) => {
      element.percent = 100;
    });
    await page.waitForChanges();
    expect(analyticsSpy).not.toHaveReceivedEvent();
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
    expect(analyticsSpy).toHaveReceivedEvent();
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
    expect(analyticsSpy).toHaveReceivedEvent();
  });
});
