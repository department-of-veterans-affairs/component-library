import { newE2EPage } from '@stencil/core/testing';

describe('va-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-alert></va-alert>');
    const element = await page.find('va-alert');

    expect(element).toEqualHtml(`
      <va-alert class="hydrated">
        <mock:shadow-root>
          <div class="alert info">
            <i aria-hidden="true" role="img"></i>
            <span class="sr-only">Alert:</span>
            <div class="body">
              <div class="text">
                <slot></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </va-alert>
    `);
  });

  it('renders an empty div with a "polite" aria-live tag when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-alert visible="false"></va-alert>');
    const element = await page.find('va-alert');

    expect(element).toEqualHtml(`
      <va-alert class="hydrated" visible="false">
        <mock:shadow-root>
          <div aria-live="polite"></div>
        </mock:shadow-root>
      </va-alert>
    `);
  });

  it('wraps the headline in a header element', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert headline="This is an alert"></va-alert>');

    const body = await page.find('va-alert >>> div.body');

    expect(body).toEqualHtml(`
      <div class="body">
        <h3>
          This is an alert
        </h3>
        <div class="text">
          <slot></slot>
        </div>
      </div>
    `);
  });

  it('allows the heading level to be changed', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-alert headline="Changed the level" level="4"></va-alert>',
    );
    const body = await page.find('va-alert >>> div.body');

    expect(body).toEqualHtml(`
      <div class="body">
        <h4>
          Changed the level
        </h4>
        <div class="text">
          <slot></slot>
        </div>
      </div>
    `);
  });

  it('only shows a close icon if the closeable prop is passed', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert>Alert</va-alert>');

    const element = await page.find('va-alert');

    let button = await page.find('va-alert >>> button');
    expect(button).toBeNull();

    element.setProperty('closeable', true);
    await page.waitForChanges();
    button = await page.find('va-alert >>> button');

    expect(button).not.toBeNull();
  });

  it('fires a custom "close" event when the close button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert closeable="true">Content inside</va-alert>',
    );

    const closeSpy = await page.spyOnEvent('close');

    const button = await page.find('va-alert >>> button');
    await button.click();

    expect(closeSpy).toHaveReceivedEventTimes(1);
  });

  it('fires an analytics event when a link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert><a href="#">This is a link</a></va-alert>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const link = await page.find('va-alert a');
    await link.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'linkClick',
      componentName: 'AlertBox',
      details: {
        backgroundOnly: false,
        clickLabel: 'This is a link',
        status: 'info',
        closeable: false,
      },
    });
  });

  it('does not fire an analytics event when disableAnalytics is passed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert disable-analytics="true"><a href="#">This is a link</a></va-alert>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const link = await page.find('va-alert a');
    await link.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });
});
