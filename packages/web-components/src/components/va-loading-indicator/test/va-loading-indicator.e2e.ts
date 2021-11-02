import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-loading-indicator', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-loading-indicator></va-loading-indicator>');

    const element = await page.find('va-loading-indicator');

    expect(element).toEqualHtml(`
      <va-loading-indicator class="hydrated">
        <mock:shadow-root>
          <div aria-label="Loading" class="loading-indicator" role="progressbar" tabindex="0">
          </div>
        </mock:shadow-root>
      </va-loading-indicator>
    `);
  });

  it('should not focus if setFocus is not set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-loading-indicator></va-loading-indicator>');

    const focusedHandle = await page.evaluateHandle(
      () => document.activeElement,
    );
    const focusedTag = await focusedHandle.evaluate((domElement: Element) => {
      return domElement.tagName.toLowerCase();
    });

    expect(focusedTag).toEqual('body');
  });

  it('should focus if setFocus is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-loading-indicator set-focus="true"</va-loading-indicator>',
    );

    const focusedHandle = await page.evaluateHandle(
      () => document.activeElement,
    );
    const focusedTag = await focusedHandle.evaluate((domElement: Element) => {
      return domElement.tagName.toLowerCase();
    });

    expect(focusedTag).toEqual('va-loading-indicator');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-loading-indicator message="Loading" label="aria label here"</va-loading-indicator>',
    );

    await axeCheck(page);
  });

  it('fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <body id="test">
        <va-loading-indicator message="Loading" enable-analytics></va-loading-indicator>
        </body>
        `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    await page.evaluate(() => {
      let node = document.querySelector('va-loading-indicator');
      node.parentNode.removeChild(node);
    });

    const eventDetails = analyticsSpy.events[0].detail;

    expect(analyticsSpy).toHaveReceivedEventTimes(1);
    expect(eventDetails.action).toEqual('displayed');
    expect(eventDetails.componentName).toEqual('va-loading-indicator');
    expect(eventDetails.details.message).toEqual('Loading');
    expect(typeof eventDetails.details.displayTime).toEqual('number');
  });

  it('does not fire an analytics event when enableAnalytics is not truthy', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <body id="test">
        <va-loading-indicator message="Loading"></va-loading-indicator>
      </body>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    await page.evaluate(() => {
      let node = document.querySelector('va-loading-indicator');
      node.parentNode.removeChild(node);
    });
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });
});
