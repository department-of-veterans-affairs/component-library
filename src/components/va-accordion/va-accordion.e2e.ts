import { newE2EPage } from '@stencil/core/testing';

describe('va-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-accordion></va-accordion>');
    const element = await page.find('va-accordion');
    expect(element).toHaveClass('hydrated');
  });

  it('closes one item when another opens', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">A bit more</va-accordion-item>
      </va-accordion>`);

    const buttons = await page.findAll('va-accordion-item >>> button[aria-expanded="false"]');
    expect(buttons.length).toEqual(2);

    await buttons[0].click();

    expect(buttons[0].getAttribute('aria-expanded')).toEqual('true');

    // Click the second button
    await buttons[1].click();

    // First button gets closed when second one is opened
    expect(buttons[0].getAttribute('aria-expanded')).toEqual('false');
    expect(buttons[1].getAttribute('aria-expanded')).toEqual('true');
  });

  it('allows multiple items to be open when `multi` prop is used', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion multi>
        <va-accordion-item header="First item">Some content</va-accordion-item>
        <va-accordion-item header="Second item">A bit more</va-accordion-item>
      </va-accordion>`);

    const buttons = await page.findAll('va-accordion-item >>> button[aria-expanded="false"]');
    expect(buttons.length).toEqual(2);

    await buttons[0].click();

    expect(buttons[0].getAttribute('aria-expanded')).toEqual('true');

    // Click the second button
    await buttons[1].click();

    // First button gets closed when second one is opened
    expect(buttons[0].getAttribute('aria-expanded')).toEqual('true');
    expect(buttons[1].getAttribute('aria-expanded')).toEqual('true');
  });
});
