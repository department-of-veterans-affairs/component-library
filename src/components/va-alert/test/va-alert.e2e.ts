import { newE2EPage } from '@stencil/core/testing';

describe('va-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-alert></va-alert>');
    const element = await page.find('va-alert');

    expect(element).toEqualHtml(`
      <va-alert class="hydrated">
        <mock:shadow-root>
          <div class="alert info">
            <div class="body">
              <slot></slot>
            </div>
          </div>
          <button aria-label="Close notification" class="va-alert-close">
            <i aria-label="Close icon" class="fa-times-circle fas"></i>
          </button>
        </mock:shadow-root>
      </va-alert>
    `);
  });
});
