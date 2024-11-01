import { newE2EPage } from "@stencil/core/testing";
import { axeCheck } from "../../../testing/test-helpers";

describe('va-language-toggle', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle urls='[{"href":"/resources/the-pact-act-and-your-va-benefits/","lang":"en","label":"English"},{"href":"/resources/the-pact-act-and-your-va-benefits-esp/","lang":"es","label":"Español"},{"href":"/resources/the-pact-act-and-your-va-benefits-tl/","lang":"tg","label":"Tagalog"}]' />`);
    const element = await page.find('va-language-toggle');
    expect(element).toHaveClass('hydrated');
  });

  it('English is the default language', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle urls='[{"href":"/resources/the-pact-act-and-your-va-benefits/","lang":"en","label":"English"},{"href":"/resources/the-pact-act-and-your-va-benefits-esp/","lang":"es","label":"Español"},{"href":"/resources/the-pact-act-and-your-va-benefits-tl/","lang":"tg","label":"Tagalog"}]' />`);
    const anchor = await page.find('va-language-toggle >>> a');
    expect(anchor).toHaveClass('is-current-lang');
  });

  it('If language prop is set the matching language is bolded', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle urls='[{"href":"/resources/the-pact-act-and-your-va-benefits/","lang":"en","label":"English"},{"href":"/resources/the-pact-act-and-your-va-benefits-esp/","lang":"es","label":"Español"},{"href":"/resources/the-pact-act-and-your-va-benefits-tl/","lang":"tg","label":"Tagalog"}]' language="es" />`);
    const [_, anchor]= await page.findAll('va-language-toggle >>> a');
    expect(anchor).toHaveClass('is-current-lang');
  });

  it('If router-links is set, clicking an anchor tag does not result in page navigation', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle urls='[{"href":"/resources/the-pact-act-and-your-va-benefits/","lang":"en","label":"English"},{"href":"/resources/the-pact-act-and-your-va-benefits-esp/","lang":"es","label":"Español"},{"href":"/resources/the-pact-act-and-your-va-benefits-tl/","lang":"tg","label":"Tagalog"}]' router-links="true" />`);
    const startUrl = page.url();
    const [_, anchor] = await page.findAll('va-language-toggle >>> a');
    await anchor.click();
    const endUrl = page.url();
    expect(startUrl).toEqual(endUrl);
  });

  it('fires a language-toggle event when a link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle urls='[{"href":"/resources/the-pact-act-and-your-va-benefits/","lang":"en","label":"English"},{"href":"/resources/the-pact-act-and-your-va-benefits-esp/","lang":"es","label":"Español"},{"href":"/resources/the-pact-act-and-your-va-benefits-tl/","lang":"tg","label":"Tagalog"}]' />`);
    const toggleSpy = await page.spyOnEvent('vaLanguageToggle');
    const [_, anchor] = await page.findAll('va-language-toggle >>> a');
    await anchor.click();
    expect(toggleSpy).toHaveReceivedEvent();
  });

  it("fires an analytics event when a link is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle urls='[{"href":"/resources/the-pact-act-and-your-va-benefits/","lang":"en","label":"English"},{"href":"/resources/the-pact-act-and-your-va-benefits-esp/","lang":"es","label":"Español"},{"href":"/resources/the-pact-act-and-your-va-benefits-tl/","lang":"tg","label":"Tagalog"}]' />`);
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const anchor = await page.find('va-language-toggle >>> a');
    await anchor.click();
    expect(analyticsSpy).toHaveReceivedEvent();
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle urls='[{"href":"/resources/the-pact-act-and-your-va-benefits/","lang":"en","label":"English"},{"href":"/resources/the-pact-act-and-your-va-benefits-esp/","lang":"es","label":"Español"},{"href":"/resources/the-pact-act-and-your-va-benefits-tl/","lang":"tg","label":"Tagalog"}]' />`);
    await axeCheck(page);
  });
})