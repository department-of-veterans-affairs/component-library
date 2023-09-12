import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-checkbox-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox-group></va-checkbox-group>');

    const element = await page.find('va-checkbox-group');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-checkbox-group>
        <va-checkbox label="Option one" value="1"></va-checkbox>
        <va-checkbox label="Option 2" value="2"></va-checkbox>
        <va-checkbox label="Option 3" value="3"></va-checkbox>
      </va-checkbox-group>
    `,
    );

    await axeCheck(page);
  });

  it('renders an error message if passed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox-group error="This is an error"></va-checkbox-group>',
    );

    const element = await page.find('va-checkbox-group >>> #error-message');
    expect(element).toEqualHtml(`
     <span id="error-message" role="alert">
       <span class="sr-only">error</span>
       This is an error
     </span>
    `);
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox-group hint="This is hint text" />');

    // Render the hint text
    const hintTextElement = await page.find('va-checkbox-group >>> span.hint-text');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('passes an axe check in error state', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-checkbox-group error="There has been an error" label="This is a label">
        <va-checkbox label="Option one" name="example" value="1"/>
        <va-checkbox label="Option two" name="example" value="2"/>
      </va-checkbox-group>
    `,
    );

    await axeCheck(page);
  });

  it('renders a required span based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox-group required></va-checkbox-group>');

    const element = await page.find('va-checkbox-group >>> .required');
    expect(element).toEqualHtml(`
      <span class="required">
        required
      </span>
    `);
  });

  it('fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-checkbox-group label="Regular label" enable-analytics>
        <va-checkbox label="First option" value="one"></va-checkbox>
      </va-checkbox-group>
      `);
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-checkbox');
    await inputEl.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-checkbox-group',
      details: {
        label: 'Regular label',
        optionLabel: 'First option',
        required: false,
      },
    });
  });

  it("doesn't fire an analytics event by default", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-checkbox-group label="Regular label">
        <va-checkbox label="First option" value="one"></va-checkbox>
      </va-checkbox-group>
      `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-checkbox');
    await inputEl.click();
    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('checks option when using the space key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-checkbox-group>
        <va-checkbox label="Option 1" value="1"></va-checkbox>
        <va-checkbox label="Option 2" value="2"></va-checkbox>
      </va-checkbox-group>
    `,
    );
    const options = await page.findAll('va-checkbox >>> input');

    await options[0].press('Space');

    expect(await options[0].getProperty('checked')).toBeTruthy();
  });

  it('renders H3 header in legend if included', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox-group label="Testing H3" label-header-level="3" />');

    const legend = await page.find('va-checkbox-group >>> legend');
    expect(legend).toEqualHtml(`
    <legend>
      <h3 part="header">Testing H3</h3>
    </legend>
  `);
  });

  it('renders H5 header in legend if included', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox-group label="Testing H5" label-header-level="5" required></va-checkbox-group>');

    const legend = await page.find('va-checkbox-group >>> legend');
    expect(legend).toEqualHtml(`
      <legend>
        <h5 part="header">Testing H5</h5>
        <span class="required">
          required
        </span>
      </legend>
 `);
  });

  it('renders legend text and ignores adding a header if an invalid level is included', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox-group label="Testing" label-header-level="7" required></va-checkbox-group>');

    const legend = await page.find('va-checkbox-group >>> legend');
    expect(legend).toEqualHtml(`
      <legend>
        Testing
        <span class="required">
          required
        </span>
      </legend>
   `);
  });


  // Begin USWDS v3 variation tests

  it('uswds v3 renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox-group uswds></va-checkbox-group>');

    const element = await page.find('va-checkbox-group');
    expect(element).toHaveClass('hydrated');
  });

  it('uswds v3 passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-checkbox-group uswds>
        <va-checkbox uswds label="Option one" value="1"></va-checkbox>
        <va-checkbox uswds label="Option 2" value="2"></va-checkbox>
        <va-checkbox uswds label="Option 3" value="3" disabled></va-checkbox>
      </va-checkbox-group>
    `,
    );

    await axeCheck(page);
  });

  it('uswds v3 renders an error message if passed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-checkbox-group uswds error="This is an error"></va-checkbox-group>',
    );

    const element = await page.find('va-checkbox-group >>> #checkbox-error-message');
    expect(element).toEqualHtml(`
     <span id="checkbox-error-message" role="alert">
        <span class="usa-sr-only">error</span>
        <span class="usa-error-message">
          This is an error
        </span>
     </span>
    `);
  });

  it('uswds v3 renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox-group uswds hint="This is hint text" />');

    const hintTextElement = await page.find('va-checkbox-group >>> .usa-hint');
    expect(hintTextElement.innerText).toContain('This is hint text');
  });

  it('uswds v3 passes an axe check in error state', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-checkbox-group uswds error="There has been an error" label="This is a label">
        <va-checkbox uswds label="Option one" name="example" value="1"/>
        <va-checkbox uswds label="Option two" name="example" value="2"/>
      </va-checkbox-group>
    `,
    );

    await axeCheck(page);
  });

  it('uswds v3 renders a required span based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox-group uswds required></va-checkbox-group>');

    const element = await page.find('va-checkbox-group >>> .usa-label--required');
    expect(element).toEqualHtml(`
      <span class="usa-label--required">
        required
      </span>
    `);
  });

  it('uswds v3 fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-checkbox-group uswds label="Regular label" enable-analytics>
        <va-checkbox uswds label="First option" value="one"></va-checkbox>
      </va-checkbox-group>
      `);
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const checkboxEl = await page.find('va-checkbox >>> .usa-checkbox__label');
    await checkboxEl.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-checkbox-group',
      details: {
        label: 'Regular label',
        optionLabel: 'First option',
        required: false,
      },
    });
  });

  it("uswds v3 doesn't fire an analytics event by default", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-checkbox-group uswds label="Regular label">
        <va-checkbox uswds label="First option" value="one"></va-checkbox>
      </va-checkbox-group>
      `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-checkbox >>> .usa-checkbox__label');
    await inputEl.click();
    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('uswds v3 checks option when using the space key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-checkbox-group uswds>
        <va-checkbox uswds label="Option 1" value="1"></va-checkbox>
        <va-checkbox uswds label="Option 2" value="2"></va-checkbox>
      </va-checkbox-group>
    `,
    );
    const options = await page.findAll('va-checkbox >>> input');

    await options[0].press('Space');

    expect(await options[0].getProperty('checked')).toBeTruthy();
  });

  it('uswds v3 renders H3 header in legend if included', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox-group uswds label="Testing H3" label-header-level="3" />');

    const legend = await page.find('va-checkbox-group >>> legend');
    expect(legend).toEqualHtml(`
    <legend class="usa-legend">
      <h3 part="header">Testing H3</h3>
    </legend>
  `);
  });

  it('renders H5 header in legend if included', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox-group uswds label="Testing H5" label-header-level="5" required></va-checkbox-group>');

    const legend = await page.find('va-checkbox-group >>> legend');
    expect(legend).toEqualHtml(`
      <legend class="usa-legend">
        <h5 part="header">Testing H5</h5>
        <span class="usa-label--required">
          required
        </span>
      </legend>
 `);
  });

  it('renders legend text and ignores adding a header if an invalid level is included', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-checkbox-group uswds label="Testing" label-header-level="7" required></va-checkbox-group>');

    const legend = await page.find('va-checkbox-group >>> legend');
    expect(legend).toEqualHtml(`
      <legend class="usa-legend">
        Testing
        <span class="usa-label--required">
          required
        </span>
      </legend>
   `);
  });

});
