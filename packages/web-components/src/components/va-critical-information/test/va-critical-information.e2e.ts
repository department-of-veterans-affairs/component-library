import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-critical-information', () => {
  async function setupComponent({
    link = 'https://www.va.gov/disability',
    text = 'Submit your documents by July 25, 2025',
  } = {}) {
    const page = await newE2EPage();
    await page.setContent(
      `<va-critical-information></va-critical-information>`,
    );

    const elementHandle = await page.$('va-critical-information');

    await page.evaluate(
      (el, props) => {
        el.link = props.link;
        el.text = props.text;
      },
      elementHandle,
      { link, text },
    );

    await page.waitForChanges();
    return { page, elementHandle };
  }

  it('renders correctly with required props', async () => {
    const { page, elementHandle } = await setupComponent();

    await page.waitForSelector('va-critical-information');
    await page.waitForChanges();

    const isHydrated = await page.evaluate(
      el => el.classList.contains('hydrated'),
      elementHandle,
    );
    expect(isHydrated).toBe(true);

    const shadowInnerHTML = await page.evaluate(
      el => el.shadowRoot.innerHTML,
      elementHandle,
    );

    expect(shadowInnerHTML.replace(/\s+/g, ' ')).toEqualHtml(`
      <div class="critical-info">
        <a 
          href="https://www.va.gov/disability"
          class="action-link"
          aria-label="Action required: Submit your documents by July 25, 2025"
        >
          <div class="text-and-chevron">
            <span class="link-text">Submit your documents by July 25, 2025</span>
            <va-icon class="link-icon hydrated"></va-icon>
          </div>
        </a>
      </div>
    `);
  });

  it('does not render if no link or text is provided', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-critical-information></va-critical-information>`,
    );

    const elementHandle = await page.$('va-critical-information');
    await page.evaluate(el => {
      el.link = null;
      el.text = null;
    }, elementHandle);

    await page.waitForChanges();

    const shadowContent = await page.evaluate(
      el => el.shadowRoot.innerHTML.trim(),
      elementHandle,
    );

    expect(shadowContent).toBe('');
  });

  it('passes an axe check', async () => {
    const { page } = await setupComponent();
    await axeCheck(page);
  });
});