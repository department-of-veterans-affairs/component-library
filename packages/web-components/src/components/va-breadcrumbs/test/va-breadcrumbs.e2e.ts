import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-breadcrumbs></va-breadcrumbs>');

    const element = await page.find('va-breadcrumbs');
    expect(element).toEqualHtml(`
      <va-breadcrumbs class="hydrated">
        <!---->
        <nav aria-label="Breadcrumb">
          <ul role="list">
          </ul>
        </nav>
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
        <!---->
          <nav aria-label="Breadcrumb">
            <ul role="list">
              <li class="va-breadcrumbs-li">
                <a href="#home">Home</a>
              </li>
              <li class="va-breadcrumbs-li">
                <a href="#one">Level One</a>
              </li>
              <li class="va-breadcrumbs-li">
                <a aria-current="page" href="#two">Level Two</a>
              </li>
            </ul>
          </nav>
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
        <!---->
        <nav aria-label="Breadcrumb">
          <ul role="list">
            <li class="va-breadcrumbs-li">
              <a href="#home">Home</a>
            </li>
            <li class="va-breadcrumbs-li">
              <a href="#one">Level One</a>
            </li>
            <li class="va-breadcrumbs-li">
              <a aria-current="page" href="#two">Level Two</a>
            </li>
          </ul>
        </nav>
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
    const page = await newE2EPage();
    await page.setContent('<va-breadcrumbs uswds></va-breadcrumbs>');

    const element = await page.find('va-breadcrumbs');
    expect(element).toEqualHtml(`
      <va-breadcrumbs class="hydrated" uswds>
        <!---->
        <nav aria-label="Breadcrumb" class="usa-breadcrumb">
          <ol class="usa-breadcrumb__list" role="list">
          </ol>
        </nav>
      </va-breadcrumbs>
    `);
  });

  it("uswds - should render wrap labels when 'wrapping' is true", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs uswds wrapping>
        <a href="#home">Home</a>
        <a href="#one">Level One</a>
        <a href="#two">Level Two</a>
      </va-breadcrumbs>
    `);
    const element = await page.find('va-breadcrumbs nav');
    expect(element.classList.contains('usa-breadcrumb--wrap')).toBe(true);
  })

  it('uswds - renders slotted content (anchor tags)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs uswds>
        <a href="#home">Home</a>
        <a href="#one">Level One</a>
        <a href="#two">Level Two</a>
      </va-breadcrumbs>
    `);

    const element = await page.find('va-breadcrumbs');
    expect(element).toEqualHtml(`
      <va-breadcrumbs class="hydrated" uswds>
        <!---->
        <nav aria-label="Breadcrumb" class="usa-breadcrumb">
          <ol role="list" class="usa-breadcrumb__list">
            <li class="usa-breadcrumb__list-item">
              <a href="#home" class="usa-breadcrumb__link">
                <span>
                  Home
                </span>
              </a>
            </li>
            <li class="usa-breadcrumb__list-item">
              <a href="#one" class="usa-breadcrumb__link">
                <span>
                  Level One
                </span>
              </a>
            </li>
            <li class="usa-breadcrumb__list-item usa-current" aria-current="page">
              <span>
                Level Two
              </span>
            </li>
          </ol>
        </nav>
      </va-breadcrumbs>
    `);
  });

  it('uswds - renders slotted content (list items)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs uswds>
        <li><a href="#home">Home</a></li>
        <li><a href="#one">Level One</a></li>
        <li><a href="#two">Level Two</a></li>
      </va-breadcrumbs>
    `);

    const element = await page.find('va-breadcrumbs');
    expect(element).toEqualHtml(`
    <va-breadcrumbs class="hydrated" uswds>
      <!---->
        <nav aria-label="Breadcrumb" class="usa-breadcrumb">
          <ol role="list" class="usa-breadcrumb__list">
            <li class="usa-breadcrumb__list-item">
              <a href="#home" class="usa-breadcrumb__link">
                <span>Home</span>
              </a>
            </li>
            <li class="usa-breadcrumb__list-item">
              <a href="#one" class="usa-breadcrumb__link">
                <span>Level One</span>
              </a>
            </li>
            <li class="usa-breadcrumb__list-item usa-current" aria-current="page">
              <span>Level Two</span>
            </li>
          </ol>
        </nav>
    </va-breadcrumbs>
    `);
  });

  it('uswds - passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs uswds>
        <a href="#home">Home</a>
        <a href="#one">Level One</a>
        <a href="#two">Level Two</a>
      </va-breadcrumbs>
    `);

    await axeCheck(page);
  });

  it('uswds - fires an analytics event when an anchor link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs uswds>
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
        totalLevels: 2,
      },
    });
  });

  it(`uswds - doesn't fire an analytics event with disable-analytics prop when an anchor link is clicked`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs disable-analytics uswds>
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
});
