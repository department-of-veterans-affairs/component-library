import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link href="https://www.va.gov">Find out if you qualify for this program and how to apply</va-link>',
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link class="hydrated" href="https://www.va.gov">
      <mock:shadow-root>
        <a href="https://www.va.gov">
          <i aria-hidden="true"></i>
          <slot></slot>
        </a>
      </mock:shadow-root>
      Find out if you qualify for this program and how to apply
    </va-link>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link href="https://www.va.gov">Find out if you qualify for this program and how to apply</va-link>',
    );
    await axeCheck(page);
  });

  it('fires analytics event when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link href="https://www.va.gov">Find out if you qualify for this program and how to apply</va-link>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const anchor = await page.find('va-link >>> a');
    await anchor.click();
    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-link',
      // TODO: update analytics event details
      details: {},
    });
  });

  it(`doesn't fire analytics event when clicked and disableAnalytics is true`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link href="https://www.va.gov" disable-analytics>Find out if you qualify for this program and how to apply</va-link>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const anchor = await page.find('va-link >>> a');
    await anchor.click();
    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });
});
