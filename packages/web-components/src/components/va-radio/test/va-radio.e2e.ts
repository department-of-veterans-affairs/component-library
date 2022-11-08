import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio></va-radio>');

    const element = await page.find('va-radio');
    expect(element).toHaveClass('hydrated');
  });

  it('overrides the aria-label on the host element', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio label="Testing" aria-label="my label"></va-radio>');

    const element = await page.find('va-radio');
    expect(element.getAttribute('aria-label')).not.toEqual('my label');
  });

  it('set the aria-label to match the label prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio label="Testing"></va-radio>');

    const element = await page.find('va-radio');
    expect(element.getAttribute('aria-label')).toEqual('Testing');
  });

  it('appends "required" to the aria-label', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio label="Testing" required></va-radio>');

    const element = await page.find('va-radio');
    expect(element.getAttribute('aria-label')).toEqual('Testing required');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio hint="Hint text">
        <va-radio-option checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option label="Option 2" value="2"></va-radio-option>
        <va-radio-option label="Option 3" value="3"></va-radio-option>
      </va-radio>
    `,
    );

    await axeCheck(page);
  });

  it('passes an axe check if id is used with identical labels', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio>
        <va-radio-option checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option label="Option 2" value="2"></va-radio-option>
        <va-radio-option label="Option 3" value="3"></va-radio-option>
      </va-radio>
      <va-radio>
        <va-radio-option checked id="RadioOption1" label="Option 1" value="1"></va-radio-option>
        <va-radio-option id="RadioOption2" label="Option 2" value="2"></va-radio-option>
        <va-radio-option id="RadioOption3" label="Option 3" value="3"></va-radio-option>
      </va-radio>
    `,
    );

    await axeCheck(page);
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

    const options = await page.findAll('va-radio-option');

    expect(await options[0].getProperty('checked')).toBeTruthy();
    expect(await options[1].getProperty('checked')).toBeFalsy();

    await options[1].click();

    expect(await options[0].getProperty('checked')).toBeFalsy();
    expect(await options[1].getProperty('checked')).toBeTruthy();
  });

  it('renders hint text if included', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio hint="Some hint text"></va-radio>');

    const hint = await page.find('va-radio >>> .hint-text');
    expect(hint.textContent).toEqual("Some hint text");
  });

  it('renders an error message if passed', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio error="This is an error"></va-radio>');

    const element = await page.find('va-radio');
    const errorElement = await page.find('va-radio >>> #error-message');
    expect(element.getAttribute('aria-invalid')).toEqual('true');
    expect(errorElement).toEqualHtml(`
     <span id="error-message" role="alert">
       <span class="sr-only">
         error
       </span>
       This is an error
     </span>
    `);
  });

  it('renders a required span based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio required></va-radio>');

    const element = await page.find('va-radio >>> .required');
    expect(element).toEqualHtml(`
      <span class="required">
        required
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
    const inputEl = await page.find('va-radio-option');
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
    const inputEl = await page.find('va-radio-option');
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
    const inputEl = await page.find('va-radio-option');
    await inputEl.click();

    expect(changeSpy).toHaveReceivedEventDetail({ value: 'one' });
  });

  it('checks option when using the space key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio>
        <va-radio-option label="Option 1" value="1"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[0].press('Space');

    expect(await options[0].getProperty('checked')).toBeTruthy();
  });

  it('checks next option when using the left arrow key', async () => {
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
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowLeft');

    expect(await options[2].getProperty('checked')).toBeTruthy();
  });

  it('unchecks current option when using the left arrow key', async () => {
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
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowLeft');

    expect(await options[0].getProperty('checked')).toBeFalsy();
  });

  it('checks next option when using the right arrow key', async () => {
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
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowRight');

    expect(await options[1].getProperty('checked')).toBeTruthy();
  });

  it('unchecks current option when using the right arrow key', async () => {
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
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowRight');

    expect(await options[0].getProperty('checked')).toBeFalsy();
  });

  it('checks next option when using the down arrow key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio>
        <va-radio-option checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option label="Option 2" value="2"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowDown');

    expect(await options[1].getProperty('checked')).toBeTruthy();
  });

  it('unchecks current option when using the down arrow key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio>
        <va-radio-option checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option label="Option 2" value="2"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowDown');

    expect(await options[0].getProperty('checked')).toBeFalsy();
  });

  it('checks next option when using the up arrow key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio>
        <va-radio-option checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option label="Option 2" value="2"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowUp');

    expect(await options[1].getProperty('checked')).toBeTruthy();
  });

  it('unchecks current option when using the up arrow key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio>
        <va-radio-option label="Option 1" value="1"></va-radio-option>
        <va-radio-option checked label="Option 2" value="2"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[1].press('ArrowUp');

    expect(await options[1].getProperty('checked')).toBeFalsy();
  });

  // Begin USWDS version test

  it('uswds version renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio uswds></va-radio>');

    const element = await page.find('va-radio');
    expect(element).toHaveClass('hydrated');
  });

  it('uswds version passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio uswds hint="Hint text" label="Example">
        <va-radio-option uswds checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option uswds label="Option 2" value="2"></va-radio-option>
        <va-radio-option uswds label="Option 3" value="3"></va-radio-option>
      </va-radio>
    `,
    );

    await axeCheck(page);
  });

  it('uswds version passes an axe check if id is used with identical labels', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio uswds>
        <va-radio-option uswds checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option uswds label="Option 2" value="2"></va-radio-option>
        <va-radio-option uswds label="Option 3" value="3"></va-radio-option>
      </va-radio>
      <va-radio uswds>
        <va-radio-option uswds checked id="RadioOption1" label="Option 1" value="1"></va-radio-option>
        <va-radio-option uswds id="RadioOption2" label="Option 2" value="2"></va-radio-option>
        <va-radio-option uswds id="RadioOption3" label="Option 3" value="3"></va-radio-option>
      </va-radio>
    `,
    );

    await axeCheck(page);
  });

  it('uswds version unchecks current option when other button is checked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio uswds>
        <va-radio-option uswds checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option uswds label="Option 2" value="2"></va-radio-option>
        <va-radio-option uswds label="Option 3" value="3"></va-radio-option>
      </va-radio>
    `,
    );

    const options = await page.findAll('va-radio-option');

    expect(await options[0].getProperty('checked')).toBeTruthy();
    expect(await options[1].getProperty('checked')).toBeFalsy();

    await options[1].click();

    expect(await options[0].getProperty('checked')).toBeFalsy();
    expect(await options[1].getProperty('checked')).toBeTruthy();
  });

  it('uswds version renders hint text if included', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio uswds hint="Some hint text"></va-radio>');

    const hint = await page.find('va-radio >>> .usa-hint');
    expect(hint.textContent).toEqual("Some hint text");
  });

  it('uswds version renders an error message if passed', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio uswds error="This is an error"></va-radio>');

    const element = await page.find('va-radio');
    const errorElement = await page.find('va-radio >>> .usa-error-message');
    expect(element.getAttribute('aria-invalid')).toEqual('true');
    expect(errorElement).toEqualHtml(`
     <span class="usa-error-message" role="alert">
       <span class="usa-sr-only">
         error
       </span>
       This is an error
     </span>
    `);
  });

  it('uswds version renders a required span based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio uswds required></va-radio>');

    const element = await page.find('va-radio >>> .required');
    expect(element).toEqualHtml(`
      <span class="required">
        required
      </span>
    `);
  });

  it('uswds version fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-radio uswds label="Regular label" enable-analytics>
        <va-radio-option uswds label="First option" value="one"></va-radio-option>
      </va-radio>
      `);
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-radio-option');
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

  it("uswds version doesn't fire an analytics event when enableAnalytics is false", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-radio uswds label="Regular label">
        <va-radio-option uswds label="First option" value="one"></va-radio-option>
      </va-radio>
      `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const inputEl = await page.find('va-radio-option');
    await inputEl.click();

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('uswds version fires a vaValueChange event when the checked value changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-radio uswds label="Regular label">
        <va-radio-option uswds label="First option" value="one"></va-radio-option>
      </va-radio>
      `);

    const changeSpy = await page.spyOnEvent('vaValueChange');
    const inputEl = await page.find('va-radio-option');
    await inputEl.click();

    expect(changeSpy).toHaveReceivedEventDetail({ value: 'one' });
  });

  it('uswds version checks option when using the space key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio uswds>
        <va-radio-option uswds label="Option 1" value="1"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[0].press('Space');

    expect(await options[0].getProperty('checked')).toBeTruthy();
  });

  it('uswds version checks next option when using the left arrow key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio uswds>
        <va-radio-option uswds checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option uswds label="Option 2" value="2"></va-radio-option>
        <va-radio-option uswds label="Option 3" value="3"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowLeft');

    expect(await options[2].getProperty('checked')).toBeTruthy();
  });

  it('uswds version unchecks current option when using the left arrow key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio uswds>
        <va-radio-option uswds checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option uswds label="Option 2" value="2"></va-radio-option>
        <va-radio-option uswds label="Option 3" value="3"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowLeft');

    expect(await options[0].getProperty('checked')).toBeFalsy();
  });

  it('uswds version checks next option when using the right arrow key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio uswds>
        <va-radio-option uswds checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option uswds label="Option 2" value="2"></va-radio-option>
        <va-radio-option uswds label="Option 3" value="3"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowRight');

    expect(await options[1].getProperty('checked')).toBeTruthy();
  });

  it('uswds version unchecks current option when using the right arrow key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio uswds>
        <va-radio-option uswds checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option uswds label="Option 2" value="2"></va-radio-option>
        <va-radio-option uswds label="Option 3" value="3"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowRight');

    expect(await options[0].getProperty('checked')).toBeFalsy();
  });

  it('uswds version checks next option when using the down arrow key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio uswds>
        <va-radio-option uswds checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option uswds label="Option 2" value="2"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowDown');

    expect(await options[1].getProperty('checked')).toBeTruthy();
  });

  it('uswds version unchecks current option when using the down arrow key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio uswds>
        <va-radio-option uswds checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option uswds label="Option 2" value="2"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowDown');

    expect(await options[0].getProperty('checked')).toBeFalsy();
  });

  it('uswds version checks next option when using the up arrow key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio uswds>
        <va-radio-option uswds checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option uswds label="Option 2" value="2"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[0].press('ArrowUp');

    expect(await options[1].getProperty('checked')).toBeTruthy();
  });

  it('uswds version unchecks current option when using the up arrow key', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio uswds>
        <va-radio-option uswds label="Option 1" value="1"></va-radio-option>
        <va-radio-option uswds checked label="Option 2" value="2"></va-radio-option>
      </va-radio>
    `,
    );
    const options = await page.findAll('va-radio-option');

    await options[1].press('ArrowUp');

    expect(await options[1].getProperty('checked')).toBeFalsy();
  });

});
