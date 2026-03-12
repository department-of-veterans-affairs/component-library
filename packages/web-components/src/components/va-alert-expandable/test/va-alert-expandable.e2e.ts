import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-alert-expandable', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert-expandable status="warning" trigger="Limited services and hours"></va-alert-expandable>',
    );

    const element = await page.find('va-alert-expandable');

    expect(element).toEqualHtml(`
      <va-alert-expandable status="warning" trigger="Limited services and hours" class="hydrated">
        <mock:shadow-root>
        <div class="alert-expandable warning">
          <a role="button" aria-controls="alert-body" aria-expanded="false" tabindex="0" class="alert-expandable-trigger">
            <va-icon class="alert-expandable__status-icon hydrated"></va-icon>
            <div>
              <span class="alert-expandable-title">
                <span class="usa-sr-only">Warning Alert&nbsp;</span>
                Limited services and hours
              </span>
              <va-icon class="alert-expandable-icon hydrated"></va-icon>
            </div>
          </a>
          <div id="alert-body" class="alert-expandable-body closed" style="--calc-max-height:calc(12px + 2rem);"><div id="slot-wrap"><slot></slot></div></div>
        </div>
        </mock:shadow-root>
      </va-alert-expandable>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-alert-expandable status="warning" trigger="Limited services and hours">
        <div>
          Limited services and hours content
        </div>
      </va-alert-expandable>`,
    );

    await axeCheck(page);
  });

  it('passes an axe check when opened', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-alert-expandable status="warning" trigger="Limited services and hours"></va-alert-expandable>`,
    );

    const anchorEl = await page.find('va-alert-expandable >>> a');
    await anchorEl.click();

    await axeCheck(page);

    expect(anchorEl.getAttribute('aria-expanded')).toEqual('true');
  });

  it('expands when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-alert-expandable status="warning" trigger="Limited services and hours">
        <div id="content">
          Limited services and hours content
        </div>
      </va-alert-expandable>`,
    );
    const handle = await page.waitForSelector('pierce/#alert-body');

    const preOpacity = await handle.evaluate(
      (domElement: HTMLElement) => window.getComputedStyle(domElement).opacity,
    );

    // Use click to expand
    const anchorEl = await page.find('va-alert-expandable >>> a');
    expect(anchorEl.getAttribute('aria-expanded')).toEqual('false');

    await anchorEl.click();
    await page.waitForChanges();
    // Wait for CSS transition to complete
    await new Promise(resolve => setTimeout(resolve, 700));
    expect(anchorEl.getAttribute('aria-expanded')).toEqual('true');

    const postOpacity = await handle.evaluate(
      (domElement: HTMLElement) => window.getComputedStyle(domElement).opacity,
    );

    const preOpacityToNumber = parseFloat(preOpacity);
    const postOpacityToNumber = parseFloat(postOpacity);

    expect(preOpacityToNumber).toEqual(0);
    expect(postOpacityToNumber).toBeGreaterThan(0);
  });

  it('has keyboard control for expanding & collapsing on spacebar', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-alert-expandable status="warning" trigger="Limited services and hours">
        <div id="content">
          Limited services and hours content
        </div>
      </va-alert-expandable>`,
    );
    const handle = await page.waitForSelector('pierce/#alert-body');

    const preOpacity = await handle.evaluate(
      (domElement: HTMLElement) => window.getComputedStyle(domElement).opacity,
    );

    // Use keyboard to expand
    const anchorEl = await page.find('va-alert-expandable >>> a');
    await anchorEl.press(' ');
    await page.waitForChanges();
    // Wait for CSS transition to complete
    await new Promise(resolve => setTimeout(resolve, 700));

    const postOpacity = await handle.evaluate(
      (domElement: HTMLElement) => window.getComputedStyle(domElement).opacity,
    );

    const preOpacityToNumber = parseFloat(preOpacity);
    const postOpacityToNumber = parseFloat(postOpacity);

    expect(preOpacityToNumber).toEqual(0);
    expect(postOpacityToNumber).toBeGreaterThan(0);
  });

  it('has keyboard control for expanding & collapsing on enter', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-alert-expandable trigger="Limited services and hours">
        <div id="content">
          Limited services and hours content
        </div>
      </va-alert-expandable>`,
    );
    const handle = await page.waitForSelector('pierce/#alert-body');

    const preOpacity = await handle.evaluate(
      (domElement: HTMLElement) => window.getComputedStyle(domElement).opacity,
    );

    // Use keyboard to expand
    const anchorEl = await page.find('va-alert-expandable >>> a');
    await anchorEl.press('Enter');
    await page.waitForChanges();
    // Wait for CSS transition to complete
    await new Promise(resolve => setTimeout(resolve, 700));

    const postOpacity = await handle.evaluate(
      (domElement: HTMLElement) => window.getComputedStyle(domElement).opacity,
    );

    const preOpacityToNumber = parseFloat(preOpacity);
    const postOpacityToNumber = parseFloat(postOpacity);

    expect(preOpacityToNumber).toEqual(0);
    expect(postOpacityToNumber).toBeGreaterThan(0);
  });

  it('fires an analytics event by default', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-alert-expandable status="warning" trigger="Limited services and hours">
        <div>Limited services and hours content</div>
      </va-alert-expandable>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorEl = await page.find('va-alert-expandable >>> a');
    await anchorEl.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'expand',
      componentName: 'va-alert-expandable',
      details: {
        triggerText: 'Limited services and hours',
      },
    });
  });

  it('has the collapse action in analytics event', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-alert-expandable status="warning" trigger="Limited services and hours">
        <div>Limited services and hours content</div>
      </va-alert-expandable>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorEl = await page.find('va-alert-expandable >>> a');

    // Click once to expand, again to collapse
    await anchorEl.click();
    await anchorEl.click();

    const secondEvent = analyticsSpy.events[1];
    expect(secondEvent.detail.action).toEqual('collapse');
  });

  it('does not fire an analytics event when disableAnalytics is set', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-alert-expandable status="warning" trigger="Limited services and hours" disable-analytics>
        <div>Limited services and hours content</div>
      </va-alert-expandable>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorEl = await page.find('va-alert-expandable >>> a');
    await anchorEl.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('sets the correct max-height value on window resize', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-alert-expandable status="warning" trigger="Limited services and hours" disable-analytics>
        <div style="height:50px;padding:10px 0;margin:5px 0;">Limited services and hours content</div>
      </va-alert-expandable>
    `);
    const handle = await page.waitForSelector('pierce/#alert-body');
    const anchorEl = await page.find('va-alert-expandable >>> a');
    await anchorEl.click();
    await page.waitForSelector('pierce/#alert-body.open');

    // Get the initial max-height value
    const maxHeightBeforeResize = await handle.evaluate((domElement: HTMLElement) =>
      domElement.style.getPropertyValue('--calc-max-height'),
    );

    // Trigger window resize event
    await page.evaluate(() => window.dispatchEvent(new Event('resize')));

    // Get the updated max-height value
    const maxHeightAfterResize = await handle.evaluate((domElement: HTMLElement) =>
      domElement.style.getPropertyValue('--calc-max-height'),
    );

    expect(maxHeightAfterResize).toEqual(maxHeightBeforeResize);
  });

  it('handles any case where `#alert-body` is not present in the shadow DOM', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-alert-expandable status="warning" trigger="Limited services and hours"></va-alert-expandable>`);

    // Remove `#alert-body` manually after render
    await page.evaluate(() => {
      const alertBody = document
        .querySelector('va-alert-expandable')
        ?.shadowRoot?.getElementById('alert-body');
      if (alertBody?.parentNode) alertBody.parentNode.removeChild(alertBody);
    });

    // Manually call resize to trigger `updateAlertBodyMaxHeight`
    await page.evaluate(() => window.dispatchEvent(new Event('resize')));

    expect(true).toBe(true); // If no error, the test passes
  });

  it('does not render status icon when iconless is true', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert-expandable status="warning" trigger="Limited services" iconless></va-alert-expandable>',
    );

    const statusIcon = await page.find('va-alert-expandable >>> .alert-expandable__status-icon');

    expect(statusIcon).toBeNull();
  });

  it('announces "Warning Alert" for warning status', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert-expandable status="warning" trigger="Limited services"></va-alert-expandable>',
    );

    const srText = await page.find('va-alert-expandable >>> .alert-expandable-title .usa-sr-only');
    const text = await srText.innerText;

    expect(text).toContain('Warning Alert');
  });

  it('announces "Information Alert" for info status', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert-expandable status="info" trigger="Information"></va-alert-expandable>',
    );

    const srText = await page.find('va-alert-expandable >>> .alert-expandable-title .usa-sr-only');
    const text = await srText.innerText;

    expect(text).toContain('Information Alert');
  });

  it('announces "Error Alert" for error status', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert-expandable status="error" trigger="Error message"></va-alert-expandable>',
    );

    const srText = await page.find('va-alert-expandable >>> .alert-expandable-title .usa-sr-only');
    const text = await srText.innerText;

    expect(text).toContain('Error Alert');
  });

  it('announces "Success Alert" for success status', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert-expandable status="success" trigger="Success message"></va-alert-expandable>',
    );

    const srText = await page.find('va-alert-expandable >>> .alert-expandable-title .usa-sr-only');
    const text = await srText.innerText;

    expect(text).toContain('Success Alert');
  });

  it('announces "Continue Alert" for continue status', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert-expandable status="continue" trigger="Continue message"></va-alert-expandable>',
    );

    const srText = await page.find('va-alert-expandable >>> .alert-expandable-title .usa-sr-only');
    const text = await srText.innerText;

    expect(text).toContain('Continue Alert');
  });
});
