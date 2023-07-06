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
          <a href="#home">Home</a>
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
          <a href="#home">Home</a>
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
                  <span>Home</span>
                </a>
              </li>
              <li class="usa-breadcrumb__list-item usa-current">
                <span>Current</span>
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
      <va-breadcrumbs disable-analytics="false" breadcrumb-list=\'[{ "label": "Level One", "href": "#one" }, { "label": "Level two", "href": "#two" }, { "label": "Current", "href": "#current" }]\' uswds></va-breadcrumbs>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const anchorElements = await page.findAll('pierce/a');

    await anchorElements[1].click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'linkClick',
      componentName: 'va-breadcrumbs',
      details: {
        clickLabel: 'Level two',
        clickLevel: 0,
        totalLevels: 0,
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
});
