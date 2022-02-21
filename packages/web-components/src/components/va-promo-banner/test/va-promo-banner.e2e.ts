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
        <div class="va-banner-body">
          <div class="va-banner-icon">
            <div class="va-banner-icon-contents">
              <i
                aria-hidden="true"
                class="announcement"
                role="presentation"
              ></i>
            </div>
          </div>
          <div class="va-banner-content">
            <a class="va-banner-content-link">
              <slot></slot>
              <i aria-hidden="true" role="presentation"></i>
            </a>
          </div>
          <div class="va-banner-close">
            <button aria-label="Dismiss this promo banner" type="button">
              <i aria-hidden="true" role="presentation"></i>
            </button>
          </div>
        </div>
      </mock:shadow-root>
    </va-promo-banner>
    `);
  });

  it('renders inside an anchor link without render-custom', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-promo-banner banner-id="ABC_BANNER" href="#" target="_self" type="news">This is a promo banner</va-promo-banner>',
    );
    const element = await page.find('va-promo-banner');

    expect(element).toEqualHtml(`
     <va-promo-banner banner-id="ABC_BANNER" class="hydrated" href="#" target="_self" type="news">
       <mock:shadow-root>
         <div class="va-banner-body">
           <div class="va-banner-icon">
             <div class="va-banner-icon-contents">
               <i aria-hidden="true" class="news" role="presentation"></i>
             </div>
           </div>
           <div class="va-banner-content">
             <a class="va-banner-content-link" href="#" target="_self">
               <slot></slot>
               <i aria-hidden="true" role="presentation"></i>
             </a>
           </div>
           <div class="va-banner-close">
             <button aria-label="Dismiss this promo banner" type="button">
               <i aria-hidden="true" role="presentation"></i>
             </button>
           </div>
         </div>
       </mock:shadow-root>
       This is a promo banner
      </va-promo-banner>
    `);
  });

  it('renders without an anchor link wrapper with render-custom', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-promo-banner banner-id="ABC_BANNER" href="#" target="_self" type="announcement" render-custom="true">This is a promo banner</va-promo-banner>',
    );
    const element = await page.find('va-promo-banner');

    expect(element).toEqualHtml(`
     <va-promo-banner banner-id="ABC_BANNER" class="hydrated" href="#" render-custom="true" target="_self" type="announcement">
       <mock:shadow-root>
         <div class="va-banner-body">
           <div class="va-banner-icon">
             <div class="va-banner-icon-contents">
               <i aria-hidden="true" class="announcement" role="presentation"></i>
             </div>
           </div>
           <div class="va-banner-content">
             <slot></slot>
           </div>
           <div class="va-banner-close">
             <button aria-label="Dismiss this promo banner" type="button">
               <i aria-hidden="true" role="presentation"></i>
             </button>
           </div>
         </div>
       </mock:shadow-root>
       This is a promo banner
      </va-promo-banner>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-promo-banner banner-id="ABC_BANNER" href="#" target="_self" type="news">This is a promo banner</va-promo-banner>`,
    );
    await axeCheck(page);
  });

  it('fires a component library analytics event on a link click', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<va-promo-banner banner-id="ABC_BANNER" href="#" target="_self" type="news">This is a promo banner</va-promo-banner>`,
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
        target: '_self',
        type: 'news',
      },
    });
  });

  it('does not fire a component library analytics event if disableAnalytics enabled', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<va-promo-banner banner-id="ABC_BANNER" href="#" target="_self" type="news" disable-analytics>This is a promo banner</va-promo-banner>`,
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorEl = await page.find('va-promo-banner >>> a');
    await anchorEl.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('fires closeEvent and does not display if dismissed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-promo-banner banner-id="ABC_BANNER" href="#" target="_self" type="news">This is a promo banner</va-promo-banner>`,
    );
    const analyticsSpy = await page.spyOnEvent('closeEvent');
    const element = await page.find('va-promo-banner');

    const button = await page.find('va-promo-banner >>> button');
    await button.click();
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);
    expect(element).toEqualHtml(`
      <va-promo-banner banner-id="ABC_BANNER" class="hydrated" href="#" target="_self" type="news">
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
    <va-promo-banner banner-id="ABC_BANNER" class="hydrated" href="#" target="_self" type="news">
      <mock:shadow-root>
      </mock:shadow-root>
      This is a promo banner
     </va-promo-banner>
   `);
  });
});
