import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';
import { formatDate } from '../../../utils/date-utils';

describe('USWDS maintenance-banner', () => {
  it('uswds - renders', async () => {
    let startsAt = new Date(),
        expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours(), expiresAt.getMinutes() + 10);
    const page = await newE2EPage({
      html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${startsAt}">
              <div slot="maintenance-content">We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience.</div>
              <div slot="warn-content">We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools.</div>
            </va-maintenance-banner>`,
    });
    const element = await page.find('va-maintenance-banner');
    expect(element).toEqualHtml(`
      <va-maintenance-banner banner-id="maintenance-banner" class="hydrated" maintenance-end-date-time="${expiresAt}" maintenance-title="Site maintenance" maintenance-start-date-time="${startsAt}" upcoming-warn-start-date-time="${startsAt}" upcoming-warn-title="Upcoming site maintenance">
        <mock:shadow-root>
          <div class="maintenance-banner maintenance-banner--error">
            <div class="maintenance-banner__body">
              <h4 class="maintenance-banner__title">
                Site maintenance
              </h4>
              <div class="maintenance-banner__content">
                <slot name="maintenance-content"></slot>
              </div>
              <div class="maintenance-banner__derived-content">
              <div>
                <p>
                  <strong>
                    Date:
                  </strong>
                    ${formatDate(startsAt, { dateStyle: 'full' })}
                  </p>
                <p>
                  <strong>
                    Time:
                  </strong>
                    ${formatDate(startsAt, {
                      hour: 'numeric',
                      minute: 'numeric',
                      timeZoneName: 'short',
                    })}
                  </p>
                  <p>
                    <strong>
                      Duration:
                    </strong>
                    10 minutes
                  </p>
                </div>
              </div>
              <button aria-label="Close notification" class="maintenance-banner__close" type="button">
                <i aria-hidden="true"></i>
              </button>
            </div>

          </div>
        </mock:shadow-root>
        <div slot="maintenance-content">
          Weâ€™re working on VA.gov right now. If you have trouble signing in or using tools, check back after weâ€™re finished. Thank you for your patience.
        </div>
        <div slot="warn-content">
          Weâ€™ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you wonâ€™t be able to sign in or use tools.
        </div>
      </va-maintenance-banner>
    `);
  });


  it('uswds - Does not render when expiration date is in the past', async () => {
    let startsAt = new Date(),
        expiresAt = new Date();
    startsAt.setDate(startsAt.getDate() - 2);
    expiresAt.setDate(expiresAt.getDate() - 1);
    const page = await newE2EPage({
      html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-content="We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience." warn-content="We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools." maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${startsAt}"></va-maintenance-banner>`,
    });
    const element = await page.find('va-maintenance-banner');
    expect(element).toEqualHtml(`
      <va-maintenance-banner banner-id="maintenance-banner" class="hydrated" maintenance-end-date-time="${expiresAt}" maintenance-content="Weâ€™re working on VA.gov right now. If you have trouble signing in or using tools, check back after weâ€™re finished. Thank you for your patience." maintenance-title="Site maintenance" maintenance-start-date-time="${startsAt}" warn-content="Weâ€™ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you wonâ€™t be able to sign in or use tools." upcoming-warn-start-date-time="${startsAt}" upcoming-warn-title="Upcoming site maintenance">
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
      html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-content="We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience." warn-content="We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools." maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${warnStartsAt}"></va-maintenance-banner>`,
    });
    const element = await page.find('va-maintenance-banner');
    expect(element).toEqualHtml(`
      <va-maintenance-banner banner-id="maintenance-banner" class="hydrated" maintenance-end-date-time="${expiresAt}" maintenance-content="Weâ€™re working on VA.gov right now. If you have trouble signing in or using tools, check back after weâ€™re finished. Thank you for your patience." maintenance-title="Site maintenance" maintenance-start-date-time="${startsAt}" warn-content="Weâ€™ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you wonâ€™t be able to sign in or use tools." upcoming-warn-start-date-time="${warnStartsAt}" upcoming-warn-title="Upcoming site maintenance">
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
      html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance"  maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${warnStartsAt}">
              <div slot="maintenance-content">We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience.</div>
              <div slot="warn-content">We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools.</div>
            </va-maintenance-banner>`,
    });
    const element = await page.find('va-maintenance-banner');
    expect(element).toEqualHtml(`
      <va-maintenance-banner banner-id="maintenance-banner" class="hydrated" maintenance-end-date-time="${expiresAt}" maintenance-title="Site maintenance" maintenance-start-date-time="${startsAt}" upcoming-warn-start-date-time="${warnStartsAt}" upcoming-warn-title="Upcoming site maintenance">
        <mock:shadow-root>
          <div class="maintenance-banner maintenance-banner--warning">
            <div class="maintenance-banner__body">
              <h4 class="maintenance-banner__title">
                Upcoming site maintenance
              </h4>
              <div class="maintenance-banner__content">
              <slot name="warn-content"></slot>
              </div>
              <div class="maintenance-banner__derived-content">
              <div>
                <p>
                  <strong>
                    Date:
                  </strong>
                    ${formatDate(startsAt, { dateStyle: 'full' })}
                  </p>
                <p>
                  <strong>
                    Time:
                  </strong>
                    ${formatDate(startsAt, {
                      hour: 'numeric',
                      minute: 'numeric',
                      timeZoneName: 'short',
                    })}
                  </p>
                  <p>
                    <strong>
                      Duration:
                    </strong>
                    24 hours
                  </p>
                </div>
              </div>
              <button aria-label="Close notification" class="maintenance-banner__close" type="button">
                <i aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </mock:shadow-root>
        <div slot="maintenance-content">
          Weâ€™re working on VA.gov right now. If you have trouble signing in or using tools, check back after weâ€™re finished. Thank you for your patience.
        </div>
        <div slot="warn-content">
          Weâ€™ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you wonâ€™t be able to sign in or use tools.
        </div>
      </va-maintenance-banner>
    `);
  });

  it('uswds - renders error if before maintenance but isError is true', async () => {
    let startsAt = new Date(),
        expiresAt = new Date(),
        warnStartsAt = new Date();
    startsAt.setDate(startsAt.getDate() + 1);
    expiresAt.setDate(expiresAt.getDate() + 2);
    const page = await newE2EPage({
      html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance"  maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${warnStartsAt}" is-error>
              <div slot="maintenance-content">We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience.</div>
              <div slot="warn-content">We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools.</div>
            </va-maintenance-banner>`,
    });
    const element = await page.find('va-maintenance-banner');
    expect(element).toEqualHtml(`
      <va-maintenance-banner banner-id="maintenance-banner" class="hydrated" is-error="" maintenance-end-date-time="${expiresAt}" maintenance-title="Site maintenance" maintenance-start-date-time="${startsAt}" upcoming-warn-start-date-time="${warnStartsAt}" upcoming-warn-title="Upcoming site maintenance">
        <mock:shadow-root>
          <div class="maintenance-banner maintenance-banner--error">
            <div class="maintenance-banner__body">
              <h4 class="maintenance-banner__title">
                Site maintenance
              </h4>
              <div class="maintenance-banner__content">
                <slot name="maintenance-content"></slot>
              </div>
              <div class="maintenance-banner__derived-content">
              <div>
                <p>
                  <strong>
                    Date:
                  </strong>
                    ${formatDate(startsAt, { dateStyle: 'full' })}
                  </p>
                <p>
                  <strong>
                    Time:
                  </strong>
                    ${formatDate(startsAt, {
                      hour: 'numeric',
                      minute: 'numeric',
                      timeZoneName: 'short',
                    })}
                  </p>
                  <p>
                    <strong>
                      Duration:
                    </strong>
                    24 hours
                  </p>
                </div>
              </div>
              <button aria-label="Close notification" class="maintenance-banner__close" type="button">
                <i aria-hidden="true"></i>
              </button>
            </div>

          </div>
        </mock:shadow-root>
        <div slot="maintenance-content">
          Weâ€™re working on VA.gov right now. If you have trouble signing in or using tools, check back after weâ€™re finished. Thank you for your patience.
        </div>
        <div slot="warn-content">
          Weâ€™ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you wonâ€™t be able to sign in or use tools.
        </div>
      </va-maintenance-banner>
    `);
   });
  it('uswds - passes an axe check', async () => {
    let currentDate = new Date(),
        expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 4);
    const page = await newE2EPage({
      html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-content="We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience." warn-content="We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools." maintenance-start-date-time="${currentDate}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${currentDate}"></va-maintenance-banner>`,
    });
    await axeCheck(page);
  });
});

