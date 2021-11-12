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
      <va-additional-info aria-expanded="false" trigger="More info" class="hydrated">
        <mock:shadow-root>
          <a aria-controls="info" role="button" tabindex="0">
            <span class="additional-info-title">
              More info
              <i class="fa-angle-down" role="presentation"></i>
            </span>
          </a>
          <div class="closed" id="info">
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
      `<va-additional-info trigger="Additional information">
        <div>
          Additional content
        </div>
      </va-additional-info>`,
    );

    const anchorEl = await page.find('va-additional-info >>> a');
    await anchorEl.click();

    await axeCheck(page);
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
});
