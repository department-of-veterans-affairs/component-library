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

    const element = await page.find('va-checkbox-group >>> .error-message');
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
    await page.setContent('<va-checkbox-group required></va-checkbox-group>');

    const element = await page.find('va-checkbox-group >>> .required-span');
    expect(element).toEqualHtml(`
      <span class="required-span">
        (*Required)
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

  it("doesn't fire an analytics event when enableAnalytics is false", async () => {
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
});
