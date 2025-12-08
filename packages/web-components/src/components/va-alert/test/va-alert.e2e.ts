import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-alert><h4 slot="headline">This is an alert</h4><div>This is the alert content</div></va-alert>',
    );
    const element = await page.find('va-alert');

    expect(element).toEqualHtml(`
      <va-alert class="hydrated" status="info">
        <mock:shadow-root>
          <div class="usa-alert usa-alert--info">
            <div class="usa-alert__body">
              <div>
                <slot name="headline"></slot>
                <slot></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        <h4 slot="headline">
          <span class="usa-sr-only">
            Information Alert 
          </span>
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
    await page.setContent(
      '<va-alert closeable="true"><h4 slot="headline">This is an alert</h4></va-alert>',
    );

    let button = await page.find('va-alert >>> button');

    expect(button.getAttribute('aria-label')).toEqual(
      'Close Information Alert This is an alert notification',
    );
  });

  it('uses the custom text for the close button ARIA label, if provided', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert closeable="true" close-btn-aria-label="Close this notification"><h4 slot="headline">This is an alert</h4></va-alert>',
    );

    let button = await page.find('va-alert >>> button');

    expect(button.getAttribute('aria-label')).toEqual(
      'Close this notification',
    );
  });

  it('uses generic text for the close button ARIA label, if no custom text is provided and no headline slot exists', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert closeable="true"><p>Some alert content</p></va-alert>',
    );

    let button = await page.find('va-alert >>> button');

    expect(button.getAttribute('aria-label')).toEqual(
      'Close this notification',
    );
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
        headline: 'Information Alert This is an alert',
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
        clickLabel: 'Information Alert\nThis is a link',
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
    await page.setContent(
      '<va-alert><h4 slot="headline">This is an alert</h4></va-alert>',
    );

    const alert = await page.find('va-alert');
    const element = await page.find('va-alert >>> .usa-alert');

    expect(element.classList.contains('usa-alert--slim')).toBeFalsy();
    expect(alert).not.toHaveAttribute('slim');
  });

  it('preserves headline and slim state when toggling visibility from false to true', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-alert status="info" visible="false" closeable>
        <h2 slot="headline">Heading</h2>
        Description
      </va-alert>
    `);

    const alert = await page.find('va-alert');

    // Initial state: visible="false"
    expect(alert).not.toHaveAttribute('slim');
    let shadowContent = await page.find('va-alert >>> .usa-alert');
    expect(shadowContent).toBeNull(); // Not rendered when invisible

    let headlineSlot = await page.find('va-alert >>> slot[name="headline"]');
    expect(headlineSlot).toBeNull(); // Slot not in shadow DOM when invisible

    // Toggle to visible="true"
    alert.setProperty('visible', true);
    await page.waitForChanges();

    // After becoming visible: headline should be present and not slim
    expect(alert).not.toHaveAttribute('slim');
    shadowContent = await page.find('va-alert >>> .usa-alert');
    expect(shadowContent).not.toBeNull();
    expect(shadowContent.classList.contains('usa-alert--slim')).toBeFalsy();

    headlineSlot = await page.find('va-alert >>> slot[name="headline"]');
    expect(headlineSlot).not.toBeNull(); // Headline slot should be rendered
  });

  it('preserves headline and slim state when toggling visibility from true to false to true', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-alert status="info" visible="true" closeable>
        <h2 slot="headline">Heading</h2>
        Description
      </va-alert>
    `);

    const alert = await page.find('va-alert');

    // Initial state: visible="true"
    expect(alert).not.toHaveAttribute('slim');
    let shadowContent = await page.find('va-alert >>> .usa-alert');
    expect(shadowContent).not.toBeNull();
    expect(shadowContent.classList.contains('usa-alert--slim')).toBeFalsy();

    let headlineSlot = await page.find('va-alert >>> slot[name="headline"]');
    expect(headlineSlot).not.toBeNull();

    // Toggle to visible="false"
    alert.setProperty('visible', false);
    await page.waitForChanges();

    expect(alert).not.toHaveAttribute('slim');
    shadowContent = await page.find('va-alert >>> .usa-alert');
    expect(shadowContent).toBeNull(); // Not rendered when invisible

    headlineSlot = await page.find('va-alert >>> slot[name="headline"]');
    expect(headlineSlot).toBeNull(); // Slot not in shadow DOM when invisible

    // Toggle back to visible="true"
    alert.setProperty('visible', true);
    await page.waitForChanges();

    // After becoming visible again: headline should still be present and not slim
    expect(alert).not.toHaveAttribute('slim');
    shadowContent = await page.find('va-alert >>> .usa-alert');
    expect(shadowContent).not.toBeNull();
    expect(shadowContent.classList.contains('usa-alert--slim')).toBeFalsy();

    headlineSlot = await page.find('va-alert >>> slot[name="headline"]');
    expect(headlineSlot).not.toBeNull(); // Headline slot should be rendered
  });

  describe('sr-only status announcement', () => {
    it('adds sr-only span to headline slot content for non-slim alerts', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <va-alert status="warning">
          <h3 slot="headline">Important warning</h3>
          <p>This is the alert content</p>
        </va-alert>
      `);

      await page.waitForChanges();

      // Get the headline element in the light DOM
      const headline = await page.find('va-alert h3[slot="headline"]');
      expect(headline).not.toBeNull();

      // Check that sr-only span was added to the headline
      const srOnlySpan = await page.find('va-alert h3[slot="headline"] .usa-sr-only');
      expect(srOnlySpan).not.toBeNull();
      
      const srOnlyText = await srOnlySpan.textContent;
      expect(srOnlyText).toBe('Warning Alert ');
    });

    it('adds sr-only span to default slot content for slim alerts', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <va-alert status="error">
          <p>This is a slim alert without a headline</p>
        </va-alert>
      `);

      await page.waitForChanges();

      // Verify it's a slim alert
      const alert = await page.find('va-alert');
      expect(alert).toHaveAttribute('slim');

      // Get the paragraph element in the light DOM
      const paragraph = await page.find('va-alert p');
      expect(paragraph).not.toBeNull();

      // Check that sr-only span was added to the paragraph
      const srOnlySpan = await page.find('va-alert p .usa-sr-only');
      expect(srOnlySpan).not.toBeNull();
      
      const srOnlyText = await srOnlySpan.textContent;
      expect(srOnlyText).toBe('Error Alert ');
    });

    it('uses correct status labels for different alert types', async () => {
      const statuses = [
        { status: 'info', expectedText: 'Information Alert ' },
        { status: 'warning', expectedText: 'Warning Alert ' },
        { status: 'error', expectedText: 'Error Alert ' },
        { status: 'success', expectedText: 'Success Alert ' },
        { status: 'continue', expectedText: 'Continue Alert ' },
      ];

      for (const { status, expectedText } of statuses) {
        const page = await newE2EPage();
        await page.setContent(`
          <va-alert status="${status}">
            <h3 slot="headline">Headline</h3>
            <p>Content</p>
          </va-alert>
        `);

        await page.waitForChanges();

        const srOnlySpan = await page.find('va-alert h3[slot="headline"] .usa-sr-only');
        expect(srOnlySpan).not.toBeNull();
        
        const srOnlyText = await srOnlySpan.textContent;
        expect(srOnlyText).toBe(expectedText);
      }
    });

    it('maintains sr-only span on re-render', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <va-alert status="warning">
          <h3 slot="headline">Warning headline</h3>
          <p>Content</p>
        </va-alert>
      `);

      await page.waitForChanges();

      // Trigger a re-render by changing a property
      const alert = await page.find('va-alert');
      alert.setProperty('closeable', true);
      await page.waitForChanges();

      // Check that there's still exactly one sr-only span with correct text
      const srOnlySpans = await page.findAll('va-alert h3[slot="headline"] .usa-sr-only');
      expect(srOnlySpans.length).toBe(1);
      
      const srOnlyText = await srOnlySpans[0].textContent;
      expect(srOnlyText).toBe('Warning Alert ');
    });

    it('adds sr-only span when alert becomes visible', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <va-alert status="success" visible="false">
          <h3 slot="headline">Success message</h3>
          <p>Content</p>
        </va-alert>
      `);

      await page.waitForChanges();

      // Initially no sr-only span since alert is not visible
      let srOnlySpan = await page.find('va-alert h3[slot="headline"] .usa-sr-only');
      expect(srOnlySpan).toBeNull();

      // Make alert visible
      const alert = await page.find('va-alert');
      alert.setProperty('visible', true);
      await page.waitForChanges();

      // Now sr-only span should be present
      srOnlySpan = await page.find('va-alert h3[slot="headline"] .usa-sr-only');
      expect(srOnlySpan).not.toBeNull();
      
      const srOnlyText = await srOnlySpan.textContent;
      expect(srOnlyText).toBe('Success Alert ');
    });

    it('updates sr-only text when status changes', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <va-alert status="info">
          <h3 slot="headline">Headline</h3>
          <p>Content</p>
        </va-alert>
      `);

      await page.waitForChanges();

      // Check initial sr-only text
      let srOnlySpan = await page.find('va-alert h3[slot="headline"] .usa-sr-only');
      let srOnlyText = await srOnlySpan.textContent;
      expect(srOnlyText).toBe('Information Alert ');

      // Change status
      const alert = await page.find('va-alert');
      alert.setProperty('status', 'error');
      await page.waitForChanges();

      // Check updated sr-only text
      srOnlySpan = await page.find('va-alert h3[slot="headline"] .usa-sr-only');
      srOnlyText = await srOnlySpan.textContent;
      expect(srOnlyText).toBe('Error Alert ');
    });

    it('handles alerts with multiple child elements in default slot', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <va-alert status="warning">
          <p>First paragraph</p>
          <p>Second paragraph</p>
        </va-alert>
      `);

      await page.waitForChanges();

      // Verify it's a slim alert
      const alert = await page.find('va-alert');
      expect(alert).toHaveAttribute('slim');

      // Check that sr-only span was added to the first element only
      const srOnlySpan = await page.find('va-alert p:first-of-type .usa-sr-only');
      expect(srOnlySpan).not.toBeNull();

      const srOnlyText = await srOnlySpan.textContent;
      expect(srOnlyText).toBe('Warning Alert ');

      // Verify second paragraph doesn't have sr-only span
      const secondParagraphSrOnly = await page.find('va-alert p:nth-of-type(2) .usa-sr-only');
      expect(secondParagraphSrOnly).toBeNull();
    });
  });
});
