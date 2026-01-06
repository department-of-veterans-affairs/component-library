import { newE2EPage, E2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

const clickCheckbox = async (page: E2EPage) => {
  await page.evaluate(() => {
    const privacyAgreement = document.querySelector('va-privacy-agreement');
    const vaCheckbox = privacyAgreement.shadowRoot.querySelector('va-checkbox');
    const label = vaCheckbox.shadowRoot.querySelector('.va-checkbox__label');
    (label as HTMLElement).click();
  });
  await page.waitForChanges();
};

describe('va-privacy-agreement', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-privacy-agreement checked></va-privacy-agreement>');

    const element = await page.find('va-privacy-agreement');
    expect(element).toEqualHtml(`
     <va-privacy-agreement checked="" class="hydrated">
       <mock:shadow-root>
         <va-checkbox class="hydrated" id="checkbox">
           <span class="description" slot="description">
             Please read and accept the
             <va-link class="hydrated"></va-link>.
           </span>
         </va-checkbox>
       </mock:shadow-root>
     </va-privacy-agreement>
    `);
  });

  it('renders error label when showError is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-privacy-agreement checked show-error="true"></va-privacy-agreement>');

    const element = await page.find('va-privacy-agreement >>>> span.usa-label--error');
    expect(element).toBeTruthy();
  });

  it('passes an aXe check - no error', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-privacy-agreement checked />',
    );

    await axeCheck(page, ['aria-allowed-role']);
  });

  it('checkbox should be checked if the `checked` prop is present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-privacy-agreement checked />',
    );

    const vaCheckbox = await page.find('va-privacy-agreement >>> va-checkbox');
    const checkedValue = await vaCheckbox.getProperty("checked");

    expect(checkedValue).toBe(true);
  });

  it('checkbox should not be checked if the `checked` prop is not present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-privacy-agreement/>',
    );

    const vaCheckbox = await page.find('va-privacy-agreement >>> va-checkbox');
    const checkedValue = await vaCheckbox.getProperty("checked");

    expect(checkedValue).toBeFalsy();
  });

  it('emits the vaChange event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-privacy-agreement/>',
    );
    const changeSpy = await page.spyOnEvent('vaChange');

    await clickCheckbox(page);

    expect(changeSpy).toHaveReceivedEventDetail({ checked: true });
  });

  it('fires analytics event when enableAnalytics prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-privacy-agreement enable-analytics/>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    await clickCheckbox(page);

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-privacy-agreement',
      details: {
        checked: true
      },
    });

    await clickCheckbox(page);

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-privacy-agreement',
      details: {
        checked: false
      },
    });
  });

  it('does not fire analytics event when `enableAnalytics` prop is not set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-privacy-agreement/>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    await clickCheckbox(page);

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('displays an error message when `showError` is defined', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-privacy-agreement show-error/>');

    const checkbox = await page.find('va-privacy-agreement >>> va-checkbox');

    expect(checkbox).toEqualAttribute('error', 'You must accept the privacy policy before continuing.');
  });
});
