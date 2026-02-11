import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';
import { formatDate } from '../../../utils/date-utils';

describe('maintenance-banner', () => {
  it('renders', async () => {
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
            <va-icon class="hydrated maintenance-banner__icon"></va-icon>
            <div class="maintenance-banner__body">
              <h2 class="maintenance-banner__title">
                Site maintenance
              </h2>
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
            </div>
            <button aria-label="Close notification" class="maintenance-banner__close" type="button">
              <va-icon class="hydrated"></va-icon>
            </button>
          </div>
        </mock:shadow-root>
        <div slot="maintenance-content">
          Weâ€™re working on VA.gov right now. If you have trouble signing in or using tools, check back after weâ€™re finished. Thank you for your patience.
        </div>
      </va-maintenance-banner>
    `);
  });

  it('does not render when expiration date is in the past', async () => {
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

  it('does not render if before warning start date', async () => {
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

  it('renders warning if before maintenance', async () => {
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
            <va-icon class="hydrated maintenance-banner__icon"></va-icon>
            <div class="maintenance-banner__body">
              <h2 class="maintenance-banner__title">
                Upcoming site maintenance
              </h2>
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
            </div>
            <button aria-label="Close notification" class="maintenance-banner__close" type="button">
              <va-icon class="hydrated"></va-icon>
            </button>
          </div>
        </mock:shadow-root>
        <div slot="warn-content">
          Weâ€™ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you wonâ€™t be able to sign in or use tools.
        </div>
      </va-maintenance-banner>
    `);
  });

  it('renders error if before maintenance but isError is true', async () => {
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
            <va-icon class="hydrated maintenance-banner__icon"></va-icon>
            <div class="maintenance-banner__body">
              <h2 class="maintenance-banner__title">
                Site maintenance
              </h2>
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
            </div>
            <button aria-label="Close notification" class="maintenance-banner__close" type="button">
              <va-icon class="hydrated"></va-icon>
            </button>

          </div>
        </mock:shadow-root>
        <div slot="maintenance-content">
          Weâ€™re working on VA.gov right now. If you have trouble signing in or using tools, check back after weâ€™re finished. Thank you for your patience.
        </div>
      </va-maintenance-banner>
    `);
  });
  it('passes an axe check', async () => {
    let currentDate = new Date(),
        expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 4);
    const page = await newE2EPage({
      html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-content="We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience." warn-content="We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools." maintenance-start-date-time="${currentDate}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${currentDate}"></va-maintenance-banner>`,
    });
    await axeCheck(page);
  });

  describe('maintenanceTitleHeaderLevel prop', () => {
    it('renders h2 by default for maintenance banner', async () => {
      let startsAt = new Date(),
        expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);
      const page = await newE2EPage({
        html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${startsAt}">
                <div slot="maintenance-content">Maintenance content</div>
                <div slot="warn-content">Warning content</div>
              </va-maintenance-banner>`,
      });
      const element = await page.find('va-maintenance-banner >>> .maintenance-banner__title');
      expect(element.tagName).toBe('H2');
    });

    it('renders h1 when maintenanceTitleHeaderLevel is 1', async () => {
      let startsAt = new Date(),
        expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);
      const page = await newE2EPage({
        html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-title-header-level="1" maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${startsAt}">
                <div slot="maintenance-content">Maintenance content</div>
                <div slot="warn-content">Warning content</div>
              </va-maintenance-banner>`,
      });
      const element = await page.find('va-maintenance-banner >>> .maintenance-banner__title');
      expect(element.tagName).toBe('H1');
    });

    it('renders h3 when maintenanceTitleHeaderLevel is 3', async () => {
      let startsAt = new Date(),
        expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);
      const page = await newE2EPage({
        html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-title-header-level="3" maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${startsAt}">
                <div slot="maintenance-content">Maintenance content</div>
                <div slot="warn-content">Warning content</div>
              </va-maintenance-banner>`,
      });
      const element = await page.find('va-maintenance-banner >>> .maintenance-banner__title');
      expect(element.tagName).toBe('H3');
    });

    it('renders h4 when maintenanceTitleHeaderLevel is 4', async () => {
      let startsAt = new Date(),
        expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);
      const page = await newE2EPage({
        html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-title-header-level="4" maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${startsAt}">
                <div slot="maintenance-content">Maintenance content</div>
                <div slot="warn-content">Warning content</div>
              </va-maintenance-banner>`,
      });
      const element = await page.find('va-maintenance-banner >>> .maintenance-banner__title');
      expect(element.tagName).toBe('H4');
    });

    it('renders h5 when maintenanceTitleHeaderLevel is 5', async () => {
      let startsAt = new Date(),
        expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);
      const page = await newE2EPage({
        html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-title-header-level="5" maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${startsAt}">
                <div slot="maintenance-content">Maintenance content</div>
                <div slot="warn-content">Warning content</div>
              </va-maintenance-banner>`,
      });
      const element = await page.find('va-maintenance-banner >>> .maintenance-banner__title');
      expect(element.tagName).toBe('H5');
    });

    it('renders h6 when maintenanceTitleHeaderLevel is 6', async () => {
      let startsAt = new Date(),
        expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);
      const page = await newE2EPage({
        html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-title-header-level="6" maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${startsAt}">
                <div slot="maintenance-content">Maintenance content</div>
                <div slot="warn-content">Warning content</div>
              </va-maintenance-banner>`,
      });
      const element = await page.find('va-maintenance-banner >>> .maintenance-banner__title');
      expect(element.tagName).toBe('H6');
    });

    it('renders correct header level for warning banner', async () => {
      let startsAt = new Date(),
        expiresAt = new Date(),
        warnStartsAt = new Date();
      startsAt.setDate(startsAt.getDate() + 1);
      expiresAt.setDate(expiresAt.getDate() + 2);
      const page = await newE2EPage({
        html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-title-header-level="3" maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${warnStartsAt}">
                <div slot="maintenance-content">Maintenance content</div>
                <div slot="warn-content">Warning content</div>
              </va-maintenance-banner>`,
      });
      const element = await page.find('va-maintenance-banner >>> .maintenance-banner__title');
      expect(element.tagName).toBe('H3');
      const text = await element.innerText;
      expect(text).toBe('Upcoming site maintenance');
    });

    it('renders correct header level for error banner', async () => {
      let startsAt = new Date(),
        expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);
      const page = await newE2EPage({
        html: `<va-maintenance-banner banner-id="maintenance-banner" maintenance-title="Site maintenance" upcoming-warn-title="Upcoming site maintenance" maintenance-title-header-level="1" maintenance-start-date-time="${startsAt}" maintenance-end-date-time="${expiresAt}" upcoming-warn-start-date-time="${startsAt}">
                <div slot="maintenance-content">Maintenance content</div>
                <div slot="warn-content">Warning content</div>
              </va-maintenance-banner>`,
      });
      const element = await page.find('va-maintenance-banner >>> .maintenance-banner__title');
      expect(element.tagName).toBe('H1');
      const text = await element.innerText;
      expect(text).toBe('Site maintenance');
    });
  });
});
