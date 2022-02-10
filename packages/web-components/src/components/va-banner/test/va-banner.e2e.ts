import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-banner></va-banner>');
    const element = await page.find('va-banner');

    expect(element).toEqualHtml(`
     <va-banner class="hydrated" data-e2e-id="emergency-banner">
       <mock:shadow-root>
         <va-alert class="hydrated" full-width="" status="info">
           <h3 slot="headline"></h3>
           <slot></slot>
         </va-alert>
        </mock:shadow-root>
      </va-banner>
    `);
  });

  it('renders an empty shadow root when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-banner visible="false"></va-banner>');
    const element = await page.find('va-banner');

    expect(element).toEqualHtml(`
      <va-banner class="hydrated" visible="false">
        <mock:shadow-root></mock:shadow-root>
      </va-banner>
    `);
  });

  it('renders an shadow root div when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-banner visible="false"></va-banner>');
    const element = await page.find('va-banner');

    expect(element).toEqualHtml(`
      <va-banner class="hydrated" visible="false">
        <mock:shadow-root></mock:shadow-root>
      </va-banner>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-banner headline="This is a test">Test Content<a href="#">Test Link</a></va-banner>`,
    );
    await axeCheck(page);
  });

  it('only shows a close icon if the showClose prop is passed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-banner headline="This is a test">Test Content</va-banner>',
    );

    const element = await page.find('va-banner');

    let vaAlert = await page.find('va-banner >>> va-alert');
    let button = vaAlert.shadowRoot.querySelector('button');
    expect(button).toBeNull();

    element.setProperty('showClose', true);
    await page.waitForChanges();
    vaAlert = await page.find('va-banner >>> va-alert');
    button = vaAlert.shadowRoot.querySelector('button');
    expect(button).not.toBeNull();
  });

  it('fires an analytics event when a link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-banner headline="This is a test">Test Content<a href="#">Test Link</a></va-banner>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const link = await page.find('va-banner a');
    await link.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      componentName: 'Banner',
      action: 'linkClick',
      details: {
        clickLabel: 'Test Link',
        headline: 'This is a test',
        showClose: false,
        type: 'info',
      },
    });
  });
});
