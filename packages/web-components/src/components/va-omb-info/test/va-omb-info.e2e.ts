import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-omb-info', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-omb-info exp-date="12/31/2077"></va-omb-info>');

    const element = await page.find('va-omb-info');
    expect(element).toEqualHtml(`
      <va-omb-info class="hydrated" exp-date="12/31/2077">
        <mock:shadow-root>
          <div>
            Expiration date:
            <span>
              12/31/2077
            </span>
          </div>
          <div>
            <va-button class="hydrated"></va-button>
          </div>
          <va-modal class="hydrated">
            <slot></slot>
          </va-modal>
        </mock:shadow-root>
      </va-omb-info>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-omb-info exp-date="12/31/2077"></va-omb-info>');

    await axeCheck(page);
  });
});
