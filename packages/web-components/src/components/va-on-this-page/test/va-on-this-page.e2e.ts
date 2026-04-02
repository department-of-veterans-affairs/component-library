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
            <h2 id="on-this-page">on-this-page</h2>
            <ul>
            </ul>
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
            <h2 id="on-this-page">on-this-page</h2>
            <ul>
              <li>
                <a href="#an-id">
                  <va-icon class="hydrated"></va-icon>
                  <span>Hello</span>
                </a>
              </li>
              <li>
                <a href="#its-me">
                  <va-icon class="hydrated"></va-icon>
                  <span>It's me</span>
                </a>
              </li>
            </ul>
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
        <h2 id="on-this-page">on-this-page</h2>
        <ul>
          <li>
            <a href="#foo">
              <va-icon class="hydrated"></va-icon>
              <span>Foo</span>
            </a>
          </li>
        </ul>
      </nav>
    </mock:shadow-root>
  </va-on-this-page>
    `);
  });

  it('does not display <h2>s without ids', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <article>
        <va-on-this-page></va-on-this-page>
        <h2 id="an-id">Hello</h2>
        <div>Some content</div>
        <h2 id="its-me">It's me</h2>
        <span>Hello from the other side</span>
        <h2>Heading without id</h2>
        <span>The h2 above has no id</span>
      </article>
      `,
    );
    const element = await page.find('va-on-this-page');

    expect(element).toEqualHtml(`
      <va-on-this-page class="hydrated">
        <mock:shadow-root>
          <nav aria-labelledby="on-this-page">
            <h2 id="on-this-page">on-this-page</h2>
            <ul>
              <li>
                <a href="#an-id">
                  <va-icon class="hydrated"></va-icon>
                  <span>Hello</span>
                </a>
              </li>
              <li>
                <a href="#its-me">
                  <va-icon class="hydrated"></va-icon>
                  <span>It's me</span>
                </a>
              </li>
            </ul>
          </nav>
        </mock:shadow-root>
      </va-on-this-page>
    `);
  });

  it('excludes headings that match exclude-selectors', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <article>
        <va-on-this-page exclude-selectors='["va-alert h2", "#excluded-heading", ".my-heading"]'></va-on-this-page>
        <h2 id="excluded-heading">excluded heading</h2>
        <h2 class="my-heading">also excluded</h2>
        <va-alert status="info">
          <h2 id="this-is-an-alert" slot="headline">This is a heading</h2>
          <p>This heading should be excluded from the on this page navigation.</p>
        </va-alert>
        <h2 id="visible-heading">Visible heading</h2>
      </article>
      `,
    );
    const element = await page.find('va-on-this-page');

    expect(element).toEqualHtml(`
      <va-on-this-page class="hydrated" exclude-selectors="[&quot;va-alert h2&quot;, &quot;#excluded-heading&quot;, &quot;.my-heading&quot;]">
        <mock:shadow-root>
          <nav aria-labelledby="on-this-page">
            <h2 id="on-this-page">on-this-page</h2>
            <ul>
              <li>
                <a href="#visible-heading">
                  <va-icon class="hydrated"></va-icon>
                  <span>Visible heading</span>
                </a>
              </li>
            </ul>
          </nav>
        </mock:shadow-root>
      </va-on-this-page>
    `);
  });

  it('fires analytics event when an anchor is clicked', async () => {
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

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const anchor = await page.find('va-on-this-page >>> a');
    await anchor.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-on-this-page',
      details: {
        'click-text': 'Hello',
      },
    });
  });

  it(`doesn't fire analytics event when an anchor is clicked and disable-analytics is true`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <article>
        <va-on-this-page disable-analytics></va-on-this-page>
        <h2 id="an-id">Hello</h2>
        <div>Some content</div>
        <h2 id="its-me">It's me</h2>
        <span>Hello from the other side</span>
      </article>
      `,
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const anchor = await page.find('va-on-this-page >>> a');
    await anchor.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('updates the header level with the header-level prop', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <article>
        <va-on-this-page header-level="3"></va-on-this-page>
        <div>
          <h2 id="foo">Foo</h2>
          <div>bar</div>
        </div>
        </article>
      `,
    );
    const element = await page.find('va-on-this-page');

    expect(element).toEqualHtml(`
      <va-on-this-page class="hydrated" header-level="3">
        <mock:shadow-root>
          <nav aria-labelledby="on-this-page">
            <h3 id="on-this-page">on-this-page</h3>
            <ul>
              <li>
                <a href="#foo">
                  <va-icon class="hydrated"></va-icon>
                  <span>Foo</span>
                </a>
              </li>
            </ul>
          </nav>
        </mock:shadow-root>
      </va-on-this-page>
    `);
  });

  it('excludes usa-sr-only content from link text', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <article>
        <va-on-this-page></va-on-this-page>
        <h2 id="section-1">Getting started <span class="usa-sr-only">(optional)</span></h2>
        <div>Some content</div>
        <h2 id="section-2"><span>Process</span> <span class="usa-sr-only">- updated</span></h2>
      </article>
      `,
    );
    const element = await page.find('va-on-this-page');

    expect(element).toEqualHtml(`
      <va-on-this-page class="hydrated">
        <mock:shadow-root>
          <nav aria-labelledby="on-this-page">
            <h2 id="on-this-page">on-this-page</h2>
            <ul>
              <li>
                <a href="#section-1">
                  <va-icon class="hydrated"></va-icon>
                  <span>Getting started</span>
                </a>
              </li>
              <li>
                <a href="#section-2">
                  <va-icon class="hydrated"></va-icon>
                  <span>Process</span>
                </a>
              </li>
            </ul>
          </nav>
        </mock:shadow-root>
      </va-on-this-page>
    `);
  });

  it('scopes headings when multiple components are in one article', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <article>
        <section>
          <va-on-this-page></va-on-this-page>
          <h2 id="section-a">Section A</h2>
        </section>
        <section>
          <va-on-this-page></va-on-this-page>
          <h2 id="section-b">Section B</h2>
        </section>
      </article>
      `,
    );

    const elements = await page.findAll('va-on-this-page');

    expect(elements[0]).toEqualHtml(`
      <va-on-this-page class="hydrated">
        <mock:shadow-root>
          <nav aria-labelledby="on-this-page">
            <h2 id="on-this-page">on-this-page</h2>
            <ul>
              <li>
                <a href="#section-a">
                  <va-icon class="hydrated"></va-icon>
                  <span>Section A</span>
                </a>
              </li>
            </ul>
          </nav>
        </mock:shadow-root>
      </va-on-this-page>
    `);

    expect(elements[1]).toEqualHtml(`
      <va-on-this-page class="hydrated">
        <mock:shadow-root>
          <nav aria-labelledby="on-this-page">
            <h2 id="on-this-page">on-this-page</h2>
            <ul>
              <li>
                <a href="#section-b">
                  <va-icon class="hydrated"></va-icon>
                  <span>Section B</span>
                </a>
              </li>
            </ul>
          </nav>
        </mock:shadow-root>
      </va-on-this-page>
    `);
  });

  it('focuses the scoped heading when duplicate ids exist on the page', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <article>
        <section>
          <va-on-this-page></va-on-this-page>
          <h2 id="shared-id">First heading</h2>
        </section>
        <section>
          <va-on-this-page></va-on-this-page>
          <h2 id="shared-id">Second heading</h2>
        </section>
      </article>
      `,
    );

    const anchors = await page.findAll('va-on-this-page >>> a');
    await anchors[1].click();

    const activeHeadingText = await page.evaluate(
      () => document.activeElement?.textContent?.trim(),
    );

    expect(activeHeadingText).toEqual('Second heading');
  });
});
