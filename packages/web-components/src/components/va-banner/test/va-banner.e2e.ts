import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-banner></va-banner>');
    const element = await page.find('va-banner');

    expect(element).toEqualHtml(`
     <va-banner aria-labelledby="Banner Region" class="hydrated" role="region">
       <mock:shadow-root>
         <va-alert aria-label="banner" class="hydrated" full-width="" status="info">
           <h3 slot="headline"></h3>
           <slot></slot>
         </va-alert>
        </mock:shadow-root>
      </va-banner>
    `);
  });

  it('renders an empty shadow root when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-banner visible="false"></va-banner>');
    const element = await page.find('va-banner');

    expect(element).toEqualHtml(`
      <va-banner class="hydrated" visible="false">
        <mock:shadow-root></mock:shadow-root>
      </va-banner>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-banner headline="This is a test">Test Content<a href="#">Test Link</a></va-banner>`,
    );
    await axeCheck(page);
  });

  it('only shows a close icon if the showClose prop is passed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-banner headline="This is a test">Test Content</va-banner>',
    );

    const element = await page.find('va-banner');

    let vaAlert = await page.find('va-banner >>> va-alert');
    let button = vaAlert.shadowRoot.querySelector('button');
    expect(button).toBeNull();

    element.setProperty('showClose', true);
    await page.waitForChanges();
    vaAlert = await page.find('va-banner >>> va-alert');
    button = vaAlert.shadowRoot.querySelector('button');
    expect(button).not.toBeNull();
  });

  it('does not display if dismissed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-banner show-close="true" headline="This is a test">Test Content<a href="#">Test Link</a></va-banner>',
    );
    // Banner should have childNodes in the shadowRoot to start but go away after being dismissed
    const vaBanner = await page.find('va-banner');

    expect(Array.from(vaBanner.shadowRoot.childNodes)).toHaveLength(1);

    // Allows us to pierce to nested elements in the shadowDOM
    // https://github.com/puppeteer/puppeteer/pull/6509
    const button = await page.$('pierce/.va-alert-close');
    await button.click();
    await page.waitForChanges();

    expect(Array.from(vaBanner.shadowRoot.childNodes)).toHaveLength(0);

    await page.evaluate(() => {
      location.reload();
    });

    expect(Array.from(vaBanner.shadowRoot.childNodes)).toHaveLength(0);
  });
});
