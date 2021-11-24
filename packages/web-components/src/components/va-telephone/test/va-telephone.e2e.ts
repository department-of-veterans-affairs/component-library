import { newE2EPage } from '@stencil/core/testing';

describe('va-telephone', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-telephone></va-telephone>');

    const element = await page.find('va-telephone');
    expect(element).toHaveClass('hydrated');
  });

  it('handles a 10 digit contact prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-telephone contact="8779551234"></va-telephone>');

    // const element = await page.find('va-telephone');
    const link = await page.find('va-telephone >>> a');
    expect(link.getAttribute('aria-label')).toEqual('8 7 7. 9 5 5. 1 2 3 4');
    expect(link.getAttribute('href')).toEqual('tel:+18779551234');
    expect(link.innerText).toEqual('877-955-1234');
  });
});
