import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const element = await page.find('va-search');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    await axeCheck(page);
  });

  it('fires input blur event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const blurSpy = await page.spyOnEvent('inputBlurEvent');
    const input = await page.find('va-search >>> input');
    await input.focus();

    const component = await page.find('va-search');
    await component.press('Tab');

    expect(blurSpy).toHaveReceivedEventTimes(1);
  });

  it('fires input change event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const changeSpy = await page.spyOnEvent('inputChangeEvent');
    const input = await page.find('va-search >>> input');
    await input.focus();

    await input.press('F');
    await input.press('o');
    await input.press('r');
    await input.press('m');
    await input.press('s');

    const component = await page.find('va-search');
    await component.press('Tab');

    expect(changeSpy).toHaveReceivedEventTimes(1);
  });

  it('fires input focus event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const focusSpy = await page.spyOnEvent('inputFocusEvent');
    const input = await page.find('va-search >>> input');
    await input.focus();

    expect(focusSpy).toHaveReceivedEventTimes(1);
  });

  it('fires input keydown event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const keyDownSpy = await page.spyOnEvent('inputKeyDownEvent');
    const input = await page.find('va-search >>> input');
    await input.focus();

    await input.press('F');
    await input.press('o');
    await input.press('r');
    await input.press('m');
    await input.press('s');

    expect(keyDownSpy).toHaveReceivedEventTimes(5);
  });

  it('fires button click event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const clickSpy = await page.spyOnEvent('buttonClickEvent');
    const button = await page.find('va-search >>> button');
    await button.click();

    expect(clickSpy).toHaveReceivedEventTimes(1);
  });

  it('fires button focus event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const focusSpy = await page.spyOnEvent('buttonFocusEvent');
    const button = await page.find('va-search >>> button');
    await button.focus();

    expect(focusSpy).toHaveReceivedEventTimes(1);
  });

  it('fires button keydown event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const keyDownSpy = await page.spyOnEvent('buttonKeyDownEvent');
    const button = await page.find('va-search >>> button');
    await button.focus();

    await button.press('Tab');

    expect(keyDownSpy).toHaveReceivedEventTimes(1);
  });
});
