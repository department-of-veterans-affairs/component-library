import { newE2EPage } from '@stencil/core/testing';

describe('va-text-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-text-input />');
    const element = await page.find('va-text-input');

    expect(element).toEqualHtml(`
      <va-text-input class="hydrated">
        <mock:shadow-root>
          <input type="text" />
        </mock:shadow-root>
      </va-text-input>
    `);
  });

  it('renders a label', () => {});

  it('renders an error message', () => {});

  it('renders a required span', () => {});

  it('passes an aXe check', () => {});

  it('fires an analytics event (when?)', () => {});
});
