import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-link-action', () => {
  it('renders default link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link-action href="https://www.va.gov" text="Find out if you qualify for this program and how to apply"></va-link-action>',
    );

    const element = await page.find('va-link-action');
    expect(element).toEqualHtml(`
    <va-link-action class="hydrated" href="https://www.va.gov" text="Find out if you qualify for this program and how to apply">
      <mock:shadow-root>
        <a href="https://www.va.gov">
          <va-icon class="link-icon--left link-icon link-icon--primary hydrated"></va-icon>
          Find out if you qualify for this program and how to apply
        </a>
      </mock:shadow-root>
    </va-link-action>
    `);
  });

  it('renders secondary link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link-action href="https://www.va.gov" text="Share your VA medical records" type="secondary"></va-link-action>',
    );

    const element = await page.find('va-link-action');
    expect(element).toEqualHtml(`
    <va-link-action class="hydrated" href="https://www.va.gov" text="Share your VA medical records" type="secondary">
      <mock:shadow-root>
        <a href="https://www.va.gov">
          <va-icon class="link-icon--left link-icon link-icon--secondary hydrated"></va-icon>
          Share your VA medical records
        </a>
      </mock:shadow-root>
    </va-link-action>
    `);
  });

  it('renders reverse link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link-action href="https://www.va.gov" text="Find out more" type="reverse"></va-link-action>',
    );

    const element = await page.find('va-link-action');
    expect(element).toEqualHtml(`
    <va-link-action class="hydrated" href="https://www.va.gov" text="Find out more" type="reverse">
      <mock:shadow-root>
        <a href="https://www.va.gov" class="va-link--reverse">
          <va-icon class="link-icon--left link-icon link-icon--reverse hydrated"></va-icon>
          Find out more
        </a>
      </mock:shadow-root>
    </va-link-action>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link-action href="https://www.va.gov" text="Find out if you qualify for this program and how to apply"></va-link-action>',
    );
    await axeCheck(page);
  });

  it('fires analytics event when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link-action href="https://www.va.gov" text="Find out if you qualify for this program and how to apply"></va-link-action>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const anchor = await page.find('va-link-action >>> a');
    await anchor.click();
    expect(analyticsSpy).toHaveReceivedEventDetail({
      componentName: 'va-link-action',
      action: 'click',
      details: {
        label: 'Find out if you qualify for this program and how to apply',
        destination: 'https://www.va.gov',
        origin: 'http://localhost:3333/',
      },
    });
  });

  it(`doesn't fire analytics event when clicked and disableAnalytics is true`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link-action disable-analytics href="https://www.va.gov" text="Find out if you qualify for this program and how to apply"></va-link-action>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const anchor = await page.find('va-link-action >>> a');
    await anchor.click();
    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });
});
