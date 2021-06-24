import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

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

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox error="Something went horribly wrong" />',
    );
    const element = await page.find('va-checkbox >>> #error-message');
    expect(element).not.toBeNull();
  });

  it('renders a required span', async () => {});

  it('renders a description', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox><p slot="description">This is a description!</p></va-checkbox',
    );
    const element = await page.find('va-checkbox');
    expect(element).toEqualText('This is a description!');
  });

  // This test fails, but is here as documentation. The unknown slot and unnamed
  // slot shouldn't show up in the browser, but the test still finds the text
  // because the elements are still in the light DOM.
  it.skip('does not render unknown content', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox><p slot="nope">Should not show up</p><p>Nor should unnamed slotted content</p></va-checkbox',
    );
    const element = await page.find('va-checkbox');
    expect(element).toEqualText('');
  });

  it('should prefer rendering the description prop over the slotted element', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox description="Description prop"><p slot="description">Slotted description</p></va-checkbox',
    );
    const element = await page.find('va-checkbox');
    expect(element.shadowRoot.textContent).toContain('Description prop');
    expect(
      await page.find('va-checkbox >>> slot[name="description"]'),
    ).toBeNull();
  });

  it('adds new aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox error="This is a mistake" />');

    // Render the error message text
    const inputEl = await page.find('va-checkbox >>> input');
    expect(inputEl.getAttribute('aria-describedby')).toContain('error-message');
  });

  it('appends to an existing aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox error="This is a mistake" aria-describedby="random-thing" />',
    );

    // Render the error message text
    const error = await page.find('va-checkbox >>> input');
    expect(error.getAttribute('aria-describedby')).toContain('random-thing');
    expect(error.getAttribute('aria-describedby')).toContain('error-message');
  });

  it('passes an aXe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-checkbox required label="This is a test" error="With an error message"/>',
    );

    await axeCheck(page);
  });

  it('fires an analytics event', async () => {});

  it("doesn't fire an analytics event when disableAnalytics is true", async () => {});

  it('passes unknown props to the input element in the shadow DOM', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox foo="bar" />');

    // Render the error message text
    const element = await page.find('va-checkbox >>> input');
    expect(element.getAttribute('foo')).toEqual('bar');
  });
});
