import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-telephone', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-telephone></va-telephone>');

    const element = await page.find('va-telephone');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-telephone contact="8779551234"></va-telephone>');

    await axeCheck(page);
  });

  it('passes an axe check as an international number', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone international contact="8779551234"></va-telephone>',
    );

    await axeCheck(page);
  });

  it('passes an axe check with extension', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone contact="8779551234" extension="123"></va-telephone>',
    );

    await axeCheck(page);
  });

  it('passes an axe check for an N11 number', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-telephone contact="711"></va-telephone>');

    await axeCheck(page);
  });

  it('passes an axe check for a phone number with a country code', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone country-code="63" contact="(02) 8555 8888"></va-telephone>',
    );

    await axeCheck(page);
  });

  it('ignores non-digits in the contact prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone contact="(877) 955-1234"></va-telephone>',
    );

    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('href')).toEqual('tel:+18779551234');
    expect(link.innerText).toEqual('877-955-1234');
  });

  it('handles a 10 digit contact prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-telephone contact="8779551234"></va-telephone>');

    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('href')).toEqual('tel:+18779551234');
    expect(link.innerText).toEqual('877-955-1234');
  });

  it('handles a 10 digit international contact prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone international contact="8779551234"></va-telephone>',
    );

    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('href')).toEqual('tel:+18779551234');
    expect(link.innerText).toEqual('+1-877-955-1234');
  });

  it('handles a non-clickable 10 digit contact prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone not-clickable contact="8779551234"></va-telephone>',
    );

    const element = await page.find('va-telephone');
    expect(element).toEqualHtml(`
      <va-telephone class="hydrated" contact="8779551234" not-clickable>
        <mock:shadow-root>
          <span>
            877-955-1234
          </span>
        </mock:shadow-root>
      </va-telephone>
    `);
  });

  it('handles a non-clickable 10 digit contact prop with extension', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone not-clickable contact="8779551234" extension="123"></va-telephone>',
    );

    const element = await page.find('va-telephone');
    expect(element).toEqualHtml(`
      <va-telephone class="hydrated" contact="8779551234" extension="123" not-clickable>
        <mock:shadow-root>
          <span>
            877-955-1234, ext. 123
          </span>
        </mock:shadow-root>
      </va-telephone>
    `);
  });

  it('handles a 10 digit contact prop with extension', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone contact="8779551234" extension="123"></va-telephone>',
    );

    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('href')).toEqual('tel:+18779551234,123');
    expect(link.innerText).toEqual('877-955-1234, ext. 123');
  });

  it('handles a phone number with a country code', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone country-code="63" contact="(02) 8555 8888"></va-telephone>',
    );

    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('href')).toEqual('tel:+630285558888');
    expect(link.innerText).toEqual('+63 (02) 8555 8888');
  });

  it('handles a 3 digit contact prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-telephone contact="711"></va-telephone>');

    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('href')).toEqual('tel:711');
    expect(link.innerText).toEqual('711');
  });

  it('handles a TTY contact', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-telephone contact="711" tty></va-telephone>');

    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('href')).toEqual('tel:711');
    expect(link.innerText).toEqual('TTY: 711');
  });

  it('handles an SMS contact', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-telephone contact="123456" sms></va-telephone>');

    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('href')).toEqual('sms:123456');
    expect(link.innerText).toEqual('123456');
  });

  it('handles a vanity number as a contact prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone contact="8772228387" vanity="VETS"></va-telephone>',
    );

    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('href')).toEqual('tel:+18772228387');
    expect(link.innerText).toEqual('877-222-VETS (8387)');
  });

  it('fires an analytics event when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone contact="8779551234" extension="123"></va-telephone>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const link = await page.find('va-telephone >>> a');
    await link.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-telephone',
      details: {
        contact: '8779551234',
        extension: '123',
      },
    });
  });

  it('when messageAriaDescribedby exists, the message is added to the dom', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone contact="8772228387" message-aria-describedby="main number"></va-telephone>',
    );

    const messageSpan = await page.find('va-telephone >>> #number-description');
    expect(messageSpan).not.toBeNull();
    expect(messageSpan.textContent).toBe('main number');
  });

  it('passes an axe check when messageAriaDescribedby is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone contact="8772228387" messageAriaDescribedby="main number"></va-telephone>',
    );

    await axeCheck(page);
  });
});
