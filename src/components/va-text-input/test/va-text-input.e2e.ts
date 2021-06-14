import { newE2EPage } from '@stencil/core/testing';

describe('va-text-input', () => {
  it('renders without a label', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input />');
    const element = await page.find('va-text-input');

    expect(element).toEqualHtml(`
      <va-text-input class="hydrated">
        <mock:shadow-root>
          <input id="inputField" type="text" />
        </mock:shadow-root>
      </va-text-input>
    `);
  });

  it('renders a label', () => {});

  it('renders an error message', () => {});

  it('renders a required span', () => {});

  it('passes an aXe check', () => {});

  it('fires an analytics event (when?)', () => {});

  it('passes unknown props to the input element in the shadow DOM', async () => {
    // This is primarily so we don't have to make a new prop for each aria-* attribute
    const page = await newE2EPage();

    await page.setContent(
      '<va-text-input label="Hello, world" unprop="Not a real prop" />',
    );
    const element = await page.find('va-text-input');

    // Filters out label, passes unprop
    expect(element).toEqualHtml(`
      <va-text-input class="hydrated" label="Hello, world" unprop="Not a real prop">
        <mock:shadow-root>
          <label for="inputField">Hello, world</label>
          <input id="inputField" type="text" unprop="Not a real prop"/>
        </mock:shadow-root>
      </va-text-input>
    `);
  });
});
