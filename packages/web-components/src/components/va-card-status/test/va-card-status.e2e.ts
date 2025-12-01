import { newE2EPage } from '@stencil/core/testing';

describe('<va-card-status />', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-card-status></va-card-status>');
    const element = await page.find('va-card-status');

    expect(element).toEqualHtml(`
    <va-card-status class="hydrated" error="" tag-status="informational">
      <mock:shadow-root>
        <div class="va-card-status__wrapper" aria-labelledby="card-title">
          <va-card class="hydrated">
          <mock:shadow-root>
            <div>
              <header>
                <slot name="header"></slot>
              </header>
              <div>
                <slot name="subHeader"></slot>
              </div>
              <span id="card-status-error-message" role="alert"></span>
              <slot></slot>
              <footer>
                <slot name="footer"></slot>
              </footer>
            </div>
             </mock:shadow-root>
          </va-card>
        </div>
      </mock:shadow-root>
    </va-card-status>
  `);
  });
});
