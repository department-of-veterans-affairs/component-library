import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-notification', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-notification headline="Notification heading"></va-notification>');
    const element = await page.find('va-notification');

    expect(element).toEqualHtml(`
      <va-notification class="hydrated" has-border="" headline="Notification heading">
        <mock:shadow-root>
          <va-card show-shadow="true" class="hydrated show-shadow va-card">
            <div class="va-notification none has-border">
              <i aria-hidden="true" role="img" class="none"></i>
              <div class="body" role="presentation">
                <h3 part="headline">Notification heading</h3>
                <slot name="date"></slot>
                <slot></slot>
              </div>
            </div>
          </va-card>
        </mock:shadow-root>
      </va-notification>
    `);
  });

  it('renders an empty div with a "polite" aria-live tag when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-notification visible="false"></va-notification>');

    const element = await page.find('va-notification');

    expect(element).toEqualHtml(`
      <va-notification class="hydrated" has-border="" visible="false">
        <mock:shadow-root>
          <div aria-live="polite"></div>
        </mock:shadow-root>
      </va-notification>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-notification headline="Some header"><p>Notification content</p></va-notification>`,
    );

    await axeCheck(page);
  });

  it('only shows a close icon if the closeable prop is passed', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-notification>Notification</va-notification>');

    const element = await page.find('va-notification');

    let button = await page.find('va-notification >>> button');
    expect(button).toBeNull();

    element.setProperty('closeable', true);
    await page.waitForChanges();
    button = await page.find('va-notification >>> button');

    expect(button).not.toBeNull();
  });

  it('fires a custom "close" event when the close button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-notification closeable="true">Content inside</va-notification>',
    );

    const closeSpy = await page.spyOnEvent('closeEvent');

    const button = await page.find('va-notification >>> button');
    await button.click();

    expect(closeSpy).toHaveReceivedEventTimes(1);
  });
})
