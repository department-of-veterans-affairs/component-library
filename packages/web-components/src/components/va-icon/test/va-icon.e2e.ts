import { newE2EPage } from "@stencil/core/testing";
import { axeCheck } from "../../../testing/test-helpers";

describe('va-icon', () => {
  let page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setRequestInterception(true);
  })

  it('renders', async () => {
    await page.setContent('<va-icon icon="account_circle" />');

    const element = await page.find('va-icon');
    expect(element).toHaveClass('hydrated');
  });

  it('adds appropriate size class if size prop included', async () => {
    await page.setContent('<va-icon icon="account_circle" size="3" />');
    const svgEl = await page.find('va-icon >>> svg');

    expect(svgEl).toHaveClass('usa-icon--size-3')
  });

  it('does not add size class if size is not within acceptable range', async () => {
    await page.setContent('<va-icon icon="account_circle" size="33" />');
    const svgEl = await page.find('va-icon >>> svg');

    expect(svgEl).not.toHaveClass('usa-icon--size-33');
  });

  it('adds a title element and aria attributes if srtext prop set', async () => {
    await page.setContent('<va-icon icon="account_circle" srtext="this is a test..." />');

    const svgEl = await page.find('va-icon >>> svg');
    expect(svgEl.getAttribute('aria-hidden')).toBeNull();
    expect(svgEl.getAttribute('aria-labelledby')).toEqual('icon-title')


    const titleEl = await page.find('va-icon >>> title');
    expect(titleEl.innerHTML).toEqual('this is a test...');
  });

  it('passes an aXe check when srtext is set', async () => {

    await page.setContent('<va-icon icon="account_circle" size="5" srtext="this is a test..." />');

    await axeCheck(page);
  });

  it('passes an aXe check when srtext is not set', async () => {

    await page.setContent('<va-icon icon="account_circle" size="5" />');

    await axeCheck(page);
  });

  it('getVaIconSprite returns /img/sprite.svg by default', async () => {
    
    // Render the icon
    await page.setContent('<va-icon icon="account_circle" />');
    await page.waitForChanges();
    // Check that the va-icon uses the default sprite location
    const imageHref = await page.$eval('va-icon >>> use', el => el.getAttribute('href'));
    expect(imageHref.startsWith('/img/sprite.svg#account_circle')).toBe(true);
    
  });
  it('setVaIconSprite sets the href for the icon', async () => {

    // Render the icon and initialize the global function
    await page.setContent('<va-icon icon="account_circle" />');
    await page.waitForChanges();
    
    await page.evaluate(() => {
      globalThis.setVaIconSpriteLocation && globalThis.setVaIconSpriteLocation('/img/test.svg');
      document.body.innerHTML = '<va-icon icon="account_circle"/>';
    });
    
    const imageHref = await page.$eval('va-icon >>> use', el => el.getAttribute('href'));
    expect(imageHref.startsWith('/img/test.svg#account_circle')).toBe(true);
  });
  it('spriteLocation prop overrides global sprite location', async () => {

    // Render the icon with a specific sprite location
    await page.setContent('<va-icon icon="account_circle" sprite-location="/img/test.svg" />');
    await page.waitForChanges();
    
    const imageHref = await page.$eval('va-icon >>> use', el => el.getAttribute('href'));
    expect(imageHref.startsWith('/img/test.svg#account_circle')).toBe(true);
  });
})