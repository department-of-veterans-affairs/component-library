import { newE2EPage } from '@stencil/core/testing';

describe('va-additional-info', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-additional-info></va-additional-info>');

    const element = await page.find('va-additional-info');
    expect(element).toHaveClass('hydrated');
  });

  it('fires an analytics event by default', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-additional-info trigger="Whatever">
        <div>More content</div>
      </va-additional-info>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorEl = await page.find('va-additional-info >>> a');
    await anchorEl.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'expand',
      componentName: 'va-additional-info',
      details: {
        triggerText: 'Whatever',
      },
    });
  });

  it('does not fire an analytics event when disableAnalytics is set', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-additional-info trigger="Whatever" disable-analytics>
        <div>More content</div>
      </va-additional-info>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const anchorEl = await page.find('va-additional-info >>> a');
    await anchorEl.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });
});
