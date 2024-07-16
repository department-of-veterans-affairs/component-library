import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-modal modal-title="Example Title" visible>
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    const element = await page.find('va-modal');
    expect(element).toEqualHtml(`
      <va-modal class="hydrated" modal-title="Example Title" visible="">
        <mock:shadow-root>
        <div aria-label="Example Title modal" aria-modal="true" class="usa-modal" role="dialog">
            <div class="usa-modal__content">
              <button aria-label="Close Example Title modal" class="first-focusable-child last-focusable-child va-modal-close" type="button">
                <va-icon class="hydrated"></va-icon>
              </button>
              <div class="usa-modal__main">
                <div role="document">
                  <h2 class="usa-modal__heading" id="heading" tabindex="-1">
                    Example Title
                  </h2>
                  <div class="usa-prose" id="description">
                    <slot></slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);
  });

  it('passes an axe check when visible', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-modal modal-title="Example Title" visible>
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    await axeCheck(page);
  });

  it('passes an axe check when not visible', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-modal modal-title="Example Title">
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    await axeCheck(page);
  });

  it('should trigger closeEvent using the Escape key when modal is visible', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-modal modal-title="Example Title" visible>
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    const closeEvent = await page.spyOnEvent('closeEvent');
    const component = await page.find('va-modal');
    await component.press('Escape');

    expect(closeEvent).toHaveReceivedEvent();
  });

  it('should not trigger closeEvent using the Escape key when modal is not visible', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-modal modal-title="Example Title">
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    const closeEvent = await page.spyOnEvent('closeEvent');
    const component = await page.find('va-modal');
    await component.press('Escape');

    expect(closeEvent).toHaveReceivedEventTimes(0);
  });

  it('should open with focus assigned to close button', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-modal modal-title="Example Title" visible>
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    const focusedElement = await page.find('va-modal >>> :focus');

    expect(focusedElement.getAttribute('aria-label')).toEqual(
      'Close Example Title modal',
    );
  });

  it('should open with focus assigned to given selector', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-modal modal-title="Example Title" visible initial-focus-selector=".usa-modal__heading">
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    const focusedElement = await page.find('va-modal >>> :focus');

    expect(focusedElement.textContent).toEqual('Example Title');
  });

  it('should prevent tabbing outside of the modal', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <input id="pre-modal-checkbox" type="checkbox" />
      <va-modal modal-title="Example Title" visible>
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
        <va-checkbox id="internal-checkbox" label="test checkbox" />
      </va-modal>
      <input id="post-modal-checkbox" type="checkbox" />
    `);

    // Start with focus on the close button
    const focusedElement = await page.find('va-modal >>> :focus');
    expect(focusedElement.getAttribute('aria-label')).toEqual(
      'Close Example Title modal',
    );

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');

    // Shift + tab x2 returns to close button
    const shiftTabElement = await page.find('va-modal >>> :focus');
    expect(shiftTabElement.getAttribute('aria-label')).toEqual(
      'Close Example Title modal',
    );

    // Try to tab outside of the modal, it will return focus to the close button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const tab2Element = await page.find('va-modal >>> :focus');
    expect(tab2Element.getAttribute('aria-label')).toEqual(
      'Close Example Title modal',
    );
  });

  it('fires a single analytics event when va-modal displays', async () => {
    const page = await newE2EPage();
    await page.setContent(
    `<va-modal modal-title="Example Title" status="info" primary-button-text="Primary button" secondary-button-text="Secondary button">
      <p>Example modal content</p>
    </va-modal>`,
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const modal = await page.find("va-modal");

    await modal.setProperty("visible", true);
    await page.waitForChanges()

    expect(analyticsSpy).toHaveReceivedEventTimes(1);
    expect(analyticsSpy).toHaveReceivedEventDetail({
      componentName: 'va-modal',
      action: 'show',
      details: {
        status: 'info',
        title: 'Example Title',
        primaryButtonText: "Primary button",
        secondaryButtonText: "Secondary button"
      },
    });
  });

  it('fires a single analytics event for each button clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-modal modal-title="Example Title" visible status="info" primary-button-text="Primary button" secondary-button-text="Secondary button">
      <p>Example modal content</p>
    </va-modal>`,
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const primaryButton = await page.find('va-modal >>> va-button');
    const secondaryButton = await page.find('va-modal >>> va-button[secondary]');

    await primaryButton.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);
    expect(analyticsSpy).toHaveReceivedEventDetail({
      componentName: 'va-modal',
      action: 'click',
      details: {
        status: 'info',
        title: 'Example Title',
        clickLabel: "Primary button",
      },
    });

    await secondaryButton.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(2);
    expect(analyticsSpy).toHaveReceivedEventDetail({
      componentName: 'va-modal',
      action: 'click',
      details: {
        status: 'info',
        title: 'Example Title',
        clickLabel: "Secondary button",
      },
    });
  });
});
