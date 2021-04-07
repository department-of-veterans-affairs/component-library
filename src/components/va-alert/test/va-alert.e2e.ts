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

  it('renders an empty div with a "polite" aria-live tag when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-alert visible="false"></va-alert>');
    const element = await page.find('va-alert');

    expect(element).toEqualHtml(`
      <va-alert class="hydrated" visible="false">
        <mock:shadow-root>
          <div aria-live="polite"></div>
        </mock:shadow-root>
      </va-alert>
    `);
  });

  it('wraps the headline in a header element', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert headline="This is an alert"></va-alert>');

    const body = await page.find('va-alert >>> div.body');

    expect(body).toEqualHtml(`
      <div class="body">
        <h3>
          This is an alert
        </h3>
        <slot></slot>
      </div>
    `);
  });

  it('allows the heading level to be changed', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-alert headline="Changed the level" level="4"></va-alert>',
    );
    const body = await page.find('va-alert >>> div.body');

    expect(body).toEqualHtml(`
      <div class="body">
        <h4>
          Changed the level
        </h4>
        <slot></slot>
      </div>
    `);
  });
});
