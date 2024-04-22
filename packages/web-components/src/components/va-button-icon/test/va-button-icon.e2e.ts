import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-button', () => {
  it('renders a button with type "change-file"', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button-icon button-type="change-file"></va-button-icon>',
    );
    const element = await page.find('va-button-icon');
    expect(element).toEqualHtml(`
    <va-button-icon button-type="change-file" class="hydrated">
      <mock:shadow-root>
        <button class="usa-button" part="button" type="button">
          <va-icon class="hydrated"></va-icon>
          Change File
        </button>
      </mock:shadow-root>
    </va-button-icon>
    `);

    const svgEl = await page.find('va-button-icon >>> va-icon');
    const iconProp = await svgEl.getProperty('icon');
    expect(iconProp).toMatch('attach_file');
  });

  it('renders a button with type "cancel"', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button-icon button-type="cancel"></va-button-icon>',
    );
    const element = await page.find('va-button-icon');
    expect(element).toEqualHtml(`
    <va-button-icon button-type="cancel" class="hydrated">
      <mock:shadow-root>
        <button class="usa-button va-button-icon--destructive" part="button" type="button">
          <va-icon class="hydrated"></va-icon>
          Cancel
        </button>
      </mock:shadow-root>
    </va-button-icon>
    `);

    const svgEl = await page.find('va-button-icon >>> va-icon');
    const iconProp = await svgEl.getProperty('icon');
    expect(iconProp).toMatch('close');
  });

  it('renders a button with type "delete"', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button-icon button-type="delete"></va-button-icon>',
    );
    const element = await page.find('va-button-icon');
    expect(element).toEqualHtml(`
    <va-button-icon button-type="delete" class="hydrated">
      <mock:shadow-root>
        <button class="usa-button va-button-icon--destructive" part="button" type="button">
          <va-icon class="hydrated"></va-icon>
          Delete
        </button>
      </mock:shadow-root>
    </va-button-icon>
    `);

    const svgEl = await page.find('va-button-icon >>> va-icon');
    const iconProp = await svgEl.getProperty('icon');
    expect(iconProp).toMatch('delete');
  });

  it('renders a disabled button', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button-icon button-type="delete" disabled></va-button-icon>',
    );
    const element = await page.find('va-button-icon');
    expect(element).toEqualHtml(`
    <va-button-icon button-type="delete" class="hydrated" disabled="">
      <mock:shadow-root>
        <button aria-disabled="true" class="usa-button va-button-icon--destructive" part="button" type="button">
          <va-icon class="hydrated"></va-icon>
          Delete
        </button>
      </mock:shadow-root>
    </va-button-icon>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button-icon button-type="change-file"></va-button-icon>',
    );
    await axeCheck(page);
  });

  it('fires analytics event when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button-icon button-type="change-file"></va-button-icon>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const button = await page.find('va-button-icon >>> button');
    await button.click();
    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-button',
      details: {
        label: 'Change File',
        type: 'primary',
      },
    });
  });

  it(`doesn't fire analytics event when clicked and disableAnalytics is true`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button-icon button-type="change-file" disable-analytics="true"></va-button-icon>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const button = await page.find('va-button-icon >>> button');
    await button.click();
    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it(`doesn't fire click event when disabled is true`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button-icon button-type="change-file" disabled="true"></va-button-icon>',
    );
    const clickSpy = await page.spyOnEvent('click');
    const button = await page.find('va-button-icon >>> button');
    await button.click();
    expect(clickSpy).toHaveReceivedEventTimes(0);
  });

  it('has the correct aria-label when label is given', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button-icon button-type="change-file" label="Click to change the file"></va-button-icon>',
    );

    const button = await page.find('va-button-icon >>> button');
    expect(button.getAttribute('aria-label')).toEqual(
      'Click to change the file',
    );
  });
});
