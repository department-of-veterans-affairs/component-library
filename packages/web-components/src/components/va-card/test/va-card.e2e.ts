import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-card></va-card>');
    const element = await page.find('va-card');

    expect(element).toEqualHtml(`
            <va-card class="hydrated" error="" tag-status="informational">
                <mock:shadow-root>
                    <article>
                        <header>
                            <slot name="header"></slot>
                        </header>
                        <div>
                            <slot name="subHeader"></slot>
                        </div>
                        <span id="input-error-message" role="alert"></span>
                        <slot></slot>
                        <footer>
                            <slot name="footer"></slot>
                        </footer>
                    </article>
                </mock:shadow-root>
            </va-card>
      `);

    expect(element).not.toHaveClass('show-shadow');
  });

  it('displays a box shadow when show-shadow prop is set', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-card show-shadow></va-card>');
    const element = await page.find('va-card');

    expect((await element.getComputedStyle()).boxShadow).toEqual(
      'rgba(0, 0, 0, 0.32) 1px 1px 5px 1px',
    );
  });

  it('displays a gray background when background prop is set', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-card background></va-card>');
    const element = await page.find('va-card');

    // --color-gray-lightest which is #f0f0f0 and also rgb(240, 240, 240)
    expect((await element.getComputedStyle()).backgroundColor).toEqual(
      'rgb(240, 240, 240)',
    );
  });

  it('displays a white background when show-shadow and background is set', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-card show-shadow background></va-card>');
    const element = await page.find('va-card');

    expect((await element.getComputedStyle()).backgroundColor).toEqual(
      'rgb(255, 255, 255)',
    );
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<va-card><h3>Card</h3><p>Card content</p></va-card>`,
    );

    await axeCheck(page);
  });

  it('renders an icon in a blue circle when icon-name is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-card icon-name="check"></va-card>');
    const iconWrapper = await page.find('va-card >>> .va-card__icon-wrapper');
    const iconCircle = await page.find('va-card >>> .va-card__icon-circle');
    const vaIcon = await page.find('va-card >>> va-icon');
    expect(iconWrapper).not.toBeNull();
    expect(iconCircle).not.toBeNull();
    expect(vaIcon).not.toBeNull();
    expect(vaIcon).toHaveClass('hydrated');
  });

  it('renders heading text and tag status', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-card heading-text="Card Title" tag-text="Warning" tag-status="warning"></va-card>
    `);

    const tagStatus = await page.find('va-card >>> va-tag-status');
    const heading = await page.find('va-card >>> .card-status-header');

    expect(tagStatus).not.toBeNull();
    expect(heading.textContent).toBe('Card Title');
  });

  it('renders correct heading level', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-card heading-text="Test Heading" heading-level="2"></va-card>`,
    );

    const h2 = await page.find('va-card >>> h2');
    expect(h2).not.toBeNull();
    expect(h2.textContent).toBe('Test Heading');
  });

  it('renders error message when showError is true', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-card error-message="Something went wrong" show-error="true"></va-card>`,
    );

    const alert = await page.find('va-card >>> #input-error-message');
    expect(alert.getAttribute('role')).toBe('alert');

    const errorText = await page.find('va-card >>> .usa-error-message');
    expect(errorText.textContent).toBe('Something went wrong');
  });

  it('does not render error text when showError is false', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-card error-message="Hidden error" show-error="false"></va-card>`,
    );

    const errorText = await page.find('va-card >>> .usa-error-message');
    expect(errorText).toBeNull();
  });

  it('sets and clears the "error" attribute dynamically', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-card></va-card>`);
    const el = await page.find('va-card');

    // Initially no error
    expect(el.getAttribute('error')).toBe('');

    // Update props dynamically
    el.setProperty('errorMessage', 'Missing information');
    el.setProperty('showError', true);
    await page.waitForChanges();
    expect(el.getAttribute('error')).toBe('Missing information');

    // Hide error again
    el.setProperty('showError', false);
    await page.waitForChanges();
    expect(el.getAttribute('error')).toBe('');
  });
});
