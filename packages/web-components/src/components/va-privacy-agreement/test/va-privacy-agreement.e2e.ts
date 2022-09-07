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
        <span>
          Please read and accept the
          <a href="/privacy/" target="_blank">
            privacy policy
          </a>
        </span>
        <span id="error-message" role="alert"></span>
        <va-checkbox class="hydrated" id="checkbox"></va-checkbox>
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

  it('displays an error message when `isError` prop is present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-privacy-agreement is-error />',
    );

    const errorSpan = await page.find('va-privacy-agreement >>> #error-message');
    const text = errorSpan.textContent;
    console.log('text', text);
    expect(errorSpan.textContent).toContain('You must accept the privacy policy before continuing');
  });

  it('does not display an error message when `isError` prop is not present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-privacy-agreement />',
    );

    const errorSpan = await page.find('va-privacy-agreement >>> #error-message');
    const text = errorSpan.textContent;
    console.log('text', text);
    expect(errorSpan.textContent).toBe('');
  });

  it('emits the vaChange event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-privacy-agreement />',
    );
    const changeSpy = await page.spyOnEvent('vaChange');
    const vaCheckbox = await page.find('va-privacy-agreement >>> va-checkbox');

    await vaCheckbox.click();

    expect(changeSpy).toHaveReceivedEventDetail({ checked: true });
  });

  it('fires analytics event when enableAnalytics prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-privacy-agreement enable-analytics />',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const vaCheckbox = await page.find('va-privacy-agreement >>> va-checkbox');

    await vaCheckbox.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-privacy-agreement',
      details: {
        checked: true
      },
    });

    await vaCheckbox.click();

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
