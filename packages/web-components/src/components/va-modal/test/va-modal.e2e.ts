import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-modal', () => {
  let consoleWarnSpy;

  beforeEach(() => {
    // Spy on console.warn and mock its implementation to prevent it from logging to the actual console
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original console.warn after each test
    consoleWarnSpy.mockRestore();
  });

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
            <div class="usa-modal__content va-modal__content">
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

  it('should handle empty focusableChildren array gracefully when no focusable content exists', async () => {
    const page = await newE2EPage();

    // the `forced-modal` removes the close button
    await page.setContent(`
      <va-modal modal-title="No Focusable Content" forced-modal visible>
        <div aria-hidden="true">Non-focusable content</div>
      </va-modal>
    `);

    await page.waitForChanges();

    // Try to find any focused element inside the modal
    const activeTagName = await page.evaluate(() => {
      const modal = document.querySelector('va-modal');
      return modal.shadowRoot.activeElement?.tagName || modal.shadowRoot.querySelector(':focus')?.tagName;
    });

    // Expect that nothing is focused
    expect(activeTagName).toBeFalsy();
  });

  it('should include an aria-label value when label value is passed', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-modal visible label="Test heading">
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    const dialog = await page.find('va-modal >>> div[role="dialog"]');

    expect(dialog.getAttribute('aria-label')).toBe('Test heading');
  });

  it('if values are passed for both label and modal-title props, the label value should take precedence for aria-label', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <h1>Custom Label</h1>
      <va-modal modal-title="Modal Title" visible label="Modal label">
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    const dialog = await page.find('va-modal >>> div[role="dialog"]');

    expect(dialog.getAttribute('aria-label')).toBe('Modal label');
  });

  it('passes an axe check with label prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-modal visible label="Test heading">
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    await axeCheck(page);
  });

  it('passes an axe check with modal-title prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-modal modal-title="Test heading" visible>
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    await axeCheck(page);
  });

  it('should log a console warning when modal-title and label are not set', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-modal visible>
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    await page.waitForChanges();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('<va-modal>: An accessible name for the modal is required. Please provide either a label or modalTitle prop value.'),
    );
  });

  it('should correctly restore focus to button element when modal closes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <button id="outside-button">Outside button</button>
      <va-modal modal-title="Test Modal">
        <p>Modal content</p>
      </va-modal>
    `);

    // Focus on the outside button using page.focus() for native HTML elements
    await page.focus('#outside-button');
    await page.waitForChanges();

    // Open and close the modal
    const modal = await page.find('va-modal');
    await modal.setProperty('visible', true);
    await page.waitForChanges();
    await modal.setProperty('visible', false);
    await page.waitForChanges();

    // Verify focus was restored to the original button
    const activeElement = await page.evaluate(() => document.activeElement?.id);
    expect(activeElement).toBe('outside-button');
  });

  it('should correctly restore focus to va-button element when modal closes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-button id="outside-va-button" text="VA Button"></va-button>
      <va-modal modal-title="Test Modal">
        <p>Modal content</p>
      </va-modal>
    `);

    // Focus on the internal button within the va-button shadow DOM using >>> deep selector
    const internalButton = await page.find('#outside-va-button >>> button');
    await internalButton.focus();
    await page.waitForChanges();

    // Open and close the modal
    const modal = await page.find('va-modal');
    await modal.setProperty('visible', true);
    await page.waitForChanges();
    await modal.setProperty('visible', false);
    await page.waitForChanges();

    // Verify focus was restored to the va-button
    const activeElement = await page.evaluate(() => document.activeElement?.id);
    expect(activeElement).toBe('outside-va-button');
  });
});
