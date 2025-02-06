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
        <span class="loading-message" role="status"></span>
        <button class="usa-button" part="button" type="button">
          Edit
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('renders a secondary button variant (usa-button--outline)', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" secondary></va-button>');
    const button = await page.findAll('va-button >>> .usa-button--outline');
    expect(button.length).toBe(1);
  });

  it('renders a big button variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" big></va-button>');
    const button = await page.find('va-button >>> button');
    expect((await button.getComputedStyle()).padding).toEqual('16px 24px');
  });

  it('renders an icon before the button text when back is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button back></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button back="" class="hydrated">
      <mock:shadow-root>
        <span class="loading-message" role="status"></span>
        <button class="usa-button usa-button--outline" type="button" part="button">
          <va-icon class="hydrated"></va-icon>
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
    <va-button continue class="hydrated">
      <mock:shadow-root>
        <span class="loading-message" role="status"></span>
        <button class="usa-button" type="button" part="button">
          Continue
          <va-icon class="hydrated"></va-icon>
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
    <va-button class="hydrated" label="Edit John Smith" text="Edit">
      <mock:shadow-root>
        <span class="loading-message" role="status"></span>
        <button aria-label="Edit John Smith" class="usa-button" part="button" type="button">
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
        <span class="loading-message" role="status"></span>
        <button class="usa-button" type="submit" part="button">
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
        <span class="loading-message" role="status"></span>
        <button class="usa-button" aria-disabled="true" type="button" part="button">
          Edit
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('renders a loading button with default text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button loading></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" loading>
      <mock:shadow-root>
        <span class="loading-message" role="status">Loading</span>
        <button aria-busy="true" class="usa-button" aria-disabled="true" type="button" part="button">
          <va-icon aria-hidden="true" class="hydrated loading-icon"></va-icon>
          Loading...
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('renders a loading button with prop text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button loading text="Retrieving Data"></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" loading text="Retrieving Data">
      <mock:shadow-root>
        <span class="loading-message" role="status">Loading</span>
        <button aria-busy="true" class="usa-button" aria-disabled="true" type="button" part="button">
          <va-icon aria-hidden="true" class="hydrated loading-icon"></va-icon>
          Retrieving Data
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('Changes status text on loading prop change', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button loading text="Retrieving Data"></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" loading text="Retrieving Data">
      <mock:shadow-root>
        <span class="loading-message" role="status">Loading</span>
        <button aria-busy="true" class="usa-button" aria-disabled="true" type="button" part="button">
          <va-icon aria-hidden="true" class="hydrated loading-icon"></va-icon>
          Retrieving Data
        </button>
      </mock:shadow-root>
    </va-button>
    `);
    element.setAttribute('loading', 'false');
    await page.waitForChanges();
    const loadingMessageEl = await element.shadowRoot.querySelector('span.loading-message');
    expect(loadingMessageEl.innerHTML).toEqual('Loading complete');
  });

  it('displays Continue when continue is true and text is not provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button continue></va-button>');
    const button = await page.find('va-button >>> button');
    expect(button.textContent).toEqual('Continue');
  });

  it('displays custom text value when continue is true and text is provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Save and continue" continue></va-button>');
    const button = await page.find('va-button >>> button');
    expect(button.textContent).toEqual('Save and continue');
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
        <span class="loading-message" role="status"></span>
        <button class="usa-button usa-button--outline" type="button" part="button">
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
        label: 'Edit',
        type: 'primary',
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

  it(`doesn't fire click event when loading is true`, async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" loading></va-button>');
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

  it('renders a button with an optional screen reader description', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button text="Edit" message-aria-describedby="Button description."></va-button>',
    );

    const descriptionSpan = await page.find(
      'va-button >>> #button-description',
    );
    expect(descriptionSpan).not.toBeNull();
    expect(descriptionSpan.textContent).toBe('Button description.');
  });

  it('renders a default submit button variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button submit text="Submit"></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" submit="" text="Submit">
      <mock:shadow-root>
        <span class="loading-message" role="status"></span>
        <button class="usa-button" type="submit" part="button">
          Submit
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });
  
  it('submits form when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<form onsubmit="e=>{e.preventDefault();}"><va-button submit text="Submit"></va-button></form>');
    const submitSpy = await page.spyOnEvent('submit');
    const button = await page.find('va-button >>> button');
    await button.click();
    await page.waitForChanges();
    expect(submitSpy).toHaveReceivedEventTimes(1);
  });  
});