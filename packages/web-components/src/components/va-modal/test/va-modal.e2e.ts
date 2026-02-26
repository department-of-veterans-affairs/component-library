import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-modal', () => {
  let consoleWarnSpy;

  const getModalActiveElementDetails = async (page) => {
    return page.evaluate(() => {
      const modal = document.querySelector('va-modal');
      const shadowRoot = modal?.shadowRoot;
      if (!shadowRoot) {
        return null;
      }

      const active = shadowRoot.activeElement as HTMLElement | null;
      if (!active) {
        return null;
      }

      return {
        ariaLabel: active.getAttribute('aria-label'),
        textContent: active.textContent?.trim(),
      };
    });
  };

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
        <div aria-label="Example Title modal" aria-modal="true" class="usa-modal va-modal" role="dialog">
            <div class="usa-modal__content va-modal__content">
              <button aria-label="Close Example Title modal" class="va-modal-close" type="button">
                <va-icon class="hydrated"></va-icon>
              </button>
              <div class="usa-modal__main va-modal__main">
                <div role="document">
                  <h2 class="usa-modal__heading va-modal__heading" id="heading" tabindex="-1">
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

    const focusedElement = await getModalActiveElementDetails(page);

    expect(focusedElement?.ariaLabel).toEqual(
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

    const focusedElement = await getModalActiveElementDetails(page);

    expect(focusedElement?.textContent).toEqual('Example Title');
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
    const focusedElement = await getModalActiveElementDetails(page);
    expect(focusedElement?.ariaLabel).toEqual(
      'Close Example Title modal',
    );

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');

    // Shift + tab x2 returns to close button
    const shiftTabElement = await getModalActiveElementDetails(page);
    expect(shiftTabElement?.ariaLabel).toEqual(
      'Close Example Title modal',
    );

    // Try to tab outside of the modal, it will return focus to the close button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const tab2Element = await getModalActiveElementDetails(page);
    expect(tab2Element?.ariaLabel).toEqual(
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

  it('should trap focus when modal contains va-link with va-icon', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-modal modal-title="Example Title" visible>
        <p>Modal content</p>
        <va-link
          download
          filetype="PDF"
          href="#"
          text="Download Form"
        ></va-link>
      </va-modal>
    `);

    await page.waitForChanges();

    // Start with focus on the close button
    const focusedElement = await getModalActiveElementDetails(page);
    expect(focusedElement?.ariaLabel).toEqual(
      'Close Example Title modal',
    );

    // Tab to va-link
    await page.keyboard.press('Tab');
    await page.waitForChanges();

    // Verify focus is on va-link's inner anchor
    const vaLinkFocused = await page.evaluate(() => {
      const vaLink = document.querySelector('va-link');
      const innerAnchor = vaLink?.shadowRoot?.querySelector('a');
      return document.activeElement === vaLink &&
             vaLink?.shadowRoot?.activeElement === innerAnchor;
    });
    expect(vaLinkFocused).toBe(true);

    // Tab again should wrap back to close button (focus trap)
    await page.keyboard.press('Tab');
    await page.waitForChanges();

    const wrappedElement = await getModalActiveElementDetails(page);
    expect(wrappedElement?.ariaLabel).toEqual(
      'Close Example Title modal',
    );
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

  describe('applyAriaHidden', () => {
    // Helper function to setup modal test
    async function setupModalTest(content: string) {
      const page = await newE2EPage();
      await page.setContent(content);
      const modal = await page.find('va-modal');
      await modal.setProperty('visible', true);
      await page.waitForChanges();
      return { page, modal };
    }

    describe('document-level siblings', () => {
      it('should hide all document-level siblings when modal opens', async () => {
        const { page } = await setupModalTest(`
          <div id="header">Header content</div>
          <div id="main-content">Main content</div>
          <va-modal modal-title="Test Modal">
            <p>Modal content</p>
          </va-modal>
          <div id="footer">Footer content</div>
        `);

        const header = await page.find('#header');
        const mainContent = await page.find('#main-content');
        const footer = await page.find('#footer');

        expect(header.getAttribute('aria-hidden')).toBe('true');
        expect(mainContent.getAttribute('aria-hidden')).toBe('true');
        expect(footer.getAttribute('aria-hidden')).toBe('true');
      });

      it('should remove aria-hidden from siblings when modal closes', async () => {
        const page = await newE2EPage();
        await page.setContent(`
          <div id="header">Header content</div>
          <va-modal modal-title="Test Modal">
            <p>Modal content</p>
          </va-modal>
          <div id="footer">Footer content</div>
        `);

        const modal = await page.find('va-modal');
        await modal.setProperty('visible', true);
        await page.waitForChanges();
        await modal.setProperty('visible', false);
        await page.waitForChanges();

        const header = await page.find('#header');
        const footer = await page.find('#footer');

        expect(header.getAttribute('aria-hidden')).toBeNull();
        expect(footer.getAttribute('aria-hidden')).toBeNull();
      });
    });

    describe('shadow root siblings', () => {
      it('should hide siblings within shadow roots', async () => {
        const { page } = await setupModalTest(`
          <va-card>
            <div id="card-content">Card content</div>
            <va-modal modal-title="Test Modal">
              <p>Modal content</p>
            </va-modal>
          </va-card>
        `);

        const cardContent = await page.find('#card-content');
        //console.log(cardContent)
        expect(cardContent.getAttribute('aria-hidden')).toBe('true');
      });

      it('should hide siblings in nested shadow roots', async () => {
        const { page } = await setupModalTest(`
          <va-file-input label="Upload File">
            <va-modal modal-title="Test Modal">
              <p>Modal content</p>
            </va-modal>
          </va-file-input>
          <va-file-input label="Another Upload">
            <p>Another file input</p>
          </va-file-input>
        `);

        const secondFileInput = await page.$$('va-file-input');
        const ariaHidden = await page.evaluate((el: HTMLElement) => {
          return el.getAttribute('aria-hidden');
        }, secondFileInput[1]);

        expect(ariaHidden).toBe('true');
      });
    });

    describe('light DOM siblings', () => {
      it('should hide light DOM siblings in va-accordion', async () => {
        const { page } = await setupModalTest(`
          <va-accordion>
            <va-accordion-item header="Panel 1">
              <p>Panel 1 content</p>
              <va-modal modal-title="Test Modal">
                <p>Modal content</p>
              </va-modal>
            </va-accordion-item>
            <va-accordion-item header="Panel 2">
              <p>Panel 2 content</p>
            </va-accordion-item>
            <va-accordion-item header="Panel 3">
              <p>Panel 3 content</p>
            </va-accordion-item>
          </va-accordion>
        `);

        // Check sibling accordion items
        const panel2 = await page.find('va-accordion-item[header="Panel 2"]');
        const panel3 = await page.find('va-accordion-item[header="Panel 3"]');

        expect(panel2.getAttribute('aria-hidden')).toBe('true');
        expect(panel3.getAttribute('aria-hidden')).toBe('true');

        // Panel 1 contains the modal, so it should NOT have aria-hidden
        const panel1 = await page.find('va-accordion-item[header="Panel 1"]');
        expect(panel1.getAttribute('aria-hidden')).toBeNull();
      });
    });

    describe('ancestor preservation', () => {
      it('should not apply aria-hidden to any ancestors (DOM and shadow hosts)', async () => {
        const { page } = await setupModalTest(`
          <div id="container">
            <div id="inner-container">
              <va-file-input label="Upload File" id="file-input">
                <va-modal modal-title="Test Modal">
                  <p>Modal content</p>
                </va-modal>
              </va-file-input>
            </div>
          </div>
        `);

        const container = await page.find('#container');
        const innerContainer = await page.find('#inner-container');
        const fileInput = await page.find('#file-input');

        expect(container.getAttribute('aria-hidden')).toBeNull();
        expect(innerContainer.getAttribute('aria-hidden')).toBeNull();
        expect(fileInput.getAttribute('aria-hidden')).toBeNull();
      });

      it('should preserve light DOM containers between shadow boundaries', async () => {
        const { page } = await setupModalTest(`
          <div id="app-root">
            <va-accordion>
              <va-accordion-item header="Section">
                <div class="content-wrapper">
                  <va-modal modal-title="Test Modal">
                    <p>Modal content</p>
                  </va-modal>
                </div>
              </va-accordion-item>
            </va-accordion>
          </div>
        `);

        // The app-root should NOT be hidden (it's an ancestor)
        const appRoot = await page.find('#app-root');
        expect(appRoot.getAttribute('aria-hidden')).toBeNull();

        // The content-wrapper should also NOT be hidden (it's an ancestor)
        const wrapper = await page.find('.content-wrapper');
        expect(wrapper.getAttribute('aria-hidden')).toBeNull();
      });
    });

    describe('complex nested scenarios', () => {
      it('should handle multiple levels of nesting correctly', async () => {
        const { page } = await setupModalTest(`
          <div id="app-root">
            <va-card>
              <va-accordion>
                <va-accordion-item header="Section 1">
                  <va-modal modal-title="Test Modal">
                    <p>Modal content</p>
                  </va-modal>
                </va-accordion-item>
                <va-accordion-item header="Section 2">
                  <p>Other content</p>
                </va-accordion-item>
              </va-accordion>
            </va-card>
            <div id="sidebar">Sidebar content</div>
          </div>
        `);

        // Verify sibling accordion item is hidden
        const section2 = await page.find('va-accordion-item[header="Section 2"]');
        expect(section2.getAttribute('aria-hidden')).toBe('true');

        // Verify ancestors are NOT hidden
        const appRoot = await page.find('#app-root');
        expect(appRoot.getAttribute('aria-hidden')).toBeNull();

        // Verify document-level sibling is hidden
        const sidebar = await page.find('#sidebar');
        expect(sidebar.getAttribute('aria-hidden')).toBe('true');
      });

      it('should handle modal reopening with different aria-hidden states', async () => {
        const page = await newE2EPage();
        await page.setContent(`
          <div id="content-1">Content 1</div>
          <div id="content-2">Content 2</div>
          <va-modal modal-title="Test Modal">
            <p>Modal content</p>
          </va-modal>
        `);

        const modal = await page.find('va-modal');
        const content1 = await page.find('#content-1');
        const content2 = await page.find('#content-2');

        // First open
        await modal.setProperty('visible', true);
        await page.waitForChanges();
        expect(content1.getAttribute('aria-hidden')).toBe('true');
        expect(content2.getAttribute('aria-hidden')).toBe('true');

        // Close
        await modal.setProperty('visible', false);
        await page.waitForChanges();
        expect(content1.getAttribute('aria-hidden')).toBeNull();
        expect(content2.getAttribute('aria-hidden')).toBeNull();

        // Second open
        await modal.setProperty('visible', true);
        await page.waitForChanges();
        expect(content1.getAttribute('aria-hidden')).toBe('true');
        expect(content2.getAttribute('aria-hidden')).toBe('true');
      });
    });

    describe('edge cases', () => {
      it('should handle modal with no siblings', async () => {
        const { page } = await setupModalTest(`
          <div id="container">
            <va-modal modal-title="Test Modal">
              <p>Modal content</p>
            </va-modal>
          </div>
        `);

        // Container should not have aria-hidden (it's an ancestor)
        const container = await page.find('#container');
        expect(container.getAttribute('aria-hidden')).toBeNull();
      });

      it('should handle multiple modals where only one is visible', async () => {
        const { page } = await setupModalTest(`
          <va-modal id="modal-1" modal-title="Modal 1">
            <p>Modal 1 content</p>
          </va-modal>
          <va-modal id="modal-2" modal-title="Modal 2">
            <p>Modal 2 content</p>
          </va-modal>
        `);

        // Modal 2 should have aria-hidden
        const modal2 = await page.find('#modal-2');
        expect(modal2.getAttribute('aria-hidden')).toBe('true');
      });
    });

    describe('cleanup', () => {
      it('should properly cleanup aria-hidden when modal is destroyed', async () => {
        const page = await newE2EPage();
        await page.setContent(`
          <div id="content">Content</div>
          <div id="modal-container">
            <va-modal modal-title="Test Modal" visible>
              <p>Modal content</p>
            </va-modal>
          </div>
        `);

        await page.waitForChanges();

        // Content should be hidden
        let content = await page.find('#content');
        expect(content.getAttribute('aria-hidden')).toBe('true');

        // Remove modal
        await page.evaluate(() => {
          const container = document.querySelector('#modal-container');
          container?.remove();
        });
        await page.waitForChanges();

        // Content should no longer be hidden
        content = await page.find('#content');
        expect(content.getAttribute('aria-hidden')).toBeNull();
      });

      it('should cleanup multiple hideOthers calls', async () => {
        const page = await newE2EPage();
        await page.setContent(`
          <va-accordion>
            <va-accordion-item header="Section 1">
              <va-modal modal-title="Test Modal">
                <p>Modal content</p>
              </va-modal>
            </va-accordion-item>
            <va-accordion-item header="Section 2">
              <p>Other content</p>
            </va-accordion-item>
          </va-accordion>
          <div id="external-content">External content</div>
        `);

        const modal = await page.find('va-modal');

        // Open modal
        await modal.setProperty('visible', true);
        await page.waitForChanges();

        const externalContent = await page.find('#external-content');
        expect(externalContent.getAttribute('aria-hidden')).toBe('true');

        const section2Open = await page.find('va-accordion-item[header="Section 2"]');
        expect(section2Open.getAttribute('aria-hidden')).toBe('true');

        // Close modal
        await modal.setProperty('visible', false);
        await page.waitForChanges();

        // All aria-hidden should be cleaned up
        const externalContentAfter = await page.find('#external-content');
        expect(externalContentAfter.getAttribute('aria-hidden')).toBeNull();

        const section2Closed = await page.find('va-accordion-item[header="Section 2"]');
        expect(section2Closed.getAttribute('aria-hidden')).toBeNull();
      });
    });
  });
});
