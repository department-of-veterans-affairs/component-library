import { newE2EPage } from '@stencil/core/testing';

describe('va-need-help', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-need-help>
        <div slot="content">
          <p>
            Call us at <va-telephone contact="8008271000"></va-telephone>. We're here Monday through Friday, 8:00 a.m to 9:00 p.m ET. If you have hearing loss, call <va-telephone contact="711" tty="true"></va-telephone>.
          </p>
        </div>
      </va-need-help>
    `);
    const element = await page.find('va-need-help');
    expect(element).toEqualHtml(`
      <va-need-help class="hydrated">
        <mock:shadow-root>
          <div class="need-help">
            <h2 id="need-help">Need help?</h2>
            <slot name="content"></slot>
            </div>
        </mock:shadow-root>
        <div slot="content">
          <p>
            Call us at <va-telephone contact="8008271000" class="hydrated"></va-telephone>. We're here Monday through Friday, 8:00 a.m to 9:00 p.m ET. If you have hearing loss, call <va-telephone contact="711" tty="true" class="hydrated"></va-telephone>.
          </p>
        </div>
      </va-need-help>
    `);
  });
});
