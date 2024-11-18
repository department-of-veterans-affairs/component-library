import { newE2EPage } from "@stencil/core/testing";
import { axeCheck } from "../../../testing/test-helpers";

describe('va-language-toggle', () => {
  const enHref = "/resources/the-pact-act-and-your-va-benefits/";
  const esHref = "/resources/the-pact-act-and-your-va-benefits-esp/"
  const tlHref = "/resources/the-pact-act-and-your-va-benefits-tl/"

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle en-href="${enHref}" es-href="${esHref}" tl-href="${tlHref}" />`);
    const element = await page.find('va-language-toggle');
    expect(element).toHaveClass('hydrated');
  });

  it('English is the default language', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle en-href="${enHref}" es-href="${esHref}" tl-href="${tlHref}" />`);
    const anchor = await page.find('va-language-toggle >>> va-link');
    expect(anchor).toHaveClass('is-current-lang');
  });

  it('only renders links for those languages with supplied hrefs', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle en-href="${enHref}" es-href="${esHref}" />`);
    const anchors = await page.findAll('va-language-toggle >>> a');
    expect(anchors).toHaveLength(2);
  })

  it('if language prop is set the matching language is bolded', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle language="es" en-href="${enHref}" es-href="${esHref}" tl-href="${tlHref}" />`);
    const [_, anchor] = await page.findAll('va-language-toggle >>> va-link');
    expect(anchor).toHaveClass('is-current-lang');
  });

  it('if router-links is set, clicking an anchor tag does not result in page navigation', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle router-links="true" en-href="${enHref}" es-href="${esHref}" tl-href="${tlHref}" />`);
    const [startUrl] = page.url().split('?');
    const [_, anchor] = await page.findAll('va-language-toggle >>> a');
    await anchor.click();
    const [endUrl] = page.url().split('?');
    expect(startUrl).toEqual(endUrl);
  });

  it('fires a language-toggle event when a link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle en-href="${enHref}" es-href="${esHref}" tl-href="${tlHref}" />`);
    const toggleSpy = await page.spyOnEvent('vaLanguageToggle');
    const [_, anchor] = await page.findAll('va-language-toggle >>> a');
    await anchor.click();
    expect(toggleSpy).toHaveReceivedEvent();
  });

  it('fires a component-analytics event when a link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle en-href="${enHref}" es-href="${esHref}" tl-href="${tlHref}" />`);
    const toggleSpy = await page.spyOnEvent('component-library-analytics');
    const anchor = await page.find('va-language-toggle >>> a');
    await anchor.click();
    expect(toggleSpy).toHaveReceivedEvent();
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle en-href="${enHref}" es-href="${esHref}" tl-href="${tlHref}" />`);
    await axeCheck(page);
  });
});
