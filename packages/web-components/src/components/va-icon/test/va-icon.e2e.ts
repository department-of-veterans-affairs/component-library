import { newE2EPage } from "@stencil/core/testing";
import { axeCheck } from "../../../testing/test-helpers";

describe('va-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-icon icon="account_circle" />');

    const element = await page.find('va-icon');
    expect(element).toHaveClass('hydrated');
  });

  it('adds appropriate size class if size prop included', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-icon icon="account_circle" size="3" />');
    const svgEl = await page.find('va-icon >>> svg');

    expect(svgEl).toHaveClass('usa-icon--size-3')
  });

  it('does not add size class if size is not within acceptable range', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-icon icon="account_circle" size="33" />');
    const svgEl = await page.find('va-icon >>> svg');

    expect(svgEl).not.toHaveClass('usa-icon--size-33');
  });

  it('adds a title element and aria attributes if srtext prop set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-icon icon="account_circle" srtext="this is a test..." />');

    const svgEl = await page.find('va-icon >>> svg');
    expect(svgEl.getAttribute('aria-hidden')).toBeNull();
    expect(svgEl.getAttribute('aria-labelledby')).toEqual('icon-title')


    const titleEl = await page.find('va-icon >>> title');
    expect(titleEl.innerHTML).toEqual('this is a test...');
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-icon icon="account_circle" size="5" srtext="this is a test..." />');

    await axeCheck(page);
  });
})