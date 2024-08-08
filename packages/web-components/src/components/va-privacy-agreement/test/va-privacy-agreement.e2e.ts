import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

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
             <a href="/privacy-policy/" target="_blank">
               privacy policy
               <va-icon class="hydrated privacy-policy-icon"></va-icon>
               <span class="usa-sr-only">opens in a new window</span>
             </a>.
           </span>
         </va-checkbox>
       </mock:shadow-root>
     </va-privacy-agreement>
    `);
  });

  it('renders error label when showError is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-privacy-agreement checked showError="true"></va-privacy-agreement>');

    const element = await page.find('va-privacy-agreement >>> va-checkbox >>> span.usa-label--error');
    expect(element).toBeTruthy();
  });

  it('passes an aXe check - no error', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-privacy-agreement checked="true"/>',
    );

    await axeCheck(page);
  });

  it('checkbox should be checked if the `checked` prop is present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-privacy-agreement checked/>',
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

  /**
   * Skipping the following tests because accessing the shadowRoot of the checkbox
   * in order to trigger an input click is flakey. The tests pass locally but fail in CI.
   */
  it.skip('emits the vaChange event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-privacy-agreement/>',
    );
    const changeSpy = await page.spyOnEvent('vaChange');
    const input = (
      await page.waitForFunction(() =>
        document.querySelector('va-privacy-agreement')
          .shadowRoot.querySelector('va-checkbox')
          .shadowRoot.querySelector('input')
      )
    ).asElement();

    await input.click();

    expect(changeSpy).toHaveReceivedEventDetail({ checked: true });
  });

  it.skip('fires analytics event when enableAnalytics prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-privacy-agreement enable-analytics/>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const input = (
      await page.waitForFunction(() =>
        document.querySelector('va-privacy-agreement')
          .shadowRoot.querySelector('va-checkbox')
          .shadowRoot.querySelector('input')
      )
    ).asElement();

    input.click();
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-privacy-agreement',
      details: {
        checked: true
      },
    });

    input.click();
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-privacy-agreement',
      details: {
        checked: false
      },
    });

  });

  it.skip('does not fire analytics event when `enableAnalytics` prop is not set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-privacy-agreement/>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const input = (
      await page.waitForFunction(() =>
        document.querySelector('va-privacy-agreement')
          .shadowRoot.querySelector('va-checkbox')
          .shadowRoot.querySelector('input')
      )
    ).asElement();

    input.click();
    await page.waitForChanges();

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('displays an error message when `showError` is defined', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-privacy-agreement show-error/>');

    const checkbox = await page.find('va-privacy-agreement >>> va-checkbox');

    expect(checkbox).toEqualAttribute('error', 'You must accept the privacy policy before continuing.');
  });
});
