import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-details label="Details label"></va-details>',
    );

    const element = await page.find('va-details');

    expect(element).toEqualHtml(`
      <va-details label="Details label" class="hydrated">
        <mock:shadow-root>
          <details class="va-details">
            <summary class="va-details__summary">
              <va-icon class="hydrated va-details__icon"></va-icon>
              Details label
            </summary>
            <div class="va-details__content">
              <slot></slot>
            </div>
          </details>
        </mock:shadow-root>
      </va-details>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-details label="Details label">
        <div>
          Details content
        </div>
      </va-details>`,
    );

    await axeCheck(page);
  });

  it('passes an axe check when open', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-details label="Details label" open>
        Details content
      </va-details>`,
    );

    await axeCheck(page);
  });

  it('opens and closes when the summary is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-details label="Details label">
        Details content
      </va-details>`,
    );

    const detailsEl = await page.find('va-details >>> details');
    const summaryEl = await page.find('va-details >>> summary');

    expect(detailsEl).not.toHaveAttribute('open');

    await summaryEl.click();

    await page.waitForChanges();

    expect(detailsEl).toHaveAttribute('open');

    await page.waitForChanges();

    await summaryEl.click();

    expect(detailsEl).not.toHaveAttribute('open');
  });

  it('is open on render when the open prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-details label="Details label" open>
        Details content
      </va-details>`,
    );

    const detailsEl = await page.find('va-details >>> details');

    expect(detailsEl).toHaveAttribute('open');
  });

  it('does not render if the label prop is not provided', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-details>
        Details content
      </va-details>`,
    );

    const detailsEl = await page.find('va-details >>> details');

    expect(detailsEl).toBeNull();
  });

  it('adds a class to the content container when the first slotted node is an element', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-details label="Details label">
        <div>Details content</div>
      </va-details>`,
    );

    // Wait until slotchange-driven class update has happened
    await page.waitForFunction(() => {
      const host = document.querySelector('va-details');
      const content = host?.shadowRoot?.querySelector('.va-details__content');
      return content?.classList.contains('va-details__content--element-child');
    });

    const contentContainer = await page.find('va-details >>> .va-details__content');
    expect(contentContainer.classList.contains('va-details__content--element-child')).toBe(true);
  });

  it('adds a class for xl width when the width prop is set to xl', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-details label="Details label" width="xl">
        Details content
      </va-details>`,
    );

    const detailsEl = await page.find('va-details >>> details');
    expect(detailsEl.classList.contains('va-details--width-xl')).toBe(true);
  });

  it('adds a class for 2xl width when the width prop is set to 2xl', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-details label="Details label" width="2xl">
        Details content
      </va-details>`,
    );

    const detailsEl = await page.find('va-details >>> details');
    expect(detailsEl.classList.contains('va-details--width-2xl')).toBe(true);
  });

  it('emits an analytics event when the summary is clicked and disableAnalytics is not true', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-details label="Details label">
        Details content
      </va-details>`,
    );

    const summaryEl = await page.find('va-details >>> summary');

    const analyticsEventSpy = page.waitForEvent('component-library-analytics');

    await summaryEl.click();

    const analyticsEvent = await analyticsEventSpy;

    expect(analyticsEvent.detail).toEqual({
      componentName: 'va-details',
      action: 'summary-click',
      details: { open: true },
    });
  });
});
