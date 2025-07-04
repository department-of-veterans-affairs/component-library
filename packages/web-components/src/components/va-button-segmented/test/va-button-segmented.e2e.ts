import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

const buttonsData = [
  { label: 'Segment 1', value: 'segment-1' },
  { label: 'Segment 2', value: 'segment-2' },
  { label: 'Segment 3', value: 'segment-3' }
];

const exampleAriaLabel = 'Segmented Button Example.'

describe('va-button-segmented', () => {
  // Suppress console errors during tests
  // This is useful to avoid noise in the test output, especially for expected
  // warnings or errors that are part of the component's design.
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('does not render when no buttons are provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-segmented></va-button-segmented>');

    // Select the component within the page and set buttons property to an empty
    // array.
    await page.$eval('va-button-segmented', (elm: any, exampleAriaLabel) => {
      elm.label = exampleAriaLabel;
      elm.buttons = [];
    }, exampleAriaLabel);

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
    await page.$eval('va-button-segmented', (elm: any, exampleAriaLabel, buttonsData) => {
      elm.label = exampleAriaLabel;
      elm.buttons = buttonsData;
    }, exampleAriaLabel, buttonsData);

    // Wait for the changes to be processed and grab the shadow content
    await page.waitForChanges();
    const shadowContent = await page.$eval('va-button-segmented',
      el => el.shadowRoot.innerHTML.trim(),
    );

    expect(shadowContent.trim()).toEqualHtml(`
      <ul aria-label="Segmented Button Example." class="usa-button-group va-segmented-button">
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="true" data-label="Segment 1" type="button">
            Segment 1
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="false" data-label="Segment 2" type="button">
            Segment 2
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="false" data-label="Segment 3" type="button">
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
    await page.setContent(`
      <va-button-segmented
        label="Segmented Button Example."
        buttons=\'[{ label: "Segment 1", value: "segment-1" },{ label: "Segment 2", value: "segment-2" },{ label: "Segment 3", value: "segment-3" }]\'
      ></va-button-segmented>
    `);
    await axeCheck(page);
  });

  it('respects the selected index', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-button-segmented></va-button-segmented>`);

    // Select the component within the page and set buttons and selected index
    await page.$eval('va-button-segmented', (elm: any, exampleAriaLabel, buttonsData) => {
      elm.label = exampleAriaLabel;
      elm.buttons = buttonsData;
      elm.selected = 1; // Select the second button
    }, exampleAriaLabel, buttonsData);

    // Wait for the changes to be processed and grab the shadow content
    await page.waitForChanges();
    const shadowContent = await page.$eval('va-button-segmented',
      el => el.shadowRoot.innerHTML.trim(),
    );

    expect(shadowContent).toEqualHtml(`
      <ul aria-label="Segmented Button Example." class="usa-button-group va-segmented-button">
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="false" data-label="Segment 1" type="button">
            Segment 1
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="true" data-label="Segment 2" type="button">
            Segment 2
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="false" data-label="Segment 3" type="button">
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
    await page.$eval('va-button-segmented', (elm: any, exampleAriaLabel, buttonsData) => {
      elm.label = exampleAriaLabel;
      elm.buttons = buttonsData;
      elm.selected = 5; // Out of bounds index
    }, exampleAriaLabel, buttonsData);

    // Wait for the changes to be processed and grab the shadow content
    await page.waitForChanges();
    const shadowContent = await page.$eval('va-button-segmented',
      el => el.shadowRoot.innerHTML.trim(),
    );

    expect(shadowContent).toEqualHtml(`
      <ul aria-label="Segmented Button Example." class="usa-button-group va-segmented-button">
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="true" data-label="Segment 1" type="button">
            Segment 1
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="false" data-label="Segment 2" type="button">
            Segment 2
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="false" data-label="Segment 3" type="button">
            Segment 3
          </button>
        </li>
      </ul>
    `.trim());
  });

  it('passes an axe check with a long label', async () => {
    // create a new puppeteer page
    // load the page with html content
    const page = await newE2EPage();
    await page.setContent(`
      <va-button-segmented
        label="Segmented Button Example."
        buttons=\'[{ label: "Super long label that might go here", value: "segment-1" },{ label: "Segment 2", value: "segment-2" },{ label: "Segment 3", value: "segment-3" }]\'
      ></va-button-segmented>
    `);
    await axeCheck(page);
  });

  it('passes an axe check when selected index if specified', async () => {
    // create a new puppeteer page
    // load the page with html content
    const page = await newE2EPage();
    await page.setContent(
      `<va-button-segmented
        label="Segmented Button Example."
        buttons=\'[{ label: "Segment 1", value: "segment-1" },{ label: "Segment 2", value: "segment-2" },{ label: "Segment 3", value: "segment-3" }]\'
        selected="1"
      ></va-button-segmented>
    `);
    await axeCheck(page);
  });

  it('renders a maximum of four buttons', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-button-segmented></va-button-segmented>`);

    // Select the component within the page and set buttons property to more than four buttons
    const longButtonsData = [
      { label: 'Segment 1', value: 'segment-1' },
      { label: 'Segment 2', value: 'segment-2' },
      { label: 'Segment 3', value: 'segment-3' },
      { label: 'Segment 4', value: 'segment-4' },
      { label: 'Segment 5', value: 'segment-5' }
    ];

    await page.$eval('va-button-segmented', (elm: any, exampleAriaLabel, longButtonsData) => {
      elm.label = exampleAriaLabel;
      elm.buttons = longButtonsData;
    }, exampleAriaLabel, longButtonsData);

    // Wait for the changes to be processed and grab the shadow content
    await page.waitForChanges();
    const shadowContent = await page.$eval('va-button-segmented',
      el => el.shadowRoot.innerHTML.trim(),
    );

    expect(shadowContent).toEqualHtml(`
      <ul aria-label="Segmented Button Example." class="usa-button-group va-segmented-button">
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="true" data-label="Segment 1" type="button">
            Segment 1
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="false" data-label="Segment 2" type="button">
            Segment 2
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="false" data-label="Segment 3" type="button">
            Segment 3
          </button>
        </li>
        <li class="usa-button-group__item">
          <button class="va-segmented-button__button" aria-pressed="false" data-label="Segment 4" type="button">
            Segment 4
          </button>
        </li>
      </ul>
    `.trim());
  });

  it(`fires click event`, async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-button-segmented></va-button-segmented>`);

    // Select the component within the page and add buttons property to it
    await page.$eval('va-button-segmented', (elm: any, exampleAriaLabel, buttonsData) => {
      elm.label = exampleAriaLabel;
      elm.buttons = buttonsData;
    }, exampleAriaLabel, buttonsData);

    // Wait for the changes to be processed and grab the shadow content
    await page.waitForChanges();
    const clickSpy = await page.spyOnEvent('vaButtonClick');
    const button = await page.findAll('va-button-segmented >>> button');
    await button[1].click();
    expect(clickSpy).toHaveReceivedEventTimes(1);
    expect(clickSpy.events[0].detail.value).toEqual('segment-2');
  });

});
