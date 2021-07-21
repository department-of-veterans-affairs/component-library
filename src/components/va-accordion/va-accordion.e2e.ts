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

  it('closes one item when another opens if `multi` is false', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion multi="false">
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

  it('fires an analytics event when expanded', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item" subheader="First subheader">Some content</va-accordion-item>
      </va-accordion>`,
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find(
      'va-accordion-item >>> button[aria-expanded="false"]',
    );

    await button.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'expand',
      componentName: 'Accordion',
      details: {
        header: "First item",
        subheader: "First subheader",
        level: 2,
      },
    });
  });

  it('does not fire an analytics event when disableAnalytics is passed', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion disable-analytics="true">
        <va-accordion-item header="First item" subheader="First subheader">Some content</va-accordion-item>
      </va-accordion>`,
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find('va-accordion-item');

    await button.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });
});
