import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-notification', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-notification></va-notification>');
    const element = await page.find('va-notification');

    expect(element).toEqualHtml(`
      <va-notification class="hydrated">
        <mock:shadow-root>
          <va-card show-shadow="" class="hydrated">
            <div class="va-notification none" role="alert">
              <i aria-hidden="true" role="img" class="none"></i>
              <div class="body" role="presentation">
                <slot></slot>
              </div>
            </div>
          </va-card>
        </mock:shadow-root>
      </va-notification>
    `);
  });
})
