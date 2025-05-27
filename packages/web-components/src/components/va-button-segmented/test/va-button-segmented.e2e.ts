import { newE2EPage } from '@stencil/core/testing';

describe('va-button-segmented', () => {
  it('renders a segmented button with text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-segmented text="Segment 1"></va-button-segmented>');
    const element = await page.find('va-button-segmented');
    expect(element).toEqualHtml(`
      <va-button-segmented class="hydrated" text="Segment 1">
        <mock:shadow-root>
          <button class="va-segmented-button" part="button" aria-pressed="false">
            Segment 1
          </button>
        </mock:shadow-root>
      </va-button-segmented>
    `);
  });

  it('renders a selected segment', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-segmented text="Segment 2" selected></va-button-segmented>');
    const button = await page.find('va-button-segmented >>> .va-segmented-button--selected');
    expect(button).not.toBeNull();
  });

  it('renders a disabled segment', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-segmented text="Segment 3" disabled></va-button-segmented>');
    const button = await page.find('va-button-segmented >>> .va-segmented-button--disabled');
    expect(button).not.toBeNull();
  });
});
