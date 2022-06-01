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
        <button class="va-button" type="button">
          Edit
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('renders a secondary button variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" secondary></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" text="Edit" secondary>
      <mock:shadow-root>
        <button class="secondary va-button" type="button">
          Edit
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('renders a big button variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" big></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" text="Edit" big>
      <mock:shadow-root>
        <button class="big va-button" type="button">
          Edit
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('renders an icon before the button text when previous is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" previous></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" text="Edit" previous>
      <mock:shadow-root>
        <button class="secondary va-button" type="button">
          <i aria-hidden="true" class="fa fa-angles-left"></i>
          Edit
        </button>
      </mock:shadow-root>
    </va-button>
    `);
  });

  it('renders an icon after the button text when next is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button text="Edit" next></va-button>');
    const element = await page.find('va-button');
    expect(element).toEqualHtml(`
    <va-button class="hydrated" text="Edit" next>
      <mock:shadow-root>
        <button class="va-button" type="button">
          Edit
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
        <button class="va-button" type="button" aria-label="Edit John Smith">
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
        <button class="va-button" type="submit">
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
        <button class="va-button" type="button" disabled>
          Edit
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
      // TODO: update analytics event details
      details: {},
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
});
