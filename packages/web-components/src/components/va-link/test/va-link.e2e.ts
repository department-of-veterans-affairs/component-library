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
        <a href="https://www.va.gov" part="anchor">
          Find out if you qualify for this program and how to apply
        </a>
      </mock:shadow-root>
    </va-link>
    `);
  });

  it('adds a lang attribute if the language prop set on default va-link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link href="https://www.va.gov" text="Share your VA medical records" language="en" />'
    );

    const element = await page.find('va-link >>> a');
    expect(element.getAttribute('lang')).toBe('en');
    expect(element.getAttribute('hrefLang')).toBe('en');
  })

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
          <va-icon class="hydrated link-icon--active"></va-icon>
        </a>
      </mock:shadow-root>
    </va-link>
    `);
  });

  it('renders calendar link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-link calendar filename="Appointment_at_Cheyenne_VA_Medical_Center.ics" href="data:text/calendar;charset=utf-8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3AVA%0D%0ABEGIN%3AVEVENT%0D%0AUID%3A1398DD3C-3572-40FD-84F6-BB6F97C79D67%0D%0ASUMMARY%3AAppointment%20at%20Cheyenne%20VA%20Medical%20Center%0D%0ADESCRIPTION%3AYou%20have%20a%20health%20care%20appointment%20at%20Cheyenne%20VA%20Medical%20Cent%0D%0A%09er%0D%0A%09%5Cn%5Cn2360%20East%20Pershing%20Boulevard%5Cn%0D%0A%09Cheyenne%5C%2C%20WY%2082001-5356%5Cn%0D%0A%09307-778-7550%5Cn%0D%0A%09%5CnSign%20in%20to%20https%3A%2F%2Fva.gov%2Fhealth-care%2Fschedule-view-va-appointments%2Fappo%0D%0A%09intments%20to%20get%20details%20about%20this%20appointment%5Cn%0D%0ALOCATION%3A2360%20East%20Pershing%20Boulevard%5C%2C%20Cheyenne%5C%2C%20WY%2082001-5356%0D%0ADTSTAMP%3A20221222T021934Z%0D%0ADTSTART%3A20221222T021934Z%0D%0ADTEND%3A20221222T024934Z%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR" text="Add to calendar" />',
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link class="hydrated" calendar filename="Appointment_at_Cheyenne_VA_Medical_Center.ics" href="data:text/calendar;charset=utf-8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3AVA%0D%0ABEGIN%3AVEVENT%0D%0AUID%3A1398DD3C-3572-40FD-84F6-BB6F97C79D67%0D%0ASUMMARY%3AAppointment%20at%20Cheyenne%20VA%20Medical%20Center%0D%0ADESCRIPTION%3AYou%20have%20a%20health%20care%20appointment%20at%20Cheyenne%20VA%20Medical%20Cent%0D%0A%09er%0D%0A%09%5Cn%5Cn2360%20East%20Pershing%20Boulevard%5Cn%0D%0A%09Cheyenne%5C%2C%20WY%2082001-5356%5Cn%0D%0A%09307-778-7550%5Cn%0D%0A%09%5CnSign%20in%20to%20https%3A%2F%2Fva.gov%2Fhealth-care%2Fschedule-view-va-appointments%2Fappo%0D%0A%09intments%20to%20get%20details%20about%20this%20appointment%5Cn%0D%0ALOCATION%3A2360%20East%20Pershing%20Boulevard%5C%2C%20Cheyenne%5C%2C%20WY%2082001-5356%0D%0ADTSTAMP%3A20221222T021934Z%0D%0ADTSTART%3A20221222T021934Z%0D%0ADTEND%3A20221222T024934Z%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR" text="Add to calendar">
      <mock:shadow-root>
        <a download="Appointment_at_Cheyenne_VA_Medical_Center.ics" href="data:text/calendar;charset=utf-8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3AVA%0D%0ABEGIN%3AVEVENT%0D%0AUID%3A1398DD3C-3572-40FD-84F6-BB6F97C79D67%0D%0ASUMMARY%3AAppointment%20at%20Cheyenne%20VA%20Medical%20Center%0D%0ADESCRIPTION%3AYou%20have%20a%20health%20care%20appointment%20at%20Cheyenne%20VA%20Medical%20Cent%0D%0A%09er%0D%0A%09%5Cn%5Cn2360%20East%20Pershing%20Boulevard%5Cn%0D%0A%09Cheyenne%5C%2C%20WY%2082001-5356%5Cn%0D%0A%09307-778-7550%5Cn%0D%0A%09%5CnSign%20in%20to%20https%3A%2F%2Fva.gov%2Fhealth-care%2Fschedule-view-va-appointments%2Fappo%0D%0A%09intments%20to%20get%20details%20about%20this%20appointment%5Cn%0D%0ALOCATION%3A2360%20East%20Pershing%20Boulevard%5C%2C%20Cheyenne%5C%2C%20WY%2082001-5356%0D%0ADTSTAMP%3A20221222T021934Z%0D%0ADTSTART%3A20221222T021934Z%0D%0ADTEND%3A20221222T024934Z%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR">
          <va-icon class="hydrated link-icon--left"></va-icon>
          Add to calendar
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
          <va-icon class="hydrated link-icon--left"></va-icon>
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
          <va-icon class="hydrated link-icon--left"></va-icon>
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
          <va-icon class="hydrated link-icon--left"></va-icon>
          Veteran's Affairs <dfn>YouTube</dfn>
        </a>
      </mock:shadow-root>
    </va-link>
    `);
  });

  it('renders custom icon link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-link href="https://www.va.gov" text="Veteran's Affairs" icon-name="chevron_right" icon-size="3"/>`,
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link class="hydrated" href="https://www.va.gov" text="Veteran's Affairs" icon-name="chevron_right" icon-size="3">
      <mock:shadow-root>
        <a href="https://www.va.gov" class="link--center">
          <va-icon class="hydrated" part="icon"></va-icon>
          Veteran's Affairs
        </a>
      </mock:shadow-root>
    </va-link>
    `);

    const iconEl = await page.find('va-link >>> va-icon');
    const iconName = await iconEl.getProperty('icon');
    expect(iconName).toBe('chevron_right');
  });

  it('renders back link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-link href="https://www.va.gov" text="Veteran's Affairs" back/>`,
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link class="hydrated" href="https://www.va.gov" text="Veteran's Affairs" back>
      <mock:shadow-root>
        <div class="link-container">
          <va-icon class="hydrated link-icon--back link-icon--left"></va-icon>
          <a href="https://www.va.gov">
            Veteran's Affairs
          </a>
        </div>
      </mock:shadow-root>
    </va-link>
    `);

    const iconEl = await page.find('va-link >>> va-icon');
    const iconName = await iconEl.getProperty('icon');
    expect(iconName).toBe('arrow_back');
  });

  it('renders external link', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-link href="https://www.va.gov" external text="Veteran's Affairs"/>`,
    );

    const element = await page.find('va-link');
    expect(element).toEqualHtml(`
    <va-link class="hydrated" external="" href="https://www.va.gov" text="Veteran's Affairs">
      <mock:shadow-root>
        <a href="https://www.va.gov" rel="noreferrer" class="link--center" target="_blank">
          Veteran's Affairs (opens in a new tab)
          <span class="usa-sr-only">
            opens in a new tab
          </span>
        </a>
      </mock:shadow-root>
    </va-link>
    `);
  });

  it('renders a link with a screen reader label', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-link href="https://www.va.gov" text="Veteran's Affairs" label="Example label" />`,
    );

    const label = await page.find('va-link >>> a[aria-label]');
    expect(label.getAttribute('aria-label')).toBe('Example label');
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
      componentName: 'va-link',
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
      '<va-link disable-analytics href="https://www.va.gov" text="Find out if you qualify for this program and how to apply" />',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const anchor = await page.find('va-link >>> a');
    await anchor.click();
    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });
});
