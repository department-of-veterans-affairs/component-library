import { newE2EPage } from '@stencil/core/testing';

describe('va-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox></va-checkbox>');

    const element = await page.find('va-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('renders a label', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox label="Cool label, right?" />');
    const element = await page.find('va-checkbox >>> label');
    expect(element).not.toBeNull();
  });

  it('renders an error message', async () => {});

  it('renders a required span', async () => {});

  it('appends to an existing aria-describedby for error message', async () => {});

  it('passes an aXe check', async () => {});

  it('fires an analytics event', async () => {});

  it("doesn't fire an analytics event when disableAnalytics is true", async () => {});

  it('passes unknown props to the input element in the shadow DOM', async () => {});
});
