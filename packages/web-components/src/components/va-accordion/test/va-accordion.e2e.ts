import { newE2EPage } from '@stencil/core/testing';

import { axeCheck } from '../../../testing/test-helpers';

describe('va-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-accordion></va-accordion>');
    const element = await page.find('va-accordion');

    // The i18next translation keys are being rendered
    expect(element).toEqualHtml(`
      <va-accordion class="hydrated">
        <mock:shadow-root>
          <div class="usa-accordion">
            <ul class="expand-collapse-list">
              <li>
                <va-button-icon button-type="expand" class="hydrated va-accordion__button" data-testid="expand-all-accordions"></va-button-icon>
              </li>
              <li>
                <va-button-icon button-type="collapse" class="hydrated va-accordion__button" data-testid="collapse-all-accordions"></va-button-icon>
              </li>
            </ul>
            <slot></slot>
          </div>
        </mock:shadow-root>
      </va-accordion>
    `);

    // Verify aria-labels are applied in the button shadow DOM
    const expandButton = await page.find('va-accordion >>> va-button-icon[data-testid="expand-all-accordions"] >>> button');
    const collapseButton = await page.find('va-accordion >>> va-button-icon[data-testid="collapse-all-accordions"] >>> button');
    
    expect(expandButton.getAttribute('aria-label')).toBe('expand-all-aria-label');
    expect(collapseButton.getAttribute('aria-label')).toBe('collapse-all-aria-label');
  });

  it('does not render expand collapse button if `open-single` is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-accordion open-single="true"></va-accordion>');
    const element = await page.find('va-accordion');

    expect(element).toEqualHtml(`
      <va-accordion class="hydrated" open-single="true">
        <mock:shadow-root>
          <div class="usa-accordion">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </va-accordion>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">A bit more</va-accordion-item>
      </va-accordion>`);

    await axeCheck(page);
  });

  it('closes one item when another opens if `open-single` is true', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion open-single>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">A bit more</va-accordion-item>
      </va-accordion>`);

    const buttons = await page.findAll(
      'va-accordion-item >>> button[aria-expanded="false"]',
    );
    expect(buttons.length).toEqual(2);

    await buttons[0].click();

    expect(buttons[0].getAttribute('aria-expanded')).toEqual('true');
    expect(buttons[1].getAttribute('aria-expanded')).toEqual('false');

    // Click the second button
    await buttons[1].click();

    // First button gets closed when second one is opened
    expect(buttons[0].getAttribute('aria-expanded')).toEqual('false');
    expect(buttons[1].getAttribute('aria-expanded')).toEqual('true');
  });

  it('can open nested open-single item', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">
          A bit more
          <va-accordion open-single>
            <va-accordion-item header="Nested Item">Deep content</va-accordion-item>
          </va-accordion>
        </va-accordion-item>
      </va-accordion>`);

    const buttons = await page.findAll(
      'va-accordion-item >>> button[aria-expanded="false"]',
    );
    expect(buttons.length).toEqual(3);

    // Click the second button
    await buttons[1].click();

    expect(buttons[1].getAttribute('aria-expanded')).toEqual('true');

    // Click the nested button
    await buttons[2].click();

    // Nested item is open
    expect(buttons[1].getAttribute('aria-expanded')).toEqual('true');
    expect(buttons[2].getAttribute('aria-expanded')).toEqual('true');
  });

  it('allows multiple items to be open by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">A bit more</va-accordion-item>
      </va-accordion>`);

    const buttons = await page.findAll(
      'va-accordion-item >>> button[aria-expanded="false"]',
    );
    expect(buttons.length).toEqual(2);

    await buttons[0].click();

    expect(buttons[0].getAttribute('aria-expanded')).toEqual('true');
    expect(buttons[1].getAttribute('aria-expanded')).toEqual('false');

    // Click the second button
    await buttons[1].click();

    expect(buttons[0].getAttribute('aria-expanded')).toEqual('true');
    expect(buttons[1].getAttribute('aria-expanded')).toEqual('true');
  });

  it('expands all items when `Expand all` button is triggered', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">A bit more</va-accordion-item>
      </va-accordion>`);

    const expandButton = await page.find('va-accordion >>> va-button-icon[data-testid="expand-all-accordions"]');
    const accordionItems = await page.findAll('va-accordion-item >>> button');
    // Click to trigger expand of all accordion items collectively
    await expandButton.click();

    expect(accordionItems[0].getAttribute('aria-expanded')).toEqual('true');
    expect(accordionItems[1].getAttribute('aria-expanded')).toEqual('true');
  });

  it('collapses all items when `Collapse all` button is triggered', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">A bit more</va-accordion-item>
      </va-accordion>`);

    const collapseButton = await page.find('va-accordion >>> va-button-icon[data-testid="collapse-all-accordions"]');
    const accordionItems = await page.findAll('va-accordion-item >>> button');
    // Click to trigger expand of all accordion items collectively
    await collapseButton.click();

    expect(accordionItems[0].getAttribute('aria-expanded')).toEqual('false');
    expect(accordionItems[1].getAttribute('aria-expanded')).toEqual('false');
  });

  it('fires accordionExpandCollapseAll event when `Expand all` button is triggered', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">Some more content</va-accordion-item>
      </va-accordion>`);

    const analyticsSpy = await page.spyOnEvent('accordionExpandCollapseAll');
    const expandButton = await page.find('va-accordion >>> va-button-icon[data-testid="expand-all-accordions"]');

    // Click to trigger expand of all accordion items collectively
    await expandButton.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);
  });

  it('accordionExpandCollapseAll event status says `allOpen` when all are expanded', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">Some more content</va-accordion-item>
      </va-accordion>`);

    const analyticsSpy = await page.spyOnEvent('accordionExpandCollapseAll');
    const expandButton = await page.find('va-accordion >>> va-button-icon[data-testid="expand-all-accordions"]');

    // Click to trigger expand of all accordion items collectively
    await expandButton.click(); // open all
;
    expect(analyticsSpy).toHaveReceivedEventDetail({
      status: 'allOpen',
    });
  });

  it('accordionExpandCollapseAll event status says `allClosed` when all are closed', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">Some more content</va-accordion-item>
      </va-accordion>`);

    const analyticsSpy = await page.spyOnEvent('accordionExpandCollapseAll');
    const collapseButton = await page.find('va-accordion >>> va-button-icon[data-testid="collapse-all-accordions"]');

    await collapseButton.click(); // close all

    expect(analyticsSpy).toHaveReceivedEventDetail({
      status: 'allClosed',
    });
  });

  it('fires accordionExpandCollapseAll event when `Collapse All` button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">Some more content</va-accordion-item>
      </va-accordion>`);

    const analyticsSpy = await page.spyOnEvent('accordionExpandCollapseAll');
    const collapseButton = await page.find('va-accordion >>> va-button-icon[data-testid="collapse-all-accordions"]');
    const accordionItems = await page.findAll('va-accordion-item >>> button');
    // Click to expand both accordion items manually
    await accordionItems[0].click();
    await accordionItems[1].click();
    // Click to trigger collapse of all accordion items collectively
    await collapseButton.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);
  });

  it('fires an analytics event when expanded', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item" subheader="First subheader">Some content</va-accordion-item>
      </va-accordion>`);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find(
      'va-accordion-item >>> button[aria-expanded="false"]',
    );

    await button.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'expand',
      componentName: 'va-accordion',
      details: {
        header: 'First item',
        subheader: 'First subheader',
        level: 2,
        sectionHeading: null,
      },
    });
  });

  it('does not fire an analytics event when disableAnalytics is passed', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion disable-analytics="true">
        <va-accordion-item header="First item" subheader="First subheader">Some content</va-accordion-item>
      </va-accordion>`);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find('va-accordion-item');

    await button.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('includes sectionHeading in analytics event when present', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion section-heading="The Section Heading">
        <va-accordion-item header="First item" subheader="First subheader">Some content</va-accordion-item>
      </va-accordion>`);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find(
      'va-accordion-item >>> button[aria-expanded="false"]',
    );

    await button.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'expand',
      componentName: 'va-accordion',
      details: {
        header: 'First item',
        subheader: 'First subheader',
        level: 2,
        sectionHeading: 'The Section Heading',
      },
    });
  });

  it('slot usage includes correct header in analytics event when present', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion section-heading="The Section Heading">
        <va-accordion-item subheader="First subheader"><h3 slot="headline">First header</h3>Some content</va-accordion-item>
      </va-accordion>`);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find(
      'va-accordion-item >>> button[aria-expanded="false"]',
    );

    await button.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'expand',
      componentName: 'va-accordion',
      details: {
        header: 'First header',
        subheader: 'First subheader',
        level: 3,
        sectionHeading: 'The Section Heading',
      },
    });
  });

  it('fires an analytics event with default data when no props are provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item></va-accordion-item>
      </va-accordion>`);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find(
      'va-accordion-item >>> button[aria-expanded="false"]',
    );

    await button.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'expand',
      componentName: 'va-accordion',
      details: {
        level: 2,
        sectionHeading: null,
        subheader: null,
      },
    });
  });
});
