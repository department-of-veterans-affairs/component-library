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
      <va-modal aria-label="Example Title modal" aria-modal="true" class="hydrated va-modal" modal-title="Example Title" role="dialog" visible>
        <mock:shadow-root>
          <div class="va-modal-inner" tabindex="-1">
            <div>
              <button aria-label="Close Example Title modal" class="va-modal-close" type="button">
                <i aria-hidden="true"></i>
              </button>
            </div>
            <div class="va-modal-body">
              <div role="document">
                <h1 class="va-modal-title" tabindex="-1">
                  Example Title
                </h1>
                <slot></slot>
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
      <va-modal modal-title="Example Title" visible initial-focus-selector=".va-modal-title">
        <p>
          A modal may pass any React nodes as children to be displayed within it.
        </p>
      </va-modal>
    `);

    const focusedElement = await page.find('va-modal >>> :focus');

    expect(focusedElement.textContent).toEqual('Example Title');
  });
});
