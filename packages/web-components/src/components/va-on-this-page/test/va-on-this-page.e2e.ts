import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-on-this-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-on-this-page></va-on-this-page>');
    const element = await page.find('va-on-this-page');

    expect(element).toEqualHtml(`
      <va-on-this-page class="hydrated">
        <mock:shadow-root>
          <nav aria-labelledby="on-this-page">
            <dl>
              <dt id="on-this-page">On this page</dt>
              <dd role="definition"></dd>
            </dl>
          </nav>
        </mock:shadow-root>
      </va-on-this-page>
    `);
  });

  it('passes an axe check', async () => {
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

    await axeCheck(page);
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
          <nav aria-labelledby="on-this-page">
            <dl>
              <dt id="on-this-page">On this page</dt>
              <dd role="definition">
                <a href="#an-id">
                  <i aria-hidden="true" class="fa-arrow-down fas"></i>
                  Hello
                </a>
                <a href="#its-me">
                  <i aria-hidden="true" class="fa-arrow-down fas"></i>
                  It's me
                </a>
              </dd>
            </dl>
          </nav>
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
      <nav aria-labelledby="on-this-page">
        <dl>
          <dt id="on-this-page">On this page</dt>
          <dd role="definition">
            <a href="#foo">
              <i aria-hidden="true" class="fa-arrow-down fas"></i>
              Foo
            </a>
          </dd>
        </dl>
      </nav>
    </mock:shadow-root>
  </va-on-this-page>
    `);
  });
});
