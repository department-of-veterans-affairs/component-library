import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';
import { formatDate } from '../../../utils/date-utils';

describe('USWDS maintenance-banner', () => {
  it('uswds - renders', async () => {
    let startsAt = new Date(),
        expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 4);
    const page = await newE2EPage({
      html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" warn-title="Upcoming site maintenance" maintenance-content="We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience." warn-content="We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools." starts-at="${startsAt}" expires-at="${expiresAt}" warn-starts-at="${startsAt}"></va-maintenance-banner>`,
    });
    const element = await page.find('va-maintenance-banner');
    expect(element).toEqualHtml(`
      <va-maintenance-banner banner-id="maintenance-banner" class="hydrated" expires-at="${expiresAt}" maintenance-content="Weâ€™re working on VA.gov right now. If you have trouble signing in or using tools, check back after weâ€™re finished. Thank you for your patience." maintenance-title="Site maintenance" starts-at="${startsAt}" warn-content="Weâ€™ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you wonâ€™t be able to sign in or use tools." warn-starts-at="${startsAt}" warn-title="Upcoming site maintenance">
        <mock:shadow-root>
          <div class="usa-maintenance-banner usa-maintenance-banner--error">
            <div class="usa-maintenance-banner__body">
              <h4 class="usa-maintenance-banner__title">
                Site maintenance
              </h4>
              <div class="usa-maintenance-banner__content">
                Weâ€™re working on VA.gov right now. If you have trouble signing in or using tools, check back after weâ€™re finished. Thank you for your patience.
              </div>
              <div class="usa-maintenance-banner__derived-content">
              <div>
                <p>
                  <strong>
                    Date:
                  </strong>
                    ${formatDate(startsAt, {})}
                  </p>
                <p>
                  <strong>
                    Start/End time:
                  </strong>
                    ${formatDate(startsAt, {timeStyle: 'short'})} to ${formatDate(expiresAt, {timeStyle: 'short'})} ET
                  </p>
                </div>
              </div>
            </div>
            <button aria-label="Close notification" class="usa-maintenance-banner__close" type="button">
              <i aria-hidden="true"></i>
            </button>
          </div>
        </mock:shadow-root>
      </va-maintenance-banner>
    `);
  });


  it('uswds - Does not render when expiration date is in the past', async () => {
    let startsAt = new Date(),
        expiresAt = new Date();
    startsAt.setDate(startsAt.getDate() - 2);
    expiresAt.setDate(expiresAt.getDate() - 1);
    const page = await newE2EPage({
      html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" warn-title="Upcoming site maintenance" maintenance-content="We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience." warn-content="We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools." starts-at="${startsAt}" expires-at="${expiresAt}" warn-starts-at="${startsAt}"></va-maintenance-banner>`,
    });
    const element = await page.find('va-maintenance-banner');
    expect(element).toEqualHtml(`
      <va-maintenance-banner banner-id="maintenance-banner" class="hydrated" expires-at="${expiresAt}" maintenance-content="Weâ€™re working on VA.gov right now. If you have trouble signing in or using tools, check back after weâ€™re finished. Thank you for your patience." maintenance-title="Site maintenance" starts-at="${startsAt}" warn-content="Weâ€™ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you wonâ€™t be able to sign in or use tools." warn-starts-at="${startsAt}" warn-title="Upcoming site maintenance">
        <mock:shadow-root>
        </mock:shadow-root>
      </va-maintenance-banner>
    `);
  });

  it('uswds - does not render if before warning start date', async () => {
    let startsAt = new Date(),
        expiresAt = new Date(),
        warnStartsAt = new Date();
    warnStartsAt.setHours(warnStartsAt.getHours() + 4);
    startsAt.setDate(startsAt.getDate() + 1);
    expiresAt.setDate(expiresAt.getDate() + 2);
    const page = await newE2EPage({
      html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" warn-title="Upcoming site maintenance" maintenance-content="We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience." warn-content="We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools." starts-at="${startsAt}" expires-at="${expiresAt}" warn-starts-at="${warnStartsAt}"></va-maintenance-banner>`,
    });
    const element = await page.find('va-maintenance-banner');
    expect(element).toEqualHtml(`
      <va-maintenance-banner banner-id="maintenance-banner" class="hydrated" expires-at="${expiresAt}" maintenance-content="Weâ€™re working on VA.gov right now. If you have trouble signing in or using tools, check back after weâ€™re finished. Thank you for your patience." maintenance-title="Site maintenance" starts-at="${startsAt}" warn-content="Weâ€™ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you wonâ€™t be able to sign in or use tools." warn-starts-at="${warnStartsAt}" warn-title="Upcoming site maintenance">
        <mock:shadow-root>
        </mock:shadow-root>
      </va-maintenance-banner>
    `);
  });

  it('uswds - renders warning if before maintenance', async () => {
    let startsAt = new Date(),
        expiresAt = new Date(),
        warnStartsAt = new Date();
    startsAt.setDate(startsAt.getDate() + 1);
    expiresAt.setDate(expiresAt.getDate() + 2);
    const page = await newE2EPage({
      html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" warn-title="Upcoming site maintenance" maintenance-content="We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience." warn-content="We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools." starts-at="${startsAt}" expires-at="${expiresAt}" warn-starts-at="${warnStartsAt}"></va-maintenance-banner>`,
    });
    const element = await page.find('va-maintenance-banner');
    expect(element).toEqualHtml(`
      <va-maintenance-banner banner-id="maintenance-banner" class="hydrated" expires-at="${expiresAt}" maintenance-content="Weâ€™re working on VA.gov right now. If you have trouble signing in or using tools, check back after weâ€™re finished. Thank you for your patience." maintenance-title="Site maintenance" starts-at="${startsAt}" warn-content="Weâ€™ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you wonâ€™t be able to sign in or use tools." warn-starts-at="${warnStartsAt}" warn-title="Upcoming site maintenance">
        <mock:shadow-root>
          <div class="usa-maintenance-banner usa-maintenance-banner--warning">
            <div class="usa-maintenance-banner__body">
              <h4 class="usa-maintenance-banner__title">
                Upcoming site maintenance
              </h4>
              <div class="usa-maintenance-banner__content">
                Weâ€™ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you wonâ€™t be able to sign in or use tools.
              </div>
              <div class="usa-maintenance-banner__derived-content">
              <div>
                <p>
                  <strong>
                    Start:
                  </strong>
                    ${formatDate(startsAt)} ET
                  </p>
                <p>
                  <strong>
                    End:
                  </strong>
                    ${formatDate(expiresAt)} ET
                  </p>
                </div>
              </div>
            </div>
            <button aria-label="Close notification" class="usa-maintenance-banner__close" type="button">
              <i aria-hidden="true"></i>
            </button>
          </div>
        </mock:shadow-root>
      </va-maintenance-banner>
    `);
  });

  it('uswds - passes an axe check', async () => {
    let currentDate = new Date(),
        expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 4);
    const page = await newE2EPage({
      html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" warn-title="Upcoming site maintenance" maintenance-content="We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience." warn-content="We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools." starts-at="${currentDate}" expires-at="${expiresAt}" warn-starts-at="${currentDate}"></va-maintenance-banner>`,
    });
    await axeCheck(page);
  });
});

