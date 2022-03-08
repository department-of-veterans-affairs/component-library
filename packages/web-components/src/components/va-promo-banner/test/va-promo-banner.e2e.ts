import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-promo-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-promo-banner></va-promo-banner>');
    const element = await page.find('va-promo-banner');

    expect(element).toEqualHtml(`
      <va-promo-banner class="hydrated">
        <mock:shadow-root>
          <div class="va-banner-body" role="banner">
            <i aria-hidden="true" role="presentation"></i>
            <a class="va-banner-content-link">
              <slot></slot>
              <i aria-hidden="true" role="presentation"></i>
            </a>
            <button aria-label="Dismiss this promo banner" type="button">
              <i aria-hidden="true" role="presentation"></i>
            </button>
          </div>
        </mock:shadow-root>
      </va-promo-banner>
    `);
  });

  it('renders with content', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-promo-banner id="ABC_BANNER" href="#" type="news">This is a promo banner</va-promo-banner>',
    );
    const link = await page.find('va-promo-banner');

    expect(link).toEqualText('This is a promo banner');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-promo-banner id="ABC_BANNER" href="#" type="news">This is a promo banner</va-promo-banner>`,
    );
    await axeCheck(page);
  });

  it('fires a component library analytics event on a link click', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<va-promo-banner id="ABC_BANNER" href="#" type="news">This is a promo banner</va-promo-banner>`,
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorEl = await page.find('va-promo-banner >>> a');
    await anchorEl.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);

    expect(analyticsSpy).toHaveReceivedEventDetail({
      componentName: 'va-promo-banner',
      action: 'linkClick',
      details: {
        text: 'This is a promo banner',
        href: '#',
        type: 'news',
      },
    });
  });

  it('does not fire a component library analytics event if disableAnalytics enabled', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<va-promo-banner id="ABC_BANNER" href="#" type="news" disable-analytics>This is a promo banner</va-promo-banner>`,
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorEl = await page.find('va-promo-banner >>> a');
    await anchorEl.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('does not dismiss without an id attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-promo-banner href="#" type="news">This is a promo banner</va-promo-banner>`,
    );
    const element = await page.find('va-promo-banner');

    const button = await page.find('va-promo-banner >>> button');
    await button.click();
    await page.waitForChanges();

    expect(element).toEqualHtml(`
    <va-promo-banner class="hydrated" href="#" type="news">
      <mock:shadow-root>
        <div class="va-banner-body" role="banner">
          <i aria-hidden="true" class="news" role="presentation"></i>
          <a class="va-banner-content-link" href="#">
            <slot></slot>
            <i aria-hidden="true" role="presentation"></i>
          </a>
          <button aria-label="Dismiss this promo banner" type="button">
            <i aria-hidden="true" role="presentation"></i>
          </button>
        </div>
      </mock:shadow-root>
      This is a promo banner
    </va-promo-banner>
     `);
  });

  it('fires closeEvent and does not display if dismissed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-promo-banner id="ABC_BANNER" href="#" type="news">This is a promo banner</va-promo-banner>`,
    );
    const analyticsSpy = await page.spyOnEvent('closeEvent');
    const element = await page.find('va-promo-banner');

    const button = await page.find('va-promo-banner >>> button');
    await button.click();
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);
    expect(element).toEqualHtml(`
      <va-promo-banner id="ABC_BANNER" class="hydrated" href="#" type="news">
        <mock:shadow-root>
        </mock:shadow-root>
        This is a promo banner
       </va-promo-banner>
     `);

    // Confirm still dismissed on page reload
    await page.evaluate(() => {
      location.reload();
    });

    expect(element).toEqualHtml(`
    <va-promo-banner id="ABC_BANNER" class="hydrated" href="#" type="news">
      <mock:shadow-root>
      </mock:shadow-root>
      This is a promo banner
     </va-promo-banner>
   `);
  });
});
