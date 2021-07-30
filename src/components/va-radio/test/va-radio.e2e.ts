import { newE2EPage } from '@stencil/core/testing';

describe('va-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio></va-radio>');

    const element = await page.find('va-radio');
    expect(element).toHaveClass('hydrated');
  });

  it('unchecks current option when other button is checked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio>
        <va-radio-option checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option label="Option 2" value="2"></va-radio-option>
        <va-radio-option label="Option 3" value="3"></va-radio-option>
      </va-radio>
    `,
    );

    const options = await page.findAll('va-radio-option >>> input');

    expect(await options[0].getProperty('checked')).toBeTruthy();
    expect(await options[1].getProperty('checked')).toBeFalsy();

    await options[1].click();

    expect(await options[0].getProperty('checked')).toBeFalsy();
    expect(await options[1].getProperty('checked')).toBeTruthy();
  });

  it('renders an error message if passed', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio error="This is an error"></va-radio>');

    const element = await page.find('va-radio >>> .error-message');
    expect(element).toEqualHtml(`
     <span class="error-message" role="alert">
       <span class="sr-only">
         Error
       </span>
       This is an error
     </span>
    `);
  });

  it('renders a required span based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio required></va-radio>');

    const element = await page.find('va-radio >>> .required-span');
    expect(element).toEqualHtml(`
      <span class="required-span">
        (*Required)
      </span>
    `);
  });

  it('fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-radio label="Regular label" enable-analytics>
        <va-radio-option label="First option" value="one"></va-radio-option>
      </va-radio>
      `);
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-radio-option >>> input');
    await inputEl.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'change',
      componentName: 'va-radio',
      details: {
        label: 'Regular label',
        optionLabel: 'First option',
        required: false,
      },
    });
  });

  it("doesn't fire an analytics event when enableAnalytics is false", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-radio label="Regular label">
        <va-radio-option label="First option" value="one"></va-radio-option>
      </va-radio>
      `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-radio-option >>> input');
    await inputEl.click();

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('fires a vaValueChange event when the checked value changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-radio label="Regular label">
        <va-radio-option label="First option" value="one"></va-radio-option>
      </va-radio>
      `);

    const changeSpy = await page.spyOnEvent('vaValueChange');
    const inputEl = await page.find('va-radio-option >>> input');
    await inputEl.click();

    expect(changeSpy).toHaveReceivedEvent();
  });
});
