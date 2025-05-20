import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-input-telephone', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone/>');

    const element = await page.find('va-input-telephone');
    expect(element).toHaveClass('hydrated');
  });

  it('defaults to the US', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone />');
    const flagSpan = await page.find('va-input-telephone >>> va-combo-box >>> span.flag-us');
    expect(flagSpan).not.toBeNull();
  })

  it('prefills a contact', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone contact="2345678910" />');
    const input = await page.find('va-input-telephone >>> input#inputField');
    const value = await input.getProperty('value');
    expect(value).toBe('(234) 567-8910')
  })

  it('prefills a country', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone country="MX" />');
    const flagSpan = await page.find('va-input-telephone >>> va-combo-box >>> span.flag-mx');
    expect(flagSpan).not.toBeNull();
  });

  it('renders header', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone hint="This is the header" />');
    const header = await page.find('va-input-telephone >>> legend');
    expect(header.innerHTML).toContain('This is the header');
  })

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone hint="This is the hint" />');
    const hint = await page.find('va-input-telephone >>> div.usa-hint');
    expect(hint.innerText).toContain('This is the hint');
  });

  it('renders custom error', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone error="This is an error message" />');
    const error = await page.find('va-input-telephone >>> span#error-message');
    expect(error.innerText).toContain('This is an error message');
  });

  it('shows an error message if contact missing', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone />');
    const input = await page.find('va-input-telephone >>> va-text-input');
    await input.click(); 
    await input.press('Tab');
    const error = await page.find('va-input-telephone >>> span#error-message');
    expect(error.innerText).toContain('Please enter a phone number');
  });

  it('shows an error message if contact does not match the form required by the selected country', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone />');
    const input = await page.find('va-input-telephone >>> va-text-input >>> input');
    await input.press('2');
    await input.press('Tab');
    const error = await page.find('va-input-telephone >>> span#error-message');
    expect(error.innerText).toContain('phone number in a valid format, for example,');
  });

  it('shows an error message if country is missing', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone />');
    const input = await page.find('va-input-telephone >>> va-combo-box >>> input');
    await input.click();
    await page.keyboard.press('Delete');
    await page.keyboard.press('Enter');
    const error = await page.find('va-input-telephone >>> span#error-message');
    expect(error.innerText).toContain('Please choose a country');
  });

  it('changes the flag when new country is selected', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone />');
    const input = await page.find('va-input-telephone >>> va-combo-box >>> input');
    await input.click();
    await page.keyboard.press('Delete');

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const flagSpan = await input.find('span.flag-af');
    expect(flagSpan).not.toBeNull();
  })

  it('emits the vaCountryCode event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone />');
    const countrySpy = await page.spyOnEvent('vaCountryCode');
    const input = await page.find('va-input-telephone >>> va-combo-box');
    await input.click();
    await input.press('Tab');
    await input.press('Tab');
    expect(countrySpy).toHaveReceivedEventDetail({ code: 'US' });
  });

  it('emits the vaContact event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone contact="2345678910" />');
    const contactSpy = await page.spyOnEvent('vaContact');
    const input = await page.find('va-input-telephone >>> va-text-input >>> input');
    await input.click();
    await input.press('Tab');
    expect(contactSpy).toHaveReceivedEventDetail({ contact: '(234) 567-8910', isValid: true });
  });

  it('does not render render country select when no-country is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone no-country />');
    const country = await page.find('va-input-telephone >>> va-combo-box');
    expect(country).toBeNull()
  })

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-input-telephone/>');
    await axeCheck(page);
  });
});
