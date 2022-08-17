import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-button', () => {
  it('renders a button with text Edit', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit"></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" text="Edit">
      <mock:shadow-root>
        <button type="button" part="button">
          Edit
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('renders a secondary button variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" secondary></va-button>');
    const button = await page.find('va-button >>> button');
    expect((await button.getComputedStyle()).backgroundColor).toEqual(
      'rgb(255, 255, 255)',
    );
  });

  it('renders a big button variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" big></va-button>');
    const button = await page.find('va-button >>> button');
    expect((await button.getComputedStyle()).borderRadius).toEqual('8px');
  });

  it('renders an icon before the button text when back is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button back></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" back>
      <mock:shadow-root>
        <button type="button" part="button">
          <i aria-hidden="true" class="fa fa-angles-left"></i>
          Back
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('renders an icon after the button text when continue is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button continue></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" continue>
      <mock:shadow-root>
        <button type="button" part="button">
          Continue
          <i aria-hidden="true" class="fa fa-angles-right"></i>
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('renders a button with an aria label of Edit John Smith', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button text="Edit" label="Edit John Smith"></va-button>',
    );
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" text="Edit" label="Edit John Smith">
      <mock:shadow-root>
        <button type="button" aria-label="Edit John Smith" part="button">
          Edit
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('renders a submit button', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" submit></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" text="Edit" submit>
      <mock:shadow-root>
        <button type="submit" part="button">
          Edit
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('renders a disabled button', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" disabled></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" text="Edit" disabled>
      <mock:shadow-root>
        <button aria-disabled="true" type="button" part="button">
          Edit
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('ignores text value and displays Continue when continue is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" continue></va-button>');
    const button = await page.find('va-button >>> button');
    expect(button.textContent).toEqual('Continue');
  });

  it('ignores text value and displays Back when back is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" back></va-button>');
    const button = await page.find('va-button >>> button');
    expect(button.textContent).toEqual('Back');
  });

  it(`doesn't display icons if both continue and back are true`, async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button back continue></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" back continue>
      <mock:shadow-root>
        <button type="button" part="button">
          Continue
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit"></va-button>');
    await axeCheck(page);
  });

  it('fires analytics event when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit"></va-button>');
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const button = await page.find('va-button >>> button');
    await button.click();
    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-button',
      details: {
        'button-background-color': '#0071bb',
        'button-click-label': 'Edit',
        'button-type': 'primary',
        'event': 'cta-button-click',
      },
    });
  });

  it(`doesn't fire analytics event when clicked and disableAnalytics is true`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button text="Edit" disable-analytics></va-button>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const button = await page.find('va-button >>> button');
    await button.click();
    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it(`doesn't fire click event when disabled is true`, async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" disabled></va-button>');
    const clickSpy = await page.spyOnEvent('click');
    const button = await page.find('va-button >>> button');
    await button.click();
    expect(clickSpy).toHaveReceivedEventTimes(0);
  });

  it('has the correct aria-label when label is given', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button label="Edit dependent" text="Edit"></va-button>',
    );

    const button = await page.find('va-button >>> button');
    expect(button.getAttribute('aria-label')).toEqual('Edit dependent');
  });
});
