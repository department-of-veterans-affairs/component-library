import { newE2EPage } from '@stencil/core/testing';

import { axeCheck } from '../../testing/test-helpers';

describe('va-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-accordion></va-accordion>');
    const element = await page.find('va-accordion');

    expect(element).toEqualHtml(`
      <va-accordion class="hydrated">
        <mock:shadow-root>
          <button aria-label="Expand all accordions">
            Expand all +
          </button>
          <slot></slot>
        </mock:shadow-root>
      </va-accordion>
    `);
  });

  it('does not render expand collapse button if `open-single` is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-accordion open-single="true"></va-accordion>');
    const element = await page.find('va-accordion');

    expect(element).toEqualHtml(`
      <va-accordion class="hydrated" open-single="true">
        <mock:shadow-root>
          <slot></slot>
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

  it('expands all items when `Expand all +` button is triggered', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">A bit more</va-accordion-item>
      </va-accordion>`);

    const expandButton = await page.find('va-accordion >>> button');
    const accordionItems = await page.findAll('va-accordion-item >>> button');
    // Click to Trigger Expanse of all Buttons
    await expandButton.click();

    expect(accordionItems[0].getAttribute('aria-expanded')).toEqual('true');
    expect(accordionItems[1].getAttribute('aria-expanded')).toEqual('true');
  });

  it('collapses all items when `Collapse All -` button is triggered', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">A bit more</va-accordion-item>
      </va-accordion>`);

    const expandButton = await page.find('va-accordion >>> button');
    const accordionItemsButtons = await page.findAll(
      'va-accordion-item >>> button',
    );
    // Click to Expand Both Buttons
    await accordionItemsButtons[0].click();
    await accordionItemsButtons[1].click();
    // Click to Trigger Collapse of all Buttons
    await expandButton.click();

    expect(accordionItemsButtons[0].getAttribute('aria-expanded')).toEqual(
      'false',
    );
    expect(accordionItemsButtons[1].getAttribute('aria-expanded')).toEqual(
      'false',
    );
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
