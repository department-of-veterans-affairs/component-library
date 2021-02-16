import { newE2EPage } from '@stencil/core/testing';

describe('va-accordion-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-accordion-item></va-accordion-item>');
    const element = await page.find('va-accordion-item');

    expect(element).toEqualHtml(`
    <va-accordion-item class="hydrated">
      <mock:shadow-root>
        <button aria-controls="content" aria-expanded="false"></button>
        <div id="content">
          <slot></slot>
        </div>
      </mock:shadow-root>
    </va-accordion-item>`);
  });

  it('sets aria-expanded to true based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-accordion-item open header="The header">Content inside</va-accordion-item>');
    const button = await page.find('va-accordion-item >>> button');

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
