import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-additional-info', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-additional-info trigger="More info"></va-additional-info>',
    );

    const element = await page.find('va-additional-info');

    expect(element).toEqualHtml(`
      <va-additional-info trigger="More info" class="hydrated">
        <mock:shadow-root>
          <a aria-controls="info" aria-expanded="false" role="button" tabindex="0">
            <div>
              <span class="additional-info-title">
                More info
              </span>
              <va-icon class="additional-info-icon hydrated"></va-icon>
            </div>
          </a>
          <div class="closed" id="info" style="--calc-max-height:calc(0px + 1.125rem);">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </va-additional-info>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-additional-info trigger="Additional information">
        <div>
          Additional content
        </div>
      </va-additional-info>`,
    );

    await axeCheck(page);
  });

  it('passes an axe check when opened', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-additional-info trigger="Additional information"></va-additional-info>`,
    );

    const anchorEl = await page.find('va-additional-info >>> a');
    await anchorEl.click();

    await axeCheck(page);
  });

  it('expands when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-additional-info trigger="Additional information">
        <div id="content">
          Additional content
        </div>
      </va-additional-info>`,
    );
    const handle = await page.waitForSelector('pierce/#info');

    const preOpacity = await handle.evaluate(
      (domElement: HTMLElement) => window.getComputedStyle(domElement).opacity,
    );

    // Use click to expand
    const anchorEl = await page.find('va-additional-info >>> a');
    expect(anchorEl.getAttribute('aria-expanded')).toEqual('false');

    await anchorEl.click();
    // Allow the transition to complete
    await page.waitForTimeout(600);
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
      `<va-additional-info trigger="Additional information">
        <div id="content">
          Additional content
        </div>
      </va-additional-info>`,
    );
    const handle = await page.waitForSelector('pierce/#info');

    const preOpacity = await handle.evaluate(
      (domElement: HTMLElement) => window.getComputedStyle(domElement).opacity,
    );

    // Use keyboard to expand
    const anchorEl = await page.find('va-additional-info >>> a');
    await anchorEl.press(' ');
    // Allow the transition to complete
    await page.waitForTimeout(600);

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
      `<va-additional-info trigger="Additional information">
        <div id="content">
          Additional content
        </div>
      </va-additional-info>`,
    );
    const handle = await page.waitForSelector('pierce/#info');

    const preOpacity = await handle.evaluate(
      (domElement: HTMLElement) => window.getComputedStyle(domElement).opacity,
    );

    // Use keyboard to expand
    const anchorEl = await page.find('va-additional-info >>> a');
    await anchorEl.press('Enter');
    // Allow the transition to complete
    await page.waitForTimeout(600);

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
      <va-additional-info trigger="Whatever">
        <div>More content</div>
      </va-additional-info>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorEl = await page.find('va-additional-info >>> a');
    await anchorEl.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'expand',
      componentName: 'va-additional-info',
      details: {
        triggerText: 'Whatever',
      },
    });
  });

  it('has the collapse action in analytics event', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-additional-info trigger="Whatever">
        <div>More content</div>
      </va-additional-info>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorEl = await page.find('va-additional-info >>> a');

    // Click once to expand, again to collapse
    await anchorEl.click();
    await anchorEl.click();

    const secondEvent = analyticsSpy.events[1];
    expect(secondEvent.detail.action).toEqual('collapse');
  });

  it('does not fire an analytics event when disableAnalytics is set', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-additional-info trigger="Whatever" disable-analytics>
        <div>More content</div>
      </va-additional-info>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorEl = await page.find('va-additional-info >>> a');
    await anchorEl.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('sets the correct max-height value for the content given', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-additional-info trigger="Click here for a treat!" disable-analytics>
        <div style="height:50px;padding:10px 0;margin:5px 0;">We're out of treats! Try again later.</div>
      </va-additional-info>
    `);
    const handle = await page.waitForSelector('pierce/#info');
    const anchorEl = await page.find('va-additional-info >>> a');
    await anchorEl.click();
    await page.waitForSelector('pierce/#info.open');
    const calcMaxHeight = await handle.evaluate((domElement: HTMLElement) =>
      domElement.style.getPropertyValue('--calc-max-height'),
    );
    // 50px from height + 20px from padding
    // margin-bottom and margin-top is set to 0 for first slotted child
    expect(calcMaxHeight).toEqual('calc(70px + 1.125rem)');
  });
});
