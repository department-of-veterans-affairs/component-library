import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-link', () => {
  it('renders default link', async () => {
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

  it('renders active link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link active href="https://www.va.gov">Share your VA medical records</va-link>',
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link active class="hydrated" href="https://www.va.gov">
      <mock:shadow-root>
        <a href="https://www.va.gov">
          <slot></slot>
          <i aria-hidden="true"></i>
        </a>
      </mock:shadow-root>
      Share your VA medical records
    </va-link>
    `);
  });

  it('renders download link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link download filename="10-10ez.pdf" href="https://www.va.gov">Download VA form 10-10EZ(PDF, 5 pages)</va-link>',
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link class="hydrated" download filename="10-10ez.pdf" href="https://www.va.gov">
      <mock:shadow-root>
        <a download="10-10ez.pdf" href="https://www.va.gov">
          <i aria-hidden="true"></i>
          <slot></slot>
        </a>
      </mock:shadow-root>
      Download VA form 10-10EZ(PDF, 5 pages)
    </va-link>
    `);
  });

  it('renders video link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link video href="https://www.va.gov">Go to the video about VA disability compensation on YouTube</va-link>',
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link class="hydrated" video href="https://www.va.gov">
      <mock:shadow-root>
        <a href="https://www.va.gov" rel="noopener" target="_blank">
          <i aria-hidden="true"></i>
          <slot></slot>
        </a>
      </mock:shadow-root>
      Go to the video about VA disability compensation on YouTube
    </va-link>
    `);
  });

  it('renders channel link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link channel href="https://www.va.gov">VA YouTube</va-link>',
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link class="hydrated" channel href="https://www.va.gov">
      <mock:shadow-root>
        <a href="https://www.va.gov" rel="noopener" target="_blank">
          <i aria-hidden="true"></i>
          <slot></slot>
        </a>
      </mock:shadow-root>
      VA YouTube
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
