import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-alert><h4 slot="headline">This is an alert</h4><div>This is the alert content</div></va-alert>');
    const element = await page.find('va-alert');

    expect(element).toEqualHtml(`
      <va-alert class="hydrated" status="info">
        <mock:shadow-root>
          <div class="usa-alert usa-alert--info">
            <div class="usa-alert__body">
              <div>
                <span class="usa-sr-only">
                  Information Alert
                </span>
                <slot name="headline"></slot>
                <slot></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        <h4 slot="headline">
          This is an alert
        </h4>
        <div>
          This is the alert content
        </div>
      </va-alert>
    `);
  });

  it('renders an empty div with a "polite" aria-live tag when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-alert visible="false"></va-alert>');
    const element = await page.find('va-alert');

    expect(element).toEqualHtml(`
      <va-alert class="hydrated" slim="" visible="false" status="info">
        <mock:shadow-root>
          <div aria-live="polite"></div>
        </mock:shadow-root>
      </va-alert>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-alert><h3 slot="headline">Alert</h3>Alert content</va-alert>`,
    );

    await axeCheck(page);
  });

  it('only shows a close icon if the closeable prop is passed', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert>Alert</va-alert>');

    const element = await page.find('va-alert');

    let button = await page.find('va-alert >>> button');
    expect(button).toBeNull();

    element.setProperty('closeable', true);
    await page.waitForChanges();
    button = await page.find('va-alert >>> button');

    expect(button).not.toBeNull();
  });

  it('uses the headline text for the close button ARIA label, if no custom text is provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert closeable="true"><h4 slot="headline">This is an alert</h4></va-alert>');

    let button = await page.find('va-alert >>> button');

    expect(button.getAttribute('aria-label')).toEqual('Close This is an alert notification');
  });

  it('uses the custom text for the close button ARIA label, if provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert closeable="true" close-btn-aria-label="Close this notification"><h4 slot="headline">This is an alert</h4></va-alert>');

    let button = await page.find('va-alert >>> button');

    expect(button.getAttribute('aria-label')).toEqual('Close this notification');
  });

  it('uses generic text for the close button ARIA label, if no custom text is provided and no headline slot exists', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert closeable="true"><p>Some alert content</p></va-alert>');

    let button = await page.find('va-alert >>> button');

    expect(button.getAttribute('aria-label')).toEqual('Close this notification');
  });

  it('fires a custom "close" event when the close button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert closeable="true">Content inside</va-alert>',
    );

    const closeSpy = await page.spyOnEvent('closeEvent');

    const button = await page.find('va-alert >>> button');
    await button.click();

    expect(closeSpy).toHaveReceivedEventTimes(1);
  });

  it('fires an analytics event when a link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert><h4 slot="headline">This is an alert</h4><a href="#">This is a link</a></va-alert>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const link = await page.find('va-alert a');
    await link.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'linkClick',
      componentName: 'va-alert',
      details: {
        headline: 'This is an alert',
        clickLabel: 'This is a link',
        status: 'info',
        closeable: false,
      },
    });
  });

  it('uses a null headline in the analytics event detail when the heading is absent', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert><a href="#">This is a link</a></va-alert>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const link = await page.find('va-alert a');
    await link.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'linkClick',
      componentName: 'va-alert',
      details: {
        headline: null,
        clickLabel: 'This is a link',
        status: 'info',
        closeable: false,
      },
    });
  });

  it('does not fire an analytics event when disableAnalytics is passed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert disable-analytics="true"><a href="#">This is a link</a></va-alert>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const link = await page.find('va-alert a');
    await link.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('should set status to info if null', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert><h4 slot="headline">This is an alert</h4><div>This is the alert content</div>',
    );

    const element = await page.find('va-alert >>> .usa-alert');

    expect(element.classList.contains('usa-alert--info')).toBeTruthy();
  });

  it('should set status to info if it is an empty string', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert status=""><h4 slot="headline">This is an alert</h4><div>This is the alert content</div>',
    );

    const element = await page.find('va-alert >>> .usa-alert');

    expect(element.classList.contains('usa-alert--info')).toBeTruthy();
  });

  it('should set status to info if value not in pre-defined list', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert status="Fake"><h4 slot="headline">This is an alert</h4><div>This is the alert content</div>',
    );

    const element = await page.find('va-alert >>> .usa-alert');

    expect(element.classList.contains('usa-alert--info')).toBeTruthy();
  });

  it('should not overwrite status if valid', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert status="continue"><h4 slot="headline">This is an alert</h4><div>This is the alert content</div>',
    );

    const element = await page.find('va-alert >>> .usa-alert');

    expect(element.classList.contains('usa-alert--info')).toBeFalsy();
    expect(element.classList.contains('usa-alert--continue')).toBeTruthy();
  });

  it('renders section markup when full-width prop is active', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-alert full-width></va-alert>');
    const sectionEl = await page.find('va-alert >>> section');

    expect(sectionEl).not.toBeNull();
  });

  it('does not render the section markup when full-width prop is inactive', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-alert></va-alert>');
    const sectionEl = await page.find('va-alert >>> section');

    expect(sectionEl).toBeNull();
  });

  it('has the .usa-site-alert class when the full-width prop is active', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-alert full-width></va-alert>');
    const sectionEl = await page.find('va-alert >>> .usa-site-alert');

    expect(sectionEl).not.toBeNull();
  });

  it('passes an axe check when the full-width prop is active', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-alert full-width><h3 slot="headline">Alert</h3>Alert content</va-alert>`,
    );

    await axeCheck(page);
  });

  it('applies the slim class and attribute when a headline is not provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert></va-alert>');

    const alert = await page.find('va-alert');
    const element = await page.find('va-alert >>> .usa-alert');

    expect(element.classList.contains('usa-alert--slim')).toBeTruthy();
    expect(alert).toHaveAttribute('slim');
  });

  it('does not apply the slim class and attribute when a headline is provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert><h4 slot="headline">This is an alert</h4></va-alert>');

    const alert = await page.find('va-alert');
    const element = await page.find('va-alert >>> .usa-alert');

    expect(element.classList.contains('usa-alert--slim')).toBeFalsy();
    expect(alert).not.toHaveAttribute('slim');
  });

  describe('SR-only status text', () => {
    it('announces "Warning Alert" for warning status with headline', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-alert status="warning"><h4 slot="headline">Your balance may be overdue</h4></va-alert>');
      
      const srText = await page.find('va-alert >>> .usa-sr-only');
      const text = await srText.getProperty('textContent');
      
      expect(text).toBe('Warning Alert');
    });

    it('announces "Error Alert" for error status with headline', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-alert status="error"><h4 slot="headline">There was an error</h4></va-alert>');
      
      const srText = await page.find('va-alert >>> .usa-sr-only');
      const text = await srText.getProperty('textContent');
      
      expect(text).toBe('Error Alert');
    });

    it('announces "Success Alert" for success status with headline', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-alert status="success"><h4 slot="headline">Success</h4></va-alert>');
      
      const srText = await page.find('va-alert >>> .usa-sr-only');
      const text = await srText.getProperty('textContent');
      
      expect(text).toBe('Success Alert');
    });

    it('announces "Information Alert" for info status with headline', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-alert status="info"><h4 slot="headline">Information</h4></va-alert>');
      
      const srText = await page.find('va-alert >>> .usa-sr-only');
      const text = await srText.getProperty('textContent');
      
      expect(text).toBe('Information Alert');
    });

    it('announces "Continue Alert" for continue status with headline', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-alert status="continue"><h4 slot="headline">Continue</h4></va-alert>');
      
      const srText = await page.find('va-alert >>> .usa-sr-only');
      const text = await srText.getProperty('textContent');
      
      expect(text).toBe('Continue Alert');
    });

    it('announces "Warning Alert" for warning status in slim variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-alert status="warning"><p>Your balance may be overdue</p></va-alert>');
      
      const srText = await page.find('va-alert >>> .usa-sr-only');
      const text = await srText.getProperty('textContent');
      
      expect(text).toBe('Warning Alert');
    });

    it('announces "Error Alert" for error status in slim variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-alert status="error"><p>There was an error</p></va-alert>');
      
      const srText = await page.find('va-alert >>> .usa-sr-only');
      const text = await srText.getProperty('textContent');
      
      expect(text).toBe('Error Alert');
    });

    it('announces "Success Alert" for success status in slim variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-alert status="success"><p>Success</p></va-alert>');
      
      const srText = await page.find('va-alert >>> .usa-sr-only');
      const text = await srText.getProperty('textContent');
      
      expect(text).toBe('Success Alert');
    });

    it('announces "Information Alert" for info status in slim variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-alert status="info"><p>Information</p></va-alert>');
      
      const srText = await page.find('va-alert >>> .usa-sr-only');
      const text = await srText.getProperty('textContent');
      
      expect(text).toBe('Information Alert');
    });

    it('announces "Continue Alert" for continue status in slim variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-alert status="continue"><p>Continue</p></va-alert>');
      
      const srText = await page.find('va-alert >>> .usa-sr-only');
      const text = await srText.getProperty('textContent');
      
      expect(text).toBe('Continue Alert');
    });

    it('defaults to "Information Alert" for undefined status', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-alert status="invalid"><h4 slot="headline">Alert</h4></va-alert>');
      
      const srText = await page.find('va-alert >>> .usa-sr-only');
      const text = await srText.getProperty('textContent');
      
      expect(text).toBe('Information Alert');
    });
  });
});
