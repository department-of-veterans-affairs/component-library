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

  it('renders a label', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input label="Hello, world" />');
    const element = await page.find('va-text-input >>> label');
    expect(element).not.toBeNull();
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-text-input >>> span#error-message');
    expect(error.innerText).toContain('This is a mistake');
  });

  it('adds new aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-text-input error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-text-input >>> input');
    expect(error.getAttribute('aria-describedby')).toContain('error-message');
  });

  it('appends to an existing aria-describedby for error message', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-text-input error="This is a mistake" aria-describedby="random-thing" />',
    );

    // Render the error message text
    const error = await page.find('va-text-input >>> input');
    expect(error.getAttribute('aria-describedby')).toContain('random-thing');
    expect(error.getAttribute('aria-describedby')).toContain('error-message');
  });

  it('renders a required span', () => {});

  it('passes an aXe check', () => {});

  it('fires an analytics event (when?)', () => {});

  it('adds placeholder text', async () => {});

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
