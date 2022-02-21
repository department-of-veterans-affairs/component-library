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
      <va-promo-banner class="hydrated">
        <mock:shadow-root></mock:shadow-root>
      </va-promo-banner>
    `);
  });

  it('renders without an anchor link wrapper with render-custom', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-promo-banner banner-id="ABC_BANNER" href="#" target="_self" type="news" render-custom>This is a promo banner</va-promo-banner>',
    );
    const element = await page.find('va-promo-banner');

    expect(element).toEqualHtml(`
      <va-promo-banner class="hydrated">
        <mock:shadow-root></mock:shadow-root>
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

  it('fires a component library analytics event on a link click', async () => {});

  it('does not fire a component library analytics event if disableAnalytics enabled', async () => {});

  it('fires closeEvent event on clicking the dismiss button', async () => {});

  //   it('does not display if dismissed', async () => {
  //     const page = await newE2EPage();
  //     await page.setContent(
  //       '<va-banner show-close="true" headline="This is a test">Test Content<a href="#">Test Link</a></va-banner>',
  //     );
  //     // Banner should have childNodes in the shadowRoot to start but go away after being dismissed
  //     const vaBanner = await page.find('va-banner');

  //     expect(Array.from(vaBanner.shadowRoot.childNodes)).toHaveLength(1);

  //     // Allows us to pierce to nested elements in the shadowDOM
  //     // https://github.com/puppeteer/puppeteer/pull/6509
  //     const button = await page.$('pierce/.va-alert-close');
  //     await button.click();
  //     await page.waitForChanges();

  //     expect(Array.from(vaBanner.shadowRoot.childNodes)).toHaveLength(0);

  //     await page.evaluate(() => {

  //       location.reload();
  //     });

  //     expect(Array.from(vaBanner.shadowRoot.childNodes)).toHaveLength(0);
  //   });
});
