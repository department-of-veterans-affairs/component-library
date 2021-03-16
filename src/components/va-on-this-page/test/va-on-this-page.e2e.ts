import { newE2EPage } from '@stencil/core/testing';

describe('va-on-this-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-on-this-page></va-on-this-page>');
    const element = await page.find('va-on-this-page');

    expect(element).toEqualHtml(`
      <va-on-this-page class="hydrated">
        <mock:shadow-root>
          <h2>On this page</h2>
          <ul></ul>
        </mock:shadow-root>
      </va-on-this-page>
    `);
  });

  it('puts <h2>s on the page into an ordered list with links', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <article>
        <va-on-this-page></va-on-this-page>
        <h2 id="an-id">Hello</h2>
        <div>Some content</div>
        <h2 id="its-me">It's me</h2>
        <span>Hello from the other side</span>
      </article>
      `,
    );
    const element = await page.find('va-on-this-page');

    expect(element).toEqualHtml(`
      <va-on-this-page class="hydrated">
        <mock:shadow-root>
          <h2>On this page</h2>
          <ul>
            <li>
              <a href="#an-id">
                Hello
              </a>
            </li>
            <li>
              <a href="#its-me">
                It's me
              </a>
            </li>
          </ul>
        </mock:shadow-root>
      </va-on-this-page>
    `);
  });

  it('finds <h2>s even if they are not immediate children', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <article>
        <va-on-this-page></va-on-this-page>
        <div>
          <h2 id="foo">Foo</h2>
          <div>bar</div>
        </div>
        </article>
      `,
    );
    const element = await page.find('va-on-this-page');

    expect(element).toEqualHtml(`
      <va-on-this-page class="hydrated">
        <mock:shadow-root>
          <h2>On this page</h2>
          <ul>
            <li>
              <a href="#foo">
                Foo
              </a>
            </li>
          </ul>
        </mock:shadow-root>
      </va-on-this-page>
    `);
  });
});
