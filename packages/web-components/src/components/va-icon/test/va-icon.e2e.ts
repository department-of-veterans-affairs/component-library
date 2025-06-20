import { newE2EPage } from "@stencil/core/testing";
import { axeCheck } from "../../../testing/test-helpers";

describe('va-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-icon icon="account_circle" />');

    const element = await page.find('va-icon');
    expect(element).toHaveClass('hydrated');
  });

  it('adds appropriate size class if size prop included', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-icon icon="account_circle" size="3" />');
    const svgEl = await page.find('va-icon >>> svg');

    expect(svgEl).toHaveClass('usa-icon--size-3')
  });

  it('does not add size class if size is not within acceptable range', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-icon icon="account_circle" size="33" />');
    const svgEl = await page.find('va-icon >>> svg');

    expect(svgEl).not.toHaveClass('usa-icon--size-33');
  });

  it('adds a title element and aria attributes if srtext prop set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-icon icon="account_circle" srtext="this is a test..." />');

    const svgEl = await page.find('va-icon >>> svg');
    expect(svgEl.getAttribute('aria-hidden')).toBeNull();
    expect(svgEl.getAttribute('aria-labelledby')).toEqual('icon-title')


    const titleEl = await page.find('va-icon >>> title');
    expect(titleEl.innerHTML).toEqual('this is a test...');
  });

  it('passes an aXe check when srtext is set', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-icon icon="account_circle" size="5" srtext="this is a test..." />');

    await axeCheck(page);
  });

  it('passes an aXe check when srtext is not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-icon icon="account_circle" size="5" />');

    await axeCheck(page);
  });

  it('getVaIconSprite returns /img/sprite.svg by default', async () => {
    const page = await newE2EPage();
    
    // Render the icon
    await page.setContent('<va-icon icon="account_circle" />');
    await page.waitForChanges();
    // Check that the va-icon uses the default sprite location
    const imageHref = await page.$eval('va-icon >>> use', el => el.getAttribute('href'));
    expect(imageHref.startsWith('/img/sprite.svg#account_circle')).toBe(true);
    
  });
  it('setVaIconSprite sets the href for the icon', async () => {
    const page = await newE2EPage();
    
    // Render the icon and initialize the global function
    await page.setContent('<va-icon icon="account_circle" />');
    await page.waitForChanges();
    
    await page.evaluate(() => {
      globalThis.setVaIconSpriteLocation && globalThis.setVaIconSpriteLocation('../img/sprite.svg');
      document.body.innerHTML = '<va-icon icon="account_circle"/>';
    });
    
    const imageHref = await page.$eval('va-icon >>> use', el => el.getAttribute('href'));
    expect(imageHref.startsWith('../img/sprite.svg#account_circle')).toBe(true);
  });
  it('spriteLocation prop overrides global sprite location', async () => {
    const page = await newE2EPage();
    
    // Render the icon with a specific sprite location
    await page.setContent('<va-icon icon="account_circle" sprite-location="../img/sprite.svg" />');
    await page.waitForChanges();
    
    const imageHref = await page.$eval('va-icon >>> use', el => el.getAttribute('href'));
    console.log(imageHref);
    expect(imageHref.startsWith('../img/sprite.svg#account_circle')).toBe(true);
  });
})