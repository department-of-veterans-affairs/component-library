import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-button-pair', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair></va-button-pair>');
    const element = await page.find('va-button-pair');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair continue></va-button-pair>');
    await axeCheck(page);
  });

  it('fires analytics event when primary button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair></va-button-pair>');
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const primaryButton = await page.find('va-button-pair >>> va-button');
    await primaryButton.click();
    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-button-pair',
      // TODO: update analytics event details
      details: {},
    });
  });

  it('fires analytics event when secondary button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair></va-button-pair>');
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const buttons = await page.findAll('va-button-pair >>> va-button');
    await buttons[1].click();
    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-button-pair',
      // TODO: update analytics event details
      details: {},
    });
  });

  it('fires analytics event when secondary button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair></va-button-pair>');
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const buttons = await page.findAll('va-button-pair >>> va-button');
    await buttons[1].click();
    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-button-pair',
      // TODO: update analytics event details
      details: {},
    });
  });

  it(`doesn't fire analytics event when disableAnalytics is true`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button-pair disable-analytics></va-button-pair>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const buttons = await page.findAll('va-button-pair >>> va-button');
    await buttons[1].click();
    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('fires primaryClick event when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair></va-button-pair>');
    const primaryClickEvent = await page.spyOnEvent('primaryClick');
    const primaryButton = await page.find('va-button-pair >>> va-button');
    await primaryButton.click();
    expect(primaryClickEvent).toHaveReceivedEventTimes(1);
  });

  it('fires secondaryClick event when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair></va-button-pair>');
    const secondaryClickEvent = await page.spyOnEvent('secondaryClick');
    const buttons = await page.findAll('va-button-pair >>> va-button');
    await buttons[1].click();
    expect(secondaryClickEvent).toHaveReceivedEventTimes(1);
  });
});
