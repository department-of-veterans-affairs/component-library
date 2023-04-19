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
           <span slot="description">
             Please read and accept the
             <a href="/privacy-policy/" target="_blank">
               privacy policy 
               <i aria-hidden="true" class="fa-arrow-up-right-from-square" role="img"></i>
               <span class="sr-only">opens in a new window</span>
             </a>.
           </span>
         </va-checkbox>
       </mock:shadow-root>
     </va-privacy-agreement>
    `);
  });

  it('passes an aXe check - no error', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-privacy-agreement checked="true" />',
    );

    await axeCheck(page);
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
      '<va-privacy-agreement />',
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
      '<va-privacy-agreement />',
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
      '<va-privacy-agreement enable-analytics />',
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
      '<va-privacy-agreement />',
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
    await page.setContent('<va-privacy-agreement show-error />');

    const checkbox = await page.find('va-privacy-agreement >>> va-checkbox');

    expect(checkbox).toEqualAttribute('error', 'You must accept the privacy policy before continuing.');
  });

  // Begin USWDS v3 test
  it('uswds v3 renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-privacy-agreement checked uswds></va-privacy-agreement>');

    const element = await page.find('va-privacy-agreement');
    expect(element).toEqualHtml(`
     <va-privacy-agreement checked="" class="hydrated" uswds="">
       <mock:shadow-root>
         <va-checkbox class="hydrated" id="checkbox">
           <span class="privacy-policy" slot="description">
             Please read and accept the
             <a href="/privacy-policy/" target="_blank">
               privacy policy 
               <i aria-hidden="true" class="fa-arrow-up-right-from-square" role="img"></i>
               <span class="sr-only">opens in a new window</span>
             </a>.
           </span>
         </va-checkbox>
       </mock:shadow-root>
     </va-privacy-agreement>
    `);
  });

  it('uswds v3 passes an aXe check - no error', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-privacy-agreement checked="true" uswds/>',
    );

    await axeCheck(page);
  });

  it('uswds v3 checkbox should be checked if the `checked` prop is present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-privacy-agreement checked uswds/>',
    );

    const vaCheckbox = await page.find('va-privacy-agreement >>> va-checkbox');
    const checkedValue = await vaCheckbox.getProperty("checked");

    expect(checkedValue).toBe(true);
  });

  it('uswds v3 checkbox should not be checked if the `checked` prop is not present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-privacy-agreement uswds/>',
    );

    const vaCheckbox = await page.find('va-privacy-agreement >>> va-checkbox');
    const checkedValue = await vaCheckbox.getProperty("checked");

    expect(checkedValue).toBeFalsy();
  });

  /** 
   * Skipping the following tests because accessing the shadowRoot of the checkbox
   * in order to trigger an input click is flakey. The tests pass locally but fail in CI.
   */
  it.skip('uswds v3 emits the vaChange event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-privacy-agreement uswds/>',
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

  it.skip('uswds v3 fires analytics event when enableAnalytics prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-privacy-agreement enable-analytics uswds/>',
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

  it.skip('uswds v3 does not fire analytics event when `enableAnalytics` prop is not set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-privacy-agreement uswds/>',
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

  it('uswds v3 displays an error message when `showError` is defined', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-privacy-agreement show-error uswds/>');

    const checkbox = await page.find('va-privacy-agreement >>> va-checkbox');

    expect(checkbox).toEqualAttribute('error', 'You must accept the privacy policy before continuing.');
  });
});
