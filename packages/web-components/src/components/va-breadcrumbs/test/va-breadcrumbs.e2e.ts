import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-breadcrumbs></va-breadcrumbs>');

    const element = await page.find('va-breadcrumbs');
    expect(element).toEqualHtml(`
      <va-breadcrumbs class="hydrated">
        <mock:shadow-root>
          <nav aria-label="Breadcrumb">
            <ul role="list">
              <slot></slot>
            </ul>
          </nav>
        </mock:shadow-root>
      </va-breadcrumbs>
    `);
  });

  it('renders slotted content (anchor tags)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs>
        <a href="#home">Home</a>
        <a href="#one">Level One</a>
        <a href="#two">Level Two</a>
      </va-breadcrumbs>
    `);

    const element = await page.find('va-breadcrumbs');
    expect(element).toEqualHtml(`
      <va-breadcrumbs class="hydrated">
        <mock:shadow-root>
          <nav aria-label="Breadcrumb">
            <ul role="list">
              <slot></slot>
            </ul>
          </nav>
        </mock:shadow-root>
        <li class="va-breadcrumbs-li">
          <a href="#home">VA.gov home</a>
        </li>
        <li class="va-breadcrumbs-li">
          <a href="#one">Level One</a>
        </li>
        <li class="va-breadcrumbs-li">
          <a aria-current="page" href="#two">Level Two</a>
        </li>
      </va-breadcrumbs>
    `);
  });

  it('renders slotted content (list items)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs>
        <li><a href="#home">Home</a></li>
        <li><a href="#one">Level One</a></li>
        <li><a href="#two">Level Two</a></li>
      </va-breadcrumbs>
    `);

    const element = await page.find('va-breadcrumbs');
    expect(element).toEqualHtml(`
      <va-breadcrumbs class="hydrated">
        <mock:shadow-root>
          <nav aria-label="Breadcrumb">
            <ul role="list">
              <slot></slot>
            </ul>
          </nav>
        </mock:shadow-root>
        <li class="va-breadcrumbs-li">
          <a href="#home">VA.gov home</a>
        </li>
        <li class="va-breadcrumbs-li">
          <a href="#one">Level One</a>
        </li>
        <li class="va-breadcrumbs-li">
          <a aria-current="page" href="#two">Level Two</a>
        </li>
      </va-breadcrumbs>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs>
        <a href="#home">Home</a>
        <a href="#one">Level One</a>
        <a href="#two">Level Two</a>
      </va-breadcrumbs>
    `);

    await axeCheck(page);
  });

  it('fires an analytics event when an anchor link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs>
        <a href="#home">Home</a>
        <a href="#one">Level One</a>
        <a href="#two">Level Two</a>
      </va-breadcrumbs>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorElements = await page.findAll('pierce/a');

    await anchorElements[1].click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'linkClick',
      componentName: 'va-breadcrumbs',
      details: {
        clickLabel: 'Level One',
        clickLevel: 2,
        totalLevels: 3,
      },
    });
  });

  it(`doesn't fire an analytics event with disable-analytics prop when an anchor link is clicked`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs disable-analytics>
        <a href="#home">Home</a>
        <a href="#one">Level One</a>
        <a href="#two">Level Two</a>
      </va-breadcrumbs>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorElement = await page.find('pierce/a');
    await anchorElement.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('updates first anchor link label to "VA.gov home"', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs>
        <a href="#home">not the right label</a>
        <a href="#one">Level One</a>
        <a href="#two">Level Two</a>
      </va-breadcrumbs>
    `);

    const anchorElements = await page.findAll('pierce/a');
    const firstAnchorText = anchorElements[0].innerText;
    
    expect(firstAnchorText).toBe('VA.gov home');
  });

  /** Begin USWDS v3 Tests */

  it('uswds - renders', async () => {
    const page = await newE2EPage({
      html: '<va-breadcrumbs class="hydrated" label="test" disable-analytics="false" breadcrumb-list=\'[{ "label": "Home", "href": "#home" }, { "label": "Current", "href": "#current" }]\' uswds></va-breadcrumbs>',
    });
    const element = await page.find('va-breadcrumbs');
    expect(element).toEqualHtml(`
      <va-breadcrumbs class="hydrated" disable-analytics="false" label="test" breadcrumb-list='[{ "label": "Home", "href": "#home" }, { "label": "Current", "href": "#current" }]' uswds>
        <mock:shadow-root>
          <nav aria-label="test" class="usa-breadcrumb">
            <ol class="usa-breadcrumb__list" role="list">
              <li class="usa-breadcrumb__list-item">
                <a class="usa-breadcrumb__link" href="#home">
                  <span>VA.gov home</span>
                </a>
              </li>
              <li class="usa-breadcrumb__list-item usa-current" aria-current="page">
                <a class="usa-breadcrumb__link" href="#content">
                  <span>Current</span>
                </a>
              </li>
            </ol>
          </nav>
        </mock:shadow-root>
      </va-breadcrumbs>
    `);
  });

  it("uswds - should render wrap labels when 'wrapping' is true", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs disable-analytics="false" breadcrumb-list=\'[{ "label": "This is a very long breadcrumb", "href": "#home" }, { "label": "Current", "href": "#current" }]\' uswds wrapping></va-breadcrumbs>
    `);
    const element = await page.find('va-breadcrumbs');
    const indicator = element.shadowRoot.querySelector('.usa-breadcrumb');
    expect(indicator.classList.contains('usa-breadcrumb--wrap')).toBe(true);
  })

  it('uswds - passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs disable-analytics="false" breadcrumb-list=\'[{ "label": "Home", "href": "#home" }, { "label": "Current", "href": "#current" }]\' uswds></va-breadcrumbs>
    `);

    await axeCheck(page);
  });

  it('uswds - fires an analytics event when an anchor link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs breadcrumb-list=\'[{ "label": "Level One", "href": "#one" }, { "label": "Current", "href": "#current" }]\' uswds></va-breadcrumbs>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorElements = await page.findAll('va-breadcrumbs >>> a');
    await anchorElements[0].click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'linkClick',
      componentName: 'va-breadcrumbs',
      details: {
        clickLabel: 'VA.gov home',
        clickLevel: 1,
        totalLevels: 3,
      },
    });
  });

  it(`uswds - doesn't fire an analytics event with disable-analytics prop when an anchor link is clicked`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <va-breadcrumbs breadcrumb-list=\'[{ "label": "Level One", "href": "#one" }, { "label": "Level two", "href": "#two" }, { "label": "Current", "href": "#current" }]\' uswds disable-analytics></va-breadcrumbs>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorElement = await page.find('pierce/a');
    await anchorElement.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('uswds - renders when some links are router links', async () => {
    const page = await newE2EPage({
      html: '<va-breadcrumbs class="hydrated" label="test" disable-analytics="false" breadcrumb-list=\'[{ "label": "One", "href": "/one" }, { "label": "Two", "href": "/two", "isRouterLink": "true" }, { "label": "Three", "href": "/three", "isRouterLink": "true" }]\' uswds></va-breadcrumbs>',
    });
    const element = await page.find('va-breadcrumbs');
    expect(element).toEqualHtml(`
      <va-breadcrumbs class="hydrated" disable-analytics="false" label="test" breadcrumb-list='[{ "label": "One", "href": "/one" }, { "label": "Two", "href": "/two", "isRouterLink": "true" }, { "label": "Three", "href": "/three", "isRouterLink": "true" }]' uswds>
        <mock:shadow-root>
          <nav aria-label="test" class="usa-breadcrumb">
            <ol class="usa-breadcrumb__list" role="list">
              <li class="usa-breadcrumb__list-item">
                <a class="usa-breadcrumb__link" href="/one">
                  <span>VA.gov home</span>
                </a>
              </li>
              <li class="usa-breadcrumb__list-item">
                <a class="usa-breadcrumb__link" href="/two">
                  <span>Two</span>
                </a>
              </li>
              <li class="usa-breadcrumb__list-item usa-current" aria-current="page">
                <a class="usa-breadcrumb__link" href="#content">
                  <span>Three</span>
                </a>
              </li>
            </ol>
          </nav>
        </mock:shadow-root>
      </va-breadcrumbs>
    `);
  });

  it('uswds - fires a route-change event when an anchor link with isRouteLink is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <va-breadcrumbs breadcrumb-list=\'[{ "label": "One", "href": "/one" }, { "label": "Two", "href": "/two", "isRouterLink": "true" }, { "label": "Three", "href": "/three", "isRouterLink": "true" }]\' uswds></va-breadcrumbs>
    `);

    const routeChangeSpy = await page.spyOnEvent('routeChange');

    const anchorElements = await page.findAll('va-breadcrumbs >>> a');
    await anchorElements[1].click();

    expect(routeChangeSpy).toHaveReceivedEventDetail({
      href: "/two",
    });
  });

  it('uswds - does not fire a route-change event when an anchor link without isRouteLink is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <va-breadcrumbs breadcrumb-list=\'[{ "label": "One", "href": "/one" }, { "label": "Two", "href": "/two", "isRouterLink": "true" }, { "label": "Three", "href": "/three", "isRouterLink": "true" }]\' uswds></va-breadcrumbs>
    `);

    const routeChangeSpy = await page.spyOnEvent('routeChange');

    const anchorElements = await page.findAll('va-breadcrumbs >>> a');

    await anchorElements[0].click();
    expect(routeChangeSpy).not.toHaveReceivedEvent();
  });

  it('uswds - updates first anchor link to "VA.gov home"', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <va-breadcrumbs breadcrumb-list=\'[{ "label": "One", "href": "/one" }, { "label": "Two", "href": "/two" }, { "label": "Three", "href": "/three" }]\' uswds></va-breadcrumbs>
    `);

    const anchorElements = await page.findAll('va-breadcrumbs >>> a');
    const firstAnchorLabel = await anchorElements[0].getProperty('innerText');

    expect(firstAnchorLabel).toBe('VA.gov home');
  });

});
