import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs>
        <a href="#">Home</a>
        <a href="#">Level One</a>
        <a href="#">Level Two</a>
      </va-breadcrumbs>
    `);

    const element = await page.find('va-breadcrumbs');
    expect(element).toEqualHtml(`
      <va-breadcrumbs class="hydrated">
        <mock:shadow-root>
          <nav aria-label="Breadcrumb">
            <ul role="list">
              <li>
                <a data-index="0" href="#">
                  Home
                </a>
              </li>
              <li>
                <a data-index="1" href="#">
                  Level One
                </a>
              </li>
              <li>
                <a aria-current="page" data-index="2" href="#">
                  Level Two
                </a>
              </li>
            </ul>
          </nav>
          <slot></slot>
        </mock:shadow-root>
        <a href="#">
          Home
        </a>
        <a href="#">
          Level One
        </a>
        <a href="#">
          Level Two
        </a>
      </va-breadcrumbs>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs>
        <a href="#">Home</a>
        <a href="#">Level One</a>
        <a href="#">Level Two</a>
      </va-breadcrumbs>
    `);

    await axeCheck(page);
  });

  it('fires an analytics event when an anchor link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs>
        <a href="#">Home</a>
        <a href="#">Level One</a>
        <a href="#">Level Two</a>
      </va-breadcrumbs>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorElement = await page.find('va-breadcrumbs >>> a');
    await anchorElement.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'linkClick',
      componentName: 'va-breadcrumbs',
      details: {
        clickLabel: 'Home',
        clickLevel: 1,
        mobileFirstProp: false,
        totalLevels: 3,
      },
    });
  });

  it(`doesn't fire an analytics event with disable-analytics prop when an anchor link is clicked`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs disable-analytics>
        <a href="#">Home</a>
        <a href="#">Level One</a>
        <a href="#">Level Two</a>
      </va-breadcrumbs>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorElement = await page.find('va-breadcrumbs >>> a');
    await anchorElement.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('adds va-nav-breadcrumbs--mobile class to nav when mobile-first-prop is true', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-breadcrumbs mobile-first-prop></va-breadcrumbs>
    `);

    const element = await page.find('va-breadcrumbs >>> nav');

    expect(element).toHaveClass('va-nav-breadcrumbs--mobile');
  });
});
