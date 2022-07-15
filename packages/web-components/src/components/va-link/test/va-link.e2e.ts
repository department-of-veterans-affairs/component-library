import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-link', () => {
  it('renders default link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link href="https://www.va.gov" text="Find out if you qualify for this program and how to apply" />',
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link class="hydrated" href="https://www.va.gov" text="Find out if you qualify for this program and how to apply">
      <mock:shadow-root>
        <a href="https://www.va.gov">
          Find out if you qualify for this program and how to apply
        </a>
      </mock:shadow-root>
    </va-link>
    `);
  });

  it('renders active link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link active href="https://www.va.gov" text="Share your VA medical records" />',
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link active class="hydrated" href="https://www.va.gov" text="Share your VA medical records">
      <mock:shadow-root>
        <a href="https://www.va.gov">
          Share your VA medical records
          <i aria-hidden="true"></i>
        </a>
      </mock:shadow-root>
    </va-link>
    `);
  });

  it('renders download link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link download filename="10-10ez.pdf" href="https://www.va.gov" filetype="PDF" pages=5 text="Download VA form 10-10EZ" />',
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link class="hydrated" download filename="10-10ez.pdf" filetype="PDF" href="https://www.va.gov" pages=5 text="Download VA form 10-10EZ">
      <mock:shadow-root>
        <a download="10-10ez.pdf" href="https://www.va.gov">
          <i aria-hidden="true"></i>
          Download VA form 10-10EZ <dfn>(<abbr title="Portable Document Format">PDF</abbr>, 5 pages)</dfn>
        </a>
      </mock:shadow-root>
    </va-link>
    `);
  });

  it('renders video link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link video href="https://www.va.gov" text="Go to the video about VA disability compensation" />',
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link class="hydrated" video href="https://www.va.gov" text="Go to the video about VA disability compensation">
      <mock:shadow-root>
        <a href="https://www.va.gov" rel="noopener" target="_blank">
          <i aria-hidden="true"></i>
          Go to the video about VA disability compensation <dfn>on YouTube</dfn>
        </a>
      </mock:shadow-root>
    </va-link>
    `);
  });

  it('renders channel link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-link channel href="https://www.va.gov" text="Veteran's Affairs"/>`,
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link class="hydrated" channel href="https://www.va.gov" text="Veteran's Affairs">
      <mock:shadow-root>
        <a href="https://www.va.gov" rel="noopener" target="_blank">
          <i aria-hidden="true"></i>
          Veteran's Affairs <dfn>YouTube</dfn>
        </a>
      </mock:shadow-root>
    </va-link>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link href="https://www.va.gov" text="Find out if you qualify for this program and how to apply" />',
    );
    await axeCheck(page);
  });

  it('fires analytics event when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link href="https://www.va.gov" text="Find out if you qualify for this program and how to apply" />',
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
      '<va-link disable-analytics href="https://www.va.gov" text="Find out if you qualify for this program and how to apply" />',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const anchor = await page.find('va-link >>> a');
    await anchor.click();
    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });
});
