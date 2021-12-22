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

  it('handles a 10 digit contact prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-telephone contact="8779551234"></va-telephone>');

    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('aria-label')).toEqual('8 7 7. 9 5 5. 1 2 3 4.');
    expect(link.getAttribute('href')).toEqual('tel:+18779551234');
    expect(link.innerText).toEqual('877-955-1234');
  });

  it('handles a 10 digit international contact prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-telephone international contact="8779551234"></va-telephone>',
    );

    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('aria-label')).toEqual(
      '1. 8 7 7. 9 5 5. 1 2 3 4.',
    );
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
          <span aria-hidden="true">
            877-955-1234
          </span>
          <span class="sr-only">
            8 7 7. 9 5 5. 1 2 3 4.
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
          <span aria-hidden="true">
            877-955-1234, ext. 123
          </span>
          <span class="sr-only">
            8 7 7. 9 5 5. 1 2 3 4. extension. 1 2 3.
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
    expect(link.getAttribute('aria-label')).toEqual(
      '8 7 7. 9 5 5. 1 2 3 4. extension. 1 2 3.',
    );
    expect(link.getAttribute('href')).toEqual('tel:+18779551234,123');
    expect(link.innerText).toEqual('877-955-1234, ext. 123');
  });

  it('handles a 3 digit contact prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-telephone contact="711"></va-telephone>');

    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('aria-label')).toEqual('7 1 1.');
    expect(link.getAttribute('href')).toEqual('tel:711');
    expect(link.innerText).toEqual('711');
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
        extension: 123,
      },
    });
  });
});
