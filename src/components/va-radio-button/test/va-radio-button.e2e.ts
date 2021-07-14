import { newE2EPage } from '@stencil/core/testing';

describe('va-radio-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-radio-button></va-radio-button>');

    const element = await page.find('va-radio-button');
    expect(element).toHaveClass('hydrated');
  });

  it('unchecks current option when other button is checked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-radio-button>
        <va-radio-option checked label="Option 1" value="1"></va-radio-option>
        <va-radio-option label="Option 2" value="2"></va-radio-option>
        <va-radio-option label="Option 3" value="3"></va-radio-option>
      </va-radio-button>
    `,
    );

    const options = await page.findAll('va-radio-option >>> input');

    expect(await options[0].getProperty('checked')).toBeTruthy();
    expect(await options[1].getProperty('checked')).toBeFalsy();

    await options[1].click();

    expect(await options[0].getProperty('checked')).toBeFalsy();
    expect(await options[1].getProperty('checked')).toBeTruthy();
  });
});
