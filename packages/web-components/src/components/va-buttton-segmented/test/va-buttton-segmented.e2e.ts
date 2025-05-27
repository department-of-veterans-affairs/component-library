import { newE2EPage } from '@stencil/core/testing';

describe('va-buttton-segmented', () => {
  it('renders a segmented button with text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-buttton-segmented text="Segment 1"></va-buttton-segmented>');
    const element = await page.find('va-buttton-segmented');
    expect(element).toEqualHtml(`
      <va-buttton-segmented class="hydrated" text="Segment 1">
        <mock:shadow-root>
          <button class="va-segmented-button" part="button" aria-pressed="false">
            Segment 1
          </button>
        </mock:shadow-root>
      </va-buttton-segmented>
    `);
  });

  it('renders a selected segment', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-buttton-segmented text="Segment 2" selected></va-buttton-segmented>');
    const button = await page.find('va-buttton-segmented >>> .va-segmented-button--selected');
    expect(button).not.toBeNull();
  });

  it('renders a disabled segment', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-buttton-segmented text="Segment 3" disabled></va-buttton-segmented>');
    const button = await page.find('va-buttton-segmented >>> .va-segmented-button--disabled');
    expect(button).not.toBeNull();
  });
});
