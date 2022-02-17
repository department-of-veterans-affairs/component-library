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

  it('renders slotted content', async () => {
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
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#one">Level One</a>
        </li>
        <li>
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
});
