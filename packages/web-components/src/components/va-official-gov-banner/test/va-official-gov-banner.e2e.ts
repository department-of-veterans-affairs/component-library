import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-official-gov-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-official-gov-banner></va-official-gov-banner>');

    const element = await page.find('va-official-gov-banner');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-official-gov-banner tld="gov" />');

    await axeCheck(page);
  });

  it('displays banner for a .gov top-level domain', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-official-gov-banner tld="gov" />');

    const banner = await page.find("va-official-gov-banner >>> .banner");
    expect(banner).toBeTruthy();
  });

  it('displays banner for a .mil top-level domain', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-official-gov-banner tld="mil" />');

    const banner = await page.find("va-official-gov-banner >>> .banner");
    expect(banner).toBeTruthy();
  });

  it('does not display when the TLD is not .gov or .mil', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-official-gov-banner tld="com" />');

    const banner = await page.find("va-official-gov-banner >>> .banner");
    expect(banner).toBeFalsy();
  });

  // Toggles dropdown content
  it('toggles drop down content', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-official-gov-banner />');

    const button = await page.find("va-official-gov-banner >>> button");
    await button.click();

    expect(button).toEqualAttribute("aria-expanded", "true");
  });

  // fires an analytics event when the dropdown is clicked
  it('fires an analytics event when the content expand button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-official-gov-banner />');

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find("va-official-gov-banner >>> button");
    await button.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-official-gov-banner',
      details: {
        event: 'int-official-gov-banner-expand'
      },
    });
  });
});
