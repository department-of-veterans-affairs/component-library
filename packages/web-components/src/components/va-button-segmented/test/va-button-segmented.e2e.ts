import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

const buttonsData = [
  { label: 'Segment 1', value: 'segment-1' },
  { label: 'Segment 2', value: 'segment-2' },
  { label: 'Segment 3', value: 'segment-3' }
];

describe('va-button-segmented', () => {
  it('does not render when no buttons are provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-segmented></va-button-segmented>');

    // Select the component within the page and set buttons property to an empty
    // array.
    await page.$eval('va-button-segmented', (elm: any) => {
      elm.buttons = [];
    });

    // Wait for the changes to be processed and grab the shadow content
    await page.waitForChanges();
    const shadowContent = await page.$eval('va-button-segmented',
      el => el.shadowRoot.innerHTML.trim(),
    );

    // Expect the shadow content to be empty since no buttons were provided
    expect(shadowContent).toBe('');
  });

  it('renders with buttons', async () => {
    // create a new puppeteer page
    // load the page with html content
    const page = await newE2EPage();
    await page.setContent(`<va-button-segmented></va-button-segmented>`);

    // Select the component within the page and add buttons property to it
    await page.$eval('va-button-segmented', (elm: any, buttonsData) => {
      elm.buttons = buttonsData;
    }, buttonsData);

    // Wait for the changes to be processed and grab the shadow content
    await page.waitForChanges();
    const shadowContent = await page.$eval('va-button-segmented',
      el => el.shadowRoot.innerHTML.trim(),
    );

    expect(shadowContent.trim()).toEqualHtml(`
      <ul class="usa-button-group va-segmented-button">
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-label="Segment 1" aria-pressed="true" part="button" type="button">
            Segment 1
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-label="Segment 2" aria-pressed="false" part="button" type="button">
            Segment 2
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-label="Segment 3" aria-pressed="false" part="button" type="button">
            Segment 3
          </button>
        </li>
      </ul>
    `.trim());
  });

  it('passes an axe check', async () => {
    // create a new puppeteer page
    // load the page with html content
    const page = await newE2EPage();
    await page.setContent(`<va-button-segmented></va-button-segmented>`);

    // Select the component within the page and add buttons property to it
    await page.$eval('va-button-segmented', (elm: any, buttonsData) => {
      elm.buttons = buttonsData;
    }, buttonsData);

    await page.waitForChanges();

    await axeCheck(page);
  });

  it('respects the selected index', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-button-segmented></va-button-segmented>`);

    // Select the component within the page and set buttons and selected index
    await page.$eval('va-button-segmented', (elm: any, buttonsData) => {
      elm.buttons = buttonsData;
      elm.selected = 1; // Select the second button
    }, buttonsData);

    // Wait for the changes to be processed and grab the shadow content
    await page.waitForChanges();
    const shadowContent = await page.$eval('va-button-segmented',
      el => el.shadowRoot.innerHTML.trim(),
    );

    expect(shadowContent).toEqualHtml(`
      <ul class="usa-button-group va-segmented-button">
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-label="Segment 1" aria-pressed="false" part="button" type="button">
            Segment 1
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-label="Segment 2" aria-pressed="true" part="button" type="button">
            Segment 2
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-label="Segment 3" aria-pressed="false" part="button" type="button">
            Segment 3
          </button>
        </li>
      </ul>
    `.trim());
  });

  it('defaults to the first button when selected index is out of bounds', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-button-segmented></va-button-segmented>`);

    // Select the component within the page and set buttons and an out-of-bounds selected index
    await page.$eval('va-button-segmented', (elm: any, buttonsData) => {
      elm.buttons = buttonsData;
      elm.selected = 5; // Out of bounds index
    }, buttonsData);

    // Wait for the changes to be processed and grab the shadow content
    await page.waitForChanges();
    const shadowContent = await page.$eval('va-button-segmented',
      el => el.shadowRoot.innerHTML.trim(),
    );

    expect(shadowContent).toEqualHtml(`
      <ul class="usa-button-group va-segmented-button">
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-label="Segment 1" aria-pressed="true" part="button" type="button">
            Segment 1
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-label="Segment 2" aria-pressed="false" part="button" type="button">
            Segment 2
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-label="Segment 3" aria-pressed="false" part="button" type="button">
            Segment 3
          </button>
        </li>
      </ul>
    `.trim());
  });
});
