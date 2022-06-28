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
