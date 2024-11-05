import { newE2EPage } from "@stencil/core/testing";
import { axeCheck } from "../../../testing/test-helpers";

describe('va-language-toggle', () => {
  const urls = '[{"href":"/resources/the-pact-act-and-your-va-benefits/","lang":"en","label":"English"},{"href":"/resources/the-pact-act-and-your-va-benefits-esp/","lang":"es","label":"Español"},{"href":"/resources/the-pact-act-and-your-va-benefits-tl/","lang":"tg","label":"Tagalog"}]';
  
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle urls=${urls} />`);
    const element = await page.find('va-language-toggle');
    expect(element).toHaveClass('hydrated');
  });

  it('English is the default language', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle urls=${urls} />`);
    const anchor = await page.find('va-language-toggle >>> a');
    expect(anchor).toHaveClass('is-current-lang');
  });

  it('if language prop is set the matching language is bolded', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle language="es" urls=${urls} />`);
    const [_, anchor] = await page.findAll('va-language-toggle >>> a');
    expect(anchor).toHaveClass('is-current-lang');
  });

  it('if router-links is set, clicking an anchor tag does not result in page navigation', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle router-links="true" urls=${urls} />`);
    const [startUrl] = page.url().split('?');
    const [_, anchor] = await page.findAll('va-language-toggle >>> a');
    await anchor.click();
    const [endUrl] = page.url().split('?');
    expect(startUrl).toEqual(endUrl);
  });

  it('fires a language-toggle event when a link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle urls=${urls} />`);
    const toggleSpy = await page.spyOnEvent('vaLanguageToggle');
    const [_, anchor] = await page.findAll('va-language-toggle >>> a');
    await anchor.click();
    expect(toggleSpy).toHaveReceivedEvent();
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-language-toggle urls=${urls} />`);
    await axeCheck(page);
  });
});
