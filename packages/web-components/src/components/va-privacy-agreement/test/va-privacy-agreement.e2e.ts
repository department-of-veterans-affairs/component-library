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

  it('emits the vaChange event', async () => {
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

  it('fires analytics event when enableAnalytics prop is set', async () => {
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

    await input.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-privacy-agreement',
      details: {
        checked: true
      },
    });

    await input.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-privacy-agreement',
      details: {
        checked: false
      },
    });

  });

  it('does not fire analytics event when enableAnalytics prop is not set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-privacy-agreement />',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const vaCheckbox = await page.find('va-privacy-agreement >>> va-checkbox');

    await vaCheckbox.click();

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

});
