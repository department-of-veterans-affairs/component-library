import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../testing/test-helpers';

describe('va-accordion-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-accordion-item></va-accordion-item>');
    const element = await page.find('va-accordion-item');

    expect(element).toEqualHtml(`
    <va-accordion-item class="hydrated">
      <mock:shadow-root>
        <h2>
          <button aria-controls="content" aria-expanded="false"></button>
        </h2>
        <div id="content">
          <slot></slot>
        </div>
      </mock:shadow-root>
    </va-accordion-item>`);
  });

  it('allows the heading level to be changed via prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item header="The header">Content inside</va-accordion-item>',
    );
    const element = await page.find('va-accordion-item');
    let header = element.shadowRoot.childNodes[0];

    expect(header.nodeName).toEqual('H2');

    element.setProperty('level', 4);
    await page.waitForChanges();
    header = element.shadowRoot.childNodes[0];

    expect(header.nodeName).toEqual('H4');
  });

  it('passes an axe check when open', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-accordion-item open header="First item">Some content</va-accordion-item>
      `);

    await axeCheck(page);
  });

  it('passes an axe check when closed', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-accordion-item header="First item">Some content</va-accordion-item>
      `);

    await axeCheck(page);
  });

  it('sets aria-expanded to true based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-accordion-item header="The header">Content inside</va-accordion-item>');
    const component = await page.find('va-accordion-item');
    const button = await page.find('va-accordion-item >>> button');

    expect(button.getAttribute('aria-expanded')).toEqual('false');

    component.setProperty('open', true);
    await page.waitForChanges();

    expect(button.getAttribute('aria-expanded')).toEqual('true');
  });

  it('fires a custom event when the button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-accordion-item header="The header">Content inside</va-accordion-item>');

    const accordionItemToggled = await page.spyOnEvent('accordionItemToggled');

    const button = await page.find('va-accordion-item >>> button');
    await button.click();

    expect(accordionItemToggled).toHaveReceivedEventTimes(1);
  });
});
