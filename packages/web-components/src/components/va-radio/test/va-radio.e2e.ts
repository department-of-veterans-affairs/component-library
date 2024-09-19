import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio></va-radio>');

    const element = await page.find('va-radio');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio hint="Hint text" label="Example">
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

    //without specifying center of element with this offset the click has no effect
    await options[1].click({
      offset: { x: 0, y: 0 }
    });

    expect(await options[0].getProperty('checked')).toBeFalsy();
    expect(await options[1].getProperty('checked')).toBeTruthy();
  });

  it('renders hint text if included', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio hint="Some hint text"></va-radio>');

    const hint = await page.find('va-radio >>> .usa-hint');
    expect(hint.textContent).toEqual("Some hint text");
  });

  it('renders an error message if passed', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio error="This is an error"></va-radio>');

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

  it('renders aria message text if included', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio message-aria-describedby="Some additional info"></va-radio>');

    const message = await page.find('va-radio >>> #description-message');
    expect(message.textContent).toEqual("Some additional info");
    expect(message).toHaveClass("usa-sr-only");
  });

  it('renders a required span based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio required></va-radio>');

    const element = await page.find('va-radio >>> .usa-label--required');
    expect(element).toEqualHtml(`
      <span class="usa-label--required" part="required">
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
    //without specifying center of element with this offset the click has no effect
    await inputEl.click({
      offset: { x: 0, y: 0 }
    });

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
    //without specifying center of element with this offset the click has no effect
    await inputEl.click({
      offset: { x: 0, y: 0 }
    });

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
    const input = await options[0].find('input');
    await input.press('Space');

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
    const input = await options[0].find('input');
    await input.press('ArrowLeft');

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
    const input = await options[0].find('input');

    await input.press('ArrowLeft');

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
    const input = await options[0].find('input');
    await input.press('ArrowRight');

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
    const input = await options[0].find('input');
    await input.press('ArrowRight');

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
    const input = await options[0].find('input');
    await input.press('ArrowDown');

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
    const input = await options[0].find('input');
    await input.press('ArrowDown');

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
    const input = await options[0].find('input');
    await input.press('ArrowUp');

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
    const input = await options[1].find('input');
    await input.press('ArrowUp');

    expect(await options[1].getProperty('checked')).toBeFalsy();
  });

  it('useFormsPattern displays header for the single field pattern', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-radio label="This is a label" use-forms-pattern="single" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description">
        <va-radio-option label="Option 1" value="1"></va-radio-option>
        <va-radio-option checked label="Option 2" value="2"></va-radio-option>
      </va-radio>
      `);

    const formHeader = await page.find('va-radio >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('useFormsPattern displays header for the multiple fields pattern', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <va-radio label="This is a label" use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description">
      <va-radio-option label="Option 1" value="1"></va-radio-option>
      <va-radio-option checked label="Option 2" value="2"></va-radio-option>
    </va-radio>
    `);

    const formHeader = await page.find('va-radio >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('useFormsPattern passes an aXe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <va-radio label="This is a label" use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description">
      <va-radio-option label="Option 1" value="1"></va-radio-option>
      <va-radio-option checked label="Option 2" value="2"></va-radio-option>
    </va-radio>
    `);

    await axeCheck(page);
  });

});
